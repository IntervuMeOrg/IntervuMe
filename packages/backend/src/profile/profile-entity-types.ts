import { User } from '../user/user-types';
import { BaseModelSchema } from '../common/base-model.js';
import { Static, Type } from '@fastify/type-provider-typebox';

export const Profile = Type.Object({
    ...BaseModelSchema,
    userId: Type.String(),
    firstName: Type.String(),
    lastName: Type.String(),
    gender: Type.String(),
    dob: Type.String({ format: 'date' }),
    phone: Type.String(),
    user: User
});

export type Profile = Static<typeof Profile>;