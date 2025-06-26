import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "../common/base-model";

export const MCQOptionSchema = Type.Object({
  ...BaseModelSchema,
  mcqQuestionId: Type.String(),
  optionText: Type.String({ minLength: 1, maxLength: 500 }),
  isCorrect: Type.Boolean(),
});

export type MCQOptionSchema = Static<typeof MCQOptionSchema>;

export const CreateMCQOptionSchema = Type.Object({
  mcqQuestionId: Type.String(),
  optionText: Type.String({ minLength: 1, maxLength: 500 }),
  isCorrect: Type.Boolean(),
});

export type CreateMCQOptionSchema = Static<typeof CreateMCQOptionSchema>;

export const UpdateMCQOptionSchema = Type.Partial(CreateMCQOptionSchema);

export type UpdateMCQOptionSchema = Static<typeof UpdateMCQOptionSchema>;

export const MCQOptionUpdateQuestionSchema = Type.Object({
  optionText: Type.String({ minLength: 1, maxLength: 500 }),
  isCorrect: Type.Boolean(),
});

export type MCQOptionUpdateQuestionSchema = Static<typeof MCQOptionUpdateQuestionSchema>;

export const GetMCQOption = Type.Object({
  id: Type.String({ minLength: 21, maxLength: 21 }),
});

export type GetMCQOption = Static<typeof GetMCQOption>;
