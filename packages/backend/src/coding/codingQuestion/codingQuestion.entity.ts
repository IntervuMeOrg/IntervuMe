import { EntitySchema } from "typeorm";
import {
  CodingQuestionSchema,
  DifficultyLevel,
} from "./codingQuestion-types.js";
import {
  BaseColumnSchemaPart,
} from "../common/base-model.js";

export const CodingQuestionEntity = new EntitySchema<CodingQuestionSchema>({
  name: "codingQuestion",
  columns: {
    ...BaseColumnSchemaPart,

    title: {
      type: String,
      length: 200,
      nullable: false,
    },

    difficulty: {
      type: "enum",
      enum: DifficultyLevel, // Adjust based on your `DifficultyLevel` enum
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
      length: 5000,
      nullable: false,
    },

    starterCode: {
      type: String,
      length: 10000,
      nullable: true,
    },

    solutionCode: {
      type: String,
      length: 10000,
      nullable: true,
    },

    memoryLimit: {
      type: Number,
      nullable: true,
    },

    constraints: {
      type: "simple-array",
      nullable: true,
    },

    hints: {
      type: "simple-array",
      nullable: true,
    },

    tags: {
      type: "simple-array",
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
      inverseSide: "codingQuestion",
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
