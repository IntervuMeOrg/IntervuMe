import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { mcqQuestionController } from "./mcqQuestion.controller";

export const mcqQuestionModule: FastifyPluginAsyncTypebox = async (app) => {
  await app.register(mcqQuestionController, { prefix: "api/mcq-question" });
};
