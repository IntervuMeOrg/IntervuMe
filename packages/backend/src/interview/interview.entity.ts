import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "../common/base-model";
import { InterviewQuestionSchema } from "../interviewQuestion/interviewQuestion-types";
import { InterviewSchema, Status } from "./interview-types";
import { CodeSubmissionEntity } from "../codeSubmission/codeSubmission.entity";
import { AnswerEntity } from "../answer/answer.entity";


export type InterviewEntity = InterviewSchema & {
  interviewQuestions?: InterviewQuestionSchema[];
  answers?: AnswerEntity[];
  codeSubmissions?: CodeSubmissionEntity[];
};

export const InterviewEntitySchema = new EntitySchema<InterviewEntity>({
  name: 'interview',
  columns: {
    ...BaseColumnSchemaPart,
    userId: { 
      type: String, 
      nullable: false 
    },
    startTime: { 
      type: 'timestamp', 
      nullable: false 
    },
    endTime: { 
      type: 'timestamp', 
      nullable: true 
    },
    timeLimit: { 
      type: Number, 
      nullable: false,
      comment: 'Time limit in minutes'
    },
    status: {
      type: 'enum',
      enum: Status,
      default: 'SCHEDULED',
      nullable: false
    },
    totalScore: { 
      type: 'decimal', 
      precision: 10, 
      scale: 2, 
      nullable: true 
    },
    maxScore: { 
      type: 'decimal', 
      precision: 10, 
      scale: 2, 
      nullable: true 
    },
    isPassed: { 
      type: Boolean, 
      nullable: true 
    },
    notes: { 
      type: String, 
      length: 1000, 
      nullable: true 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
  },
  relations: {
    interviewQuestions: {
      type: 'one-to-many',
      target: 'InterviewQuestion',
      inverseSide: 'interview',
      cascade: true
    },
    answers: {
      type: 'one-to-many',
      target: 'Answer',
      inverseSide: 'interview'
    },
    codeSubmissions: {
      type: 'one-to-many',
      target: 'CodeSubmission',
      inverseSide: 'interview'
    }
  },
  indices: [
    {
      name: 'IDX_INTERVIEW_USER_ID',
      columns: ['userId']
    },
    {
      name: 'IDX_INTERVIEW_STATUS',
      columns: ['status']
    },
    {
      name: 'IDX_INTERVIEW_START_TIME',
      columns: ['startTime']
    }
  ]
});
