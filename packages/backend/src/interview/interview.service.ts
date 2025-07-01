import { MoreThan } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { InterviewEntity } from "./interview.entity";
import { apId } from "../common/id-generator";
import { codingQuestionService } from "../coding/coding-question/codingQuestion.service";
import { interviewQuestionService } from "../interview/interview-question/interview-question.service";
import { QuestionType } from "../interview/interview-question/interview-question-types";
import { McqAnswer } from "../mcq/mcq-answer/mcq-answer-types";
import { CodeSubmissionWithResults } from "../coding/code-submission/code-submission-types";
import {
  Interview,
  CreateInterviewRequestBody,
  UpdateInterviewRequestBody,
  InterviewStatus,
  InterviewSession,
} from "./interview-types";
import { mcqQuestionService } from "../mcq/mcq-question/mcq-question.service";
import { DifficultyLevel } from "../coding/coding-question/codingQuestion-types";
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

  async endInterview(id: string): Promise<InterviewSession> {
    const interview = await InterviewRepository().findOne({
      where: { id },
      relations: ["interviewQuestions", "answers", "codeSubmissions"],
    });

    if (isNil(interview)) {
      throw new Error("Interview not found");
    }

    if (interview.status !== InterviewStatus.IN_PROGRESS) {
      throw new Error("Interview is not in progress");
    }

    interview.status = InterviewStatus.COMPLETED;
    interview.endTime = new Date().toISOString();

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

async create(request: CreateInterviewRequestBody): Promise<InterviewSession> {
  // Placeholder AI analysis - replace with actual aiService.analyzeJobDescription later
  const aiAnalysis = {
    mcqRequirements: [
      { tag: 'javascript', count: 1 },
      { tag: 'react', count: 1 },
      { tag: 'nodejs', count: 1 }
    ],
    codingRequirements: 'medium' as DifficultyLevel
  };

  const interview = InterviewRepository().create({
    id: apId(),
    ...request,
    status: InterviewStatus.SCHEDULED,
    isActive: true,
    interviewQuestions: [],
    answers: [],
    codeSubmissions: [],
  });

  await InterviewRepository().save(interview);

  // Generate MCQ questions based on AI analysis
  let questionOrder = 1;
  
  // Convert array of tag requirements to the expected format
  const tagCounts: { [tag: string]: number } = {};
  for (const tagRequirement of aiAnalysis.mcqRequirements) {
    tagCounts[tagRequirement.tag] = tagRequirement.count;
  }

  const mcqQuestions = await mcqQuestionService.getRandomByTagsAndCount(tagCounts);

  for (const mcqQuestion of mcqQuestions) {
    await interviewQuestionService.create({
      interviewId: interview.id,
      questionType: QuestionType.MCQ,
      questionId: mcqQuestion.id,
      questionOrder: questionOrder++,
    });
  }

  const codingQuestions = await codingQuestionService.getRandomByDifficultyAndCount(
    'medium' as DifficultyLevel, 2
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
}
};
