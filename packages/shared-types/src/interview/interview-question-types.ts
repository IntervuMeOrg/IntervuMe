import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "@shared/common/base-model";
import { ApId } from "@shared/common/id-generator";

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

export const InterviewQuestionWithDetails = Type.Composite([
  InterviewQuestion,
  Type.Object({
    questionDetails: Type.Any(),
  }),
]);

export type InterviewQuestionWithDetails = Static<
  typeof InterviewQuestionWithDetails
>;

export const CreateInterviewQuestionRequestBody = Type.Object({
  interviewId: ApId,
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
