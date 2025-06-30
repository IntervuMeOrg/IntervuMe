import { StatusCodes } from "http-status-codes";
import { testCaseResultService } from "./testCaseResult.service";
import {
  TestCaseResult,
  CreateTestCaseResultRequestbody,
  UpdateTestCaseResultRequestbody,
} from "./testCaseResult-types";
import { Type } from "@sinclair/typebox";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { ApId } from "../../common/id-generator";

export const testCaseResultController: FastifyPluginAsyncTypebox = async (
  app
) => {
  app.addHook("onRequest", app.authenticate);

  app.post(
    "/",
    CreateTestCaseResultRequestbodyRequest,
    async (request, reply) => {
      const body = request.body as CreateTestCaseResultRequestbody;
      const testCaseResult = await testCaseResultService.create(body);
      return testCaseResult;
    }
  );

  app.get("/:id", GetTestCaseResultRequest, async (request, reply) => {
    const { id } = request.params as { id: string };
    const testCaseResult = await testCaseResultService.getById(id);
    return testCaseResult;
  });

  app.put(
    "/:id",
    UpdateTestCaseResultRequestbodyRequest,
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const body = request.body as UpdateTestCaseResultRequestbody;
      const testCaseResult = await testCaseResultService.update(id, body);
      return testCaseResult;
    }
  );

  app.delete("/:id", DeleteTestCaseResultRequest, async (request, reply) => {
    const { id } = request.params as { id: string };
    await testCaseResultService.delete(id);
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

const CreateTestCaseResultRequestbodyRequest = {
  schema: {
    body: CreateTestCaseResultRequestbody,
    response: {
      [StatusCodes.OK]: TestCaseResult,
    },
  },
};

const GetTestCaseResultRequest = {
  schema: {
    params: {
      id: ApId,
    },
    response: {
      [StatusCodes.OK]: TestCaseResult,
    },
  },
};

const UpdateTestCaseResultRequestbodyRequest = {
  schema: {
    params: {
      id: ApId,
    },
    body: UpdateTestCaseResultRequestbody,
    response: {
      [StatusCodes.OK]: TestCaseResult,
    },
  },
};

const DeleteTestCaseResultRequest = {
  schema: {
    params: {
      id: ApId,
    },
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
      [StatusCodes.OK]: Type.Array(TestCaseResult),
    },
  },
};

const GetTestCaseResultsByTestCaseRequest = {
  schema: {
    params: Type.Object({
      testCaseId: ApId,
    }),
    response: {
      [StatusCodes.OK]: Type.Array(TestCaseResult),
    },
  },
};

const GetTestCaseResultBySubmissionAndCaseRequest = {
  schema: {
    params: Type.Object({
      codeSubmissionId: ApId,
      testCaseId: ApId,
    }),
    response: {
      [StatusCodes.OK]: TestCaseResult,
    },
  },
};
