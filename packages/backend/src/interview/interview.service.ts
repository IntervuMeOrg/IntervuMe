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
import { CodeSubmissionWithResults } from "../coding/code-submission/code-submission-types";
import {
  Interview,
  CreateInterviewRequestBody,
  UpdateInterviewRequestBody,
  InterviewStatus,
  InterviewSession,
  SubmitInterviewRequestBody,
  InterviewSubmissionResult,
} from "./interview-types";
import { mcqQuestionService } from "../mcq/mcq-question/mcq-question.service";
import { DifficultyLevel } from "../coding/coding-question/codingQuestion-types";
import { codeSubmissionService } from "../coding/code-submission/codeSubmission.service";
import { TestCaseResult, Verdict } from "../coding/test-case-result/testCaseResult-types";
import { mcqAnswerService } from "../mcq/mcq-answer/mcq-answer.service";
import { isNil } from '../common/utils';

const InterviewRepository = () => {
  return AppDataSource.getRepository(InterviewEntity);
};

export const interviewService = {
  async getByUserId(userId: string): Promise<InterviewSession[]> {
    return await InterviewRepository().find({
      where: { userId, isActive: true },
      order: { startTime: "DESC" },
      relations: ["interviewQuestions", "answers", "codeSubmissions"],
    });
  },

  async getByStatus(status: InterviewStatus): Promise<InterviewSession[]> {
    return await InterviewRepository().find({
      where: { status, isActive: true },
      order: { startTime: "ASC" },
      relations: ["interviewQuestions", "answers", "codeSubmissions"],
    });
  },

  async get(id: string): Promise<InterviewSession> {
    const interview = await InterviewRepository().findOne({
      where: { id },
      relations: ["interviewQuestions", "answers", "codeSubmissions"],
    });

    if (isNil(interview)) {
      throw new Error("Interview not found");
    }

    return interview;
  },

  async list(userId: string): Promise<InterviewSession[]> {
    const whereCondition: any = { isActive: true };
    whereCondition.userId = userId;

    return await InterviewRepository().find({
      where: whereCondition,
      relations: ["interviewQuestions", "answers", "codeSubmissions"],
      order: { startTime: "DESC" },
    });
  },

  async listUpcoming(userId: string): Promise<InterviewSession[]> {
    return await InterviewRepository().find({
      where: {
        userId,
        status: InterviewStatus.SCHEDULED,
        startTime: MoreThan(new Date().toISOString()),
        isActive: true,
      },
      relations: ["interviewQuestions", "answers", "codeSubmissions"],
      order: { startTime: "ASC" },
    });
  },

  async update(id: string, request: UpdateInterviewRequestBody): Promise<InterviewSession> {
    const interview = await InterviewRepository().findOne({
      where: { id },
      relations: ["interviewQuestions", "answers", "codeSubmissions"],
    });

    if (isNil(interview)) {
      throw new Error("Interview not found");
    }

    const updatedInterview = InterviewRepository().merge(interview, request);
    return await InterviewRepository().save(updatedInterview);
  },

  async startInterview(id: string): Promise<InterviewSession> {
    const interview = await InterviewRepository().findOne({
      where: { id },
      relations: ["interviewQuestions", "answers", "codeSubmissions"],
    });

    if (isNil(interview)) {
      throw new Error("Interview not found");
    }

    if (interview.status !== InterviewStatus.SCHEDULED) {
      throw new Error("Interview cannot be started");
    }

    interview.status = InterviewStatus.IN_PROGRESS;
    interview.startTime = new Date().toISOString();

    return await InterviewRepository().save(interview);
  },

  async calculateScore(id: string): Promise<InterviewSession> {
    const interview = await InterviewRepository().findOne({
      where: { id },
      relations: ["interviewQuestions", "answers", "codeSubmissions"],
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

    return await InterviewRepository().save(interview);
  },

  async delete(id: string): Promise<boolean> {
    const interview = await InterviewRepository().findOne({
      where: { id },
      relations: ["interviewQuestions", "answers", "codeSubmissions"],
    });

    if (isNil(interview)) {
      throw new Error("Interview not found");
    }

    interview.isActive = false;
    await InterviewRepository().save(interview);
    return true;
  },

  async create(request: CreateInterviewRequestBody): Promise<Interview> {
    // Placeholder AI analysis - replace with actual aiService.analyzeJobDescription later
    const aiAnalysis = {
      mcqRequirements: [
        { tag: "javascript", count: 1 },
        { tag: "react", count: 1 },
        { tag: "nodejs", count: 1 },
      ],
      codingRequirements: "medium" as DifficultyLevel,
    };

    const interview = InterviewRepository().create({
      id: apId(),
      ...request,
      status: InterviewStatus.SCHEDULED,
      isActive: true,
    });

    await InterviewRepository().save(interview);

    // Generate MCQ questions based on AI analysis
    let questionOrder = 1;

    // Convert array of tag requirements to the expected format
    const tagCounts: { [tag: string]: number } = {};
    for (const tagRequirement of aiAnalysis.mcqRequirements) {
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

        const questionPoints = 1;
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

      const codeSubmissionsWithResults: CodeSubmissionWithResults[] = [];

      for (const codeSubmissionData of submissionData.codeSubmissions) {
        const codeSubmission = await codeSubmissionService.create({
          ...codeSubmissionData,
        });

        // Run test cases (you'll need to implement this)
        const testCaseResults = await this.runTestCases(
          codeSubmissionData.questionId,
          codeSubmissionData.code
        );

        const submissionWithResults: CodeSubmissionWithResults = {
          ...codeSubmission,
          testCaseResults,
        };

        codeSubmissionsWithResults.push(submissionWithResults);
      }

      // Adjust scoring later
      const mcqPercentage = maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;
      const codeScore = this.calculateCodeScore(codeSubmissionsWithResults);
      const totalScore = mcqPercentage + codeScore;

      const interview = await interviewService.get(interviewId);
      if (!interview) {
        throw new Error(`Interview not found: ${interviewId}`);
      }

      const updatedInterview = await InterviewRepository().save({
        ...interview,
        status: InterviewStatus.COMPLETED,
        submittedAt: new Date().toISOString(),
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

  async runTestCases(
    questionId: string,
    code: string
  ): Promise<TestCaseResult[]> {
    // TODO: Call code execution service
    return [
      {
        id: "6E5uzx44lvJPPa5s2VUcW",
        codeSubmissionId: "85pj4vlqD1visW5OPvhwg",
        testCaseId: "6E5uzx44lvJPPa5s2VUcM",
        passed: true,
        verdict: Verdict.PASSED,
        userOutput: "Mock output",
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      },
    ];
  },

  // Placeholder method
  calculateCodeScore(submissions: CodeSubmissionWithResults[]): number {
    return 75.5;
  },
};
