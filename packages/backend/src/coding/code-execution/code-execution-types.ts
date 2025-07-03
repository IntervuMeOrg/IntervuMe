import { Static, Type } from "@sinclair/typebox";
import { ApId } from "../../common/id-generator";

export enum Programming_language {
  PYTHON= 'python',
  CPP = 'cpp',
  JAVA = 'java',
}

export const RunRequest = Type.Object({
  languageId: Type.Number(),
  sourceCode: Type.String(),
  stdin: Type.String(),
  expected: Type.String(),
  timeLimit: Type.Number(),
});

export type RunRequest = Static<typeof RunRequest>;

export const RunUserCode = Type.Object({
  questionId: ApId,
  languageId: Type.Number(),
  language: Type.Enum(Programming_language),
  userCode: Type.String(),
  stdin: Type.String(),
  expected: Type.String(),
  timeLimit: Type.Number(),
});

export type RunUserCode = Static<typeof RunUserCode>;

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
