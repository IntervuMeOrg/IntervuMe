import { Static, Type } from "@sinclair/typebox";
import { BaseModelSchema } from "../../common/base-model";
import { ApId } from "../../common/id-generator";
import { TestCaseResult } from "../test-case-result/testCaseResult-types";
import { Programming_language } from "../code-execution/code-execution-types";

export const CodeSubmission = Type.Object({
  ...BaseModelSchema,
  interviewId: ApId,
  questionId: ApId,
  code: Type.String(),
  submittedAt: Type.String({ format: "date-time" }),
});

export type CodeSubmission = Static<typeof CodeSubmission>;

export const CodeSubmissionWithResults = Type.Composite([
  CodeSubmission,
  Type.Object({
    testCaseResults: Type.Array(TestCaseResult),
  }),
]);

export type CodeSubmissionWithResults = Static<
  typeof CodeSubmissionWithResults
>;

export const CreateCodeSubmissionRequestBody = Type.Object({
  interviewId: ApId,
  questionId: ApId,
  languageId: Type.Number(),
  language: Type.Enum(Programming_language),
  code: Type.String(),
});

export type CreateCodeSubmissionRequestBody = Static<
  typeof CreateCodeSubmissionRequestBody
>;

export const UpdateCodeSubmissionRequestBody = Type.Object({
  code: Type.String(),
});

export type UpdateCodeSubmissionRequestBody = Static<
  typeof UpdateCodeSubmissionRequestBody
>;
