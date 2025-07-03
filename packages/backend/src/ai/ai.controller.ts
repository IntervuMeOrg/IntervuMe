import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

import { StatusCodes } from "http-status-codes";
import { aiService } from "./ai.service";
import { AssessmentResults } from "./types";

export const aiController: FastifyPluginAsyncTypebox = async (app) => {
  app.addHook("onRequest", app.authenticate);

  app.post("/test", TestRequest, async (request, reply) => {
    const jobDescription = (request.body as { jobDescription: string })
      .jobDescription;
    const modelName = (request.body as { modelName: string }).modelName;

    const comprehensiveAnalysis = await aiService.analyzeJobDescription(
      jobDescription,
      modelName,
      5 // number of MCQ questions
    );

    return {
      keywordOutput: comprehensiveAnalysis.keywords,
      langs: comprehensiveAnalysis.keywords.programming_languages,
      mcqAllocOutput: comprehensiveAnalysis.mcqAllocation,
      similarityOutput: comprehensiveAnalysis.similarity,
      codingDifficultyOutput: comprehensiveAnalysis.codingDifficulty, // New field
    };
  });

  app.post("/feedback", FeedbackRequest, async (request, reply) => {
    const { modelName, assessmentResults } = request.body as {
      modelName: string;
      assessmentResults: AssessmentResults;
    };
    const feedback = await aiService.getFeedback(assessmentResults, modelName);
    return feedback;
  });
};

const TestRequest = {
  schema: {
    body: Type.Object({
      jobDescription: Type.String(),
      modelName: Type.String(),
    }),
    response: {
      [StatusCodes.OK]: Type.Object({
        keywordOutput: Type.Any(),
        langs: Type.Array(Type.String()),
        mcqAllocOutput: Type.Any(),
        similarityOutput: Type.Any(),
        codingDifficultyOutput: Type.Any()
      }),
    },
  },
};

const FeedbackRequest = {
  schema: {
    body: Type.Object({
      assessmentResults: Type.Any(),
      modelName: Type.String(),
    }),
  },
};
