import { AppDataSource } from "../../database/data-source";
import { apId } from "../../common/id-generator";
import { InterviewQuestionEntity } from "./interview-question.entity";
import {
  CreateInterviewQuestionRequestBody,
  InterviewQuestion,
  UpdateInterviewQuestionRequestBody,
  InterviewQuestionWithDetails,
} from "./interview-question-types";
import { codingQuestionService } from "../../coding/coding-question/codingQuestion.service";
import { mcqQuestionService } from "../../mcq/mcq-question/mcq-question.service";
import { isNil } from "../../common/utils";

const InterviewQuestionRepository = () => {
  return AppDataSource.getRepository(InterviewQuestionEntity);
};

export const interviewQuestionService = {
  async create(
    request: CreateInterviewQuestionRequestBody
  ): Promise<InterviewQuestion> {
    const interviewQuestion = InterviewQuestionRepository().create({
      id: apId(),
      ...request,
    });

    return await InterviewQuestionRepository().save(interviewQuestion);
  },

  async get(id: string): Promise<InterviewQuestion> {
    const interviewQuestion = await InterviewQuestionRepository().findOne({
      where: { id },
      //relations: ['interview']
    });

    if (isNil(interviewQuestion)) {
      throw new Error("Interview Question not found");
    }

    return interviewQuestion;
  },

  async getByInterviewIdandQuestionId(
    interviewId: string,
    questionId: string
  ): Promise<InterviewQuestion | null> {
    const interviewQuestion = await InterviewQuestionRepository().findOne({
      where: { interviewId, questionId },
    });

    if (isNil(interviewQuestion)) {
      throw new Error("Interview Question not found");
    }

    return interviewQuestion;
  },

  async getWithDetails(id: string): Promise<InterviewQuestionWithDetails> {
    const interviewQuestion = await this.get(id);

    if (isNil(interviewQuestion)) {
      throw new Error("Interview Question not found");
    }

    let questionDetails;
    if (interviewQuestion.questionType === "mcq") {
      questionDetails = await mcqQuestionService.get(
        interviewQuestion.questionId
      );

      if (isNil(questionDetails)) {
        throw new Error("Mcq details not found");
      }
    } else if (interviewQuestion.questionType === "coding") {
      questionDetails = await codingQuestionService.get(
        interviewQuestion.questionId
      );

      if (isNil(questionDetails)) {
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

  async getByInterviewId(interviewId: string): Promise<InterviewQuestion[]> {
    const interviewQuestions = await InterviewQuestionRepository().find({
      where: { interviewId },
      order: { questionOrder: "ASC" },
    });

    if (isNil(interviewQuestions)) {
      throw new Error("Doesn't exist");
    }

    return interviewQuestions;
  },

  async getByInterviewIdWithDetails(
    interviewId: string
  ): Promise<InterviewQuestionWithDetails[]> {
    const interviewQuestions = await this.getByInterviewId(interviewId);

    const questionsWithDetails: InterviewQuestionWithDetails[] =
      await Promise.all(
        interviewQuestions.map(async (iq) => {
          let questionDetails;
          if (iq.questionType === "mcq") {
            const details = await mcqQuestionService.get(iq.questionId);

            if (isNil(details))
              throw new Error(`Mcq details not found for ${iq.questionId}`);

            questionDetails = details;
          } else {
            const details = await codingQuestionService.get(iq.questionId);

            if (isNil(details))
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
    updates: UpdateInterviewQuestionRequestBody
  ): Promise<InterviewQuestion> {
    const interviewQuestion = await InterviewQuestionRepository().findOne({
      where: { id },
    });

    if (isNil(interviewQuestion)) {
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

    if (isNil(interviewQuestion)) {
      throw new Error("Interview Question not found");
    }

    await InterviewQuestionRepository().remove(interviewQuestion);
  },

  async countByInterviewId(interviewId: string): Promise<number> {
    return await InterviewQuestionRepository().count({
      where: { interviewId },
    });
  },
};
