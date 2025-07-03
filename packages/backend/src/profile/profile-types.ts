import { Static, Type } from "@fastify/type-provider-typebox";

export const ProfileInput = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  gender: Type.Optional(Type.String()),
  dob: Type.Optional(Type.String({ format: "date" })),
  phone: Type.Optional(Type.String()),
});

export type ProfileInput = Static<typeof ProfileInput>;

export const UpdateProfileBody = Type.Object({
  firstName: Type.Optional(Type.String()),
  lastName: Type.Optional(Type.String()),
  gender: Type.Optional(Type.String()),
  dob: Type.Optional(Type.String({ format: "date" })),
  phone: Type.Optional(Type.String()),
});

export type UpdateProfileBody = Static<typeof UpdateProfileBody>;
