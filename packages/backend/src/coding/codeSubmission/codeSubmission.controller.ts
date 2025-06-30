import { StatusCodes } from "http-status-codes";
import { codeSubmissionService } from "./codeSubmission.service";
import {
  CodeSubmissionSchema,
  CreateCodeSubmissionSchema,
  UpdateCodeSubmissionSchema,
  GetCodeSubmissionSchema,
} from "./codeSubmission-types";
import { Type } from "@sinclair/typebox";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

export const codeSubmissionController: FastifyPluginAsyncTypebox = async (
  app
) => {
  app.addHook("onRequest", app.authenticate);

  app.post("/", CreateCodeSubmissionRequest, async (request, reply) => {
    const body = request.body as CreateCodeSubmissionSchema;
    const codeSubmission = await codeSubmissionService.create(body);
    return codeSubmission;
  });

  app.get("/:id", GetCodeSubmissionRequest, async (request, reply) => {
    const { id } = request.params as GetCodeSubmissionSchema;
    const codeSubmission = await codeSubmissionService.getById(id);
    return codeSubmission;
  });

  app.put("/:id", UpdateCodeSubmissionRequest, async (request, reply) => {
    const { id } = request.params as GetCodeSubmissionSchema;
    const body = request.body as UpdateCodeSubmissionSchema;

    const codeSubmission = await codeSubmissionService.update(id, body);
    return codeSubmission;
  });

  app.delete("/:id", DeleteCodeSubmissionRequest, async (request, reply) => {
    const { id } = request.params as GetCodeSubmissionSchema;
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
      const { id } = request.params as GetCodeSubmissionSchema;
      const codeSubmission = await codeSubmissionService.findWithTestResults(
        id
      );

      return codeSubmission;
    }
  );
};

const CreateCodeSubmissionRequest = {
  schema: {
    body: CreateCodeSubmissionSchema,
    response: {
      [StatusCodes.OK]: CodeSubmissionSchema,
    },
  },
};

const GetCodeSubmissionRequest = {
  schema: {
    params: GetCodeSubmissionSchema,
    response: {
      [StatusCodes.OK]: CodeSubmissionSchema,
      [StatusCodes.NOT_FOUND]: Type.Object({
        message: Type.String(),
      }),
    },
  },
};

const UpdateCodeSubmissionRequest = {
  schema: {
    params: GetCodeSubmissionSchema,
    body: UpdateCodeSubmissionSchema,
    response: {
      [StatusCodes.OK]: CodeSubmissionSchema,
      [StatusCodes.NOT_FOUND]: Type.Object({
        message: Type.String(),
      }),
    },
  },
};

const DeleteCodeSubmissionRequest = {
  schema: {
    params: GetCodeSubmissionSchema,
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
      interviewId: Type.String(),
    }),
    response: {
      [StatusCodes.OK]: Type.Array(CodeSubmissionSchema),
    },
  },
};

const GetCodeSubmissionsByInterviewAndQuestionRequest = {
  schema: {
    params: Type.Object({
      interviewId: Type.String(),
      questionId: Type.String(),
    }),
    response: {
      [StatusCodes.OK]: Type.Array(CodeSubmissionSchema),
    },
  },
};
