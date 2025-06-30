import { EntitySchema } from "typeorm";
import { TestCase } from "./test-case-types.js";
import { BaseColumnSchemaPart } from "../../common/base-model.js";
import { CodingQuestion } from "../coding-question/codingQuestion-types.js";

type TestCaseSchema = TestCase & {
  codingQuestion: CodingQuestion;
};

export const TestCaseEntity = new EntitySchema<TestCaseSchema>({
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
      target: "coding_question",
      joinColumn: { name: "codingQuestionId" },
      inverseSide: "testCases",
      onDelete: "CASCADE",
    },
  },

  indices: [
    {
      name: "idx_test_case_coding_question_id",
      columns: ["codingQuestionId"],
    },
  ],
});
