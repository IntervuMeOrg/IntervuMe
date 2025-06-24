import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { authService } from "./authentication.service.js";
import {
  SignUpRequestBody,
  SignInRequestBody,
  ForgotPasswordRequestBody,
  ResetPasswordRequestBody,
} from "./authentication-types.js";
import { userService } from "../user/user.service.js";
import { UserIdentityProvider } from "../user/user-types.js";
import { StatusCodes } from "http-status-codes";
import { AuthResponse } from "./authentication-types.js";

export const authenticationController: FastifyPluginAsyncTypebox = async (
  app
) => {
  app.post("/sign-up", SignUpRequest, async (request) => {
    const body = request.body as SignUpRequestBody;
    const signUpResponse = await authService.signUp(
      {
        ...body,
        provider: UserIdentityProvider.EMAIL,
      },
      app.jwt.sign
    );

    return signUpResponse;
  });

  app.post("/sign-in", SignInRequest, async (request) => {
    const body = request.body as SignInRequestBody;

    const response = await authService.signInWithPassword(body, app.jwt.sign);

    return response;
  });

  app.post(
    "/forgot-password",
    ForgotPasswordRequest,
    async (request, reply) => {
      const email = (request.body as ForgotPasswordRequestBody).email;
      try {
        await userService.initializePasswordReset(email);
        return reply
          .status(StatusCodes.OK)
          .send({ message: "Reset code sent to your email" });
      } catch (err) {
        return reply
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: (err as Error).message });
      }
    }
  );

  app.post("/reset-password", ResetPasswordRequest, async (request, reply) => {
    const data = request.body as ResetPasswordRequestBody;
    try {
      await userService.resetPassword(data);
      return reply
        .status(StatusCodes.OK)
        .send({ message: "Password reset successfully" });
    } catch (err) {
      return reply
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: (err as Error).message });
    }
  });
};

const SignUpRequest = {
  schema: {
    body: SignUpRequestBody,
    response: {
      [StatusCodes.OK]: AuthResponse,
    },
  },
};

const SignInRequest = {
  schema: {
    body: SignInRequestBody,
    response: {
      [StatusCodes.OK]: AuthResponse,
    },
  },
};

const ForgotPasswordRequest = {
  schema: {
    body: ForgotPasswordRequestBody,
    response: {
      [StatusCodes.OK]: Type.Object({ message: Type.String() }),
      [StatusCodes.BAD_REQUEST]: Type.Object({ message: Type.String() }),
    },
  },
};

const ResetPasswordRequest = {
  schema: {
    body: ResetPasswordRequestBody,
    response: {
      [StatusCodes.OK]: Type.Object({ message: Type.String() }),
      [StatusCodes.BAD_REQUEST]: Type.Object({ message: Type.String() }),
    },
  },
};
