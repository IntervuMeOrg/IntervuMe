import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "../../common/base-model";
import { ApId } from "../../common/id-generator";

export const McqOption = Type.Object({
  ...BaseModelSchema,
  mcqQuestionId: ApId,
  optionText: Type.String({ minLength: 1, maxLength: 500 }),
  isCorrect: Type.Boolean(),
});

export type McqOption = Static<typeof McqOption>;

export const CreateMcqOptionRequestBody = Type.Object({
  mcqQuestionId: ApId,
  optionText: Type.String({ minLength: 1, maxLength: 500 }),
  isCorrect: Type.Boolean(),
});

export type CreateMcqOptionRequestBody = Static<
  typeof CreateMcqOptionRequestBody
>;

export const UpdateMcqOptionRequestBody = Type.Object({
  mcqQuestionId: ApId,
  optionText: Type.Optional(Type.String({ minLength: 1, maxLength: 500 })),
  isCorrect: Type.Optional(Type.Boolean()),
});

export type UpdateMcqOptionRequestBody = Static<
  typeof UpdateMcqOptionRequestBody
>;

export const McqOptionsUpdateBody = Type.Object({
  optionText: Type.String({ minLength: 1, maxLength: 500 }),
  isCorrect: Type.Boolean(),
});

export type McqOptionsUpdateBody = Static<typeof McqOptionsUpdateBody>;
