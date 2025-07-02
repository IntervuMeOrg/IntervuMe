import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "@shared";
import { TestCaseResult, Verdict } from "@shared";
import { CodeSubmission } from "@shared";

export type TestCaseResultSchema = TestCaseResult & {
  codeSubmission: CodeSubmission;
};

export const TestCaseResultEntity = new EntitySchema<TestCaseResultSchema>({
  name: "test_case_result",
  columns: {
    ...BaseColumnSchemaPart,
    codeSubmissionId: {
      type: String,
      nullable: false,
      comment: "Reference to code submission",
    },
    testCaseId: {
      type: String,
      nullable: false,
      comment: "Reference to test case",
    },
    userOutput: {
      type: "text",
      nullable: false,
      comment: "Output produced by user code",
    },
    passed: {
      type: Boolean,
      nullable: false,
      comment: "Whether the test case passed",
    },
    verdict: {
      type: "enum",
      enum: Verdict,
      nullable: false,
    },
  },
  relations: {
    codeSubmission: {
      type: "many-to-one",
      target: "code_submission",
      joinColumn: { name: "codeSubmissionId" },
    },
  },
  indices: [
    {
      name: "idx_test_case_result_code_submission_id",
      columns: ["codeSubmissionId"],
    },
    {
      name: "idx_test_case_result_test_case_id",
      columns: ["testCaseId"],
    },
    {
      name: "idx_test_case_result_code_submission_id_test_case_id",
      columns: ["codeSubmissionId", "testCaseId"],
      unique: true,
    },
  ],
});
