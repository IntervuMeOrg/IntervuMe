import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  CreateMcqQuestionRequestBody,
  McqQuestion,
  UpdateMcqQuestionRequestBody,
} from "./mcqQuestion-types";
import { StatusCodes } from "http-status-codes";
import { McqQuestionService } from "./mcqQuestion.service";
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
    const question = McqQuestionService.create(body);

    return question;
  });

  app.get("/", async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    return await McqQuestionService.list();
  });

  app.get("/:id", GetMcqQuestionRequest, async (request) => {
    const { id } = request.params as { id: string };
    const question = await McqQuestionService.getById(id);
    return question;
  });

  app.put("/:id", updateMcqQuestionRequest, async (request) => {
    const { id } = request.params as { id: string };
    const body = request.body as UpdateMcqQuestionRequestBody;

    const question = await McqQuestionService.update(id, body);
    return question;
  });

  app.delete("/:id", GetMcqQuestionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const { id } = request.params as { id: string };
    await McqQuestionService.delete(id);
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
