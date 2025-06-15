import { EntitySchema } from 'typeorm'
import { User, UserRole, UserIdentityProvider } from './user-types.js'
import { BaseColumnSchemaPart } from '../common/base-model.js'

export const UserEntity = new EntitySchema<User>({
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
        firstName: {
            type: String,
            nullable: false,
        },
        lastName: {
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
    },
    indices: [
        {
            name: 'idx_user_email',
            columns: ['email'],
            unique: true,
        },
    ],
})