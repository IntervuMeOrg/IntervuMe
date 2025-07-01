import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "../../common/base-model";
import { TestCase, UpdateTestCaseRequestBody } from "../test-case/test-case-types";

export enum DifficultyLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const CodingQuestion = Type.Object({
  ...BaseModelSchema,
  title: Type.String({ minLength: 1, maxLength: 200 }),
  difficulty: Type.Enum(DifficultyLevel),
  points: Type.Integer({ minimum: 1, maximum: 500 }),
  timeLimit: Type.Integer({ minimum: 5, maximum: 180 }),
  problemStatement: Type.String({ minLength: 1, maxLength: 5000 }),
  starterCode: Type.Optional(Type.String({ maxLength: 10000 })),
  solutionCode: Type.Optional(Type.String({ maxLength: 10000 })),
  testCases: Type.Array(TestCase, { minItems: 1 }),
  memoryLimit: Type.Optional(Type.Integer({ minimum: 32, maximum: 512 })),
  constraints: Type.Optional(Type.Array(Type.String({ maxLength: 200 }))),
  hints: Type.Optional(Type.Array(Type.String({ maxLength: 500 }))),
  tags: Type.Optional(Type.Array(Type.String({ maxLength: 50 }))),
  isActive: Type.Optional(Type.Boolean({ default: true })),
});

export type CodingQuestion = Static<typeof CodingQuestion>;

export const CreateCodingQuestionRequestBody = Type.Intersect([
  Type.Omit(CodingQuestion, ["id", "created", "updated", "testCases"]),
  Type.Object({
    testCases: Type.Array(UpdateTestCaseRequestBody),
  }),
]);

export type CreateCodingQuestionRequestBody = Static<
  typeof CreateCodingQuestionRequestBody
>;

export const UpdateCodingQuestionRequestBody = Type.Partial(Type.Object({
  title: Type.String({ minLength: 1, maxLength: 200 }),
  difficulty: Type.Enum(DifficultyLevel),
  points: Type.Integer({ minimum: 1, maximum: 500 }),
  timeLimit: Type.Integer({ minimum: 5, maximum: 180 }),
  problemStatement: Type.String({ minLength: 1, maxLength: 5000 }),
  starterCode: Type.String({ maxLength: 10000 }),
  solutionCode: Type.String({ maxLength: 10000 }),
  memoryLimit: Type.Integer({ minimum: 32, maximum: 512 }),
  constraints: Type.Array(Type.String({ maxLength: 200 })),
  hints: Type.Array(Type.String({ maxLength: 500 })),
  tags: Type.Array(Type.String({ maxLength: 50 })),
  isActive: Type.Boolean(),
  testCases: Type.Array(UpdateTestCaseRequestBody),
}));

export type UpdateCodingQuestionRequestBody = Static<
  typeof UpdateCodingQuestionRequestBody
>;
