import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "../common/base-model";
import { CodeSubmission, CodeSubmissionWithResults, CreateCodeSubmissionRequestBody } from "../coding/code-submission/code-submission-types";
import { CreateMcqAnswerRequestBody, McqAnswer, McqAnswerSummary } from "../mcq/mcq-answer/mcq-answer-types";
import { InterviewQuestion } from "./interview-question/interview-question-types";
import { ApId } from "../common/id-generator";

export enum InterviewStatus {
  SCHEDULED = "SCHEDULED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export const Interview = Type.Object({
  ...BaseModelSchema,
  userId: Type.String(),
  startTime: Type.String({ format: "date-time" }),
  endTime: Type.Optional(Type.String({ format: "date-time" })),
  timeLimit: Type.Integer({ minimum: 5, maximum: 300 }), // in minutes
  status: Type.Optional(Type.Enum(InterviewStatus)),
  totalScore: Type.Optional(Type.Number({ minimum: 0 })),
  maxScore: Type.Optional(Type.Number({ minimum: 0 })),
  isPassed: Type.Optional(Type.Boolean()),
  notes: Type.Optional(Type.String({ maxLength: 1000 })),
  isActive: Type.Optional(Type.Boolean({ default: true })),
});

export type Interview = Static<typeof Interview>;


export const InterviewSession  = Type.Composite([
  Interview,
  Type.Object({
    interviewQuestions: Type.Array(InterviewQuestion),
    answers: Type.Array(McqAnswer),
    codeSubmissions: Type.Array(CodeSubmissionWithResults),
  }),
]);

export type InterviewSession  = Static<
  typeof InterviewSession 
>;

export const CreateInterviewRequestBody = Type.Object({
  userId: Type.String(),
  jobDescription: Type.String({ minLength: 10, maxLength: 5000 }), // Added missing field
  startTime: Type.String({ format: "date-time" }),
  timeLimit: Type.Integer({ minimum: 5, maximum: 300 }),
  notes: Type.Optional(Type.String({ maxLength: 1000 })),
});

export type CreateInterviewRequestBody = Static<
  typeof CreateInterviewRequestBody
>;

export const UpdateInterviewRequestBody = Type.Object({
  startTime: Type.Optional(Type.String({ format: "date-time" })),
  endTime: Type.Optional(Type.String({ format: "date-time" })),
  timeLimit: Type.Optional(Type.Integer({ minimum: 5, maximum: 300 })),
  status: Type.Optional(Type.Enum(InterviewStatus)),
  totalScore: Type.Optional(Type.Number({ minimum: 0 })),
  maxScore: Type.Optional(Type.Number({ minimum: 0 })),
  isPassed: Type.Optional(Type.Boolean()),
  notes: Type.Optional(Type.String({ maxLength: 1000 })),
  isActive: Type.Optional(Type.Boolean()),
});

export type UpdateInterviewRequestBody = Static<
  typeof UpdateInterviewRequestBody
>;

export const SubmitInterviewRequestBody = Type.Object({
  mcqAnswers: Type.Array(CreateMcqAnswerRequestBody),
});

export type SubmitInterviewRequestBody = Static<typeof SubmitInterviewRequestBody>;

export const InterviewSubmissionResult = Type.Object({
  interviewId: ApId,
  status: Type.String(),
  mcqSummary: McqAnswerSummary,
  codeSubmissions: Type.Array(CodeSubmission),
  totalScore: Type.Number(),
  submittedAt: Type.String({ format: "date-time" }),
});

export type InterviewSubmissionResult = Static<typeof InterviewSubmissionResult>;