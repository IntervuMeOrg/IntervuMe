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
} from "./interview-types";
import { mcqQuestionService } from "../mcq/mcq-question/mcq-question.service";
import { DifficultyLevel } from "../coding/coding-question/codingQuestion-types";
import { codeSubmissionService } from "../coding/code-submission/codeSubmission.service";
import {
  TestCaseResult,
  Verdict,
} from "../coding/test-case-result/testCaseResult-types";
import { mcqAnswerService } from "../mcq/mcq-answer/mcq-answer.service";
import { isNil } from "../common/utils";
import { testCaseResultService } from "../coding/test-case-result/testCaseResult.service";
import { aiService } from "../ai/ai.service";

const interviewRepository = () => {
  return AppDataSource.getRepository(InterviewEntity);
};

export const interviewService = {
  async getByUserId(userId: string): Promise<Interview[]> {
    return await interviewRepository().find({
      where: { userId, isActive: true },
      order: { startTime: "DESC" },
    });
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
      relations: ["interviewQuestions", "answers", "codeSubmissions"],
    });

    if (isNil(interview)) {
      throw new Error("Interview not found");
    }

    if (interview.status !== InterviewStatus.SCHEDULED) {
      throw new Error("Interview cannot be started");
    }

    const updatedInterview = await interviewRepository().save({
      ...interview,
      status: InterviewStatus.IN_PROGRESS,
      startTime: new Date().toISOString(),
    });

    return this.getWithQuestions(updatedInterview.id);
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
      "deepseek-r1",
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
    });

    await interviewRepository().save(interview);

    // Generate MCQ questions based on AI analysis
    let questionOrder = 1;

    const tagCounts: { [tag: string]: number } = {};
    for (const tagRequirement of mcqRequirements) {
      tagCounts[tagRequirement.tag] = tagRequirement.count;
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

    const codingQuestions =
      await codingQuestionService.getRandomByDifficultyAndCount(
        "medium" as DifficultyLevel,
        2
      );

    for (const codingQuestion of codingQuestions) {
      await interviewQuestionService.create({
        interviewId: interview.id,
        questionType: QuestionType.CODING,
        questionId: codingQuestion.id,
        questionOrder: questionOrder++,
      });
    }

    return interview;
  },

  async submitInterview(
    interviewId: string,
    submissionData: SubmitInterviewRequestBody
  ): Promise<InterviewSubmissionResult> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const mcqAnswers: McqAnswer[] = [];
      let totalCorrect = 0;
      let totalMcqTimeSpent = 0;
      let totalPoints = 0;
      let maxPoints = 0;

      for (const mcqAnswerData of submissionData.mcqAnswers) {
        const mcqQuestion = await mcqQuestionService.get(
          mcqAnswerData.questionId
        );
        if (!mcqQuestion) {
          throw new Error(
            `MCQ Question not found: ${mcqAnswerData.questionId}`
          );
        }

        const interviewQuestion =
          await interviewQuestionService.getByInterviewIdandQuestionId(
            interviewId,
            mcqAnswerData.questionId
          );
        if (!interviewQuestion) {
          throw new Error(
            `MCQ Question not found: ${mcqAnswerData.questionId} in interview: ${interviewId}`
          );
        }

        const correctOption = mcqQuestion.options.find((opt) => opt.isCorrect);
        if (!correctOption) {
          throw new Error(
            `No correct option found for question: ${mcqAnswerData.questionId}`
          );
        }

        const isCorrect = mcqAnswerData.selectedOptionId === correctOption.id;
        const timeSpent = mcqAnswerData.timeSpent || 0;

        const questionPoints = mcqQuestion.points || 1;
        maxPoints += questionPoints;
        if (isCorrect) {
          totalCorrect++;
          totalPoints += questionPoints;
        }
        totalMcqTimeSpent += timeSpent;

        const mcqAnswer = await mcqAnswerService.create({
          ...mcqAnswerData,
          correctOptionId: correctOption.id,
          isCorrect,
          timeSpent,
        });

        mcqAnswers.push(mcqAnswer);
      }

      const codeSubmissionsWithResults: CodeSubmission[] =
        await codeSubmissionService.getByInterviewId(interviewId);

      const codeScore = await interviewService.calculateCodeScore(
        codeSubmissionsWithResults
      );

      const mcqPercentage = maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;
      const totalScore = mcqPercentage + codeScore;

      const interview = await interviewService.get(interviewId);
      if (!interview) {
        throw new Error(`Interview not found: ${interviewId}`);
      }

      const updatedInterview = await interviewRepository().save({
        ...interview,
        status: InterviewStatus.COMPLETED,
        submittedAt: new Date().toISOString(),
        answers: mcqAnswers,
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

      const result: InterviewSubmissionResult = {
        interviewId,
        status: InterviewStatus.COMPLETED,
        mcqSummary,
        codeSubmissions: codeSubmissionsWithResults,
        totalScore,
        submittedAt: new Date().toISOString(),
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
};
