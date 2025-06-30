import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { interviewQuestionController } from "./interviewQuestion.controller";

export const interviewQuestionModule: FastifyPluginAsyncTypebox = async (app) => {
  await app.register(interviewQuestionController, { prefix: "/api/interviewQuestion" });
};