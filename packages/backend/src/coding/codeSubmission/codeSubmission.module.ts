import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { codeSubmissionController } from "./codeSubmission.controller";

export const codesubmissionModule: FastifyPluginAsyncTypebox = async(app) => {
    app.register(codeSubmissionController, {prefix: '/api/codeSubmission'});
};