import { Static, Type } from "@sinclair/typebox";
import { BaseModelSchema } from "../../common/base-model";

export enum Verdict {
  PASSED = "passed",
  WRONGANSWER = "wrong answer",
  TLE = "time limit",
  MLE = "memory limit",
}

export const TestCaseResultSchema = Type.Object({
  ...BaseModelSchema,
  codeSubmissionId: Type.String(),
  testCaseId: Type.String(),
  userOutput: Type.String(),
  passed: Type.Boolean(),
  verdict: Type.Enum(Verdict),
});

export type TestCaseResultSchema = Static<typeof TestCaseResultSchema>;

export const CreateTestCaseResultSchema = Type.Object({
  codeSubmissionId: Type.String(),
  testCaseId: Type.String(),
  userOutput: Type.String(),
  passed: Type.Boolean(),
  verdict: Type.Enum(Verdict),
});

export type CreateTestCaseResultSchema = Static<
  typeof CreateTestCaseResultSchema
>;

export const UpdateTestCaseResultSchema = Type.Object({
  userOutput: Type.Optional(Type.String()),
  passed: Type.Boolean(),
  verdict: Type.Enum(Verdict),
});

export type UpdateTestCaseResultSchema = Static<
  typeof UpdateTestCaseResultSchema
>;

export const GetTestCaseResultSchema = Type.Object({
  id: Type.String({ minLength: 21, maxLength: 21 }),
});

export type GetTestCaseResultSchema = Static<typeof GetTestCaseResultSchema>;
