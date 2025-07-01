import { AppDataSource } from "../../database/data-source";
import {
  CreateTestCaseRequestBody,
  TestCase,
  UpdateTestCaseRequestBody,
} from "./test-case-types";
import { TestCaseEntity } from "./test-case.entity";
import { apId } from "../../common/id-generator";
import { isNil } from "../../common/utils";

const testCaseRepositry = () => {
  return AppDataSource.getRepository(TestCaseEntity);
};

export const testCaseService = {
  async create(request: CreateTestCaseRequestBody): Promise<TestCase> {
    const testcase = testCaseRepositry().create({
      id: apId(),
      ...request,
    });

    return await testCaseRepositry().save(testcase);
  },

  async get(id: string): Promise<TestCase> {
    const testCase = await testCaseRepositry().findOne({ where: { id } });
    if (isNil(testCase)) throw new Error("Test Case not found");

    return testCase;
  },

  async update(
    id: string,
    updates: UpdateTestCaseRequestBody
  ): Promise<TestCase> {
    const testCase = await testCaseRepositry().findOne({ where: { id } });
    if (isNil(testCase)) throw new Error("Test Case not found");

    Object.assign(testCase, updates, { updated: new Date().toISOString() });
    return await testCaseRepositry().save(testCase);
  },

  async delete(id: string): Promise<void> {
    await testCaseRepositry().delete({ id });
  },
};
