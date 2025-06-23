import { Static, Type } from '@fastify/type-provider-typebox';
import { BaseModelSchema } from '../common/base-model.js';
import { ProfileInput } from '../profile/profile-types.js';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

export enum UserIdentityProvider {
    EMAIL = 'EMAIL',
    GOOGLE = 'GOOGLE',
}

export const User = Type.Object({
    ...BaseModelSchema,
    email: Type.String(),
    password: Type.String(),
    role: Type.Enum(UserRole),
    provider: Type.Enum(UserIdentityProvider),
    tokenVersion: Type.Optional(Type.String()),
    resetToken: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    resetTokenExpiry: Type.Optional(Type.Union([Type.Date(), Type.Null()])),
    profile: Type.Optional(ProfileInput),
});

export type User = Static<typeof User>

export const CreateUserRequest = Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 6 }),
    role: Type.Optional(Type.Enum(UserRole)),
    provider: Type.Optional(Type.Enum(UserIdentityProvider)),
    tokenVersion: Type.Optional(Type.String()),
});

export type CreateUserRequest = Static<typeof CreateUserRequest>;

export const UpdateUserRequest = Type.Partial(
    Type.Object({
        email: Type.String({ format: 'email' }),
    })
);

export type UpdateUserRequest = Static<typeof UpdateUserRequest>;
