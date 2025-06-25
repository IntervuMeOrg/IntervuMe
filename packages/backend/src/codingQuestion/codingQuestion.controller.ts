import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { codingQuestionService } from "./codingQuestion.service.js";
import {
  CodingQuestionSchema,
  CreateCodingQuestionSchema,
  GetCodingQuestion,
  UpdateCodingQuestionSchema,
} from "./codingQuestion-types.js";
import { StatusCodes } from "http-status-codes";

export const codingQuestionController: FastifyPluginAsyncTypebox = async (
  app
) => {
  app.addHook("onRequest", app.authenticate);

  app.post("/", createCodingQuestionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const body = request.body as CreateCodingQuestionSchema;
    const codingQuestion = await codingQuestionService.create(body);

    return codingQuestion;
  });

  app.get("/:id", getCodingQuestionRequest, async (request, reply) => {
    const { id } = request.params as GetCodingQuestion;
    const codingQuestion = await codingQuestionService.get(id);
    return codingQuestion;
  });

  app.put(
    "/:id/deactivate",
    getCodingQuestionRequest,
    async (request, reply) => {
      if (request.user.role !== "admin") {
        return reply
          .status(StatusCodes.FORBIDDEN)
          .send({ message: "Forbidden: admins only" });
      }

      const { id } = request.params as GetCodingQuestion;
      return await codingQuestionService.deactivate(id);
    }
  );

  app.put("/:id/activate", getCodingQuestionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const { id } = request.params as GetCodingQuestion;
    return await codingQuestionService.activate(id);
  });

  app.delete("/:id", getCodingQuestionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const { id } = request.params as GetCodingQuestion;
    return await codingQuestionService.delete(id);
  });

  app.get("/admin", async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    return await codingQuestionService.list();
  });

  // TODO
  // app.put("/:id", updateCodingQuestionRequest, async(request, reply) => {
  //   const { id } = request.params as GetCodingQuestion;
  //   const updates = request.body as UpdateCodingQuestionSchema;

  //   return await codingQuestionService.update(id, updates);
  // })
};

const createCodingQuestionRequest = {
  schema: {
    body: CreateCodingQuestionSchema,
    response: {
      [StatusCodes.OK]: CodingQuestionSchema,
    },
  },
};

const getCodingQuestionRequest = {
  schema: {
    params: GetCodingQuestion,
    response: {
      200: CodingQuestionSchema,
    },
  },
};

const updateCodingQuestionRequest = {
  schema: {
    params: GetCodingQuestion,
    body: UpdateCodingQuestionSchema,
    response: {
      200: CodingQuestionSchema,
    },
  },
};
