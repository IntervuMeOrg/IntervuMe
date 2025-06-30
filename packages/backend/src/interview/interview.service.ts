import { Repository, MoreThan } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { InterviewEntitySchema, InterviewEntity } from "./interview.entity";
import {
  Interview,
  CreateInterviewRequestBody,
  UpdateInterviewRequestBody,
  Status,
} from "./interview-types";
import { apId } from "../common/id-generator";
//import { aiService } from "../ai/ai.service";
import { codingQuestionService } from "../coding/codingQuestion/codingQuestion.service";
import { interviewQuestionService } from "../interview/interviewQuestion/interviewQuestion.service";
import { QuestionTypes } from "../interview/interviewQuestion/interviewQuestion-types";
import { McqAnswer } from "../mcq/mcq-answer/mcq-answer-types";
import { CodeSubmissionSchema } from "../coding/codeSubmission/codeSubmission-types";
import { CodeSubmissionEntity } from "../coding/codeSubmission/codeSubmission.entity";

const InterviewRepository = () => {
  return AppDataSource.getRepository(InterviewEntitySchema);
};

export const interviewService = {
  // TODO
  // async create(request: CreateInterviewRequestBody): Promise<Interview> {
  //   const aiAnalysis = await aiService.analyzeJobDescription(
  //     request.jobDescription
  //   );

  //   const interview = InterviewRepository().create({
  //     id: apId(),
  //     ...request,
  //     status: Status.SCHEDULED,
  //     isActive: true,
  //   });

  //   const savedInterview = InterviewRepository().save(interview);

  //   // Generate MCQ questions based on AI analysis
  //   let questionOrder = 1;
  //   for (const tagRequirement of aiAnalysis.mcqRequirements) {
  //     const mcqQuestions = await mcqQuestionService.getRandomByTagAndCount(
  //       tagRequirement.tag,
  //       tagRequirement.count
  //     );

  //     for (const mcqQuestion of mcqQuestions) {
  //       await interviewQuestionService.create({
  //         interviewId: interview.id,
  //         questionType: QuestionTypes.MCQ,
  //         questionId: mcqQuestion.id,
  //         questionOrder: questionOrder++,
  //       });
  //     }
  //   }

    
  //   const codingQuestions = await codingQuestionService.getRandomByDifficulties(
  //     aiAnalysis.codingRequirements
  //   );

  //   for (const codingQuestion of codingQuestions) {
  //     await interviewQuestionService.create({
  //       interviewId: interview.id,
  //       questionType: QuestionTypes.CODING,
  //       questionId: codingQuestion.id,
  //       questionOrder: questionOrder++,
  //     });
  //   }

  //   return savedInterview;
  // },

  async getById(id: string): Promise<Interview | null> {
    const interview = await InterviewRepository().findOne({
      where: { id },
    });

    if (!interview) throw new Error("Interview not found");
    return interview;
  },

  async getByIdWithQuestions(id: string): Promise<InterviewEntity | null> {
    const interview = await InterviewRepository().findOne({
      where: { id },
      relations: ["interviewQuestions"],
    });

    if (!interview) throw new Error("Interview not found");
    return interview;
  },

  async getByUserId(userId: string): Promise<Interview[]> {
    return await InterviewRepository().find({
      where: { userId, isActive: true },
      order: { startTime: "DESC" },
    });
  },

  async getByStatus(status: Status): Promise<Interview[]> {
    return await InterviewRepository().find({
      where: { status, isActive: true },
      order: { startTime: "ASC" },
    });
  },

  async update(
    id: string,
    request: UpdateInterviewRequestBody
  ): Promise<Interview | null> {
    const interview = await InterviewRepository().findOne({
      where: { id },
    });

    if (!interview) {
      throw new Error("Interview not found");
    }

    const updatedInterview = InterviewRepository().merge(interview, request);
    return await InterviewRepository().save(updatedInterview);
  },

  async startInterview(id: string): Promise<Interview | null> {
    const interview = await InterviewRepository().findOne({
      where: { id },
    });

    if (!interview) {
      throw new Error("Interview not found");
    }

    if (interview.status !== Status.SCHEDULED) {
      throw new Error("Interview cannot be started");
    }

    interview.status = Status.IN_PROGRESS;
    interview.startTime = new Date().toISOString();

    return await InterviewRepository().save(interview);
  },

  async endInterview(id: string): Promise<Interview | null> {
    const interview = await InterviewRepository().findOne({
      where: { id },
    });

    if (!interview) {
      throw new Error("Interview not found");
    }

    if (interview.status !== Status.IN_PROGRESS) {
      throw new Error("Interview is not in progress");
    }

    interview.status = Status.COMPLETED;
    interview.endTime = new Date().toISOString();

    return await InterviewRepository().save(interview);
  },

  async calculateScore(id: string): Promise<Interview | null> {
    const interview = await InterviewRepository().findOne({
      where: { id },
      relations: ["answers", "codeSubmissions"],
    });

    if (!interview) {
      throw new Error("Interview not found");
    }

    // Calculate MCQ score
    const mcqScore =
      interview.answers?.reduce((total: any, answer: McqAnswer) => {
        return total + (answer.isCorrect ? 1 : 0);
      }, 0) || 0;

    
    const codingScore =
      interview.codeSubmissions?.reduce((total: any, submission: CodeSubmissionEntity) => {
          const passedTests = submission.testCaseResults?.filter(result => result.passed).length || 0;          
        return total + passedTests;
      }, 0) || 0;

    const totalScore = mcqScore + codingScore;
    const maxScore =
      (interview.answers?.length || 0) +
      (interview.codeSubmissions?.length || 0) * 10; // Adjust

    interview.totalScore = totalScore;
    interview.maxScore = maxScore;
    interview.isPassed = totalScore >= maxScore * 0.6; // 60% pass rate

    return await InterviewRepository().save(interview);
  },

  async delete(id: string): Promise<boolean> {
    const interview = await InterviewRepository().findOne({
      where: { id },
    });

    if (!interview) {
      throw new Error("Interview not found");
    }

    interview.isActive = false;
    await InterviewRepository().save(interview);
    return true;
  },

  async getInterviewsWithResults(userId?: string): Promise<InterviewEntity[]> {
    const whereCondition: any = { isActive: true };
    if (userId) {
      whereCondition.userId = userId;
    }

    return await InterviewRepository().find({
      where: whereCondition,
      relations: ["interviewQuestions", "answers", "codeSubmissions"],
      order: { startTime: "DESC" },
    });
  },

  async getUpcomingInterviews(userId: string): Promise<Interview[]> {
    return await InterviewRepository().find({
      where: {
        userId,
        status: Status.SCHEDULED,
        startTime: MoreThan(new Date().toISOString()),
        isActive: true,
      },
      order: { startTime: "ASC" },
    });
  },
};
