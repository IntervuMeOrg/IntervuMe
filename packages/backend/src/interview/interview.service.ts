import { MoreThan } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { InterviewEntity } from "./interview.entity";
import { apId } from "../common/id-generator";
import { codingQuestionService } from "../coding/coding-question/codingQuestion.service";
import { interviewQuestionService } from "../interview/interview-question/interview-question.service";
import { QuestionType } from "../interview/interview-question/interview-question-types";
import {
  McqAnswer,
  McqAnswerSummary,
} from "../mcq/mcq-answer/mcq-answer-types";
import {
  CodeSubmission,
  CodeSubmissionWithResults,
} from "../coding/code-submission/code-submission-types";
import {
  Interview,
  CreateInterviewRequestBody,
  UpdateInterviewRequestBody,
  InterviewStatus,
  InterviewWithQuestions,
  SubmitInterviewRequestBody,
  InterviewSubmissionResult,
  InterviewWithStats,
} from "./interview-types";
import { mcqQuestionService } from "../mcq/mcq-question/mcq-question.service";
import { DifficultyLevel } from "../coding/coding-question/codingQuestion-types";
import { codeSubmissionService } from "../coding/code-submission/codeSubmission.service";
import { mcqAnswerService } from "../mcq/mcq-answer/mcq-answer.service";
import { isNil } from "../common/utils";
import { aiService } from "../ai/ai.service";
import { testCaseResultService } from "../coding/test-case-result/testCaseResult.service";
import { AssessmentResults } from "../ai/types";
import cron from "node-cron";

const interviewRepository = () => {
  return AppDataSource.getRepository(InterviewEntity);
};

const MODEL_NAME = "gemini-2.5-flash";

export const interviewService = {
  async getByUserId(userId: string): Promise<Interview[]> {
    return await interviewRepository().find({
      where: { userId, isActive: true },
      order: { startTime: "DESC" },
    });
  },

  async getCompletedByUserId(userId: string): Promise<InterviewWithStats[]> {
    const interviews = await interviewRepository().find({
      where: { userId, isActive: true, status: InterviewStatus.COMPLETED },
      order: { startTime: "DESC" },
    });

    const interviewsWithStats = await Promise.all(
      interviews.map(async (interview) => {
        const questions =
          await interviewQuestionService.getByInterviewIdWithDetails(
            interview.id
          );

        const questionCount = questions.length;

        const allTags = questions.flatMap((q) => q.questionDetails?.tags || []);
        const uniqueTags = [...new Set(allTags)];

        return {
          ...interview,
          questionCount,
          uniqueTags,
        } as InterviewWithStats;
      })
    );

    return interviewsWithStats;
  },

  async getByStatus(status: InterviewStatus): Promise<Interview[]> {
    return await interviewRepository().find({
      where: { status, isActive: true },
      order: { startTime: "ASC" },
    });
  },

  async get(id: string): Promise<Interview> {
    const interview = await interviewRepository().findOne({
      where: { id },
    });

    if (isNil(interview)) {
      throw new Error("Interview not found");
    }

    return interview;
  },

  async getWithQuestions(id: string): Promise<InterviewWithQuestions> {
    const interview = await interviewRepository().findOne({
      where: { id },
      relations: ["answers", "codeSubmissions"],
    });

    if (isNil(interview)) {
      throw new Error("Interview not found");
    }

    // Get interview questions with full details
    const questionsWithDetails =
      await interviewQuestionService.getByInterviewIdWithDetails(id);

    return {
      ...interview,
      interviewQuestions: questionsWithDetails,
    };
  },

  async list(userId: string): Promise<Interview[]> {
    const whereCondition: any = { isActive: true };
    whereCondition.userId = userId;

    return await interviewRepository().find({
      where: whereCondition,
      order: { startTime: "DESC" },
    });
  },

  async listUpcoming(userId: string): Promise<Interview[]> {
    return await interviewRepository().find({
      where: {
        userId,
        status: InterviewStatus.SCHEDULED,
        startTime: MoreThan(new Date().toISOString()),
        isActive: true,
      },
      order: { startTime: "ASC" },
    });
  },

  async update(
    id: string,
    request: UpdateInterviewRequestBody
  ): Promise<Interview> {
    const interview = await interviewRepository().findOne({
      where: { id },
    });

    if (isNil(interview)) {
      throw new Error("Interview not found");
    }

    const updatedInterview = interviewRepository().merge(interview, request);
    return await interviewRepository().save(updatedInterview);
  },

  async startInterview(id: string): Promise<InterviewWithQuestions> {
    const interview = await interviewRepository().findOne({
      where: { id },
    });

    if (isNil(interview)) {
      throw new Error("Interview not found");
    }

    if (interview.status !== InterviewStatus.SCHEDULED) {
      throw new Error("Interview cannot be started");
    }

    await interviewRepository().save({
      ...interview,
      status: InterviewStatus.IN_PROGRESS,
      startTime: new Date().toISOString(),
    });

    return this.getWithQuestions(id);
  },

  async calculateScore(id: string): Promise<Interview> {
    const interview = await interviewRepository().findOne({
      where: { id },
    });

    if (isNil(interview)) {
      throw new Error("Interview not found");
    }

    // Calculate MCQ score
    const mcqScore =
      interview.answers?.reduce((total: number, answer: McqAnswer) => {
        return total + (answer.isCorrect ? 1 : 0);
      }, 0) || 0;

    const codingScore =
      interview.codeSubmissions?.reduce(
        (total: number, submission: CodeSubmissionWithResults) => {
          const passedTests =
            submission.testCaseResults?.filter((result) => result.passed)
              .length || 0;
          return total + passedTests;
        },
        0
      ) || 0;

    const totalScore = mcqScore + codingScore;
    const maxScore =
      (interview.answers?.length || 0) +
      (interview.codeSubmissions?.length || 0) * 10;

    interview.totalScore = totalScore;
    interview.maxScore = maxScore;
    interview.isPassed = totalScore >= maxScore * 0.6; // 60% pass rate

    return await interviewRepository().save(interview);
  },

  async delete(id: string): Promise<boolean> {
    const interview = await interviewRepository().findOne({
      where: { id },
    });

    if (isNil(interview)) {
      throw new Error("Interview not found");
    }

    interview.isActive = false;
    await interviewRepository().save(interview);
    return true;
  },

  async create(request: CreateInterviewRequestBody): Promise<Interview> {
    const aiAnalysis = await aiService.analyzeJobDescription(
      request.jobDescription,
      MODEL_NAME,
      5
    );

    console.log(aiAnalysis);

    const mcqRequirements = aiAnalysis.mcqAllocation.allocations
      ? Object.entries(aiAnalysis.mcqAllocation.allocations).map(
          ([skill, count]: [string, any]) => ({
            tag: skill,
            count: Number(count),
          })
        )
      : [];

    const codingDifficulties = aiAnalysis.codingDifficulty.difficulties;

    const interview = interviewRepository().create({
      id: apId(),
      ...request,
      status: InterviewStatus.SCHEDULED,
      isActive: true,
      jobTitle: aiAnalysis.jobTitle,
    });

    await interviewRepository().save(interview);

    // Generate MCQ questions based on AI analysis
    let questionOrder = 1;

    // Convert array of tag requirements to the expected format
    const tagCounts: { [tag: string]: number } = {};
    for (const tagRequirement of mcqRequirements) {
      tagCounts[tagRequirement.tag.toLowerCase()] = tagRequirement.count;
    }

    const mcqQuestions = await mcqQuestionService.getRandomByTagsAndCount(
      tagCounts
    );

    for (const mcqQuestion of mcqQuestions) {
      await interviewQuestionService.create({
        interviewId: interview.id,
        questionType: QuestionType.MCQ,
        questionId: mcqQuestion.id,
        questionOrder: questionOrder++,
      });
    }

    for (const difficulty of codingDifficulties) {
      const codingQuestions =
        await codingQuestionService.getRandomByDifficultyAndCount(
          difficulty as DifficultyLevel,
          1
        );

      for (const codingQuestion of codingQuestions) {
        await interviewQuestionService.create({
          interviewId: interview.id,
          questionType: QuestionType.CODING,
          questionId: codingQuestion.id,
          questionOrder: questionOrder++,
        });
      }
    }

    return interview;
  },

  async submitInterview(
    interviewId: string
  ): Promise<InterviewSubmissionResult> {
    const interview = await interviewService.get(interviewId);
    if (!interview) {
      throw new Error(`Interview not found: ${interviewId}`);
    }

    const currentTime = new Date();
    const interviewEndTime = new Date(interview.startTime);
    interviewEndTime.setMinutes(
      interviewEndTime.getMinutes() + interview.timeLimit
    );

    if (currentTime > interviewEndTime) {
      throw new Error(
        `Interview time has expired. Cannot submit after ${interviewEndTime.toISOString()}`
      );
    }

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const mcqAnswers = await mcqAnswerService.getByInterviewId(interviewId);

      let totalCorrect = 0;
      let totalMcqTimeSpent = 0;
      let totalPoints = 0;
      let maxPoints = 0;

      for (const mcqAnswer of mcqAnswers) {
        const mcqQuestion = await mcqQuestionService.get(mcqAnswer.questionId);
        if (!mcqQuestion) {
          throw new Error(`MCQ Question not found: ${mcqAnswer.questionId}`);
        }

        const questionPoints = mcqQuestion.points || 1;
        maxPoints += questionPoints;

        if (mcqAnswer.isCorrect) {
          totalCorrect++;
          totalPoints += questionPoints;
        }

        totalMcqTimeSpent += mcqAnswer.timeSpent || 0;
      }

      const codeSubmissionsWithResults: CodeSubmission[] =
        await codeSubmissionService.getByInterviewId(interviewId);

      const codeScore = await interviewService.calculateCodeScore(
        codeSubmissionsWithResults
      );

      const mcqPercentage = maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;
      const totalScore = (mcqPercentage + codeScore) / 2;

      const updatedInterview = await interviewRepository().save({
        ...interview,
        status: InterviewStatus.COMPLETED,
        endTime: new Date().toISOString(),
        answers: mcqAnswers,
        totalScore,
        maxScore: 100,
      });

      const mcqSummary: McqAnswerSummary = {
        totalQuestions: mcqAnswers.length,
        correctAnswers: totalCorrect,
        totalPoints,
        maxPoints,
        percentage: mcqPercentage,
        totalTimeSpent: totalMcqTimeSpent,
        answers: mcqAnswers,
      };

      const interviewWithQuestions = await interviewService.getWithQuestions(
        interviewId
      );

      const totalUniqueQuestions =
        await interviewQuestionService.countByInterviewId(interviewId);

      const assessmentData: AssessmentResults = {
        total_questions: totalUniqueQuestions,
        overall_score: totalScore,
        mcq_score: mcqPercentage,
        problem_solving_score: codeScore,
        mcq_questions: mcqAnswers.map((answer) => {
          const questionDetails =
            interviewWithQuestions?.interviewQuestions.find(
              (q) => q.questionId === answer.questionId
            )?.questionDetails;

          return {
            type: "mcq" as const,
            tags: questionDetails?.tags || [],
            is_correct: answer.isCorrect,
          };
        }),
        problem_solving_questions: codeSubmissionsWithResults.map(
          (submission) => {
            const questionDetails =
              interviewWithQuestions?.interviewQuestions.find(
                (q) => q.questionId === submission.questionId
              )?.questionDetails;

            return {
              type: "problem_solving" as const,
              tags: questionDetails?.tags || [],
              tests_passed: submission.score,
              total_tests: submission.totalTests,
            };
          }
        ),
      };

      let feedback = null;
      try {
        feedback = await aiService.getFeedback(assessmentData, MODEL_NAME);
      } catch (error) {
        console.error("Failed to get AI feedback:", error);
      }

      updatedInterview.feedback = feedback;
      await interviewRepository().save(updatedInterview);

      const result: InterviewSubmissionResult = {
        interviewId,
        status: InterviewStatus.COMPLETED,
        mcqSummary,
        codeSubmissions: codeSubmissionsWithResults,
        totalScore,
        submittedAt: new Date().toISOString(),
        feedback,
      };

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  },

  async calculateCodeScore(submissions: CodeSubmission[]): Promise<number> {
    if (!submissions || submissions.length === 0) {
      return 0;
    }

    const questionScores = new Map<string, number>();

    for (const submission of submissions) {
      const testCaseResults = await testCaseResultService.getByCodeSubmissionId(
        submission.id
      );
      const passedTests =
        testCaseResults?.filter((result) => result.passed).length || 0;
      const totalTests = testCaseResults?.length || 0;

      const submissionScore =
        totalTests > 0 ? (passedTests / totalTests) * 100 : 0;

      const currentBest = questionScores.get(submission.questionId) || 0;
      if (submissionScore > currentBest) {
        questionScores.set(submission.questionId, submissionScore);
      }
    }

    const totalQuestions = questionScores.size;
    if (totalQuestions === 0) {
      return 0;
    }

    const totalScore = Array.from(questionScores.values()).reduce(
      (sum, score) => sum + score,
      0
    );
    return totalScore / totalQuestions;
  },

  async checkAndSubmitExpiredInterviews(): Promise<void> {
    const now = new Date();

    const activeInterviews = await interviewRepository().find({
      where: {
        status: InterviewStatus.IN_PROGRESS,
        isActive: true,
      },
    });

    for (const interview of activeInterviews) {
      const startTime = new Date(interview.startTime);
      const expiryTime = new Date(startTime.getTime() + interview.timeLimit);

      if (now > expiryTime) {
        await this.submitInterview(interview.id);
      }
    }
  },

  initializeScheduler(): void {
    cron.schedule("* * * * *", async () => {
      try {
        await this.checkAndSubmitExpiredInterviews();
      } catch (error) {
        console.error("Error checking expired interviews:", error);
      }
    });

    console.log("Interview expiry scheduler initialized");
  },
};
