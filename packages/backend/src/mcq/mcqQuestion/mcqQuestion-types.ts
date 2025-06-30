import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "../../common/base-model";
import {
  CreateMcqOptionRequestBody,
  McqOption,
  McqOptionsUpdateBody,
} from "../mcq-option/mcq-option-types";

export enum DifficultyLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const McqQuestion = Type.Object({
  ...BaseModelSchema,
  text: Type.String({ minLength: 1, maxLength: 2000 }),
  difficulty: Type.Optional(Type.Enum(DifficultyLevel)),
  allowMultiple: Type.Optional(Type.Boolean({ default: false })),
  explanation: Type.Optional(Type.String({ maxLength: 1000 })),
  options: Type.Array(McqOption, { minItems: 2, maxItems: 6 }),
});

export type McqQuestion = Static<typeof McqQuestion>;

export const CreateMcqQuestionRequestBody = Type.Object({
  text: Type.String({ minLength: 1, maxLength: 2000 }),
  difficulty: Type.Optional(Type.Enum(DifficultyLevel)),
  allowMultiple: Type.Optional(Type.Boolean({ default: false })),
  explanation: Type.Optional(Type.String({ maxLength: 1000 })),
  options: Type.Array(CreateMcqOptionRequestBody, { minItems: 2, maxItems: 6 }),
});

export type CreateMcqQuestionRequestBody = Static<
  typeof CreateMcqQuestionRequestBody
>;

export const UpdateMcqQuestionRequestBody = Type.Object({
  text: Type.Optional(Type.String({ minLength: 1, maxLength: 2000 })),
  difficulty: Type.Optional(Type.Enum(DifficultyLevel)),
  allowMultiple: Type.Optional(Type.Boolean({ default: false })),
  explanation: Type.Optional(Type.String({ maxLength: 1000 })),
  options: Type.Optional(
    Type.Array(McqOptionsUpdateBody, {
      minItems: 2,
      maxItems: 6,
    })
  ),
});

export type UpdateMcqQuestionRequestBody = Static<
  typeof UpdateMcqQuestionRequestBody
>;
