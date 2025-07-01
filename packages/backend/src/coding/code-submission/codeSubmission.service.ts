import { AppDataSource } from "../../database/data-source";
import { CodeSubmissionEntity } from "./code-submission.entity";
import {
  CodeSubmission,
  CodeSubmissionRequestBody,
  UpdateCodeSubmissionRequestBody,
} from "./code-submission-types";
import { apId } from "../../common/id-generator";
import { isNil } from "../../common/utils";

const codeSubmissionRepository = () => {
  return AppDataSource.getRepository(CodeSubmissionEntity);
};

export const codeSubmissionService = {
  async create(request: CodeSubmissionRequestBody): Promise<CodeSubmission> {
    const codeSubmission = codeSubmissionRepository().create({
      id: apId(),
      ...request,
      submittedAt: new Date().toISOString(),
    });
    return await codeSubmissionRepository().save(codeSubmission);
  },

  async get(id: string): Promise<CodeSubmission> {
    const codeSubmission = await codeSubmissionRepository().findOne({
      where: { id },
    });

    if (isNil(codeSubmission)) throw new Error("Code submission not found");
    return codeSubmission;
  },

  async getByInterviewId(
    interviewId: string
  ): Promise<CodeSubmission[]> {
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
