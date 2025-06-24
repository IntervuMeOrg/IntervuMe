import { EntitySchema } from 'typeorm'
import { User, UserRole, UserIdentityProvider } from './user-types.js'
import { BaseColumnSchemaPart, TIMESTAMP_COLUMN_TYPE } from '../common/base-model.js'
import { Profile } from '../profile/profile-entity-types.js'

type UserSchema = User & {
    profile: Profile
}

export const UserEntity = new EntitySchema<UserSchema>({
    name: 'user',
    columns: {
        ...BaseColumnSchemaPart,
        email: {
            type: String,
            nullable: false,
            unique: true,
        },
        password: {
            type: String,
            nullable: false,
        },
        role: {
            type: 'enum',
            enum: UserRole,
            default: UserRole.USER,
        },
        provider: {
            type: 'enum',
            enum: UserIdentityProvider,
            default: UserIdentityProvider.EMAIL,
        },
        tokenVersion: {
            type: String,
            nullable: true,
        },
        resetToken: {
            type: String,
            nullable: true,
        },
        resetTokenExpiry: {
            type: TIMESTAMP_COLUMN_TYPE,
            nullable: true,
        }
    },
    relations: {
        profile: {
            type: 'one-to-one',
            target: 'profile',
            inverseSide: 'user',
            cascade: true,
            eager: false,
        },
    },
    indices: [
        {
            name: 'idx_user_email',
            columns: ['email'],
            unique: true,
        },
    ],
})