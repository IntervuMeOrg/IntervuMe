import { Type } from "@fastify/type-provider-typebox";
import { EntitySchemaColumnOptions } from "typeorm";

export const JSON_COLUMN_TYPE = 'json'
export const JSONB_COLUMN_TYPE = 'jsonb'
export const BLOB_COLUMN_TYPE = 'bytea'
export const ARRAY_COLUMN_TYPE = String
export const TIMESTAMP_COLUMN_TYPE = 'timestamp with time zone'
export const COLLATION = 'en_natural'

export const ApIdSchema = {
    type: String,
    length: 21,
} as EntitySchemaColumnOptions

export const BaseColumnSchemaPart = {
    id: {
        ...ApIdSchema,
        primary: true,
    } as EntitySchemaColumnOptions,
    created: {
        name: 'created',
        type: TIMESTAMP_COLUMN_TYPE,
        createDate: true,
    } as EntitySchemaColumnOptions,
    updated: {
        name: 'updated',
        type: TIMESTAMP_COLUMN_TYPE,
        updateDate: true,
    } as EntitySchemaColumnOptions,
}


export const BaseModelSchema = {
    id: Type.String(),
    created: Type.String(),
    updated: Type.String(),
}