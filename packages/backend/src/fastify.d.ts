import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { role: string };
    user: {
      sub: string;
      role: string;
      iat: number;
      exp: number;
      tokenVersion: string
    };
  }
}
