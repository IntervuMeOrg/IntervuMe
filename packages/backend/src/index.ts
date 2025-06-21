import "reflect-metadata";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { config } from "dotenv";
import { AppDataSource } from "./database/data-source.js";
import { authenticationController } from "./auth/auth.controller.js";
import { userController } from "./user/user.controller.js";

config();

const fastify = Fastify({
  logger: true,
});

// Register JWT
await fastify.register(jwt, {
  secret: process.env.JWT_SECRET || "your-secret-key-change-in-production",
  sign: { expiresIn: "24h" },
});

fastify.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch {
    reply.code(401).send({ success: "false", message: "unauthorized" });
  }
});

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
  await fastify.register(authenticationController, { prefix: "/api/auth" });
  await fastify.register(userController, { prefix: "/api/user" });
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
