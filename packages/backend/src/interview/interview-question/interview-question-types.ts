import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "../../common/base-model";
import { CodingQuestion } from "../../coding/coding-question/codingQuestion-types";
import { McqQuestion } from "../../mcq/mcqQuestion/mcqQuestion-types";
import { ApId } from "../../common/id-generator";

export enum QuestionType {
  MCQ = "mcq",
  CODING = "coding",
}

export const InterviewQuestion = Type.Object({
  ...BaseModelSchema,
  interviewId: ApId,
  questionType: Type.Enum(QuestionType),
  questionId: ApId,
  questionOrder: Type.Integer({ minimum: 1 }),
});

export type InterviewQuestion = Static<typeof InterviewQuestion>;

export const CreateInterviewQuestionRequestBody = Type.Object({
  questionType: Type.Enum(QuestionType),
  questionId: ApId,
  questionOrder: Type.Integer({ minimum: 1 }),
});

export type CreateInterviewQuestionRequestBody = Static<
  typeof CreateInterviewQuestionRequestBody
>;

export const UpdateInterviewQuestionRequestBody = Type.Object({
  questionType: Type.Optional(Type.Enum(QuestionType)),
  questionId: ApId,
  questionOrder: Type.Optional(Type.Integer({ minimum: 1 })),
});

export type UpdateInterviewQuestionRequestBody = Static<
  typeof UpdateInterviewQuestionRequestBody
>;

export const InterviewQuestionWithDetailsRequestBody = Type.Composite([
  InterviewQuestion,
  Type.Object({
    questionDetails: Type.Union([McqQuestion, CodingQuestion]),
  }),
]);

export type InterviewQuestionWithDetailsRequestBody = Static<
  typeof InterviewQuestionWithDetailsRequestBody
>;
