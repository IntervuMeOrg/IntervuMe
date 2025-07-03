import { Static, Type } from "@sinclair/typebox";
import { BaseModelSchema } from "../../common/base-model";
import { ApId } from "../../common/id-generator";

export enum Verdict {
  ACCEPTED = "ACCEPTED",
  WRONG_ANSWER = "WRONG_ANSWER",
  TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED",
  MEMORY_LIMIT_EXCEEDED = "MEMORY_LIMIT_EXCEEDED",
  COMPILATION_ERROR = "COMPILATION_ERROR",
  RUNTIME_ERROR = "RUNTIME_ERROR",
  PRESENTATION_ERROR = "PRESENTATION_ERROR",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  PENDING = "PENDING",
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

