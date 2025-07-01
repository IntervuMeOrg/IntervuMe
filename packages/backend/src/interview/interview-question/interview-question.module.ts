import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { interviewQuestionController } from "./interview-question.controller";

export const interviewQuestionModule: FastifyPluginAsyncTypebox = async (app) => {
  await app.register(interviewQuestionController, {
    prefix: "/api/interview-question",
  });
};