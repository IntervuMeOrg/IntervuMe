import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "../common/base-model";

export enum Status {
  SCHEDULED = "SCHEDULED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export const InterviewSchema = Type.Object({
  ...BaseModelSchema,
  userId: Type.String(),
  startTime: Type.String({ format: "date-time" }),
  endTime: Type.Optional(Type.String({ format: "date-time" })),
  timeLimit: Type.Integer({ minimum: 5, maximum: 300 }), // in minutes
  status: Type.Optional(Type.Enum(Status)),
  totalScore: Type.Optional(Type.Number({ minimum: 0 })),
  maxScore: Type.Optional(Type.Number({ minimum: 0 })),
  isPassed: Type.Optional(Type.Boolean()),
  notes: Type.Optional(Type.String({ maxLength: 1000 })),
  isActive: Type.Optional(Type.Boolean({ default: true })),
});

export type InterviewSchema = Static<typeof InterviewSchema>;

export const CreateInterviewSchema = Type.Object({
  userId: Type.String(),
  startTime: Type.String({ format: "date-time" }),
  timeLimit: Type.Integer({ minimum: 5, maximum: 300 }),
  notes: Type.Optional(Type.String({ maxLength: 1000 })),
});

export type CreateInterviewSchema = Static<typeof CreateInterviewSchema>;