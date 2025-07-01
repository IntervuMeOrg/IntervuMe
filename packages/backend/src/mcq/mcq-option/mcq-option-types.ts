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
  optionText: Type.String({ minLength: 1, maxLength: 500 }),
  isCorrect: Type.Boolean(),
});

export type CreateMcqOptionRequestBody = Static<
  typeof CreateMcqOptionRequestBody
>;

export const UpdateMcqOptionRequestBody = Type.Object({
  optionText: Type.Optional(Type.String({ minLength: 1, maxLength: 500 })),
  isCorrect: Type.Optional(Type.Boolean()),
});

export type UpdateMcqOptionRequestBody = Static<
  typeof UpdateMcqOptionRequestBody
>;

export const UpdateMcqOptionsRequestBody = Type.Object({
  optionText: Type.String({ minLength: 1, maxLength: 500 }),
  isCorrect: Type.Boolean(),
});

export type UpdateMcqOptionsRequestBody = Static<typeof UpdateMcqOptionsRequestBody>;
