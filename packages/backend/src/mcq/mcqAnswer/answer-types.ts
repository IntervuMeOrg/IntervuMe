import { Static, Type } from "@sinclair/typebox";
import { BaseModelSchema } from "../../common/base-model";

export const AnswerSchema = Type.Object({
  ...BaseModelSchema,
  interviewId: Type.String(),
  questionId: Type.String(),
  selectedOptionId: Type.String(),
  correctOptionId: Type.String(),
  isCorrect: Type.Boolean(),
  timeSpent: Type.Optional(Type.Integer({ minimum: 0 })), // seconds
});

export type AnswerSchema = Static<typeof AnswerSchema>;

export const CreateAnswerSchema = Type.Object({
  interviewId: Type.String(),
  questionId: Type.String(),
  selectedOptionId: Type.String(),
  timeSpent: Type.Optional(Type.Integer({ minimum: 0 })),
});

export type CreateAnswerSchema = Static<typeof CreateAnswerSchema>;

export const UpdateAnswerSchema = Type.Object({
  selectedOptionId: Type.String(),
  timeSpent: Type.Optional(Type.Integer({ minimum: 0 })),
});

export type UpdateAnswerSchema = Static<typeof UpdateAnswerSchema>;

export const GetAnswer = Type.Object({
  id: Type.String({ minLength: 21, maxLength: 21 }),
});

export type GetAnswer = Static<typeof GetAnswer>;

export const GetAnswersForInterview = Type.Object({
  id: Type.String({ minLength: 21, maxLength: 21 }),
});

export type GetAnswersForInterview = Static<typeof GetAnswersForInterview>;

export const GetAnswersForInterviewForQuestion = Type.Object({
  interviewId: Type.String({ minLength: 21, maxLength: 21 }),
  questionId: Type.String({ minLength: 21, maxLength: 21 }),
});

export type GetAnswersForInterviewForQuestion = Static<
  typeof GetAnswersForInterviewForQuestion
>;

export const AnswerSummarySchema = Type.Object({
  totalQuestions: Type.Integer(),
  correctAnswers: Type.Integer(),
  totalPoints: Type.Number(),
  maxPoints: Type.Number(),
  percentage: Type.Number(),
  totalTimeSpent: Type.Integer(),
  answers: Type.Array(AnswerSchema),
});

export type AnswerSummarySchema = Static<typeof AnswerSummarySchema>;
