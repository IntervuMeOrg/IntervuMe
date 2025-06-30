import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  GetTestCase,
  TestCaseCreateSchema,
  TestCaseSchema,
  UpdateTestCaseSchema,
} from "./testCase-types";
import { StatusCodes } from "http-status-codes";
import { testCaseService } from "./testCase.service";
import { request } from "http";

export const testCaseController: FastifyPluginAsyncTypebox = async (app) => {
  app.addHook("onRequest", app.authenticate);

  app.post('/', CreateTestCaseRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const body = request.body as TestCaseCreateSchema;
    return await testCaseService.create(body);
  });

  app.get('/:id', GetTestCaseRequest, async (request, reply) => {
    const { id } = request.params as GetTestCase;
    const testCase = await testCaseService.getById(id);
    return testCase;
  });

  app.put('/:id', GetTestCaseRequest, async (request, reply) => {
    const { id } = request.params as GetTestCase;
    const body = request.body as UpdateTestCaseSchema
    const testCase = await testCaseService.update(id, body);
    return testCase;
  });

  app.delete('/:id', GetTestCaseRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
          return reply
            .status(StatusCodes.FORBIDDEN)
            .send({ message: "Forbidden: admins only" });
        }
    
        const { id } = request.params as GetTestCase;
        return await testCaseService.delete(id);
  });
};

const CreateTestCaseRequest = {
  schema: {
    body: TestCaseCreateSchema,
    response: {
      [StatusCodes.OK]: TestCaseSchema,
    },
  },
};

const GetTestCaseRequest = {
  schema: {
    params: GetTestCase,
    response: {
      [StatusCodes.OK]: TestCaseSchema,
    },
  },
};
