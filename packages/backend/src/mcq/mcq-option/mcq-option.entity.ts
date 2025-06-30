import { EntitySchema } from "typeorm";
import { McqOption } from "./mcq-option-types";
import { BaseColumnSchemaPart } from "../../common/base-model";
import { McqQuestion } from "../mcq-question/mcq-question-types";

type McqOptionSchema = McqOption & {
  mcqQuestion: McqQuestion;
};

export const McqOptionEntity = new EntitySchema<McqOptionSchema>({
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
      name: "idx_mcq_option_question_id",
      columns: ["mcqQuestionId"],
    },
  ],
});
