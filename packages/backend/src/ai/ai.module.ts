import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { aiController } from "./ai.controller";

export const aiModule: FastifyPluginAsyncTypebox = async (app) => {
  await app.register(aiController, { prefix: "/api/ai" });
};