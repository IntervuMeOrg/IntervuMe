import { EntitySchema } from "typeorm";
import { Profile } from "./profile-entity-types.js";
import {
  BaseColumnSchemaPart,
  TIMESTAMP_COLUMN_TYPE,
} from "../common/base-model.js";
import { User } from "../user/user-types.js";

type ProfileSchema = Profile & {
  user: User;
};

export const ProfileEntity = new EntitySchema<ProfileSchema>({
  name: "profile",
  columns: {
    ...BaseColumnSchemaPart,
    userId: {
      type: String,
      nullable: false,
      unique: true,
    },
    firstName: {
      type: String,
      nullable: false,
    },
    lastName: {
      type: String,
      nullable: false,
    },
    gender: {
      type: String,
      nullable: true,
    },
    dob: {
      type: TIMESTAMP_COLUMN_TYPE,
      nullable: true,
    },
    phone: {
      type: String,
      nullable: true,
    },
  },

  relations: {
    user: {
      type: "one-to-one",
      target: "user",
      joinColumn: {
        name: "userId",
      },
      inverseSide: "profile",
      onDelete: "CASCADE",
    },
  },

  indices: [
    {
      name: "idx_profile_userId",
      columns: ["userId"],
      unique: true,
    },
  ],
});
