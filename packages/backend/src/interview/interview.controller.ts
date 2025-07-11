import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import {
  CreateInterviewRequestBody,
  Interview,
  InterviewWithQuestions,
  InterviewStatus,
  InterviewSubmissionResult,
  SubmitInterviewRequestBody,
  UpdateInterviewRequestBody,
  InterviewHistoryResponse,
  UserPracticeAnalytics,
  InterviewWithStats,
} from "./interview-types";
import { StatusCodes } from "http-status-codes";
import { interviewService } from "./interview.service";
import { ApId } from "../common/id-generator";
import { interviewStatsService } from "./interview-stats.service";

export const interviewController: FastifyPluginAsyncTypebox = async (app) => {
  app.addHook("onRequest", app.authenticate);

  app.post("/", CreateInterviewRequestBodyRequest, async (request, reply) => {
    const body = request.body as CreateInterviewRequestBody;
    console.log("Creating interview:", body);
    const interview = await interviewService.create(body);
    return interview;
  });

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
      const interview = await interviewService.getWithQuestions(id);
      return interview;
    }
  );

  app.put("/:id", UpdateInterviewRequestBodyRequest, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as UpdateInterviewRequestBody;
    const interview = await interviewService.update(id, body);
    return interview;
  });

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

  app.get(
    "/user/:userId/completed",
    GetInterviewsByUserRequest,
    async (request, reply) => {
      const { userId } = request.params as { userId: string };
      const interviews = await interviewService.getCompletedByUserId(userId);
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

  // Submit interview
  app.post("/:id/submit", SubmitInterviewRequest, async (request, reply) => {
    const { id } = request.params as { id: string };

    const result = await interviewService.submitInterview(id);
    return result;
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
    const { userId } = request.query as { userId: string };
    const interviews = await interviewService.list(userId);
    return interviews;
  });

  // Get upcoming interviews for a user
  app.get(
    "/user/:userId/upcoming",
    GetInterviewsByUserRequest,
    async (request, reply) => {
      const { userId } = request.params as { userId: string };
      const interviews = await interviewService.listUpcoming(userId);
      return interviews;
    }
  );

  // Get interview stats
  app.get(
    "/user/:userId/history",
    GetInterviewsHistoryByUserRequest,
    async (request, reply) => {
      const { userId } = request.params as { userId: string };
      const interviews = await interviewStatsService.getHistory(userId);
      return interviews;
    }
  );

  app.get(
    "/analytics/:userId",
    GetUserAnalyticsRequest,
    async (request, reply) => {
      const { userId } = request.params as { userId: string };
      const { days } = request.query as { days?: number };

      let analytics: UserPracticeAnalytics;

      if (days) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const endDate = new Date();
        
        analytics = await interviewStatsService.getUserPracticeAnalytics(
          userId,
          startDate.toISOString().split('T')[0],
          endDate.toISOString().split('T')[0]
        );
      } else {
        analytics = await interviewStatsService.getUserPracticeAnalytics(userId);
      }

      return analytics;
    }
  );

  // Summary
  app.get(
    "/analytics/:userId/summary",
    GetUserAnalyticsSummaryRequest,
    async (request, reply) => {
      const { userId } = request.params as { userId: string };

      const analytics = await interviewStatsService.getUserPracticeAnalytics(
        userId
      );

      return {
        success: true,
        data: {
          totalDays: analytics.totalDays,
          totalInterviews: analytics.totalInterviews,
          overallAverage: analytics.overallAveragePercentage,
        },
      };
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
      userId: ApId,
    }),
    response: {
      [StatusCodes.OK]: Type.Array(InterviewWithStats),
    },
  },
};

const GetInterviewsHistoryByUserRequest = {
  schema: {
    params: Type.Object({
      userId: ApId,
    }),
    response: {
      [StatusCodes.OK]: InterviewHistoryResponse,
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
      [StatusCodes.OK]: InterviewWithQuestions,
    },
  },
};

const GetInterviewsWithResultsRequest = {
  schema: {
    querystring: Type.Object({
      userId: ApId,
    }),
    response: {
      [StatusCodes.OK]: Type.Array(Interview),
    },
  },
};

const SubmitInterviewRequest = {
  schema: {
    params: {
      id: ApId,
    },
    response: {
      [StatusCodes.OK]: InterviewSubmissionResult,
    },
  },
};

const GetUserAnalyticsRequest = {
  schema: {
    params: Type.Object({
      userId: ApId,
    }),
    querystring: Type.Object({
      days: Type.Optional(Type.Number({ minimum: 1 })),
    }),
    response: {
      [StatusCodes.OK]: UserPracticeAnalytics,
      [StatusCodes.NOT_FOUND]: Type.Object({
        success: Type.Boolean(),
        error: Type.String(),
        message: Type.String(),
      }),
    },
  },
};

const GetUserAnalyticsSummaryRequest = {
  schema: {
    params: Type.Object({
      userId: ApId,
    }),
    response: {
      [StatusCodes.OK]: Type.Object({
        success: Type.Boolean(),
        data: Type.Object({
          totalDays: Type.Number(),
          totalInterviews: Type.Number(),
          overallAverage: Type.Number(),
        }),
      }),
      [StatusCodes.NOT_FOUND]: Type.Object({
        success: Type.Boolean(),
        error: Type.String(),
        message: Type.String(),
      }),
    },
  },
};
