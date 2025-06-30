import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { codingQuestionController } from "./codingQuestion.controller";

export const codingQuestionModule: FastifyPluginAsyncTypebox = async (app) => {
  await app.register(codingQuestionController, { prefix: "/api/codingQuestion" });
};