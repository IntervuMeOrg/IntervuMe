import { Static, Type } from '@fastify/type-provider-typebox';

export const ProfileInput = Type.Object({
    firstName: Type.String(),
    lastName: Type.String(),
    gender: Type.String(),
    dob: Type.String({ format: 'date' }),
    phone: Type.String(),
});

export type ProfileInput = Static<typeof ProfileInput>;

export const UpdateProfileRequest = Type.Partial(
    Type.Object({
    firstName: Type.String(),
    lastName: Type.String(),
    gender: Type.String(),
    dob: Type.String({ format: 'date' }),
    phone: Type.String(),
    })
);

export type UpdateProfileRequest = Static<typeof UpdateProfileRequest>;