import { AppDataSource } from "../../database/data-source";
import { TestCaseResultEntity } from "./testCaseResult.entity";
import {
  TestCaseResult,
  CreateTestCaseResultRequestbody,
  UpdateTestCaseResultRequestbody,
} from "./testCaseResult-types";
import { apId } from "../../common/id-generator";

const testCaseResultRepository = () => {
  return AppDataSource.getRepository(TestCaseResultEntity);
};

export const testCaseResultService = {
  async create(
    request: CreateTestCaseResultRequestbody
  ): Promise<TestCaseResult> {
    const testCaseResult = testCaseResultRepository().create({
      id: apId(),
      ...request,
    });
    return await testCaseResultRepository().save(testCaseResult);
  },

  async getById(id: string): Promise<TestCaseResult | null> {
    const testCaseResult = await testCaseResultRepository().findOne({
      where: { id },
    });

    if (!testCaseResult) throw new Error("Test case result not found");
    return testCaseResult;
  },

  async getByCodeSubmissionId(
    codeSubmissionId: string
  ): Promise<TestCaseResult[] | null> {
    const testCaseResults = await testCaseResultRepository().find({
      where: { codeSubmissionId },
      order: { created: "ASC" },
    });

    if (!testCaseResults) throw new Error("Results not found");
    return testCaseResults;
  },

  async getByTestCaseId(testCaseId: string): Promise<TestCaseResult[] | null> {
    const testCaseResults = await testCaseResultRepository().find({
      where: { testCaseId },
      order: { created: "DESC" },
    });

    if (!testCaseResults) throw new Error("Results not found");
    return testCaseResults;
  },

  async getBySubmissionAndTestCase(
    codeSubmissionId: string,
    testCaseId: string
  ): Promise<TestCaseResult | null> {
    const testCaseResult = await testCaseResultRepository().findOne({
      where: { codeSubmissionId, testCaseId },
    });

    if (!testCaseResult) throw new Error("Test case result not found");
    return testCaseResult;
  },

  async update(
    id: string,
    request: UpdateTestCaseResultRequestbody
  ): Promise<TestCaseResult | null> {
    const testCaseResult = await testCaseResultRepository().findOne({
      where: { id },
    });

    if (!testCaseResult) {
      throw new Error("Test case result not found");
    }

    Object.assign(testCaseResult, request, {
      updated: new Date().toISOString(),
    });

    return await testCaseResultRepository().save(testCaseResult);
  },

  async delete(id: string): Promise<void> {
    const testCaseResult = await testCaseResultRepository().findOne({
      where: { id },
    });

    if (!testCaseResult) {
      throw new Error("Test case result not found");
    }

    await testCaseResultRepository().delete(id);
  },

  async deleteByCodeSubmissionId(codeSubmissionId: string): Promise<void> {
    const testCaseResults = await testCaseResultRepository().findOne({
      where: { codeSubmissionId },
    });

    if (!testCaseResults) {
      throw new Error("Results not found");
    }

    await testCaseResultRepository().delete({ codeSubmissionId });
  },
};
