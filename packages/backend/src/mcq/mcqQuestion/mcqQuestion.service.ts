import { text } from "stream/consumers";
import { apId } from "../../common/id-generator";
import { AppDataSource } from "../../database/data-source";
import {
  CreateMcqQuestionRequestBody,
  DifficultyLevel,
  McqQuestion,
  UpdateMcqQuestionRequestBody,
} from "./mcqQuestion-types";
import { McqQuestionEntity } from "./mcqQuestion.entity";
import { McqOptionEntity } from "../mcq-option/mcq-option.entity";

const McqQuestionRepository = () => {
  return AppDataSource.getRepository(McqQuestionEntity);
};

export const McqQuestionService = {
  async create(request: CreateMcqQuestionRequestBody): Promise<McqQuestion> {
    const { options, ...questionFields } = request;

    const normalizedOptions = options.map(({ optionText, isCorrect }) => ({
      id: apId(),
      optionText,
      isCorrect,
    }));

    const question = McqQuestionRepository().create({
      id: apId(),
      ...questionFields,
      difficulty: questionFields.difficulty || DifficultyLevel.MEDIUM,
      options: normalizedOptions,
    });

    return await McqQuestionRepository().save(question);
  },

  async getById(id: string): Promise<McqQuestion | null> {
    const question = await McqQuestionRepository().findOne({ where: { id } });
    if (!question) throw new Error("Question not found");

    return question;
  },

  async list(): Promise<Partial<McqQuestion>[]> {
    return await McqQuestionRepository().find({
      select: ["id", "text", "difficulty", "allowMultiple", "explanation"],
    });
  },

  async update(
    id: string,
    updates: UpdateMcqQuestionRequestBody
  ): Promise<McqQuestion> {
    const questionRepo = McqQuestionRepository();
    const optionRepo = AppDataSource.getRepository(McqOptionEntity);

    const question = await questionRepo.findOne({ where: { id } });
    if (!question) {
      throw new Error("Question not found");
    }

    const { options, ...questionFields } = updates;

    if (options) {
      await optionRepo.delete({ mcqQuestionId: id });

      const normalizedOptions = options.map(({ optionText, isCorrect }) => ({
        id: apId(),
        optionText,
        isCorrect,
      }));

      const updatedQuestion = questionRepo.create({
        ...question,
        ...questionFields,
        difficulty: questionFields.difficulty ?? question.difficulty,
        updated: new Date().toISOString(),
        options: normalizedOptions,
      });

      return await questionRepo.save(updatedQuestion);
    }

    Object.assign(question, questionFields, {
      difficulty: questionFields.difficulty ?? question.difficulty,
      updated: new Date().toISOString(),
    });

    return await questionRepo.save(question);
  },

  async delete(id: string): Promise<void> {
    const question = await McqQuestionRepository().findOne({
      where: { id },
    });

    if (!question) {
      throw new Error("Question not found");
    }

    await McqQuestionRepository().remove(question);
  },
};
