import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { answerController } from "./answer.controller";

export const answerModule: FastifyPluginAsyncTypebox = async(app) =>{
    app.register(answerController, {prefix: 'api/answer'});
}