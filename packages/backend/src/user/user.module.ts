import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { userController } from "./user.controller";

export const userModule: FastifyPluginAsyncTypebox = async (app) => {
  await app.register(userController, { prefix: "/api/user" });
};