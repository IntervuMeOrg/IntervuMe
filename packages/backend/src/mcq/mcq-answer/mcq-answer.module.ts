import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { mcqAnswerController } from "./mcq-answer.controller";

export const mcqAnswerModule: FastifyPluginAsyncTypebox = async (app) => {
  app.register(mcqAnswerController, { prefix: "/api/mcq-answer" });
};
