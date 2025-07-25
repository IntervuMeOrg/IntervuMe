import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "../../common/base-model";
import { CodeSubmission } from "./code-submission-types";
import { Interview } from "../../interview/interview-types";
import { TestCaseResult } from "../test-case-result/testCaseResult-types";

export type CodeSubmissionSchema = CodeSubmission & {
  interview: Interview;
  testCaseResults: TestCaseResult[];
};

export const CodeSubmissionEntity = new EntitySchema<CodeSubmissionSchema>({
  name: "code_submission",
  columns: {
    ...BaseColumnSchemaPart,
    interviewId: {
      type: String,
      nullable: false,
    },
    questionId: {
      type: String,
      nullable: false,
    },
    code: {
      type: "text",
      nullable: false,
    },
    submittedAt: {
      type: "timestamp",
      nullable: false,
    },
    score: {
      type: Number,
      default: 0,
    },
    totalTests: {
      type: Number,
      default: 0,
    },
  },
  relations: {
    interview: {
      type: "many-to-one",
      target: "interview",
      joinColumn: { name: "interviewId" },
      onDelete: "CASCADE",
    },
    testCaseResults: {
      type: "one-to-many",
      target: "test_case_result",
      inverseSide: "codeSubmission",
      eager: true,
    },
  },
  indices: [
    {
      name: "idx_code_submission_interview_id",
      columns: ["interviewId"],
    },
    {
      name: "idx_code_submission_question_id",
      columns: ["questionId"],
    },
    {
      name: "idx_code_submission_interview_question",
      columns: ["interviewId", "questionId"],
    },
  ],
});
