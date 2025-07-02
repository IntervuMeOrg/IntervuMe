import { Static, Type } from "@fastify/type-provider-typebox";
import { BaseModelSchema } from "@shared/common/base-model";
import { TestCase, UpdateTestCaseRequestBody } from "@shared/coding/test-case-types";

export enum DifficultyLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const StarterCodes = Type.Object(
  {
    codeHeader: Type.Object(
      {
        cpp: Type.String({ minLength: 0, maxLength: 10000 }),
        java: Type.String({ minLength: 0, maxLength: 10000 }),
        python: Type.String({ minLength: 0, maxLength: 10000 }),
      },
      { description: "Code to prepend before the user stub" }
    ),

    codeStarter: Type.Object(
      {
        cpp: Type.String({ minLength: 0, maxLength: 10000 }),
        java: Type.String({ minLength: 0, maxLength: 10000 }),
        python: Type.String({ minLength: 0, maxLength: 10000 }),
      },
      { description: "The actual stub the user will fill in" }
    ),

    codeFooter: Type.Object(
      {
        cpp: Type.String({ minLength: 0, maxLength: 10000 }),
        java: Type.String({ minLength: 0, maxLength: 10000 }),
        python: Type.String({ minLength: 0, maxLength: 10000 }),
      },
      { description: "Code to append after the user stub" }
    ),
  },
  {
    description: "Headers, starters, and footers for each supported language",
  }
);

export const Example = Type.Object({
  input: Type.String({ minLength: 1, maxLength: 1000 }),
  output: Type.String({ minLength: 1, maxLength: 1000 }),
  explanation: Type.Optional(Type.String({ minLength: 1, maxLength: 3000 })),
});

export const CodingQuestion = Type.Object({
  ...BaseModelSchema,
  title: Type.String({ minLength: 1, maxLength: 200 }),
  category: Type.String({ minLength: 1, maxLength: 100 }),
  difficulty: Type.Enum(DifficultyLevel),
  points: Type.Integer({ minimum: 1, maximum: 500 }),
  timeLimit: Type.Integer({ minimum: 5, maximum: 180 }),
  problemStatement: Type.String({ minLength: 1, maxLength: 5000 }),
  starterCode: StarterCodes,
  solutionCode: Type.Optional(Type.String({ maxLength: 10000 })),
  testCases: Type.Array(TestCase, { minItems: 1 }),
  examples: Type.Array(Example),
  memoryLimit: Type.Optional(Type.Integer({ minimum: 32, maximum: 512 })),
  constraints: Type.Optional(Type.Array(Type.String({ maxLength: 200 }))),
  followUp: Type.Optional(Type.Array(Type.String({ maxLength: 2000 }))),
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

export const UpdateCodingQuestionRequestBody = Type.Partial(CreateCodingQuestionRequestBody);

export type UpdateCodingQuestionRequestBody = Static<
  typeof UpdateCodingQuestionRequestBody
>;
