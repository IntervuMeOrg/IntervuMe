import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { codingQuestionService } from "./codingQuestion.service.js";
import {
  CodingQuestion,
  CreateCodingQuestionRequestBody,
  UpdateCodingQuestionRequestBody,
} from "@shared";
import { StatusCodes } from "http-status-codes";
import { ApId } from "@shared";

export const codingQuestionController: FastifyPluginAsyncTypebox = async (
  app
) => {
  app.addHook("onRequest", app.authenticate);

  app.post(
    "/",
    CreateCodingQuestionRequestBodyRequest,
    async (request, reply) => {
      if (request.user.role !== "admin") {
        return reply
          .status(StatusCodes.FORBIDDEN)
          .send({ message: "Forbidden: admins only" });
      }

      const body = request.body as CreateCodingQuestionRequestBody;
      const codingQuestion = await codingQuestionService.create(body);

      return codingQuestion;
    }
  );

  app.get("/:id", getCodingQuestionRequest, async (request, reply) => {
    const { id } = request.params as { id: string };
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

      const { id } = request.params as { id: string };
      return await codingQuestionService.deactivate(id);
    }
  );

  app.put("/:id/activate", getCodingQuestionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const { id } = request.params as { id: string };
    return await codingQuestionService.activate(id);
  });

  app.delete("/:id", getCodingQuestionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const { id } = request.params as { id: string };
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

  app.put(
    "/:id",
    UpdateCodingQuestionRequestBodyRequest,
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const updates = request.body as UpdateCodingQuestionRequestBody;

      return await codingQuestionService.update(id, updates);
    }
  );


  // For testing purposes only
  app.delete("/", async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }
    await codingQuestionService.deleteAll();
    return reply.status(StatusCodes.NO_CONTENT).send();
  }
);
};

const CreateCodingQuestionRequestBodyRequest = {
  schema: {
    body: CreateCodingQuestionRequestBody,
    response: {
      [StatusCodes.OK]: CodingQuestion,
    },
  },
};

const getCodingQuestionRequest = {
  schema: {
    params: {
      id: ApId,
    },
    response: {
      200: CodingQuestion,
    },
  },
};

const UpdateCodingQuestionRequestBodyRequest = {
  schema: {
    params: {
      id: ApId,
    },
    body: UpdateCodingQuestionRequestBody,
    response: {
      200: CodingQuestion,
    },
  },
};
