import { StatusCodes } from "http-status-codes";
import { codeSubmissionService } from "./codeSubmission.service";
import {
  CodeSubmission,
  CodeSubmissionWithResults,
  CreateCodeSubmissionRequestBody,
  UpdateCodeSubmissionRequestBody,
} from "./code-submission-types";
import { Type } from "@sinclair/typebox";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { ApId } from "../../common/id-generator";

export const codeSubmissionController: FastifyPluginAsyncTypebox = async (
  app
) => {
  app.addHook("onRequest", app.authenticate);

  app.post("/", CodeSubmissionRequestBodyRequest, async (request, reply) => {
    const body = request.body as CreateCodeSubmissionRequestBody;
    const codeSubmission = await codeSubmissionService.create(body);
    return codeSubmission;
  });

  app.get("/:id", GetCodeSubmissionRequest, async (request, reply) => {
    const { id } = request.params as { id: string };
    const codeSubmission = await codeSubmissionService.get(id);
    return codeSubmission;
  });

  app.put(
    "/:id",
    UpdateCodeSubmissionRequestBodyRequest,
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const body = request.body as UpdateCodeSubmissionRequestBody;

      const codeSubmission = await codeSubmissionService.update(id, body);
      return codeSubmission;
    }
  );

  app.delete("/:id", DeleteCodeSubmissionRequest, async (request, reply) => {
    const { id } = request.params as { id: string };
    const deleted = await codeSubmissionService.delete(id);
  });

  app.get(
    "/interview/:interviewId",
    GetCodeSubmissionsByInterviewRequest,
    async (request, reply) => {
      const { interviewId } = request.params as { interviewId: string };
      const codeSubmissions = await codeSubmissionService.getByInterviewId(
        interviewId
      );
      return codeSubmissions;
    }
  );

  app.get(
    "/interview/:interviewId/question/:questionId",
    GetCodeSubmissionsByInterviewAndQuestionRequest,
    async (request, reply) => {
      const { interviewId, questionId } = request.params as {
        interviewId: string;
        questionId: string;
      };
      const codeSubmissions =
        await codeSubmissionService.getByInterviewAndQuestion(
          interviewId,
          questionId
        );
      return codeSubmissions;
    }
  );

  app.get(
    "/:id/with-results",
    GetCodeSubmissionRequest,
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const codeSubmission = await codeSubmissionService.findWithTestResults(
        id
      );

      return codeSubmission;
    }
  );
};

const CodeSubmissionRequestBodyRequest = {
  schema: {
    body: CreateCodeSubmissionRequestBody,
    response: {
      [StatusCodes.OK]: CodeSubmissionWithResults,
    },
  },
};

const GetCodeSubmissionRequest = {
  schema: {
    params: Type.Object({
      id: ApId,
    }),
    response: {
      [StatusCodes.OK]: CodeSubmission,
      [StatusCodes.NOT_FOUND]: Type.Object({
        message: Type.String(),
      }),
    },
  },
};

const UpdateCodeSubmissionRequestBodyRequest = {
  schema: {
    params: Type.Object({
      id: ApId,
    }),
    body: UpdateCodeSubmissionRequestBody,
    response: {
      [StatusCodes.OK]: CodeSubmission,
      [StatusCodes.NOT_FOUND]: Type.Object({
        message: Type.String(),
      }),
    },
  },
};

const DeleteCodeSubmissionRequest = {
  schema: {
    params: Type.Object({
      id: ApId,
    }),
    response: {
      [StatusCodes.OK]: Type.Object({
        message: Type.String(),
      }),
      [StatusCodes.NOT_FOUND]: Type.Object({
        message: Type.String(),
      }),
    },
  },
};

const GetCodeSubmissionsByInterviewRequest = {
  schema: {
    params: Type.Object({
      interviewId: ApId,
    }),
    response: {
      [StatusCodes.OK]: Type.Array(CodeSubmission),
    },
  },
};

const GetCodeSubmissionsByInterviewAndQuestionRequest = {
  schema: {
    params: Type.Object({
      interviewId: ApId,
      questionId: ApId,
    }),
    response: {
      [StatusCodes.OK]: Type.Array(CodeSubmission),
    },
  },
};
