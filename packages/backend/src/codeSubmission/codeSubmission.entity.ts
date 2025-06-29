import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from '../common/base-model';
import { CodeSubmissionSchema } from './codeSubmission-types';
import { InterviewSchema } from '../interview/interview-types';
import { TestCaseResultSchema } from '../testCaseResult/testCaseResult-types';

export type CodeSubmissionEntity = CodeSubmissionSchema & {
  interview: InterviewSchema;
  testCaseResults: TestCaseResultSchema[];
};

export const CodeSubmissionEntitySchema = new EntitySchema<CodeSubmissionEntity>({
  name: 'code_submission',
  columns: {
    ...BaseColumnSchemaPart,
    interviewId: {
      type: String,
      nullable: false,
    },
    questionId: {
      type: String,
      nullable: false,
    },
    code: {
      type: 'text',
      nullable: false,
    },
    submittedAt: {
      type: 'datetime',
      nullable: false,
    },
  },
  relations: {
    interview: {
      type: 'many-to-one',
      target: 'Interview',
      joinColumn: { name: 'interviewId' }
    },
    testCaseResults: {
      type: 'one-to-many',
      target: 'TestCaseResult',
      inverseSide: 'codeSubmission'
    }
  },
  indices: [
    {
      name: 'IDX_CODE_SUBMISSION_INTERVIEW_ID',
      columns: ['interviewId']
    },
    {
      name: 'IDX_CODE_SUBMISSION_QUESTION_ID',
      columns: ['questionId']
    },
    {
      name: 'IDX_CODE_SUBMISSION_INTERVIEW_QUESTION',
      columns: ['interviewId', 'questionId']
    }
  ]
});