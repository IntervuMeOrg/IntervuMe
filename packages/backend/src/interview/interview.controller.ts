import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import {
  CreateInterviewRequestBody,
  Interview,
  InterviewStatus,
  UpdateInterviewRequestBody,
} from "./interview-types";
import { StatusCodes } from "http-status-codes";
import { interviewService } from "./interview.service";
import { ApId } from "../common/id-generator";

export const interviewController: FastifyPluginAsyncTypebox = async (app) => {
  app.addHook("onRequest", app.authenticate);
  // TODO
  //   app.post("/", CreateInterviewRequestBodyRequest, async (request, reply) => {
  //     const body = request.body as CreateInterviewRequestBody;
  //     const interview = await interviewService.create(body);
  //     return interview;
  //   });

  app.get("/:id", GetInterviewRequest, async (request, reply) => {
    const { id } = request.params as { id: string };
    const interview = await interviewService.get(id);
    return interview;
  });

  app.get(
    "/:id/with-questions",
    GetInterviewWithQuestionsRequest,
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const interview = await interviewService.getByIdWithQuestions(id);
      return interview;
    }
  );

  app.put("/:id", UpdateInterviewRequestBodyRequest, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as UpdateInterviewRequestBody;
    const interview = await interviewService.update(id, body);
    return interview;
  });

  // soft delete
  app.delete("/:id", DeleteInterviewRequest, async (request, reply) => {
    const { id } = request.params as { id: string };
    await interviewService.delete(id);
  });

  // Get interviews by user ID
  app.get(
    "/user/:userId",
    GetInterviewsByUserRequest,
    async (request, reply) => {
      const { userId } = request.params as { userId: string };
      const interviews = await interviewService.getByUserId(userId);
      return interviews;
    }
  );

  // Get interviews by status
  app.get(
    "/status/:status",
    GetInterviewsByStatusRequest,
    async (request, reply) => {
      const { status } = request.params as { status: InterviewStatus };
      const interviews = await interviewService.getByStatus(status);
      return interviews;
    }
  );

  // Start interview
  app.post("/:id/start", StartInterviewRequest, async (request, reply) => {
    const { id } = request.params as { id: string };
    const interview = await interviewService.startInterview(id);
    return interview;
  });

  // End interview
  app.post("/:id/end", EndInterviewRequest, async (request, reply) => {
    const { id } = request.params as { id: string };
    const interview = await interviewService.endInterview(id);
    return interview;
  });

  // Calculate interview score
  app.post(
    "/:id/calculate-score",
    CalculateScoreRequest,
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const interview = await interviewService.calculateScore(id);
      return interview;
    }
  );

  // Get interviews with all related data (questions, answers, submissions)
  app.get("/", GetInterviewsWithResultsRequest, async (request, reply) => {
    const { userId } = request.query as { userId?: string };
    const interviews = await interviewService.getInterviewsWithResults(userId);
    return interviews;
  });

  // Get upcoming interviews for a user
  app.get(
    "/user/:userId/upcoming",
    GetInterviewsByUserRequest,
    async (request, reply) => {
      const { userId } = request.params as { userId: string };
      const interviews = await interviewService.getUpcomingInterviews(userId);
      return interviews;
    }
  );
};

const CreateInterviewRequestBodyRequest = {
  schema: {
    body: CreateInterviewRequestBody,
    response: {
      [StatusCodes.OK]: Interview,
    },
  },
};

const GetInterviewRequest = {
  schema: {
    params: {
      id: ApId,
    },
    response: {
      [StatusCodes.OK]: Interview,
    },
  },
};

const UpdateInterviewRequestBodyRequest = {
  schema: {
    params: {
      id: ApId,
    },
    body: UpdateInterviewRequestBody,
    response: {
      [StatusCodes.OK]: Interview,
    },
  },
};

const DeleteInterviewRequest = {
  schema: {
    params: {
      id: ApId,
    },
    response: {
      [StatusCodes.OK]: Type.Object({
        message: Type.String(),
      }),
    },
  },
};

const GetInterviewsByUserRequest = {
  schema: {
    params: Type.Object({
      userId: Type.String(),
    }),
    response: {
      [StatusCodes.OK]: Type.Array(Interview),
    },
  },
};

const GetInterviewsByStatusRequest = {
  schema: {
    params: Type.Object({
      status: Type.Enum(InterviewStatus),
    }),
    response: {
      [StatusCodes.OK]: Type.Array(Interview),
    },
  },
};

const StartInterviewRequest = {
  schema: {
    params: {
      id: ApId,
    },
    response: {
      [StatusCodes.OK]: Interview,
    },
  },
};

const EndInterviewRequest = {
  schema: {
    params: {
      id: ApId,
    },
    response: {
      [StatusCodes.OK]: Interview,
    },
  },
};

const CalculateScoreRequest = {
  schema: {
    params: {
      id: ApId,
    },
    response: {
      [StatusCodes.OK]: Interview,
    },
  },
};

const GetInterviewWithQuestionsRequest = {
  schema: {
    params: {
      id: ApId,
    },
    response: {
      [StatusCodes.OK]: Type.Object({
        ...Interview.properties,
        interviewQuestions: Type.Optional(Type.Array(Type.Any())),
      }),
    },
  },
};

const GetInterviewsWithResultsRequest = {
  schema: {
    querystring: Type.Object({
      userId: Type.Optional(Type.String()),
    }),
    response: {
      [StatusCodes.OK]: Type.Array(
        Type.Object({
          ...Interview.properties,
          interviewQuestions: Type.Optional(Type.Array(Type.Any())),
          answers: Type.Optional(Type.Array(Type.Any())),
          codeSubmissions: Type.Optional(Type.Array(Type.Any())),
        })
      ),
    },
  },
};
