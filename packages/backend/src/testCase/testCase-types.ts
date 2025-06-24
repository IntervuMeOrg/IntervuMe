import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "../common/base-model";
import { ApId } from "../common/id-generator";

export const TestCaseSchema = Type.Object({
  ...BaseModelSchema,
  codingQuestionId: ApId,
  input: Type.String(),
  expectedOutput: Type.String(),
  isHidden: Type.Boolean({ default: false }),
});

export type TestCaseSchema = Static<typeof TestCaseSchema>;

export const TestCaseCreateSchema = Type.Object({
  input: Type.String(),
  expectedOutput: Type.String(),
  isHidden: Type.Boolean({ default: false }),
});

export type TestCaseCreateSchema = Static<typeof TestCaseCreateSchema>;
