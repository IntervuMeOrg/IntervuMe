import { FastifyPluginCallback } from 'fastify';
import { codeExecutionController } from './code-execution.controller';

export const codeExecutionModule: FastifyPluginCallback = async(app) => {
  app.register(codeExecutionController, { prefix: '/api/code-execution' });
};