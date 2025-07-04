import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "../../common/base-model";
import {
  CreateMcqOptionRequestBody,
  McqOption,
  UpdateMcqOptionsRequestBody,
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
  tags: Type.Array(Type.String()),
  points: Type.Number(),
});

export type McqQuestion = Static<typeof McqQuestion>;

export const CreateMcqQuestionRequestBody = Type.Object({
  text: Type.String({ minLength: 1, maxLength: 2000 }),
  difficulty: Type.Optional(Type.Enum(DifficultyLevel)),
  allowMultiple: Type.Optional(Type.Boolean({ default: false })),
  explanation: Type.Optional(Type.String({ maxLength: 1000 })),
  options: Type.Array(CreateMcqOptionRequestBody, { minItems: 2, maxItems: 6 }),
  tags: Type.Array(Type.String()),
  points: Type.Optional(Type.Number({default: 1})),
});

export type CreateMcqQuestionRequestBody = Static<
  typeof CreateMcqQuestionRequestBody
>;

export const UpdateMcqQuestionRequestBody = Type.Object({
  text: Type.Optional(Type.String({ minLength: 1, maxLength: 2000 })),
  difficulty: Type.Optional(Type.Enum(DifficultyLevel)),
  allowMultiple: Type.Optional(Type.Boolean({ default: false })),
  explanation: Type.Optional(Type.String({ maxLength: 1000 })),
  tags: Type.Optional(Type.Array(Type.String())),
  options: Type.Optional(
    Type.Array(UpdateMcqOptionsRequestBody, {
      minItems: 2,
      maxItems: 6,
    })
  ),
  points: Type.Optional(Type.Number()),
});

export type UpdateMcqQuestionRequestBody = Static<
  typeof UpdateMcqQuestionRequestBody
>;
