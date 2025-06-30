import { AppDataSource } from "../../database/data-source";
import {
  CodeSubmissionEntitySchema,
  CodeSubmissionEntity,
} from "./codeSubmission.entity";
import {
  CodeSubmissionSchema,
  CreateCodeSubmissionSchema,
  UpdateCodeSubmissionSchema,
} from "./codeSubmission-types";
import { apId } from "../../common/id-generator";

const CodeSubmissionRepository = () => {
  return AppDataSource.getRepository(CodeSubmissionEntitySchema);
};

export const codeSubmissionService = {
  async create(
    request: CreateCodeSubmissionSchema
  ): Promise<CodeSubmissionSchema> {
    const codeSubmission = CodeSubmissionRepository().create({
      id: apId(),
      ...request,
      submittedAt: new Date().toISOString(),
    });
    return await CodeSubmissionRepository().save(codeSubmission);
  },

  async getById(id: string): Promise<CodeSubmissionSchema | null> {
    const codeSubmission = await CodeSubmissionRepository().findOne({
      where: { id },
    });

    if (!codeSubmission) throw new Error("Code submission not found");
    return codeSubmission;
  },

  async getByInterviewId(
    interviewId: string
  ): Promise<CodeSubmissionSchema[] | null> {
    const codeSubmissions = await CodeSubmissionRepository().find({
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
  ): Promise<CodeSubmissionSchema[] | null> {
    const codeSubmissions = await CodeSubmissionRepository().find({
      where: { interviewId, questionId },
      order: { submittedAt: "DESC" },
    });

    if (!codeSubmissions)
      throw new Error("No code submissions for this interview or question");

    return codeSubmissions;
  },

  async update(
    id: string,
    request: UpdateCodeSubmissionSchema
  ): Promise<CodeSubmissionSchema | null> {
    const codeSubmission = await CodeSubmissionRepository().findOne({
      where: { id },
    });

    if (!codeSubmission) {
      return null;
    }

    const updatedSubmission = CodeSubmissionRepository().merge(codeSubmission, {
      ...request,
      submittedAt: new Date().toISOString(),
    });

    return await CodeSubmissionRepository().save(updatedSubmission);
  },

  async delete(id: string): Promise<void> {
    const codeSubmission = await CodeSubmissionRepository().findOne({
      where: { id },
    });

    if (!codeSubmission) throw new Error("Code submission not found");

    await CodeSubmissionRepository().delete(id);
  },

  async findWithTestResults(id: string): Promise<CodeSubmissionEntity | null> {
    const codeSubmission = await CodeSubmissionRepository().findOne({
      where: { id },
      relations: ["testCaseResults"],
    });

    if (!codeSubmission) throw new Error("Code Submission not found");

    return codeSubmission;
  },
};
