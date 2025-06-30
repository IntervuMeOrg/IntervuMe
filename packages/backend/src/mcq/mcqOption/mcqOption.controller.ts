import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

import { StatusCodes } from "http-status-codes";
import {
  CreateMCQOptionSchema,
  GetMCQOption,
  MCQOptionSchema,
  UpdateMCQOptionSchema,
} from "./mcqOption-types";
import { mcqOptionService } from "./mcqOption.service";

export const mcqOptionController: FastifyPluginAsyncTypebox = async (app) => {
  app.addHook("onRequest", app.authenticate);

  app.post("/", CreateMCQOptionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const body = request.body as CreateMCQOptionSchema;
    return await mcqOptionService.create(body);
  });

  app.get("/:id", GetMCQOptionRequest, async (request, reply) => {
    const { id } = request.params as GetMCQOption;
    const testCase = await mcqOptionService.getById(id);
    return testCase;
  });

  app.put("/:id", GetMCQOptionRequest, async (request, reply) => {
    const { id } = request.params as GetMCQOption;
    const body = request.body as UpdateMCQOptionSchema;
    const testCase = await mcqOptionService.update(id, body);
    return testCase;
  });

  app.delete("/:id", GetMCQOptionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const { id } = request.params as GetMCQOption;
    return await mcqOptionService.delete(id);
  });
};

const CreateMCQOptionRequest = {
  schema: {
    body: CreateMCQOptionSchema,
    response: {
      [StatusCodes.OK]: MCQOptionSchema,
    },
  },
};

const GetMCQOptionRequest = {
  schema: {
    params: GetMCQOption,
    response: {
      [StatusCodes.OK]: MCQOptionSchema,
    },
  },
};
