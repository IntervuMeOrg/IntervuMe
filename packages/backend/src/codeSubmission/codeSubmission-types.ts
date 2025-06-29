import { Static, Type } from "@sinclair/typebox";
import { BaseModelSchema } from "../common/base-model";

export const CodeSubmissionSchema = Type.Object({
  ...BaseModelSchema,
  interviewId: Type.String(),
  questionId: Type.String(),
  code: Type.String(),
  submittedAt: Type.String({ format: "date-time" }),
});

export type CodeSubmissionSchema = Static<typeof CodeSubmissionSchema>;

export const CreateCodeSubmissionSchema = Type.Object({
  interviewId: Type.String(),
  questionId: Type.String(),
  code: Type.String(),
});

export type CreateCodeSubmissionSchema = Static<typeof CreateCodeSubmissionSchema>;

export const UpdateCodeSubmissionSchema = Type.Object({
  code: Type.String(),
});

export type UpdateCodeSubmissionSchema = Static<typeof UpdateCodeSubmissionSchema>;

export const GetCodeSubmissionSchema = Type.Object({
  id: Type.String({ minLength: 21, maxLength: 21 }),
});

export type GetCodeSubmissionSchema = Static<typeof GetCodeSubmissionSchema>;