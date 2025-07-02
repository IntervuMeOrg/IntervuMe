import { Static, Type } from "@fastify/type-provider-typebox";
import { UserIdentityProvider, UserWithoutPassword } from "@shared/user/user-types";
import { ProfileInput } from "@shared/profile/profile-types";
import { Profile } from "@shared/profile/profile-entity-types";


export const SignUpRequestBody = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 6 }),
  provider: Type.Enum(UserIdentityProvider),
  profile: ProfileInput,
});

export type SignUpRequestBody = Static<typeof SignUpRequestBody>;

export const SignInRequestBody = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 1 }),
});

export type SignInRequestBody = Static<typeof SignInRequestBody>;

export const ForgotPasswordRequestBody = Type.Object({
  email: Type.String({ format: "email" }),
});

export type ForgotPasswordRequestBody = Static<
  typeof ForgotPasswordRequestBody
>;

export const ResetPasswordRequestBody = Type.Object({
  email: Type.String({ format: "email" }),
  otp: Type.String(),
  password: Type.String({ minLength: 6 }),
});

export type ResetPasswordRequestBody = Static<typeof ResetPasswordRequestBody>;

export const AuthResponse = Type.Composite([
  UserWithoutPassword,
  Type.Partial(
    Type.Pick(Profile, ["firstName", "lastName", "gender", "dob", "phone"])
  ),
  Type.Object({
    token: Type.String(),
  }),
]);

export type AuthResponse = Static<typeof AuthResponse>;
