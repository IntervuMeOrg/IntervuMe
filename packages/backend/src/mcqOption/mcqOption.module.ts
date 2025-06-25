import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { mcqOptionController } from "./mcqOption.controller";

export const mcqOptionModule: FastifyPluginAsyncTypebox = async (app) => {
  await app.register(mcqOptionController, { prefix: "api/mcqOption" });
};
