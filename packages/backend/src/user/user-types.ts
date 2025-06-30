import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "../common/base-model.js";
import { Profile } from "../profile/profile-entity-types.js";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export enum UserIdentityProvider {
  EMAIL = "EMAIL",
  GOOGLE = "GOOGLE",
}

export const User = Type.Object({
  ...BaseModelSchema,
  email: Type.String(),
  password: Type.Optional(Type.String()),
  role: Type.Enum(UserRole),
  provider: Type.Enum(UserIdentityProvider),
  tokenVersion: Type.Optional(Type.String()),
  resetToken: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  resetTokenExpiry: Type.Optional(Type.Union([Type.Date(), Type.Null()])),
});

export type User = Static<typeof User>;

export const UserWithoutPassword = Type.Omit(User, ["password"]);

export type UserWithoutPassword = Static<typeof UserWithoutPassword>;

export const UserWithProfile = Type.Composite([
  UserWithoutPassword,
  Type.Pick(Profile, ["firstName", "lastName", "gender", "dob", "phone"]),
]);

export type UserWithProfile = Static<typeof UserWithProfile>;

export const CreateUserRequestBody = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.Optional(Type.String({ minLength: 6 })),
  role: Type.Optional(Type.Enum(UserRole)),
  provider: Type.Optional(Type.Enum(UserIdentityProvider)),
  tokenVersion: Type.Optional(Type.String()),
});

export type CreateUserRequestBody = Static<typeof CreateUserRequestBody>;

export const UpdateUserRequestBody = Type.Partial(
  Type.Object({
    email: Type.String({ format: "email" }),
  })
);

export type UpdateUserRequestBody = Static<typeof UpdateUserRequestBody>;

export const GoogleUserInfo = Type.Object({
  email: Type.String({ format: "email" }),
  firstName: Type.String(),
  lastName: Type.String(),
  provider: Type.Optional(Type.Enum(UserIdentityProvider)),
});

export type GoogleUserInfo = Static<typeof GoogleUserInfo>;
