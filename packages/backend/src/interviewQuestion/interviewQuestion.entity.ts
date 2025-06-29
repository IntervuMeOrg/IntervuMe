import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "../common/base-model";
import { InterviewQuestionSchema, QuestionTypes } from "./interviewQuestion-types";

type InterviewQuestionEntity = InterviewQuestionSchema & {
  interview: InterviewQuestionSchema;
};

export const InterviewQuestionEntitySchema =
  new EntitySchema<InterviewQuestionEntity>({
    name: "interview_question",
    columns: {
      ...BaseColumnSchemaPart,
      interviewId: { type: String, nullable: false },
      questionType: {
        type: "enum",
        enum: QuestionTypes,
        nullable: false,
      },
      questionId: { type: String, nullable: false },
      questionOrder: { type: Number, nullable: true },
    },
    relations: {
      interview: {
        type: "many-to-one",
        target: "Interview",
        // inverseSide
        joinColumn: { name: "interviewId" },
      },
    },
  });
