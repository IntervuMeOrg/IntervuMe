import { Static, Type } from "@sinclair/typebox";
import { BaseModelSchema } from "../../common/base-model";
import { ApId } from "../../common/id-generator";

export const McqAnswer = Type.Object({
  ...BaseModelSchema,
  interviewId: ApId,
  questionId: ApId,
  selectedOptionId: ApId,
  correctOptionId: ApId,
  isCorrect: Type.Boolean(),
  timeSpent: Type.Optional(Type.Integer({ minimum: 0 })), // seconds
});

export type McqAnswer = Static<typeof McqAnswer>;

export const UpsertMcqAnswerRequestBody = Type.Object({
  interviewId: ApId,
  questionId: ApId,
  selectedOptionId: ApId,
  correctOptionId: ApId,
  isCorrect: Type.Boolean(),
  timeSpent: Type.Optional(Type.Integer({ minimum: 0 })),
});

export type UpsertMcqAnswerRequestBody = Static<
  typeof UpsertMcqAnswerRequestBody
>;

export const UpdateMcqAnswerRequestBody = Type.Object({
  selectedOptionId: ApId,
  timeSpent: Type.Optional(Type.Integer({ minimum: 0 })),
});

export type UpdateMcqAnswerRequestBody = Static<
  typeof UpdateMcqAnswerRequestBody
>;

export const McqAnswerSummary = Type.Object({
  totalQuestions: Type.Integer(),
  correctAnswers: Type.Integer(),
  totalPoints: Type.Number(),
  maxPoints: Type.Number(),
  percentage: Type.Number(),
  totalTimeSpent: Type.Integer(),
  answers: Type.Array(McqAnswer),
});

export type McqAnswerSummary = Static<typeof McqAnswerSummary>;
