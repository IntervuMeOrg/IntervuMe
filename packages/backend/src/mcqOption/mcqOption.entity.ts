import { EntitySchema } from "typeorm";
import { MCQOptionSchema } from "./mcqOption-types";
import { BaseColumnSchemaPart } from "../common/base-model";
import { MCQQuestionSchema } from "../mcqQuestion/mcqQuestion-types";

type MCQOptionQuestionSchema = MCQOptionSchema & {
  mcqQuestion: MCQQuestionSchema;
};

export const MCQOptionEntity = new EntitySchema<MCQOptionQuestionSchema>({
  name: "mcq_option",
  columns: {
    ...BaseColumnSchemaPart,
    mcqQuestionId: {
      type: String,
      nullable: false,
    },

    optionText: {
      type: String,
      nullable: false,
    },

    isCorrect: {
      type: Boolean,
    },
  },
  relations: {
    mcqQuestion: {
      type: "many-to-one",
      target: "mcq_question",
      inverseSide: "options",
      joinColumn: { name: "mcqQuestionId" },
      onDelete: "CASCADE",
    },
  },
  indices: [
    {
      name: "idx_mcq_question",
      columns: ["mcqQuestionId"],
    },
  ],
});
