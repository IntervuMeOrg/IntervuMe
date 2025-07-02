import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  TestCase,
  CreateTestCaseRequestBody,
  UpdateTestCaseRequestBody,
} from "@shared";
import { StatusCodes } from "http-status-codes";
import { testCaseService } from "./test-case.service";
import { ApId } from "@shared";

export const testCaseController: FastifyPluginAsyncTypebox = async (app) => {
  app.addHook("onRequest", app.authenticate);

  app.post("/", CreateTestCaseRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const body = request.body as CreateTestCaseRequestBody;
    return await testCaseService.create(body);
  });

  app.get("/:id", GetTestCaseRequest, async (request, reply) => {
    const { id } = request.params as { id: string };
    const testCase = await testCaseService.get(id);
    return testCase;
  });

  app.put("/:id", GetTestCaseRequest, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as UpdateTestCaseRequestBody;
    const testCase = await testCaseService.update(id, body);
    return testCase;
  });

  app.delete("/:id", GetTestCaseRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const { id } = request.params as { id: string };
    return await testCaseService.delete(id);
  });
};

const CreateTestCaseRequest = {
  schema: {
    body: CreateTestCaseRequestBody,
    response: {
      [StatusCodes.OK]: TestCase,
    },
  },
};

const GetTestCaseRequest = {
  schema: {
    params: {
      id: ApId,
    },
    response: {
      [StatusCodes.OK]: TestCase,
    },
  },
};
