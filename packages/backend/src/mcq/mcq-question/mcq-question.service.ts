import { text } from "stream/consumers";
import { apId } from "../../common/id-generator";
import { AppDataSource } from "../../database/data-source";
import {
  CreateMcqQuestionRequestBody,
  DifficultyLevel,
  McqQuestion,
  UpdateMcqQuestionRequestBody,
} from "./mcq-question-types";
import { McqQuestionEntity } from "./mcq-question.entity";
import { McqOptionEntity } from "../mcq-option/mcq-option.entity";

const mcqQuestionRepository = () => {
  return AppDataSource.getRepository(McqQuestionEntity);
};

export const mcqQuestionService = {
  async create(request: CreateMcqQuestionRequestBody): Promise<McqQuestion> {
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

  async getById(id: string): Promise<McqQuestion | null> {
    const question = await mcqQuestionRepository().findOne({ where: { id } });
    if (!question) throw new Error("Question not found");

    return question;
  },

  async list(): Promise<Partial<McqQuestion>[]> {
    return await mcqQuestionRepository().find({
      select: ["id", "text", "difficulty", "allowMultiple", "explanation"],
    });
  },

  async update(
    id: string,
    updates: UpdateMcqQuestionRequestBody
  ): Promise<McqQuestion> {
    const questionRepo = mcqQuestionRepository();
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
    const question = await mcqQuestionRepository().findOne({
      where: { id },
    });

    if (!question) {
      throw new Error("Question not found");
    }

    await mcqQuestionRepository().remove(question);
  },

  async getRandomByTagsAndCount(tagCounts: {
    [tag: string]: number;
  }): Promise<McqQuestion[]> {
    const allQuestions: McqQuestion[] = [];

    for (const [tag, count] of Object.entries(tagCounts)) {
      const questions = await mcqQuestionRepository()
        .createQueryBuilder("mcq")
        .where("mcq.tags && :tags::text[]", { tags: [tag] })
        .orderBy("RANDOM()")
        .take(count)
        .getMany();

      allQuestions.push(...questions);
    }

    return mcqQuestionService.shuffleArray(allQuestions);
  },
  
  shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },
};
