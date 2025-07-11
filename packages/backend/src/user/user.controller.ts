import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { userService } from "./user.service.js";
import {
  UpdateUserRequestBody,
  User,
  UserWithoutPassword,
} from "./user-types.js";
import { StatusCodes } from "http-status-codes";
import { UserRole } from "./user-types";

export const userController: FastifyPluginAsyncTypebox = async (app) => {
  app.addHook("onRequest", app.authenticate);

  app.get("/", GetUserRequest, async (request, reply) => {
    const userId = request.user.sub;
    const user = await userService.get(userId);
    return user;
  });

  app.get("/admin/users", async (request, reply) => {
    if (request.user.role !== UserRole.ADMIN) {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const users = await userService.list();
    return {
      success: true,
      data: users,
      message: "Users retrieved successfully",
    };
  });

  app.put("/", UpdateUserRequest, async (request, reply) => {
    const userId = request.user.sub;
    const updates = request.body as UpdateUserRequestBody;

    try {
      const updatedUser = await userService.update(userId, updates);
      const { password, ...rest } = updatedUser;

      return rest;
    } catch (err) {
      return reply
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: (err as Error).message });
    }
  });

  app.delete("/", DeleteUserRequest, async (request, reply) => {
    const userId = request.user.sub;
    await userService.delete(userId);
    return reply.status(StatusCodes.NO_CONTENT).send();
  });

  app.post("/logout", LogoutRequest, async (request, reply) => {
    const userId = request.user.sub;

    try {
      await userService.logout(userId);
      return reply
        .status(StatusCodes.OK)
        .send({ message: "Logged out successfully" });
    } catch (err) {
      return reply
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: (err as Error).message });
    }
  });
};

const GetUserRequest = {
  schema: {
    response: {
      [StatusCodes.OK]: User,
    },
  },
};

const UpdateUserRequest = {
  schema: {
    body: UpdateUserRequestBody,
    response: {
      [StatusCodes.OK]: UserWithoutPassword,
    },
  },
};

const DeleteUserRequest = {
  schema: {
    response: {
      [StatusCodes.NO_CONTENT]: Type.Never(),
      [StatusCodes.BAD_REQUEST]: Type.Object({ message: Type.String() }),
    },
  },
};

const LogoutRequest = {
  schema: {
    response: {
      [StatusCodes.OK]: Type.Object({ message: Type.String() }),
      [StatusCodes.BAD_REQUEST]: Type.Object({ message: Type.String() }),
    },
  },
};
