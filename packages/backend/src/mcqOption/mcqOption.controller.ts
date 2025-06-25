import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

export const mcqOptionController: FastifyPluginAsyncTypebox = async (app) => {
    app.addHook('onRequest', app.authenticate);
};
