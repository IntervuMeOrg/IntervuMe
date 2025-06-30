import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "../common/base-model";
import { ApId } from "../common/id-generator";
import { ApId } from "../common/id-generator";

export enum InterviewStatus {
  SCHEDULED = "SCHEDULED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export const Interview = Type.Object({
export const Interview = Type.Object({
  ...BaseModelSchema,
  userId: ApId,
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
export type Interview = Static<typeof Interview>;

export const CreateInterviewRequestBody = Type.Object({
  userId: Type.String(),
  jobDescription: Type.String({ minLength: 10, maxLength: 5000 }), // Added missing field
  startTime: Type.String({ format: "date-time" }),
  timeLimit: Type.Integer({ minimum: 5, maximum: 300 }),
  notes: Type.Optional(Type.String({ maxLength: 1000 })),
});

export type CreateInterviewRequestBody = Static<typeof CreateInterviewRequestBody>;

export const UpdateInterviewRequestBody = Type.Object({
  startTime: Type.Optional(Type.String({ format: "date-time" })),
  endTime: Type.Optional(Type.String({ format: "date-time" })),
  timeLimit: Type.Optional(Type.Integer({ minimum: 5, maximum: 300 })),
  status: Type.Optional(Type.Enum(Status)),
  totalScore: Type.Optional(Type.Number({ minimum: 0 })),
  maxScore: Type.Optional(Type.Number({ minimum: 0 })),
  isPassed: Type.Optional(Type.Boolean()),
  notes: Type.Optional(Type.String({ maxLength: 1000 })),
  isActive: Type.Optional(Type.Boolean()),
});

export type UpdateInterviewRequestBody = Static<typeof UpdateInterviewRequestBody>;

export const GetInterview = Type.Object({
  id: ApId,
});

export type GetInterview = Static<typeof GetInterview>;