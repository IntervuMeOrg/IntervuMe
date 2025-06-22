import fp from 'fastify-plugin'
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { userService } from '../user/user.service'

const jwtPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'change-me-in-prod',
    sign: { expiresIn: '24h' }
  })

  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();

      const user = await userService.getById(request.user.sub);
      if(!user || user.tokenVersion !== request.user.tokenVersion){
          return reply.code(401).send({success: false, message: 'Token Invalidated'});
      }
    } catch {
      return reply.code(401).send({ success: false, message: 'Unauthorized' });
    }
  })
}

export default fp(jwtPlugin)
