import { Static, Type } from '@fastify/type-provider-typebox';
import { BaseModelSchema } from '../common/base-model.js';

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
    firstName: Type.String(),
    lastName: Type.String(),
    email: Type.String(),
    password: Type.String(),
    role: Type.Enum(UserRole),
    provider: Type.Enum(UserIdentityProvider),
    tokenVersion: Type.Optional(Type.String()),
    resetToken: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    resetTokenExpiry: Type.Optional(Type.Union([Type.Date(), Type.Null()])),
})

export type User = Static<typeof User>

export const CreateUserRequest = Type.Object({
    email: Type.String({ format: 'email' }),
    firstName: Type.String({ minLength: 1 }),
    lastName: Type.String({ minLength: 1 }),
    password: Type.String({ minLength: 6 }),
    role: Type.Optional(Type.Enum(UserRole)),
    provider: Type.Optional(Type.Enum(UserIdentityProvider)),
    tokenVersion: Type.Optional(Type.String()),
});

export type CreateUserRequest = Static<typeof CreateUserRequest>;

export const UpdateUserRequest = Type.Partial(
    Type.Object({
        email: Type.String({ format: 'email' }),
        firstName: Type.String({ minLength: 1 }),
        lastName: Type.String({ minLength: 1 }),
    })
);

export type UpdateUserRequest = Static<typeof UpdateUserRequest>;

export const SignUpRequest = Type.Object({
    email: Type.String({ format: 'email' }),
    firstName: Type.String({ minLength: 1 }),
    lastName: Type.String({ minLength: 1 }),
    password: Type.String({ minLength: 6 }),
    provider: Type.Enum(UserIdentityProvider),
});

export type SignUpRequest = Static<typeof SignUpRequest>;

export const SignInRequest = Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 1 }),
});

export type SignInRequest = Static<typeof SignInRequest>; 

export const ForgotPasswordRequest = Type.Object({
    email: Type.String({ format: 'email' }),
})

export type ForgotPasswordRequest = Static<typeof ForgotPasswordRequest>

export const ResetPasswordRequest = Type.Object({
    email: Type.String({ format: 'email' }),
    otp: Type.String(),
    password: Type.String({ minLength: 6 }),
})

export type ResetPasswordRequest = Static<typeof ResetPasswordRequest>