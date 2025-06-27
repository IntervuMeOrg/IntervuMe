import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

export const interviewController: FastifyPluginAsyncTypebox = async(app) =>{
    app.addHook('onRequest', app.authenticate);
}