import { Static, Type } from "@sinclair/typebox";
import { BaseModelSchema } from "@shared/common/base-model";
import { ApId } from "@shared/common/id-generator";

export enum Verdict {
  PASSED = "passed",
  WRONGANSWER = "wrong answer",
  TLE = "time limit",
  MLE = "memory limit",
}

export const TestCaseResult = Type.Object({
  ...BaseModelSchema,
  codeSubmissionId: ApId,
  testCaseId: ApId,
  userOutput: Type.String(),
  passed: Type.Boolean(),
  verdict: Type.Enum(Verdict),
});

export type TestCaseResult = Static<typeof TestCaseResult>;

export const CreateTestCaseResultRequestbody = Type.Object({
  codeSubmissionId: ApId,
  testCaseId: ApId,
  userOutput: Type.String(),
  passed: Type.Boolean(),
  verdict: Type.Enum(Verdict),
});

export type CreateTestCaseResultRequestbody = Static<
  typeof CreateTestCaseResultRequestbody
>;

export const UpdateTestCaseResultRequestbody = Type.Object({
  userOutput: Type.Optional(Type.String()),
  passed: Type.Boolean(),
  verdict: Type.Enum(Verdict),
});

export type UpdateTestCaseResultRequestbody = Static<
  typeof UpdateTestCaseResultRequestbody
>;

