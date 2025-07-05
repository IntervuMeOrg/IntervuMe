import { extractJson } from "./utils";
import {
  codingDifficultyPrompt,
  feedbackPrompt,
  keywordPrompt,
  mcqAllocPrompt,
  similarityPrompt,
} from "./prompts";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import {
  AssessmentResults,
  FeedbackResponse,
  AllocationResponse,
  KeywordExtractionResponse,
  SimilarityResponse,
  CodingDifficultyResponse,
  ComprehensiveAnalysisResponse,
} from "./types";
import { mcqQuestionService } from "../mcq/mcq-question/mcq-question.service";

// Model configuration
const MODEL_CONFIGS = {
  // OpenAI models
  "gpt-4o": {
    provider: "openai",
    baseURL: process.env.OPENAI_BASE_URL,
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4o",
  },
  "gpt-4o-mini": {
    provider: "openai",
    baseURL: process.env.OPENAI_BASE_URL,
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4o-mini",
  },
  // OpenRouter/DeepSeek models
  "deepseek-r1": {
    provider: "openrouter",
    baseURL: process.env.OPENROUTER_BASE_URL,
    apiKey: process.env.OPENROUTER_API_KEY,
    model: "deepseek/deepseek-r1:free",
  },

  "gemini-2.5-flash": {
    provider: "google",
    baseURL: process.env.GEMINI_BASE_URL,
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-2.5-flash",
  },

  "gemini-2.5-flash-lite": {
    provider: "google",
    baseURL: process.env.GEMINI_BASE_URL,
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-2.5-flash-lite",
  },

  "gemini-2.0-flash": {
    provider: "google",
    baseURL: process.env.GEMINI_BASE_URL,
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-2.0-flash",
  },

  "gemini-2.0-flash-lite": {
    provider: "google",
    baseURL: process.env.GEMINI_BASE_URL,
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-2.0-flash-lite",
  },
} as const;

export const aiService = {
  async getKeywords(
    jobDescription: string,
    modelName: string
  ): Promise<KeywordExtractionResponse> {
    const model = this.getModel(modelName);
    const generatedText = await generateText({
      model,
      prompt: keywordPrompt(jobDescription),
    });
    const json = extractJson(generatedText.text);
    if (!json) {
      throw new Error("No JSON found in the response");
    }
    return JSON.parse(json) as KeywordExtractionResponse;
  },

  async getMcqAlloc(
    jobDescription: string,
    langs: string[],
    numQuestions: number,
    modelName: string
  ): Promise<AllocationResponse> {
    const model = this.getModel(modelName);
    const generatedText = await generateText({
      model,
      prompt: mcqAllocPrompt(jobDescription, langs, numQuestions),
    });
    const json = extractJson(generatedText.text);
    if (!json) {
      throw new Error("No JSON found in the response");
    }
    return JSON.parse(json) as AllocationResponse;
  },

  async getSimilarity(
    jobParsedSkills: string[],
    categories: string[],
    modelName: string
  ): Promise<SimilarityResponse> {
    const model = this.getModel(modelName);
    const generatedText = await generateText({
      model,
      prompt: similarityPrompt(jobParsedSkills, categories),
    });
    const json = extractJson(generatedText.text);
    if (!json) {
      throw new Error("No JSON found in the response");
    }
    return JSON.parse(json) as SimilarityResponse;
  },

  async getCodingDifficulty(
    jobDescription: string,
    modelName: string
  ): Promise<CodingDifficultyResponse> {
    const model = this.getModel(modelName);
    const generatedText = await generateText({
      model,
      prompt: codingDifficultyPrompt(jobDescription),
    });
    const json = extractJson(generatedText.text);
    if (!json) {
      throw new Error("No JSON found in the response");
    }
    return JSON.parse(json) as CodingDifficultyResponse;
  },

  async analyzeJobDescription(
    jobDescription: string,
    modelName: string,
    numMcqQuestions: number = 5
  ): Promise<ComprehensiveAnalysisResponse> {
    const keywords = await this.getKeywords(jobDescription, modelName);
    const jobTitle = keywords.job_title;
    const langs = keywords.programming_languages;
    const techs = keywords.tools_technologies;
    const seniority = keywords.seniority;

    const topics = [...new Set([...langs, ...techs])];

    const mcqTags = await mcqQuestionService.getAllUniqueTags();

    const [mcqAllocation, similarity, codingDifficulty] = await Promise.all([
      this.getMcqAlloc(jobDescription, langs, numMcqQuestions, modelName),
      this.getSimilarity(
        topics,
        mcqTags, 
        modelName
      ),
      this.getCodingDifficulty(jobDescription, modelName),
    ]);

    return {
      jobTitle,
      keywords,
      mcqAllocation,
      similarity,
      codingDifficulty,
      seniority,
    };
  },

  async getFeedback(
    assessmentResults: AssessmentResults,
    modelName: string
  ): Promise<FeedbackResponse> {
    const model = this.getModel(modelName);

    const generatedText = await generateText({
      model,
      prompt: feedbackPrompt(assessmentResults),
    });

    // Parse the JSON response
    const parsedJson = extractJson(generatedText.text);
    if (!parsedJson) {
      throw new Error("Failed to parse feedback response as JSON");
    }
    const feedback = JSON.parse(parsedJson) as FeedbackResponse;
    return feedback;
  },

  getModel(modelName: string) {
    const config = MODEL_CONFIGS[modelName as keyof typeof MODEL_CONFIGS];
    if (!config) {
      throw new Error(`Model ${modelName} not found in configuration`);
    }

    return createOpenAI({
      baseURL: config.baseURL,
      apiKey: config.apiKey,
    }).chat(config.model);
  },
};
