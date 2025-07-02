import { EntitySchema } from "typeorm";
import { DifficultyLevel, McqQuestion, BaseColumnSchemaPart} from "@shared";

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

    tags: {
      type: String,
      array: true,
      nullable: false,
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
  indices: [
    {
      name: "idx_mcq_question_tags",
      unique: false,
      columns: ["tags"],
    },
  ],
});
