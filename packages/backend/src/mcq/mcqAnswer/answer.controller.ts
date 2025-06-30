import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import {
  AnswerSchema,
  AnswerSummarySchema,
  CreateAnswerSchema,
  GetAnswer,
  GetAnswersForInterview,
  GetAnswersForInterviewForQuestion,
  UpdateAnswerSchema,
} from "./answer-types";
import { answerService } from "./answer.service";
import { StatusCodes } from "http-status-codes";

export const answerController: FastifyPluginAsyncTypebox = async (app) => {
  app.addHook("onRequest", app.authenticate);

  app.post("/", CreateAnswerRequest, async (request, reply) => {
    const body = request.body as CreateAnswerSchema;
    const answer = await answerService.create(body);
    return answer;
  });

  app.get("/:id", GetAnswerRequest, async (request, reply) => {
    const { id } = request.params as GetAnswer;
    const answer = await answerService.getById(id);
    return answer;
  });

  // Get all answers for an interview
  app.get(
    "/interview/:interviewId",
    GetAnswersForInterviewRequest,
    async (request, reply) => {
      const { id } = request.params as GetAnswersForInterview;
      const answers = await answerService.getByInterviewId(id);
      return answers;
    }
  );

  // Get specific answer for a question in an interview
  app.get(
    "/interview/:interviewId/question/:questionId",
    GetAnswersForInterviewForQuestionRequest,
    async (request, reply) => {
      const { interviewId, questionId } =
        request.params as GetAnswersForInterviewForQuestion;
      const answer = await answerService.getByInterviewAndQuestion(
        interviewId,
        questionId
      );
      return answer;
    }
  );

  // Update an answer (only before interview is completed)
  app.put("/:id", UpdateAnswerRequest, async (request, reply) => {
    const { id } = request.params as GetAnswer;
    const body = request.body as UpdateAnswerSchema;

    const answer = await answerService.update(id, body);
    return answer;
  });

  app.get(
    "/interview/:interviewId/summary",
    GetAnswerSummaryRequest,
    async (request, reply) => {
      const { id } = request.params as GetAnswer;
      const summary = await answerService.getInterviewSummary(id);
      return summary;
    }
  );

  // Delete answer for incomplete interviews
  app.delete("/:id", GetAnswerRequest, async (request, reply) => {
    const { id } = request.params as GetAnswer;
    await answerService.delete(id);
  });
};

const CreateAnswerRequest = {
  schema: {
    body: CreateAnswerSchema,
    response: {
      [StatusCodes.OK]: AnswerSchema,
    },
  },
};

const GetAnswerRequest = {
  schema: {
    params: GetAnswer,
    response: {
      [StatusCodes.OK]: AnswerSchema,
    },
  },
};

const GetAnswersForInterviewRequest = {
  schema: {
    params: GetAnswersForInterview,
    response: {
      [StatusCodes.OK]: Type.Array(AnswerSchema),
    },
  },
};

const GetAnswersForInterviewForQuestionRequest = {
  schema: {
    params: GetAnswersForInterviewForQuestion,
    response: {
      [StatusCodes.OK]: AnswerSchema,
    },
  },
};

const GetAnswerSummaryRequest = {
  schema: {
    params: GetAnswersForInterview,
    response: {
      [StatusCodes.OK]: AnswerSummarySchema,
    },
  },
};

const UpdateAnswerRequest = {
  schema: {
    params: GetAnswer,
    body: UpdateAnswerSchema,
    response: {
      [StatusCodes.OK]: AnswerSchema,
    },
  },
};
