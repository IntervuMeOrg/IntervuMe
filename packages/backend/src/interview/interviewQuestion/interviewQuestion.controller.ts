import { FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import { interviewQuestionService } from "./interviewQuestion.service";
import {
  CreateInterviewQuestionSchema,
  UpdateInterviewQuestionSchema,
  InterviewQuestionSchema,
  GetInterviewQuestion,
  GetInterviewQuestionForInterview,
  InterviewQuestionWithDetailsSchema,
} from "./interviewQuestion-types";
import { StatusCodes } from "http-status-codes";

export const interviewQuestionController: FastifyPluginAsyncTypebox = async (
  app
) => {
  app.addHook("onRequest", app.authenticate);

  app.post("/", CreateInterviewQuestionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const body = request.body as CreateInterviewQuestionSchema;
    const interviewQuestion = await interviewQuestionService.create(body);

    return interviewQuestion;
  });

  app.get("/:id", GetInterviewQuestionRequest, async (request, reply) => {
    const { id } = request.params as GetInterviewQuestion;
    const interviewQuestion = await interviewQuestionService.getById(id);

    return interviewQuestion;
  });

  app.get(
    "/:id/details",
    GetInterviewQuestionWithDetailsRequest,
    async (request, reply) => {
      const { id } = request.params as GetInterviewQuestion;

      const interviewQuestion =
        await interviewQuestionService.getByIdWithDetails(id);

      return interviewQuestion;
    }
  );

  app.get(
    "/interview/:interviewId",
    GetInterviewQuestionsforInterviewRequest,
    async (request, reply) => {
      const { id } = request.params as GetInterviewQuestionForInterview;
      const interviewQuestions =
        await interviewQuestionService.getByInterviewId(id);

      return interviewQuestions;
    }
  );

  app.get(
    "/interview/:interviewId/details",
    GetInterviewQuestionsforInterviewWithDetailsRequest,
    async (request, reply) => {
      const { id } = request.params as GetInterviewQuestionForInterview;
      const interviewQuestions =
        await interviewQuestionService.getByInterviewIdWithDetails(id);
      return interviewQuestions;
    }
  );

  app.put("/:id", UpdateInterviewQuestionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const { id } = request.params as GetInterviewQuestion;
    const body = request.body as UpdateInterviewQuestionSchema;
    const interviewQuestion = await interviewQuestionService.update(id, body);
    return interviewQuestion;
  });

  app.delete("/:id", GetInterviewQuestionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const { id } = request.params as GetInterviewQuestion;
    await interviewQuestionService.delete(id);
  });
};

const CreateInterviewQuestionRequest = {
  schema: {
    body: CreateInterviewQuestionSchema,
    response: {
      [StatusCodes.OK]: InterviewQuestionSchema,
    },
  },
};

const GetInterviewQuestionRequest = {
  schema: {
    params: GetInterviewQuestion,
    response: {
      [StatusCodes.OK]: InterviewQuestionSchema,
    },
  },
};

const GetInterviewQuestionWithDetailsRequest = {
  schema: {
    params: GetInterviewQuestion,
    response: {
      [StatusCodes.OK]: InterviewQuestionWithDetailsSchema,
    },
  },
};

const GetInterviewQuestionsforInterviewRequest = {
  schema: {
    params: GetInterviewQuestionForInterview,
    response: {
      [StatusCodes.OK]: Type.Array(InterviewQuestionSchema),
    },
  },
};

const GetInterviewQuestionsforInterviewWithDetailsRequest = {
  schema: {
    params: GetInterviewQuestionForInterview,
    response: {
      [StatusCodes.OK]: Type.Array(InterviewQuestionWithDetailsSchema),
    },
  },
};

const UpdateInterviewQuestionRequest = {
  schema: {
    params: GetInterviewQuestion,
    body: UpdateInterviewQuestionSchema,
    response: {
      [StatusCodes.OK]: InterviewQuestionSchema,
    },
  },
};
