import { codeExecutionService } from "./code-execution.service";
import { RunCodeRequestBody, RunResult, } from "./code-execution-types";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { StatusCodes } from "http-status-codes";

export const codeExecutionController: FastifyPluginAsyncTypebox = async (
  app
) => {
  app.addHook("onRequest", app.authenticate);

  app.post("/run", RunRequestBody, async (request, reply) => {
    const body = request.body as RunCodeRequestBody;
    try {
      const result = await codeExecutionService.run(body);
      return result;
    } catch (err) {
      app.log.error(err);
      return reply.status(500).send({ error: "Execution error" });
    }
  });
};

const RunRequestBody = {
  schema: {
    body: RunCodeRequestBody,
    response: {
      [StatusCodes.OK]: RunResult,
    },
  },
};
