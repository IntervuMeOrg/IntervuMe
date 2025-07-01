import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "../common/base-model";
import { InterviewQuestion } from "./interview-question/interview-question-types";
import { Interview, InterviewStatus } from "./interview-types";
import { CodeSubmissionWithResults } from "../coding/code-submission/code-submission-types";
import { McqAnswer } from "../mcq/mcq-answer/mcq-answer-types";

export type InterviewSchema = Interview & {
  interviewQuestions: InterviewQuestion[];
  answers: McqAnswer[];
  codeSubmissions: CodeSubmissionWithResults[];
};

export const InterviewEntity = new EntitySchema<InterviewSchema>({
  name: "interview",
  columns: {
    ...BaseColumnSchemaPart,
    userId: {
      type: String,
      nullable: false,
    },
    startTime: {
      type: "timestamp",
      nullable: false,
    },
    endTime: {
      type: "timestamp",
      nullable: true,
    },
    timeLimit: {
      type: Number,
      nullable: false,
      comment: "Time limit in minutes",
    },
    status: {
      type: "enum",
      enum: InterviewStatus,
      default: "SCHEDULED",
      nullable: false,
    },
    totalScore: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true,
    },
    maxScore: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true,
    },
    isPassed: {
      type: Boolean,
      nullable: true,
    },
    notes: {
      type: String,
      length: 1000,
      nullable: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  relations: {
    interviewQuestions: {
      type: "one-to-many",
      target: "interview_question",
      inverseSide: "interview",
      cascade: true,
    },
    answers: {
      type: "one-to-many",
      target: "mcq_answer",
      inverseSide: "interview",
    },
    codeSubmissions: {
      type: "one-to-many",
      target: "code_submission",
      inverseSide: "interview",
    },
  },
  indices: [
    {
      name: "idx_interview_user_id",
      columns: ["userId"],
    },
    {
      name: "idx_interview_status",
      columns: ["status"],
    },
    {
      name: "idx_interview_start_time",
      columns: ["startTime"],
    },
  ],
});
