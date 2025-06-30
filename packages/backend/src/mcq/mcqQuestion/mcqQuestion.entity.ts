import { EntitySchema } from "typeorm";
import { DifficultyLevel, McqQuestion } from "./mcqQuestion-types";
import { BaseColumnSchemaPart } from "../../common/base-model";

export const McqQuestionEntity = new EntitySchema<McqQuestion>({
  name: "mcq_question",
  columns: {
    ...BaseColumnSchemaPart,
    text: {
      type: String,
      length: 2000,
    },
    difficulty: {
      type: "enum",
      enum: DifficultyLevel,
      nullable: true,
    },

    allowMultiple: {
      type: Boolean,
      default: true,
    },

    explanation: {
      type: String,
      length: 1000,
      nullable: true,
    },
  },
  relations: {
    options: {
      type: "one-to-many",
      target: "mcq_option",
      inverseSide: "mcqQuestion",
      cascade: true,
      eager: true,
    },
  },
});
