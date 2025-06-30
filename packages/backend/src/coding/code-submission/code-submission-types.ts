import { Static, Type } from "@sinclair/typebox";
import { BaseModelSchema } from "../../common/base-model";
import { ApId } from "../../common/id-generator";
import { TestCaseResult } from "../test-case-result/testCaseResult-types";

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

export type CodeSubmissionWithResults = Static<typeof CodeSubmissionWithResults>;


export const CodeSubmissionRequestBody = Type.Object({
  interviewId: ApId,
  questionId: ApId,
  code: Type.String(),
});

export type CodeSubmissionRequestBody = Static<
  typeof CodeSubmissionRequestBody
>;

export const UpdateCodeSubmissionRequestBody = Type.Object({
  code: Type.String(),
});

export type UpdateCodeSubmissionRequestBody = Static<
  typeof UpdateCodeSubmissionRequestBody
>;

