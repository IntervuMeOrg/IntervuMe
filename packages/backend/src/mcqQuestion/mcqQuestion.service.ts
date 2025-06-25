import { text } from "stream/consumers";
import { apId } from "../common/id-generator";
import { AppDataSource } from "../database/data-source";
import {
  CreateMCQQuestionSchema,
  DifficultyLevel,
  MCQQuestionSchema,
  UpdateMCQQuestionSchema,
} from "./mcqQuestion-types";
import { MCQQuestionEntity } from "./mcqQuestion.entity";
import { MCQOptionEntity } from "../mcqOption/mcqOption.entity";

const mcqQuestionRepository = () => {
  return AppDataSource.getRepository(MCQQuestionEntity);
};

export const mcqQuestionService = {
  async create(request: CreateMCQQuestionSchema): Promise<MCQQuestionSchema> {
    const { options, ...questionFields } = request;

    const normalizedOptions = options.map(({ optionText, isCorrect }) => ({
      id: apId(),
      optionText,
      isCorrect,
    }));

    const question = mcqQuestionRepository().create({
      id: apId(),
      ...questionFields,
      difficulty: questionFields.difficulty || DifficultyLevel.MEDIUM,
      options: normalizedOptions,
    });

    return await mcqQuestionRepository().save(question);
  },

  async getById(id: string): Promise<MCQQuestionSchema | null> {
    const question = await mcqQuestionRepository().findOne({ where: { id } });
    if (!question) throw new Error("Question not found");

    return question;
  },

  async list(): Promise<Partial<MCQQuestionSchema>[]> {
    return await mcqQuestionRepository().find({
      select: ["id", "text", "difficulty", "allowMultiple", "explanation"],
    });
  },

  async update(
    id: string,
    updates: UpdateMCQQuestionSchema
  ): Promise<MCQQuestionSchema> {
    const questionRepo = mcqQuestionRepository();
    const optionRepo = AppDataSource.getRepository(MCQOptionEntity);

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
    const question = await mcqQuestionRepository().findOne({
      where: { id },
    });

    if (!question) {
      throw new Error("Question not found");
    }

    await mcqQuestionRepository().remove(question);
  },
};
