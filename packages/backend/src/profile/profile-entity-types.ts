import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "../common/base-model.js";
import { ApId } from "../common/id-generator";

export const Profile = Type.Object({
  ...BaseModelSchema,
  userId: ApId,
  firstName: Type.String(),
  lastName: Type.String(),
  gender: Type.String(),
  dob: Type.String({ format: "date" }),
  phone: Type.String(),
});

export type Profile = Static<typeof Profile>;
