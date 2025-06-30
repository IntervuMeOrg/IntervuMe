import { AppDataSource } from "../../database/data-source";
import {
  TestCaseCreateSchema,
  TestCaseSchema,
  UpdateTestCaseSchema,
} from "./testCase-types";
import { TestCaseEntity } from "./testCase.entity";
import { apId } from "../../common/id-generator";

const TestCaseRepositoy = () => {
  return AppDataSource.getRepository(TestCaseEntity);
};

export const testCaseService = {
  async create(request: TestCaseCreateSchema): Promise<TestCaseSchema> {
    const testcase = TestCaseRepositoy().create({
      id: apId(),
      ...request,
    });

    return await TestCaseRepositoy().save(testcase);
  },

  async getById(id: string): Promise<TestCaseSchema | null> {
    const testCase = await TestCaseRepositoy().findOne({ where: { id } });
    if (!testCase) throw new Error("Test Case not found");

    return testCase;
  },

  async update(
    id: string,
    updates: UpdateTestCaseSchema
  ): Promise<TestCaseSchema | null> {
    const testCase = await TestCaseRepositoy().findOne({ where: { id } });
    if (!testCase) throw new Error("Test Case not found");

    Object.assign(testCase, updates, { updated: new Date().toISOString() });
    return await TestCaseRepositoy().save(testCase);
  },

  async delete(id: string): Promise<void> {
    const testCase = await TestCaseRepositoy().findOne({ where: { id } });
    if (!testCase) throw new Error("Test Case not found");

    TestCaseRepositoy().remove(testCase);
  },
};
