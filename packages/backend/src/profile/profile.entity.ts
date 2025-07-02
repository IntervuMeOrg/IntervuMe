import { EntitySchema } from 'typeorm';
import {
  Profile,
  BaseColumnSchemaPart,
  TIMESTAMP_COLUMN_TYPE,
  User,
} from '@shared';

type ProfileSchema = Profile & {
  user: User;
};

export const ProfileEntity = new EntitySchema<ProfileSchema>({
  name: 'profile',
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
      nullable: false,
    },
    dob: {
      type: TIMESTAMP_COLUMN_TYPE,
      nullable: false,
    },
    phone: {
      type: String,
      nullable: false,
    },
  },

  relations: {
    user: {
      type: 'one-to-one',
      target: 'user',
      joinColumn: {
        name: 'userId',
      },
      inverseSide: 'profile',
      onDelete: 'CASCADE',
    },
  },

  indices: [
    {
      name: 'idx_profile_userId',
      columns: ['userId'],
      unique: true,
    },
  ],
});
