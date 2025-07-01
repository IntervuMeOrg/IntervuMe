import { AppDataSource } from "../../database/data-source";
import { CodeSubmissionEntity } from "./code-submission.entity";
import {
  CodeSubmission,
  CreateCodeSubmissionRequestBody,
  UpdateCodeSubmissionRequestBody,
} from "./code-submission-types";
import { apId } from "../../common/id-generator";

const codeSubmissionRepository = () => {
  return AppDataSource.getRepository(CodeSubmissionEntity);
};

export const codeSubmissionService = {
  async create(request: CreateCodeSubmissionRequestBody): Promise<CodeSubmission> {
    const codeSubmission = codeSubmissionRepository().create({
      id: apId(),
      ...request,
      submittedAt: new Date().toISOString(),
    });
    return await codeSubmissionRepository().save(codeSubmission);
  },

  async getById(id: string): Promise<CodeSubmission | null> {
    const codeSubmission = await codeSubmissionRepository().findOne({
      where: { id },
    });

    if (!codeSubmission) throw new Error("Code submission not found");
    return codeSubmission;
  },

  async getByInterviewId(
    interviewId: string
  ): Promise<CodeSubmission[] | null> {
    const codeSubmissions = await codeSubmissionRepository().find({
      where: { interviewId },
      order: { submittedAt: "DESC" },
    });

    if (!codeSubmissions)
      throw new Error("No code submissions for this interview");

    return codeSubmissions;
  },

  async getByInterviewAndQuestion(
    interviewId: string,
    questionId: string
  ): Promise<CodeSubmission[] | null> {
    const codeSubmissions = await codeSubmissionRepository().find({
      where: { interviewId, questionId },
      order: { submittedAt: "DESC" },
    });

    if (!codeSubmissions)
      throw new Error("No code submissions for this interview or question");

    return codeSubmissions;
  },

  async update(
    id: string,
    request: UpdateCodeSubmissionRequestBody
  ): Promise<CodeSubmission | null> {
    const codeSubmission = await codeSubmissionRepository().findOne({
      where: { id },
    });

    if (!codeSubmission) {
      return null;
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

    if (!codeSubmission) throw new Error("Code submission not found");

    await codeSubmissionRepository().delete(id);
  },

  async findWithTestResults(id: string): Promise<CodeSubmission | null> {
    const codeSubmission = await codeSubmissionRepository().findOne({
      where: { id },
      relations: ["testCaseResults"],
    });

    if (!codeSubmission) throw new Error("Code Submission not found");

    return codeSubmission;
  },
};
