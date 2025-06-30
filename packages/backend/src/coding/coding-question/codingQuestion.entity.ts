import { EntitySchema } from "typeorm";
import { CodingQuestion, DifficultyLevel } from "./codingQuestion-types.js";
import {
  ARRAY_COLUMN_TYPE,
  BaseColumnSchemaPart,
} from "../../common/base-model.js";

export const CodingQuestionEntity = new EntitySchema<CodingQuestion>({
  name: "coding_question",
  columns: {
    ...BaseColumnSchemaPart,

    title: {
      type: String,
      nullable: false,
    },

    difficulty: {
      type: "enum",
      enum: DifficultyLevel,
      nullable: false,
    },

    points: {
      type: Number,
      nullable: false,
    },

    timeLimit: {
      type: Number,
      nullable: false,
    },

    problemStatement: {
      type: String,
      nullable: false,
    },

    starterCode: {
      type: String,
      nullable: true,
    },

    solutionCode: {
      type: String,
      nullable: true,
    },

    memoryLimit: {
      type: Number,
      nullable: true,
    },

    constraints: {
      type: ARRAY_COLUMN_TYPE,
      nullable: true,
    },

    hints: {
      type: ARRAY_COLUMN_TYPE,
      nullable: true,
    },

    tags: {
      type: ARRAY_COLUMN_TYPE,
      nullable: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      nullable: true,
    },
  },

  relations: {
    testCases: {
      type: "one-to-many",
      target: "test_case",
      inverseSide: "coding_question",
      cascade: true,
      eager: true,
    },
  },

  indices: [
    {
      name: "idx_coding_question_title",
      columns: ["title"],
      unique: true,
    },
  ],
});
