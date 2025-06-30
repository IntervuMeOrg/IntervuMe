import { StatusCodes } from "http-status-codes";
import { testCaseResultService } from "./testCaseResult.service";
import {
  TestCaseResultSchema,
  CreateTestCaseResultSchema,
  UpdateTestCaseResultSchema,
  GetTestCaseResultSchema,
} from "./testCaseResult-types";
import { Type } from "@sinclair/typebox";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

export const testCaseResultController: FastifyPluginAsyncTypebox = async (
  app
) => {
  app.addHook("onRequest", app.authenticate);

  app.post("/", CreateTestCaseResultRequest, async (request, reply) => {
    const body = request.body as CreateTestCaseResultSchema;
    const testCaseResult = await testCaseResultService.create(body);
    return testCaseResult;
  });

  app.get("/:id", GetTestCaseResultRequest, async (request, reply) => {
    const { id } = request.params as GetTestCaseResultSchema;
    const testCaseResult = await testCaseResultService.getById(id);
    return testCaseResult;
  });

  app.put("/:id", UpdateTestCaseResultRequest, async (request, reply) => {
    const { id } = request.params as GetTestCaseResultSchema;
    const body = request.body as UpdateTestCaseResultSchema;
    const testCaseResult = await testCaseResultService.update(id, body);
    return testCaseResult;
  });

  app.delete("/:id", DeleteTestCaseResultRequest, async (request, reply) => {
    const { id } = request.params as GetTestCaseResultSchema;
    const deleted = await testCaseResultService.delete(id);
  });

  // Get all results for a submission
  app.get(
    "/submission/:codeSubmissionId",
    GetTestCaseResultsByCodeSubmissionRequest,
    async (request, reply) => {
      const { codeSubmissionId } = request.params as {
        codeSubmissionId: string;
      };
      const testCaseResults = await testCaseResultService.getByCodeSubmissionId(
        codeSubmissionId
      );
      return testCaseResults;
    }
  );

  // Get all results for a test case
  app.get(
    "/testcase/:testCaseId",
    GetTestCaseResultsByTestCaseRequest,
    async (request, reply) => {
      const { testCaseId } = request.params as { testCaseId: string };
      const testCaseResults = await testCaseResultService.getByTestCaseId(
        testCaseId
      );
      return testCaseResults;
    }
  );

  // Get result by submission and test case
  app.get(
    "/submission/:codeSubmissionId/testcase/:testCaseId",
    GetTestCaseResultBySubmissionAndCaseRequest,
    async (request, reply) => {
      const { codeSubmissionId, testCaseId } = request.params as {
        codeSubmissionId: string;
        testCaseId: string;
      };
      const testCaseResult =
        await testCaseResultService.getBySubmissionAndTestCase(
          codeSubmissionId,
          testCaseId
        );
      return testCaseResult;
    }
  );

  // Delete all results for a submission
  app.delete(
    "/submission/:codeSubmissionId",
    GetTestCaseResultsByCodeSubmissionRequest,
    async (request, reply) => {
      const { codeSubmissionId } = request.params as {
        codeSubmissionId: string;
      };

      await testCaseResultService.deleteByCodeSubmissionId(codeSubmissionId);
    }
  );
};

const CreateTestCaseResultRequest = {
  schema: {
    body: CreateTestCaseResultSchema,
    response: {
      [StatusCodes.OK]: TestCaseResultSchema,
    },
  },
};

const GetTestCaseResultRequest = {
  schema: {
    params: GetTestCaseResultSchema,
    response: {
      [StatusCodes.OK]: TestCaseResultSchema,
    },
  },
};

const UpdateTestCaseResultRequest = {
  schema: {
    params: GetTestCaseResultSchema,
    body: UpdateTestCaseResultSchema,
    response: {
      [StatusCodes.OK]: TestCaseResultSchema,
    },
  },
};

const DeleteTestCaseResultRequest = {
  schema: {
    params: GetTestCaseResultSchema,
    response: {
      [StatusCodes.OK]: Type.Object({
        message: Type.String(),
      }),
    },
  },
};

const GetTestCaseResultsByCodeSubmissionRequest = {
  schema: {
    params: Type.Object({
      codeSubmissionId: Type.String(),
    }),
    response: {
      [StatusCodes.OK]: Type.Array(TestCaseResultSchema),
    },
  },
};

const GetTestCaseResultsByTestCaseRequest = {
  schema: {
    params: Type.Object({
      testCaseId: Type.String(),
    }),
    response: {
      [StatusCodes.OK]: Type.Array(TestCaseResultSchema),
    },
  },
};

const GetTestCaseResultBySubmissionAndCaseRequest = {
  schema: {
    params: Type.Object({
      codeSubmissionId: Type.String(),
      testCaseId: Type.String(),
    }),
    response: {
      [StatusCodes.OK]: TestCaseResultSchema,
    },
  },
};
