import { Static, Type } from '@fastify/type-provider-typebox';
import { UserIdentityProvider } from "../user/user-types";
import { ProfileInput } from '../profile/profile-types';

export const SignUpRequest = Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 6 }),
    provider: Type.Enum(UserIdentityProvider),
    profile: ProfileInput,
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