import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any;
  }

  interface FastifyRequest {
    // JWT payload
    user: {
      sub: string
      role: string
      iat: number   // issued-at timestamp
      exp: number   // expiration timestamp
    }
  }
}
