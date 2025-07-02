import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { testCaseController } from "./test-case.controller";

export const testCaseModule: FastifyPluginAsyncTypebox = async (app) => {
  await app.register(testCaseController, { prefix: "/api/test-case" });
};