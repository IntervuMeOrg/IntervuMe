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
import { isNil } from "../../common/utils";

const mcqQuestionRepository = () => {
  return AppDataSource.getRepository(McqQuestionEntity);
};

export const mcqQuestionService = {
  async create(request: CreateMcqQuestionRequestBody): Promise<McqQuestion> {
    const { options, tags, ...questionFields } = request;

    const lowercaseTags = tags.map((tag) => tag.toLowerCase());

    const normalizedOptions = options.map(({ optionText, isCorrect }) => ({
      id: apId(),
      optionText,
      isCorrect,
    }));

    const question = mcqQuestionRepository().create({
      id: apId(),
      ...questionFields,
      difficulty: questionFields.difficulty || DifficultyLevel.MID,
      options: normalizedOptions,
      tags: lowercaseTags,
    });

    return await mcqQuestionRepository().save(question);
  },

  async get(id: string): Promise<McqQuestion> {
    const question = await mcqQuestionRepository().findOne({ where: { id } });
    if (isNil(question)) {
      throw new Error("Question not found");
    }

    return question;
  },

  async list(): Promise<McqQuestion[]> {
    return await mcqQuestionRepository().find();
  },

  async update(
    id: string,
    updates: UpdateMcqQuestionRequestBody
  ): Promise<McqQuestion> {
    const questionRepo = mcqQuestionRepository();
    const optionRepo = AppDataSource.getRepository(McqOptionEntity);

    const question = await questionRepo.findOne({ where: { id } });
    if (isNil(question)) {
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

    if (isNil(question)) {
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
        .where("mcq.tags && :tags::varchar[]", { tags: [tag] })
        .orderBy("RANDOM()")
        .take(count)
        .getMany();

      allQuestions.push(...questions);
    }

    return mcqQuestionService.shuffleArray(allQuestions);
  },

  async getRandomByTagsCountDifficulty(
    tagCounts: {
      [tag: string]: number;
    },
    difficulty: string
  ): Promise<McqQuestion[]> {
    const allQuestionsSet = new Set<McqQuestion>();
    const totalRequired = Object.values(tagCounts).reduce(
      (sum, count) => sum + count,
      0
    );

    const difficultyFallbacks: { [key: string]: string[] } = {
      entry: ["mid", "senior"],
      mid: ["entry", "senior"],
      senior: ["mid", "entry"],
    };

    for (const [tag, count] of Object.entries(tagCounts)) {
      let questions: McqQuestion[] = [];
      let remainingCount = count;

      const primaryQuestions = await mcqQuestionRepository()
        .createQueryBuilder("mcq")
        .where("mcq.tags && :tags::varchar[]", { tags: [tag.toLowerCase()] })
        .andWhere("mcq.difficulty = :difficulty", {
          difficulty: difficulty as DifficultyLevel,
        })
        .orderBy("RANDOM()")
        .take(remainingCount)
        .getMany();

      questions.push(...primaryQuestions);
      console.log(questions);
      remainingCount -= primaryQuestions.length;

      if (remainingCount > 0 && difficultyFallbacks[difficulty]) {
        for (const fallbackDifficulty of difficultyFallbacks[difficulty]) {
          if (remainingCount <= 0) break;

          const fallbackQuestions = await mcqQuestionRepository()
            .createQueryBuilder("mcq")
            .where("mcq.tags && :tags::varchar[]", {
              tags: [tag.toLowerCase()],
            })
            .andWhere("mcq.difficulty = :difficulty", {
              difficulty: fallbackDifficulty as DifficultyLevel,
            })
            .orderBy("RANDOM()")
            .take(remainingCount)
            .getMany();

          questions.push(...fallbackQuestions);
          remainingCount -= fallbackQuestions.length;
        }
      }

      questions.forEach((question) => allQuestionsSet.add(question));
    }

    let allQuestions = Array.from(allQuestionsSet);

    if (allQuestions.length < totalRequired) {
      const missingCount = totalRequired - allQuestions.length;
      const existingIds = allQuestions.map((q) => q.id);
      const allTags = Object.keys(tagCounts).map((tag) => tag.toLowerCase());

      const additionalQuestions = await mcqQuestionRepository()
        .createQueryBuilder("mcq")
        .where("mcq.tags && :tags::varchar[]", { tags: allTags })
        .andWhere("mcq.id NOT IN (:...existingIds)", { existingIds })
        .orderBy("RANDOM()")
        .take(missingCount)
        .getMany();

      allQuestions.push(...additionalQuestions);
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

  async getAllUniqueTags(): Promise<string[]> {
    const mcqQuestions = await mcqQuestionRepository().find();

    const allTags = mcqQuestions.flatMap((question) => question.tags || []);

    return [...new Set(allTags)];
  },
};
