import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { codeSubmissionController } from "./code-submission.controller";

export const codeSubmissionModule: FastifyPluginAsyncTypebox = async(app) => {
    app.register(codeSubmissionController, {prefix: '/api/code-submission'});
};