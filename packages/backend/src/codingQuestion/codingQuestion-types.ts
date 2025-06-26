import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "../common/base-model";
import { TestCaseSchema, TestCaseCreateSchema, TestCaseUpdateQuestionSchema } from "../testCase/testCase-types";


export enum DifficultyLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const CodingQuestionSchema = Type.Object({
  ...BaseModelSchema,
  title: Type.String({ minLength: 1, maxLength: 200 }),
  difficulty: Type.Enum(DifficultyLevel),
  points: Type.Integer({ minimum: 1, maximum: 500 }),
  timeLimit: Type.Integer({ minimum: 5, maximum: 180 }),
  problemStatement: Type.String({ minLength: 1, maxLength: 5000 }),
  starterCode: Type.Optional(Type.String({ maxLength: 10000 })),
  solutionCode: Type.Optional(Type.String({ maxLength: 10000 })),
  testCases: Type.Array(TestCaseSchema, { minItems: 1 }),
  memoryLimit: Type.Optional(Type.Integer({ minimum: 32, maximum: 512 })),
  constraints: Type.Optional(Type.Array(Type.String({ maxLength: 200 }))),
  hints: Type.Optional(Type.Array(Type.String({ maxLength: 500 }))),
  tags: Type.Optional(Type.Array(Type.String({ maxLength: 50 }))),
  isActive: Type.Optional(Type.Boolean({ default: true })),
});

export type CodingQuestionSchema = Static<typeof CodingQuestionSchema>;

export const CreateCodingQuestionSchema = Type.Object({
  title: Type.String({ minLength: 1, maxLength: 200 }),
  category: Type.String({ minLength: 1, maxLength: 100 }),
  difficulty: Type.Enum(DifficultyLevel),
  points: Type.Integer({ minimum: 1, maximum: 500 }),
  timeLimit: Type.Integer({ minimum: 5, maximum: 180 }),
  problemStatement: Type.String({ minLength: 1, maxLength: 5000 }),
  starterCode: Type.Optional(Type.String({ maxLength: 10000 })),
  solutionCode: Type.Optional(Type.String({ maxLength: 10000 })),
  testCases: Type.Array(TestCaseCreateSchema, { minItems: 1 }),
  memoryLimit: Type.Optional(Type.Integer({ minimum: 32, maximum: 512 })),
  constraints: Type.Optional(Type.Array(Type.String({ maxLength: 200 }))),
  hints: Type.Optional(Type.Array(Type.String({ maxLength: 500 }))),
  tags: Type.Optional(Type.Array(Type.String({ maxLength: 50 }))),
  isActive: Type.Optional(Type.Boolean({ default: true })),
});

export type CreateCodingQuestionSchema = Static<typeof CreateCodingQuestionSchema>;

export const UpdateCodingQuestionSchema = Type.Partial(
  Type.Object({
    ...CreateCodingQuestionSchema.properties,
    testCases: Type.Array(TestCaseUpdateQuestionSchema, { minItems: 1 }),
  })
);


export type UpdateCodingQuestionSchema = Static<typeof UpdateCodingQuestionSchema>;

export const GetCodingQuestion = Type.Object({
    id: Type.String({ minLength: 21, maxLength: 21})
});

export type GetCodingQuestion = Static<typeof GetCodingQuestion>;