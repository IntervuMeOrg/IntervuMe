import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import {
  ApId,
  McqAnswer,
  McqAnswerSummary,
  CreateMcqAnswerRequestBody,
  UpdateMcqAnswerRequestBody,
} from "@shared";
import { mcqAnswerService } from "./mcq-answer.service";
import { StatusCodes } from "http-status-codes";

export const mcqAnswerController: FastifyPluginAsyncTypebox = async (app) => {
  app.addHook("onRequest", app.authenticate);

  app.post("/", CreateMcqAnswerRequest, async (request) => {
    const body = request.body as CreateMcqAnswerRequestBody;
    const answer = await mcqAnswerService.create(body);
    return answer;
  });

  app.get("/:id", GetMcqAnswerRequest, async (request) => {
    const { id } = request.params as { id: string };
    const answer = await mcqAnswerService.get(id);
    return answer;
  });

  // Get all answers for an interview
  app.get(
    "/interview/:interviewId",
    GetMcqAnswersForInterviewRequest,
    async (request) => {
      const { interviewId } = request.params as { interviewId: string };
      const answers = await mcqAnswerService.getByInterviewId(interviewId);
      return answers;
    }
  );

  // Get specific answer for a question in an interview
  app.get(
    "/interview/:interviewId/question/:questionId",
    GetMcqAnswersForInterviewForQuestionRequest,
    async (request) => {
      const { interviewId, questionId } = request.params as {
        interviewId: string;
        questionId: string;
      };
      const answer = await mcqAnswerService.getByInterviewAndQuestion(
        interviewId,
        questionId
      );
      return answer;
    }
  );

  // Update an answer (only before interview is completed)
  app.put("/:id", UpdateMcqAnswerRequest, async (request) => {
    const { id } = request.params as { id: string };
    const body = request.body as UpdateMcqAnswerRequestBody;

    const answer = await mcqAnswerService.update(id, body);
    return answer;
  });

  app.get(
    "/interview/:interviewId/summary",
    GetMcqAnswerSummaryRequest,
    async (request) => {
      const { interviewId } = request.params as { interviewId: string };
      const summary = await mcqAnswerService.getInterviewSummary(interviewId);
      return summary;
    }
  );

  // Delete answer for incomplete interviews
  app.delete("/:id", DeleteMcqAnswerRequest, async (request) => {
    const { id } = request.params as { id: string };
    await mcqAnswerService.delete(id);
  });
};

const CreateMcqAnswerRequest = {
  schema: {
    body: CreateMcqAnswerRequestBody,
    response: {
      [StatusCodes.OK]: McqAnswer,
    },
  },
};

const GetMcqAnswerRequest = {
  schema: {
    params: {
      id: ApId,
    },
    response: {
      [StatusCodes.OK]: McqAnswer,
    },
  },
};

const GetMcqAnswersForInterviewRequest = {
  schema: {
    params: {
      interviewId: ApId,
    },
    response: {
      [StatusCodes.OK]: Type.Array(McqAnswer),
    },
  },
};

const GetMcqAnswersForInterviewForQuestionRequest = {
  schema: {
    params: {
      interviewId: ApId,
      questionId: ApId,
    },
    response: {
      [StatusCodes.OK]: McqAnswer,
    },
  },
};

const GetMcqAnswerSummaryRequest = {
  schema: {
    params: {
      interviewId: ApId,
    },
    response: {
      [StatusCodes.OK]: McqAnswerSummary,
    },
  },
};

const UpdateMcqAnswerRequest = {
  schema: {
    params: {
      id: ApId,
    },
    body: UpdateMcqAnswerRequestBody,
    response: {
      [StatusCodes.OK]: McqAnswer,
    },
  },
};

const DeleteMcqAnswerRequest = {
  schema: {
    params: {
      id: ApId,
    },
  },
};
