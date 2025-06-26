import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

import { StatusCodes } from "http-status-codes";
import { aiService } from "./ai.service";

export const aiController: FastifyPluginAsyncTypebox = async (app) => {
  app.addHook("onRequest", app.authenticate);

  app.post("/test", TestRequest, async (request, reply) => {
    const jobDescription = (request.body as { jobDescription: string })
      .jobDescription;
    const keywordOutput = JSON.parse(
      await aiService.getKeywords(jobDescription, "deepseek-r1")
    );

    const langs = keywordOutput.programming_languages;

    const mcqAllocOutput = JSON.parse(
      await aiService.getMcqAlloc(jobDescription, langs, 5, "deepseek-r1")
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
    const similarityOutput = JSON.parse(
      await aiService.getSimilarity(jobParsedSkills, categories, "deepseek-r1")
    );

    return {
      keywordOutput,
      langs,
      mcqAllocOutput,
      similarityOutput,
    };
  });
};

const TestRequest = {
  schema: {
    body: Type.Object({
      jobDescription: Type.String(),
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
