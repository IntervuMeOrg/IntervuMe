import Fastify from 'fastify';
import cors from '@fastify/cors';
import { config } from 'dotenv';

config();

const fastify = Fastify({
  logger: true
});

// Register CORS
await fastify.register(cors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
});

// Health check route
fastify.get('/health', async () => {
  return {
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    },
    message: 'Server is healthy'
  };
});

// API routes
fastify.get('/api/health', async () => {
  return {
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    },
    message: 'Server is healthy'
  };
});

fastify.get('/api/hello', async () => {
  return {
    success: true,
    data: {
      message: 'Hello from IntervuMe API!',
      version: '1.0.0'
    },
    message: 'API is working correctly'
  };
});

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '5000', 10);
    const host = process.env.HOST || '0.0.0.0';
    
    await fastify.listen({ port, host });
    console.log(`🚀 Server running on http://${host}:${port}`);
    console.log(`📚 Health check: http://${host}:${port}/health`);
    console.log(`🔗 API endpoint: http://${host}:${port}/api/hello`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start(); 