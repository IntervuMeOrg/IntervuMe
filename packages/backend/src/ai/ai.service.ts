import { extractJson } from "./utils";
import { keywordPrompt, mcqAllocPrompt, similarityPrompt } from "./prompts";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

// Model configuration
const MODEL_CONFIGS = {
  // OpenAI models
  "gpt-4o": {
    provider: "openai",
    baseURL: "https://api.openai.com/v1",
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4o",
  },
  "gpt-4o-mini": {
    provider: "openai",
    baseURL: "https://api.openai.com/v1",
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4o-mini",
  },
  // OpenRouter/DeepSeek models
  "deepseek-r1": {
    provider: "openrouter",
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    model: "deepseek/deepseek-r1:free",
  },
} as const;

export const aiService = {
  async getKeywords(
    jobDescription: string,
    modelName: keyof typeof MODEL_CONFIGS
  ): Promise<string> {
    const model = this.getModel(modelName);
    const generatedText = await generateText({
      model,
      prompt: keywordPrompt(jobDescription),
    });

    const json = extractJson(generatedText.text);
    if (!json) {
      throw new Error("No JSON found in the response");
    }
    return json;
  },

  async getMcqAlloc(
    jobDescription: string,
    langs: string[],
    numQuestions: number,
    modelName: keyof typeof MODEL_CONFIGS
  ): Promise<string> {
    const model = this.getModel(modelName);
    const generatedText = await generateText({
      model,
      prompt: mcqAllocPrompt(jobDescription, langs, numQuestions),
    });

    const json = extractJson(generatedText.text);
    if (!json) {
      throw new Error("No JSON found in the response");
    }
    return json;
  },

  async getSimilarity(
    jobParsedSkills: string[],
    categories: string[],
    modelName: keyof typeof MODEL_CONFIGS
  ): Promise<string> {
    const model = this.getModel(modelName);
    const generatedText = await generateText({
      model,
      prompt: similarityPrompt(jobParsedSkills, categories),
    });

    const json = extractJson(generatedText.text);
    if (!json) {
      throw new Error("No JSON found in the response");
    }
    return json;
  },

  getModel(modelName: keyof typeof MODEL_CONFIGS) {
    const config = MODEL_CONFIGS[modelName];
    if (!config) {
      throw new Error(`Model ${modelName} not found in configuration`);
    }

    return createOpenAI({
      baseURL: config.baseURL,
      apiKey: config.apiKey,
    }).chat(config.model);
  },
};
