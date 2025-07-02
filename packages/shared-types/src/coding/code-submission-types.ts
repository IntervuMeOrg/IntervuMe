import { Static, Type } from "@sinclair/typebox";
import { BaseModelSchema } from "@shared/common/base-model";
import { ApId } from "@shared/common/id-generator";
import { TestCaseResult } from "@shared/coding/testCaseResult-types";

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
