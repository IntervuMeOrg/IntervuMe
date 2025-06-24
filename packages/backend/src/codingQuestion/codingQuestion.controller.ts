import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { codingQuestionService } from "./codingQuestion.service.js";
import {
    CodingQuestionSchema,
  CreateCodingQuestionSchema,
} from "./codingQuestion-types.js";
import { StatusCodes } from "http-status-codes";

export const codingQuestionController: FastifyPluginAsyncTypebox = async (app) => {
  app.addHook("onRequest", app.authenticate);

  app.post('/', createCodingQuestionRequest, async(request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const body = request.body as CreateCodingQuestionSchema;
    const codingQuestion = await codingQuestionService.create(body);

    return codingQuestion;
  })
}

const createCodingQuestionRequest = {
  schema: {
    body: CreateCodingQuestionSchema,
    response: {
      [StatusCodes.OK]: CodingQuestionSchema,
    },
  },
};