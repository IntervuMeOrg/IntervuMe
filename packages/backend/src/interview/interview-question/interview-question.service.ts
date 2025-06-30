import { AppDataSource } from "../../database/data-source";
import { apId } from "../../common/id-generator";
import { InterviewQuestionEntitySchema } from "./interview-question.entity";
import {
  CreateInterviewQuestionRequestBody,
  InterviewQuestion,
  UpdateInterviewQuestionRequestBody,
  InterviewQuestionWithDetailsRequestBody,
} from "./interview-question-types";
import { McqQuestionService } from "../McqQuestion/McqQuestion.service";
import { codingQuestionService } from "../codingQuestion/codingQuestion.service";
import { CodingQuestionSchema } from "../codingQuestion/codingQuestion-types";
import { McqQuestionSchema } from "../McqQuestion/McqQuestion-types";

const InterviewQuestionRepository = () => {
  return AppDataSource.getRepository(InterviewQuestionEntitySchema);
};

export const interviewQuestionService = {
  async create(
    request: CreateInterviewQuestionSchema
  ): Promise<InterviewQuestionSchema> {
    const interviewQuestion = InterviewQuestionRepository().create({
      id: apId(),
      ...request,
    });

    return await InterviewQuestionRepository().save(interviewQuestion);
  },

  async getById(id: string): Promise<InterviewQuestionSchema | null> {
    const interviewQuestion = await InterviewQuestionRepository().findOne({
      where: { id },
      //relations: ['interview']
    });

    if (!interviewQuestion) {
      throw new Error("Interview Question not found");
    }

    return interviewQuestion;
  },

  async getByIdWithDetails(
    id: string
  ): Promise<InterviewQuestionWithDetailsSchema | null> {
    const interviewQuestion = await this.getById(id);

    if (!interviewQuestion) {
      return null;
    }

    let questionDetails;
    if (interviewQuestion.questionType === "Mcq") {
      questionDetails = await McqQuestionService.getById(
        interviewQuestion.questionId
      );

      if (!questionDetails) {
        throw new Error("Mcq details not found");
      }
    } else if (interviewQuestion.questionType === "coding") {
      questionDetails = await codingQuestionService.getById(
        interviewQuestion.questionId
      );

      if (!questionDetails) {
        throw new Error("Coding question details not found");
      }
    } else {
      throw new Error("Unknown question type");
    }

    return {
      ...interviewQuestion,
      questionDetails,
    };
  },

  async getByInterviewId(
    interviewId: string
  ): Promise<InterviewQuestionSchema[]> {
    const interviewQuestions = await InterviewQuestionRepository().find({
      where: { interviewId },
      order: { questionOrder: "ASC" },
    });

    if (!interviewQuestions) {
      throw new Error("Doesn't exist");
    }

    return interviewQuestions;
  },

  async getByInterviewIdWithDetails(
    interviewId: string
  ): Promise<InterviewQuestionWithDetailsSchema[]> {
    const interviewQuestions = await this.getByInterviewId(interviewId);

    const questionsWithDetails: InterviewQuestionWithDetailsSchema[] =
      await Promise.all(
        interviewQuestions.map(async (iq) => {
          let questionDetails;
          if (iq.questionType === "Mcq") {
            const details = await McqQuestionService.getById(iq.questionId);

            if (!details)
              throw new Error(`Mcq details not found for ${iq.questionId}`);

            questionDetails = details;
          } else {
            const details = await codingQuestionService.getById(iq.questionId);

            if (!details)
              throw new Error(`Coding details not found for ${iq.questionId}`);

            questionDetails = details;
          }
          return { ...iq, questionDetails };
        })
      );

    return questionsWithDetails;
  },

  async update(
    id: string,
    updates: UpdateInterviewQuestionSchema
  ): Promise<InterviewQuestionSchema | null> {
    const interviewQuestion = await InterviewQuestionRepository().findOne({
      where: { id },
    });

    if (!interviewQuestion) {
      throw new Error("Interview Question not found");
    }

    Object.assign(interviewQuestion, updates, {
      updatedAt: new Date().toISOString(),
    });
    return await InterviewQuestionRepository().save(interviewQuestion);
  },

  async delete(id: string): Promise<void> {
    const interviewQuestion = await InterviewQuestionRepository().findOne({
      where: { id },
    });

    if (!interviewQuestion) {
      throw new Error("Interview Question not found");
    }

    await InterviewQuestionRepository().remove(interviewQuestion);
  },
};
