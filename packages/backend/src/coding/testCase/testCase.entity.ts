import { EntitySchema } from "typeorm";
import { TestCaseSchema } from "./testCase-types.js";
import { BaseColumnSchemaPart } from "../../common/base-model.js";
import { CodingQuestionSchema } from "../codingQuestion/codingQuestion-types.js";

type TestCaseQuestionSchema = TestCaseSchema & {
  codingQuestion: CodingQuestionSchema;
};

export const TestCaseEntity = new EntitySchema<TestCaseQuestionSchema>({
  name: "test_case",
  columns: {
    ...BaseColumnSchemaPart,
    input: { type: String, nullable: false },
    expectedOutput: { type: String, nullable: false },
    isHidden: { type: Boolean, default: false },
    codingQuestionId: { type: String, nullable: false },
  },

  relations: {
    codingQuestion: {
      type: "many-to-one",
      target: "codingQuestion",
      joinColumn: { name: "codingQuestionId" },
      inverseSide: "testCases",
      onDelete: "CASCADE",
    },
  },

  indices: [
    {
      name: "idx_test_case_question",
      columns: ["codingQuestionId"],
    },
  ],
});
