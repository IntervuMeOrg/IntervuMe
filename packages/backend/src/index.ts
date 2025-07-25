import "reflect-metadata";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { config } from "dotenv";
import { AppDataSource } from "./database/data-source.js";
import jwtPlugin from "./plugins/jwt";
import { authenticationModule } from "./authentication/authentication.module.js";
import { userModule } from "./user/user.module.js";
import { profileModule } from "./profile/profile.module.js";
import { codingQuestionModule } from "./coding/coding-question/codingQuestion.module.js";
import { testCaseModule } from "./coding/test-case/test-case.module.js";
import { mcqOptionModule } from "./mcq/mcq-option/mcq-option.module.js";
import { mcqQuestionModule } from "./mcq/mcq-question/mcq-question.module.js";
import { interviewQuestionModule } from "./interview/interview-question/interview-question.module.js";
import { mcqAnswerModule } from "./mcq/mcq-answer/mcq-answer.module.js";
import { interviewModule } from "./interview/interview.module.js";
import { codeSubmissionModule } from "./coding/code-submission/codeSubmission.module.js";
import { aiModule } from "./ai/ai.module.js";
import { codeExecutionModule } from "./coding/code-execution/code-execution.module.js";
import { testCaseResultModule } from "./coding/test-case-result/testCaseResult.module.js";
import { interviewService } from "./interview/interview.service.js";

config();

const fastify = Fastify({
  logger: false,
});

fastify.register(jwtPlugin);

// Register CORS
await fastify.register(cors, {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
});

// Initialize database (optional - won't crash if DB is not available)
let databaseConnected = false;
try {
  await AppDataSource.initialize();
  databaseConnected = true;
  console.log("✅ Database connection established");
  interviewService.initializeScheduler();
} catch (error) {
  console.warn(
    "⚠️  Database connection failed (continuing without database):",
    error instanceof Error ? error.message : String(error)
  );
  console.warn(
    "💡 To fix: Make sure PostgreSQL is running and environment variables are set correctly"
  );
}

// Health check route
fastify.get("/health", async () => {
  return {
    success: true,
    data: {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: databaseConnected ? "connected" : "disconnected",
    },
    message: "Server is healthy",
  };
});

// API routes
fastify.get("/api/health", async () => {
  return {
    success: true,
    data: {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: databaseConnected ? "connected" : "disconnected",
    },
    message: "Server is healthy",
  };
});

// Register auth routes (only if database is connected)
if (databaseConnected) {
  await fastify.register(authenticationModule);
  await fastify.register(userModule);
  await fastify.register(profileModule);
  await fastify.register(codingQuestionModule);
  await fastify.register(codeSubmissionModule);
  await fastify.register(testCaseModule);
  await fastify.register(mcqOptionModule);
  await fastify.register(mcqQuestionModule);
  await fastify.register(interviewQuestionModule);
  await fastify.register(mcqAnswerModule);
  await fastify.register(interviewModule);
  await fastify.register(aiModule);
  await fastify.register(codeExecutionModule);
  await fastify.register(testCaseResultModule);
} else {
  // Fallback routes when database is not available
  fastify.get("/api/auth/*", async () => {
    return {
      success: false,
      message:
        "Database not connected. Please set up PostgreSQL to use auth endpoints.",
    };
  });

  fastify.get("/api/user/*", async () => {
    return {
      success: false,
      message:
        "Database not connected. Please set up PostgreSQL to use user endpoints.",
    };
  });
}

fastify.get("/api/hello", async () => {
  return {
    success: true,
    data: {
      message: "Hello from IntervuMe API!",
      version: "1.0.0",
    },
    message: "API is working correctly",
  };
});

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || "5000", 10);
    const host = process.env.HOST || "0.0.0.0";

    await fastify.listen({ port, host });
    console.log(`🚀 Server running on http://${host}:${port}`);
    console.log(`📚 Health check: http://${host}:${port}/health`);
    if (databaseConnected) {
      console.log(`🔗 Auth endpoints: http://${host}:${port}/api/auth`);
      console.log(`👤 User endpoints: http://${host}:${port}/api/user`);
    } else {
      console.log(`⚠️  Auth/User endpoints disabled - database not connected`);
    }
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
