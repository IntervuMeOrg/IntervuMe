import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { interviewController } from "./interview.controller";

export const interviewModule: FastifyPluginAsyncTypebox = async (app) => {
  await app.register(interviewController, { prefix: "/api/interview" });
};