import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

import { StatusCodes } from "http-status-codes";
import {
  CreateMcqOptionRequestBody,
  McqOption,
  UpdateMcqOptionRequestBody,
} from "./mcq-option-types";
import { McqOptionService } from "./mcq-option.service";
import { ApId } from "../../common/id-generator";
import { UserRole } from "../../user/user-types";

export const mcqOptionController: FastifyPluginAsyncTypebox = async (app) => {
  app.addHook("onRequest", app.authenticate);

  app.post("/", CreateMcqOptionRequest, async (request, reply) => {
    if (request.user.role !== UserRole.ADMIN) {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const body = request.body as CreateMcqOptionRequestBody;
    return await McqOptionService.create(body);
  });

  app.get("/:id", GetMcqOptionRequest, async (request, reply) => {
    const { id } = request.params as { id: string };
    const McqOption = await McqOptionService.get(id);
    return McqOption;
  });

  app.put("/:id", UpdateMcqOptionRequest, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as UpdateMcqOptionRequestBody;
    const McqOption = await McqOptionService.update(id, body);
    return McqOption;
  });

  app.delete("/:id", DeleteMcqOptionRequest, async (request, reply) => {
    if (request.user.role !== UserRole.ADMIN) {
      return reply
        .status(StatusCodes.FORBIDDEN)
        .send({ message: "Forbidden: admins only" });
    }

    const { id } = request.params as { id: string };
    await McqOptionService.delete(id);
    return reply.status(StatusCodes.NO_CONTENT).send();
  });
};

const CreateMcqOptionRequest = {
  schema: {
    body: CreateMcqOptionRequestBody,
    response: {
      [StatusCodes.OK]: McqOption,
    },
  },
};

const GetMcqOptionRequest = {
  schema: {
    params: {
      id: ApId,
    },
    response: {
      [StatusCodes.OK]: McqOption,
    },
  },
};

const UpdateMcqOptionRequest = {
  schema: {
    params: {
      id: ApId,
    },
    response: {
      [StatusCodes.OK]: McqOption,
    },
  },
};

const DeleteMcqOptionRequest = {
  schema: {
    params: {
      id: ApId,
    },
  },
  response: {
    [StatusCodes.NO_CONTENT]: Type.Never(),
  },
};
