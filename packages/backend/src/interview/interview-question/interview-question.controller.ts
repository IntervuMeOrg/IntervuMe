import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { interviewQuestionService } from "./interview-question.service";
import {
  CreateInterviewQuestionRequestBody,
  UpdateInterviewQuestionRequestBody,
  InterviewQuestion,
  InterviewQuestionWithDetailsRequestBody,
} from "./interview-question-types";
import { StatusCodes } from "http-status-codes";
import { ApId } from "../../common/id-generator";

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

    const body = request.body as CreateInterviewQuestionRequestBody;
    const interviewQuestion = await interviewQuestionService.create(body);

    return interviewQuestion;
  });

  app.get("/:id", GetInterviewQuestionRequest, async (request, reply) => {
    const { id } = request.params as { id: string };
    const interviewQuestion = await interviewQuestionService.getById(id);

    return interviewQuestion;
  });

  app.get(
    "/:id/details",
    GetInterviewQuestionWithDetailsRequest,
    async (request, reply) => {
      const { id } = request.params as { id: string };

      const interviewQuestion =
        await interviewQuestionService.getByIdWithDetails(id);

      return interviewQuestion;
    }
  );

  app.get(
    "/interview/:interviewId",
    GetInterviewQuestionsforInterviewRequest,
    async (request, reply) => {
      const { interviewId } = request.params as { interviewId: string };
      const interviewQuestions =
        await interviewQuestionService.getByInterviewId(interviewId);

      return interviewQuestions;
    }
  );

  app.get(
    "/interview/:interviewId/details",
    GetInterviewQuestionsforInterviewWithDetailsRequest,
    async (request, reply) => {
      const { interviewId } = request.params as { interviewId: string };
      const interviewQuestions =
        await interviewQuestionService.getByInterviewIdWithDetails(interviewId);
      return interviewQuestions;
    }
  );

  app.put("/:id", UpdateInterviewQuestionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const { id } = request.params as { id: string };
    const body = request.body as UpdateInterviewQuestionRequestBody;
    const interviewQuestion = await interviewQuestionService.update(id, body);
    return interviewQuestion;
  });

  app.delete("/:id", GetInterviewQuestionRequest, async (request, reply) => {
    if (request.user.role !== "admin") {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const { id } = request.params as { id: string };
    await interviewQuestionService.delete(id);
  });
};

const CreateInterviewQuestionRequest = {
  schema: {
    body: CreateInterviewQuestionRequestBody,
    response: {
      [StatusCodes.OK]: InterviewQuestion,
    },
  },
};

const GetInterviewQuestionRequest = {
  schema: {
    params: {
      id: ApId,
    },
    response: {
      [StatusCodes.OK]: InterviewQuestion,
    },
  },
};

const GetInterviewQuestionWithDetailsRequest = {
  schema: {
    params: {
      id: ApId,
    },
    response: {
      [StatusCodes.OK]: InterviewQuestionWithDetailsRequestBody,
    },
  },
};

const GetInterviewQuestionsforInterviewRequest = {
  schema: {
    params: {
      interviewId: ApId,
    },
    response: {
      [StatusCodes.OK]: Type.Array(InterviewQuestion),
    },
  },
};

const GetInterviewQuestionsforInterviewWithDetailsRequest = {
  schema: {
    params: {
      interviewId: ApId,
    },
    response: {
      [StatusCodes.OK]: Type.Array(InterviewQuestionWithDetailsRequestBody),
    },
  },
};

const UpdateInterviewQuestionRequest = {
  schema: {
    params: {
      id: ApId,
    },
    body: UpdateInterviewQuestionRequestBody,
    response: {
      [StatusCodes.OK]: InterviewQuestion,
    },
  },
};
