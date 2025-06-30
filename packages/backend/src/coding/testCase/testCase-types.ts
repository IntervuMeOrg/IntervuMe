import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "../../common/base-model";
import { ApId } from "../../common/id-generator";

export const TestCaseSchema = Type.Object({
  ...BaseModelSchema,
  codingQuestionId: ApId,
  input: Type.String(),
  expectedOutput: Type.String(),
  isHidden: Type.Boolean({ default: false }),
});

export type TestCaseSchema = Static<typeof TestCaseSchema>;

export const TestCaseCreateSchema = Type.Object({
  codingQuestionId: ApId,
  input: Type.String(),
  expectedOutput: Type.String(),
  isHidden: Type.Boolean({ default: false }),
});

export type TestCaseCreateSchema = Static<typeof TestCaseCreateSchema>;

export const TestCaseUpdateQuestionSchema = Type.Object({
  input: Type.String(),
  expectedOutput: Type.String(),
  isHidden: Type.Boolean({ default: false }),
});

export type TestCaseUpdateQuestionSchema = Static<
  typeof TestCaseUpdateQuestionSchema
>;

export const UpdateTestCaseSchema = Type.Partial(TestCaseCreateSchema);

export type UpdateTestCaseSchema = Static<typeof UpdateTestCaseSchema>;

export const GetTestCase = Type.Object({
  id: Type.String({ minLength: 21, maxLength: 21 }),
});

export type GetTestCase = Static<typeof GetTestCase>;
