import { AppDataSource } from "../../database/data-source";
import { TestCaseResultEntitySchema } from "./testCaseResult.entity";
import {
  TestCaseResultSchema,
  CreateTestCaseResultSchema,
  UpdateTestCaseResultSchema,
} from "./testCaseResult-types";
import { apId } from "../../common/id-generator";

const TestCaseResultRepository = () => {
  return AppDataSource.getRepository(TestCaseResultEntitySchema);
};

export const testCaseResultService = {
  async create(
    request: CreateTestCaseResultSchema
  ): Promise<TestCaseResultSchema> {
    const testCaseResult = TestCaseResultRepository().create({
      id: apId(),
      ...request,
    });
    return await TestCaseResultRepository().save(testCaseResult);
  },

  async getById(id: string): Promise<TestCaseResultSchema | null> {
    const testCaseResult = await TestCaseResultRepository().findOne({
      where: { id },
    });

    if (!testCaseResult) throw new Error("Test case result not found");
    return testCaseResult;
  },

  async getByCodeSubmissionId(
    codeSubmissionId: string
  ): Promise<TestCaseResultSchema[] | null> {
    const testCaseResults = await TestCaseResultRepository().find({
      where: { codeSubmissionId },
      order: { created: "ASC" },
    });

    if (!testCaseResults) throw new Error("Results not found");
    return testCaseResults;
  },

  async getByTestCaseId(
    testCaseId: string
  ): Promise<TestCaseResultSchema[] | null> {
    const testCaseResults = await TestCaseResultRepository().find({
      where: { testCaseId },
      order: { created: "DESC" },
    });

    if (!testCaseResults) throw new Error("Results not found");
    return testCaseResults;
  },

  async getBySubmissionAndTestCase(
    codeSubmissionId: string,
    testCaseId: string
  ): Promise<TestCaseResultSchema | null> {
    const testCaseResult = await TestCaseResultRepository().findOne({
      where: { codeSubmissionId, testCaseId },
    });

    if (!testCaseResult) throw new Error("Test case result not found");
    return testCaseResult;
  },

  async update(
    id: string,
    request: UpdateTestCaseResultSchema
  ): Promise<TestCaseResultSchema | null> {
    const testCaseResult = await TestCaseResultRepository().findOne({
      where: { id },
    });

    if (!testCaseResult) {
      throw new Error("Test case result not found");
    }

    Object.assign(testCaseResult, request, {
      updated: new Date().toISOString(),
    });

    return await TestCaseResultRepository().save(testCaseResult);
  },

  async delete(id: string): Promise<void> {
    const testCaseResult = await TestCaseResultRepository().findOne({
      where: { id },
    });

    if (!testCaseResult) {
      throw new Error("Test case result not found");
    }

    await TestCaseResultRepository().delete(id);
  },

  async deleteByCodeSubmissionId(codeSubmissionId: string): Promise<void> {
    const testCaseResults = await TestCaseResultRepository().findOne({
      where: { codeSubmissionId },
    });

    if (!testCaseResults) {
      throw new Error("Results not found");
    }

    await TestCaseResultRepository().delete({ codeSubmissionId });
  },
};
