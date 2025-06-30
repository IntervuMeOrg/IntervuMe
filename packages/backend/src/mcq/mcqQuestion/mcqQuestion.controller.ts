import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  CreateMCQQuestionSchema,
  GetMCQQuestion,
  MCQQuestionSchema,
  UpdateMCQQuestionSchema,
} from "./mcqQuestion-types";
import { StatusCodes } from "http-status-codes";
import { mcqQuestionService } from "./mcqQuestion.service";
import { request } from "http";

export const mcqQuestionController: FastifyPluginAsyncTypebox = async (app) => {
  app.addHook("onRequest", app.authenticate);

  app.post("/", createMCQQuestionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const body = request.body as CreateMCQQuestionSchema;
    const question = mcqQuestionService.create(body);

    return question;
  });

  app.get('/', async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    return await mcqQuestionService.list();
  });

  app.get("/:id", GetMCQQuestionRequest, async (request, reply) => {
    const { id } = request.params as GetMCQQuestion;
    const question = await mcqQuestionService.getById(id);
    return question;
  });

  app.put("/:id", updateMCQQuestionRequest, async (request, reply) => {
    const { id } = request.params as GetMCQQuestion;
    const body = request.body as UpdateMCQQuestionSchema;

    const question = await mcqQuestionService.update(id, body);
    return question;
  });

  app.delete("/:id", GetMCQQuestionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const { id } = request.params as GetMCQQuestion;
    await mcqQuestionService.delete(id);
  });


};

const createMCQQuestionRequest = {
  schema: {
    body: CreateMCQQuestionSchema,
    response: {
      [StatusCodes.OK]: MCQQuestionSchema,
    },
  },
};

const updateMCQQuestionRequest = {
  schema: {
    params: GetMCQQuestion,
    body: UpdateMCQQuestionSchema,
    response: {
      [StatusCodes.OK]: MCQQuestionSchema,
    },
  },
};

const GetMCQQuestionRequest = {
  schema: {
    params: GetMCQQuestion,
    response: {
      [StatusCodes.OK]: MCQQuestionSchema,
    },
  },
};
