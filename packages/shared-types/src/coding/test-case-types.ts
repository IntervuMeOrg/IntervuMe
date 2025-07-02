import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "@shared/common/base-model";
import { ApId } from "@shared/common/id-generator";

export const TestCase = Type.Object({
  ...BaseModelSchema,
  codingQuestionId: ApId,
  input: Type.String(),
  expectedOutput: Type.String(),
  isHidden: Type.Boolean(),
});

export type TestCase = Static<typeof TestCase>;

export const CreateTestCaseRequestBody = Type.Object({
  codingQuestionId: ApId,
  input: Type.String(),
  expectedOutput: Type.String(),
  isHidden: Type.Boolean(),
});

export type CreateTestCaseRequestBody = Static<
  typeof CreateTestCaseRequestBody
>;

export const UpdateTestCaseRequestBody = Type.Object({
  input: Type.Optional(Type.String()),
  expectedOutput: Type.Optional(Type.String()),
  isHidden: Type.Optional(Type.Boolean()),
});

export type UpdateTestCaseRequestBody = Static<typeof UpdateTestCaseRequestBody>;
