import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  CreateMcqQuestionRequestBody,
  McqQuestion,
  UpdateMcqQuestionRequestBody,
} from "./mcq-question-types";
import { StatusCodes } from "http-status-codes";
import { mcqQuestionService } from "./mcq-question.service";
import { ApId } from "../../common/id-generator";

export const mcqQuestionController: FastifyPluginAsyncTypebox = async (app) => {
  app.addHook("onRequest", app.authenticate);

  app.post("/", createMcqQuestionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const body = request.body as CreateMcqQuestionRequestBody;
    const question = mcqQuestionService.create(body);

    return question;
  });

  app.get("/", async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    return await mcqQuestionService.list();
  });

  app.get("/:id", GetMcqQuestionRequest, async (request) => {
    const { id } = request.params as { id: string };
    const question = await mcqQuestionService.get(id);
    return question;
  });

  app.put("/:id", updateMcqQuestionRequest, async (request) => {
    const { id } = request.params as { id: string };
    const body = request.body as UpdateMcqQuestionRequestBody;

    const question = await mcqQuestionService.update(id, body);
    return question;
  });

  app.delete("/:id", GetMcqQuestionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const { id } = request.params as { id: string };
    await mcqQuestionService.delete(id);
  });
};

const createMcqQuestionRequest = {
  schema: {
    body: CreateMcqQuestionRequestBody,
    response: {
      [StatusCodes.OK]: McqQuestion,
    },
  },
};

const updateMcqQuestionRequest = {
  schema: {
    params: {
      id: ApId,
    },
    body: UpdateMcqQuestionRequestBody,
    response: {
      [StatusCodes.OK]: McqQuestion,
    },
  },
};

const GetMcqQuestionRequest = {
  schema: {
    params: {
      id: ApId,
    },
    response: {
      [StatusCodes.OK]: McqQuestion,
    },
  },
};
