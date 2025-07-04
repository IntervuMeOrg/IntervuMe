import { Static, Type } from "@sinclair/typebox";
import { ApId } from "../../common/id-generator";

export enum Programming_language {
  PYTHON= 'python',
  CPP = 'cpp',
  JAVA = 'java',
}

export const LANGUAGE_MAP = {
  'c++': 54,
  'cpp': 54,
  'c': 50,
  'java': 62,
  'python': 71,
  'python3': 71,
  'javascript': 63,
  'js': 63,
  'typescript': 74,
  'ts': 74,
  'go': 60,
  'golang': 60,
  'rust': 73,
  'php': 68,
  'ruby': 72,
  'swift': 83,
  'kotlin': 78,
  'scala': 81,
  'csharp': 51,
  'c#': 51,
} 

export const RunCode = Type.Object({
  questionId: ApId,
  languageId: Type.Number(),
  language: Type.Enum(Programming_language),
  userCode: Type.String(),
  stdin: Type.String(),
  expected: Type.String(),
  timeLimit: Type.Number(),
});

export type RunCode = Static<typeof RunCode>;

export const RunCodeRequestBody = Type.Object({
  questionId: ApId,
  language: Type.Enum(Programming_language),
  userCode: Type.String(),
  stdin: Type.String(),
  expected: Type.String(),
  timeLimit: Type.Number(),
});

export type RunCodeRequestBody = Static<typeof RunCodeRequestBody>;

export const Judge0Response = Type.Object({
  stdout: Type.Optional(Type.String()),
  time: Type.Optional(Type.String()),
  memory: Type.Optional(Type.Number()),
  status: Type.Object({
    description: Type.String(),
  }),
});

export type Judge0Response = Static<typeof Judge0Response>;

export const RunResult = Type.Object({
  stdout: Type.String(),
  status: Type.String(),
  time: Type.Number(),
});

export type RunResult = Static<typeof RunResult>;
