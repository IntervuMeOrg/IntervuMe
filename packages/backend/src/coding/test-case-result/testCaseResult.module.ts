import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { testCaseResultController } from "./testCaseResult.controller";

export const testCaseResultModule: FastifyPluginAsyncTypebox = async(app) => {
    app.register(testCaseResultController, {prefix: '/api/test-case-result'});
};