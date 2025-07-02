import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "@shared";
import { CodeSubmission } from "@shared";
import { Interview } from "@shared";
import { TestCaseResult } from "@shared";

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
  },
  relations: {
    interview: {
      type: "many-to-one",
      target: "interview",
      joinColumn: { name: "interviewId" },
    },
    testCaseResults: {
      type: "one-to-many",
      target: "test_case_result",
      inverseSide: "codeSubmission",
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
