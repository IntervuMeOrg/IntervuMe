import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "../common/base-model";
import {
  CreateMCQOptionSchema,
  MCQOptionSchema,
} from "../mcqOption/mcqOption-types";

export enum DifficultyLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const MCQQuestionSchema = Type.Object({
  ...BaseModelSchema,
  text: Type.String({ minLength: 1, maxLength: 2000 }),
  difficulty: Type.Optional(Type.Enum(DifficultyLevel)),
  allowMultiple: Type.Optional(Type.Boolean({ default: false })),
  explanation: Type.Optional(Type.String({ maxLength: 1000 })),
  options: Type.Array(MCQOptionSchema, { minItems: 2, maxItems: 6 }),
});

export type MCQQuestionSchema = Static<typeof MCQQuestionSchema>;

export const CreateMCQQuestionSchema = Type.Object({
  text: Type.String({ minLength: 1, maxLength: 2000 }),
  difficulty: Type.Optional(Type.Enum(DifficultyLevel)),
  allowMultiple: Type.Optional(Type.Boolean({ default: false })),
  explanation: Type.Optional(Type.String({ maxLength: 1000 })),
  options: Type.Array(CreateMCQOptionSchema, { minItems: 2, maxItems: 6 }),
});

export type CreateMCQQuestionSchema = Static<typeof CreateMCQQuestionSchema>;

export const UpdateMCQQuestionSchema = Type.Partial(CreateMCQQuestionSchema);

export type UpdateMCQQuestionSchema = Static<typeof UpdateMCQQuestionSchema>;

export const GetMCQQuestion = Type.Object({
  id: Type.String({ minLength: 21, maxLength: 21 }),
});

export type GetMCQQuestion = Static<typeof GetMCQQuestion>;
