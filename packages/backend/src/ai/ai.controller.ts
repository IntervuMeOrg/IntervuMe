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

    const keywordOutput = await aiService.getKeywords(
      jobDescription,
      modelName
    );
    const langs = keywordOutput.programming_languages;

    const mcqAllocOutput = await aiService.getMcqAlloc(
      jobDescription,
      langs,
      5,
      modelName
    );

    const jobParsedSkills = ["Python", "SQL", "Machine Learning"];
    const categories = [
      "AI & ML",
      "Software Development",
      "Data Science",
      "Cloud Technologies",
      "Cybersecurity",
      "DevOps & CI/CD",
      "Database Management",
      "Web Development",
      "Mobile App Development",
      "Blockchain & Web3",
      "Python",
      "JavaScript",
      "Java",
      "C++",
      "C#",
      "Ruby",
      "Go",
      "Swift",
      "PHP",
      "Rust",
      "Project Management",
      "Agile & Scrum",
      "Product Management",
      "Business Analysis",
      "IT Service Management (ITIL)",
      "Networking Fundamentals",
      "System Administration",
      "Cloud Computing (AWS, Azure, GCP)",
      "Communication Skills",
      "Leadership & Team Management",
      "Problem-Solving",
      "Critical Thinking",
    ];
    const similarityOutput = await aiService.getSimilarity(
      jobParsedSkills,
      categories,
      modelName
    );

    return {
      keywordOutput,
      langs,
      mcqAllocOutput,
      similarityOutput,
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
