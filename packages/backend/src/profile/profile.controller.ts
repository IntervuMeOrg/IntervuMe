import { Profile, UpdateProfileBody } from "@shared";
import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { profileService } from "./profile.service";
import { StatusCodes } from "http-status-codes";

export const profileController: FastifyPluginAsyncTypebox = async (app) => {
  app.addHook("onRequest", app.authenticate);

  app.get("/", GetProfileRequest, async (request, reply) => {
    const userId = request.user.sub;
    const profile = await profileService.getByUserId(userId);
    if (!profile) {
      return reply.status(StatusCodes.NOT_FOUND).send();
    }
    return profile;
  });

  app.put("/", UpdateProfileRequest, async (request, reply) => {
    const userId = request.user.sub;
    const updates = request.body as UpdateProfileBody;
    try {
      const updatedProfile = await profileService.update(userId, updates);
      return updatedProfile;
    } catch (err) {
      return reply
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: (err as Error).message });
    }
  });
};

const GetProfileRequest = {
  schema: {
    tags: ["profile"],
    description: "Get profile",
    response: {
      [StatusCodes.OK]: Profile,
      [StatusCodes.NOT_FOUND]: Type.Never(),
    },
  },
};

const UpdateProfileRequest = {
  schema: {
    tags: ["profile"],
    body: UpdateProfileBody,
    response: {
      [StatusCodes.OK]: Profile,
      [StatusCodes.BAD_REQUEST]: Type.Object({ message: Type.String() }),
    },
  },
};
