import { AppDataSource } from "../database/data-source";
import { CodingQuestionEntity } from "./codingQuestion.entity";
import {
  CodingQuestionSchema,
  CreateCodingQuestionSchema,
  UpdateCodingQuestionSchema,
} from "./codingQuestion-types";
import { apId } from "../common/id-generator";
import { TestCaseEntity } from "../testCase/testCase.entity";

const codingQuestionRepository = () => {
  return AppDataSource.getRepository(CodingQuestionEntity);
};

export const codingQuestionService = {
  async create(request: CreateCodingQuestionSchema) {
    const { testCases, isActive = true, ...questionFields } = request;

    const normalizedTestCases = testCases.map(
      ({ input, expectedOutput, isHidden = false }) => ({
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

  async getById(id: string): Promise<CodingQuestionSchema | null> {
    return await codingQuestionRepository().findOne({ where: { id } });
  },

  async deactivate(id: string): Promise<CodingQuestionSchema | null> {
    const question = await codingQuestionRepository().findOne({
      where: { id },
    });

    if (!question) {
      throw new Error("Coding question not found");
    }

    question.isActive = false;

    await codingQuestionRepository().save(question);

    return question;
  },

  async activate(id: string): Promise<CodingQuestionSchema | null> {
    const question = await codingQuestionRepository().findOne({
      where: { id },
    });

    if (!question) {
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

    if (!question) {
      throw new Error("Coding question not found");
    }

    await codingQuestionRepository().remove(question);
  },

  async list(): Promise<Partial<CodingQuestionSchema>[]> {
    return await codingQuestionRepository().find({
      select: [
        "id",
        "title",
        "difficulty",
        "points",
        "timeLimit",
        "isActive",
        "created",
        "updated",
      ],
    });
  },

  async update(
    id: string,
    updates: UpdateCodingQuestionSchema
  ): Promise<CodingQuestionSchema | null> {
    const question = await codingQuestionRepository().findOne({
      where: { id },
    });
    const testCaseRepo = AppDataSource.getRepository(TestCaseEntity);

    if (!question) {
      throw new Error("Coding question not found");
    }

    const { testCases, ...restUpdates } = updates;

    if (testCases) {
      await testCaseRepo.delete({ codingQuestionId: id });

      const normalizedTestCases = testCases.map(
        ({ input, expectedOutput, isHidden = false }) => ({
          id: apId(),
          input,
          expectedOutput,
          isHidden,
        })
      );

      const updatedCodingQuestion = codingQuestionRepository().create({
        ...question,
        ...updates,
        testCases: normalizedTestCases,
        updated: new Date().toISOString(),
      });

      return await codingQuestionRepository().save(updatedCodingQuestion);
    }

    Object.assign(question, restUpdates, { updated: new Date().toISOString() });
    return await codingQuestionRepository().save(question);
  },
};
