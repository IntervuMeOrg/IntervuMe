import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { profileController } from "./profile.controller";

export const profileModule: FastifyPluginAsyncTypebox = async (app) => {
  await app.register(profileController, { prefix: "/api/profile" });
};