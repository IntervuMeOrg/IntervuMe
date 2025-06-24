import { EntitySchema } from 'typeorm'
import { Profile} from './profile-entity-types.js'
import { BaseColumnSchemaPart, TIMESTAMP_COLUMN_TYPE } from '../common/base-model.js'

export const ProfileEntity = new EntitySchema<Profile>({
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
        gender:{
            type : String,
            nullable: false,
        },
        dob: {
            type : TIMESTAMP_COLUMN_TYPE,
            nullable: false,
        },
        phone:{
            type : String,
            nullable: false,
        }
    },

    relations: {
        user: {
            type: 'one-to-one',
            target: 'user',               
            joinColumn: {
                name: 'userId',
            },
            inverseSide: 'profile',
            cascade:     ['insert', 'update'], 
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
})