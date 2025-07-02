import { AppDataSource } from "../../database/data-source";
import { CodingQuestionEntity } from "./codingQuestion.entity";
import {
  CodingQuestion,
  CreateCodingQuestionRequestBody,
  DifficultyLevel,
  UpdateCodingQuestionRequestBody,
} from "@shared";
import { apId } from "@shared";
import { TestCaseEntity } from "../test-case/test-case.entity";
import {
  CreateTestCaseRequestBody,
  UpdateTestCaseRequestBody,
} from "@shared";
import { isNil } from "../../common/utils";

const codingQuestionRepository = () => {
  return AppDataSource.getRepository(CodingQuestionEntity);
};

const testCaseRepository = () => {
  return AppDataSource.getRepository(TestCaseEntity);
};

export const codingQuestionService = {
  async create(request: CreateCodingQuestionRequestBody): Promise<CodingQuestion> {
    const { testCases, isActive, ...questionFields } = request;

    const normalizedTestCases = testCases.map(
      ({ input, expectedOutput, isHidden }: UpdateTestCaseRequestBody) => ({
        id: apId(),
        input,
        expectedOutput,
        isHidden,
      })
    );

    const codingQuestion = codingQuestionRepository().create({
      id: apId(),
      ...questionFields,
      isActive,
      testCases: normalizedTestCases,
    });

    return await codingQuestionRepository().save(codingQuestion);
  },

  async get(id: string): Promise<CodingQuestion> {
    const question = await codingQuestionRepository().findOne({
      where: { id },
    });
    if (isNil(question)) {
      throw new Error("Coding question not found");
    }

    return question;
  },

  async deactivate(id: string): Promise<CodingQuestion> {
    const question = await codingQuestionRepository().findOne({
      where: { id },
    });

    if (isNil(question)) {
      throw new Error("Coding question not found");
    }

    question.isActive = false;

    await codingQuestionRepository().save(question);

    return question;
  },

  async activate(id: string): Promise<CodingQuestion> {
    const question = await codingQuestionRepository().findOne({
      where: { id },
    });

    if (isNil(question)) {
      throw new Error("Coding question not found");
    }

    question.isActive = true;

    await codingQuestionRepository().save(question);

    return question;
  },

  async delete(id: string): Promise<void> {
    const question = await codingQuestionRepository().findOne({
      where: { id },
    });

    if (isNil(question)) {
      throw new Error("Coding question not found");
    }

    await codingQuestionRepository().remove(question);
  },

  async list(): Promise<CodingQuestion[]> {
    return await codingQuestionRepository().find();
  },

  async update(
    id: string,
    updates: UpdateCodingQuestionRequestBody
  ): Promise<CodingQuestion> {
    const question = await codingQuestionRepository().findOne({
      where: { id },
    });

    if (isNil(question)) {
      throw new Error("Coding question not found");
    }

    const { testCases, ...restUpdates } = updates;

    if (testCases) {
      await testCaseRepository().delete({ codingQuestionId: id });

      const normalizedTestCases = testCases.map(
        ({ input, expectedOutput, isHidden }: UpdateTestCaseRequestBody) => ({
          id: apId(),
          input,
          expectedOutput,
          isHidden,
          codingQuestionId: id,
        })
      );

      Object.assign(question, restUpdates, {
        testCases: normalizedTestCases,
        updated: new Date().toISOString(),
      });
      return await codingQuestionRepository().save(question);
    }

    Object.assign(question, restUpdates, { updated: new Date().toISOString() });
    return await codingQuestionRepository().save(question);
  },

  async deleteAll(): Promise<void> {
    const questions = await codingQuestionRepository().find();
    await codingQuestionRepository().remove(questions);
  },

  async getRandomByDifficultyAndCount(
    difficulty: DifficultyLevel,
    count: number
  ): Promise<CodingQuestion[]> {
    const questions = await codingQuestionRepository()
      .createQueryBuilder("coding")
      .where("coding.difficulty = :difficulty", { difficulty })
      .orderBy("RANDOM()")
      .take(count)
      .getMany();

    return questions;
  },
};
