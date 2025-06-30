import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "../../common/base-model";
import { InterviewQuestion, QuestionType } from "./interview-question-types";
import { Interview } from "../interview-types";

type InterviewQuestionEntity = InterviewQuestion & {
  interview: Interview;
};

export const InterviewQuestionEntitySchema =
  new EntitySchema<InterviewQuestionEntity>({
    name: "interview_question",
    columns: {
      ...BaseColumnSchemaPart,
      interviewId: {
        type: String,
        nullable: false,
      },
      questionType: {
        type: "enum",
        enum: QuestionType,
        nullable: false,
      },
      questionId: {
        type: String,
        nullable: false,
      },
      questionOrder: { type: "int", nullable: false },
    },
    relations: {
      interview: {
        type: "many-to-one",
        target: "interview",
        joinColumn: { name: "interviewId" },
      },
    },
  });
