import { AppDataSource } from "../../database/data-source";
import { CodeSubmissionEntity } from "./code-submission.entity";
import {
  CodeSubmission,
  CodeSubmissionWithResults,
  CreateCodeSubmissionRequestBody,
  UpdateCodeSubmissionRequestBody,
} from "./code-submission-types";
import { apId } from "../../common/id-generator";
import { isNil } from "../../common/utils";
import { codeExecutionService } from "../code-execution/code-execution.service";
import { codingQuestionService } from "../coding-question/codingQuestion.service";
import {
  TestCaseResult,
  Verdict,
} from "../test-case-result/testCaseResult-types";
import { testCaseResultService } from "../test-case-result/testCaseResult.service";

const codeSubmissionRepository = () => {
  return AppDataSource.getRepository(CodeSubmissionEntity);
};

export const codeSubmissionService = {
  async create(
    request: CreateCodeSubmissionRequestBody
  ): Promise<CodeSubmissionWithResults> {
    const codeSubmission = codeSubmissionRepository().create({
      id: apId(),
      ...request,
      submittedAt: new Date().toISOString(),
    });

    const savedCodeSubmission = await codeSubmissionRepository().save(
      codeSubmission
    );

    const question = await codingQuestionService.get(request.questionId);

    const testCaseResults: TestCaseResult[] = [];

    for (const testCase of question.testCases) {
      try {
        const runResult = await codeExecutionService.run({
          questionId: request.questionId,
          languageId: request.languageId,
          language: request.language,
          userCode: request.code,
          stdin: testCase.input,
          expected: testCase.expectedOutput,
          timeLimit: question.timeLimit || 5,
        });

        const passed = runResult.status === "Correct";

        const verdict = await codeSubmissionService.mapStatusToVerdict(runResult.status);

        const testCaseResult = await testCaseResultService.create({
          codeSubmissionId: savedCodeSubmission.id,
          testCaseId: testCase.id,
          userOutput: runResult.stdout,
          passed,
          verdict,
        });

        testCaseResults.push(testCaseResult);
      } catch (error) {
        console.error(`Error running test case ${testCase.id}:`, error);

        // Create a failed test case result
        const testCaseResult = await testCaseResultService.create({
          codeSubmissionId: savedCodeSubmission.id,
          testCaseId: testCase.id,
          userOutput: "",
          passed: false,
          verdict: Verdict.RUNTIME_ERROR,
        });

        testCaseResults.push(testCaseResult);
      }
    }

    return {
      ...savedCodeSubmission,
      testCaseResults,
    };
  },

  async mapStatusToVerdict(status: string): Promise<Verdict> {
    switch (status) {
      case "Correct":
        return Verdict.ACCEPTED;
      case "Wrong Answer":
        return Verdict.WRONG_ANSWER;
      case "Time Limit Exceeded":
        return Verdict.TIME_LIMIT_EXCEEDED;
      case "Memory Limit Exceeded":
        return Verdict.MEMORY_LIMIT_EXCEEDED;
      case "Compilation Error":
        return Verdict.COMPILATION_ERROR;
      case "Runtime Error":
        return Verdict.RUNTIME_ERROR;
      default:
        return Verdict.RUNTIME_ERROR;
    }
  },

  async get(id: string): Promise<CodeSubmission> {
    const codeSubmission = await codeSubmissionRepository().findOne({
      where: { id },
    });

    if (isNil(codeSubmission)) throw new Error("Code submission not found");
    return codeSubmission;
  },

  async getByInterviewId(interviewId: string): Promise<CodeSubmission[]> {
    const codeSubmissions = await codeSubmissionRepository().find({
      where: { interviewId },
      order: { submittedAt: "DESC" },
    });

    if (isNil(codeSubmissions))
      throw new Error("No code submissions for this interview");

    return codeSubmissions;
  },

  async getByInterviewAndQuestion(
    interviewId: string,
    questionId: string
  ): Promise<CodeSubmission[]> {
    const codeSubmissions = await codeSubmissionRepository().find({
      where: { interviewId, questionId },
      order: { submittedAt: "DESC" },
    });

    if (isNil(codeSubmissions))
      throw new Error("No code submissions for this interview or question");

    return codeSubmissions;
  },

  async update(
    id: string,
    request: UpdateCodeSubmissionRequestBody
  ): Promise<CodeSubmission> {
    const codeSubmission = await codeSubmissionRepository().findOne({
      where: { id },
    });

    if (isNil(codeSubmission)) {
      throw new Error("Code submission not found");
    }

    const updatedSubmission = codeSubmissionRepository().merge(codeSubmission, {
      ...request,
      submittedAt: new Date().toISOString(),
    });

    return await codeSubmissionRepository().save(updatedSubmission);
  },

  async delete(id: string): Promise<void> {
    const codeSubmission = await codeSubmissionRepository().findOne({
      where: { id },
    });

    if (isNil(codeSubmission)) throw new Error("Code submission not found");

    await codeSubmissionRepository().delete(id);
  },

  async findWithTestResults(id: string): Promise<CodeSubmission> {
    const codeSubmission = await codeSubmissionRepository().findOne({
      where: { id },
      relations: ["testCaseResults"],
    });

    if (isNil(codeSubmission)) throw new Error("Code Submission not found");

    return codeSubmission;
  },
};
