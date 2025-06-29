import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from '../common/base-model';
import { TestCaseResultSchema, Verdict } from './testCaseResult-types';
import { CodeSubmissionSchema } from '../codeSubmission/codeSubmission-types';

export type TestCaseResultEntity = TestCaseResultSchema & {
  codeSubmission: CodeSubmissionSchema;
};

export const TestCaseResultEntitySchema = new EntitySchema<TestCaseResultEntity>({
  name: 'test_case_result',
  columns: {
    ...BaseColumnSchemaPart,
    codeSubmissionId: {
      type: String,
      nullable: false,
      comment: 'Reference to code submission'
    },
    testCaseId: {
      type: String,
      nullable: false,
      comment: 'Reference to test case'
    },
    userOutput: {
      type: 'text',
      nullable: false,
      comment: 'Output produced by user code'
    },
    passed: {
      type: Boolean,
      nullable: false,
      comment: 'Whether the test case passed'
    },
    verdict: {
      type: 'enum',
      enum: Verdict,
      nullable: false,
    },
  },
  relations: {
    codeSubmission: {
      type: 'many-to-one',
      target: 'CodeSubmission',
      joinColumn: { name: 'codeSubmissionId' }
    }
  },
  indices: [
    {
      name: 'IDX_TEST_CASE_RESULT_CODE_SUBMISSION_ID',
      columns: ['codeSubmissionId']
    },
    {
      name: 'IDX_TEST_CASE_RESULT_TEST_CASE_ID',
      columns: ['testCaseId']
    },
    {
      name: 'IDX_TEST_CASE_RESULT_SUBMISSION_CASE',
      columns: ['codeSubmissionId', 'testCaseId'],
      unique: true
    }
  ]
});