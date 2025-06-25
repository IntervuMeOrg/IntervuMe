import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { mcqQuestionController } from "./mcqQuestion.controller";

export const MCQQuestionModule: FastifyPluginAsyncTypebox = async(app) =>{
    await app.register(mcqQuestionController, {prefix: 'api/mcqQuestion'});
}