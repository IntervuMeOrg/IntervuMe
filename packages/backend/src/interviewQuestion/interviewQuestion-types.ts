import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "../common/base-model";
import { CodingQuestionSchema } from "../codingQuestion/codingQuestion-types";
import { MCQQuestionSchema } from "../mcqQuestion/mcqQuestion-types";

export enum QuestionTypes {
  MCQ = "mcq",
  CODING = "coding",
}

export const InterviewQuestionSchema = Type.Object({
  ...BaseModelSchema,
  interviewId: Type.String(),
  questionType: Type.Enum(QuestionTypes),
  questionId: Type.String(),
  questionOrder: Type.Optional(Type.Integer({ minimum: 1 })),
});

export type InterviewQuestionSchema = Static<typeof InterviewQuestionSchema>;

export const CreateInterviewQuestionSchema = Type.Object({
  questionType: Type.Enum(QuestionTypes),
  questionId: Type.String(),
  questionOrder: Type.Optional(Type.Integer({ minimum: 1 })),
});

export type CreateInterviewQuestionSchema = Static<
  typeof CreateInterviewQuestionSchema
>;

export const UpdateInterviewQuestionSchema = Type.Partial(
  Type.Object({
    questionType: Type.Enum({ MCQ: "MCQ", CODING: "CODING" }),
    questionId: Type.String(),
    questionOrder: Type.Optional(Type.Integer({ minimum: 1 })),
  })
);

export type UpdateInterviewQuestionSchema = Static<
  typeof UpdateInterviewQuestionSchema
>;

export const InterviewQuestionWithDetailsSchema = Type.Intersect([
  InterviewQuestionSchema,
  Type.Object({
    questionDetails: Type.Union([MCQQuestionSchema, CodingQuestionSchema]),
  }),
]);

export type InterviewQuestionWithDetailsSchema = Static<
  typeof InterviewQuestionWithDetailsSchema
>;

export const GetInterviewQuestion = Type.Object({
  id: Type.String({ minLength: 21, maxLength: 21 }),
});

export type GetInterviewQuestion = Static<typeof GetInterviewQuestion>;

export const GetInterviewQuestionForInterview = Type.Object({
  id: Type.String({ minLength: 21, maxLength: 21 }),
});

export type GetInterviewQuestionForInterview = Static<
  typeof GetInterviewQuestionForInterview
>;
