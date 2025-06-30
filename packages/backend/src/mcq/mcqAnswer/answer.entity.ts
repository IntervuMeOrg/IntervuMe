import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "../../common/base-model";
import { AnswerSchema } from "./answer-types";
import { InterviewSchema } from "../../interview/interview-types";

export type AnswerEntity = AnswerSchema & {
  interview: InterviewSchema;
};

export const AnswerEntitySchema = new EntitySchema<AnswerEntity>({
  name: "answer",
  columns: {
    ...BaseColumnSchemaPart,
    interviewId: {
      type: String,
      nullable: false,
    },
    questionId: {
      type: String,
      nullable: false,
      comment: "MCQ question ID",
    },
    selectedOptionId: {
      type: String,
      nullable: false,
      comment: "User selected option ID",
    },
    correctOptionId: {
      type: String,
      nullable: false,
      comment: "Snapshot of correct option ID",
    },
    isCorrect: {
      type: Boolean,
      nullable: false,
    },
    timeSpent: {
      type: Number,
      nullable: true,
      comment: "Time spent in seconds",
    },
  },
  relations: {
    interview: {
      type: "many-to-one",
      target: "Interview",
      joinColumn: { name: "interviewId" },
    },
  },
  indices: [
    {
      name: "IDX_ANSWER_INTERVIEW_ID",
      columns: ["interviewId"],
    },
    {
      name: "IDX_ANSWER_QUESTION_ID",
      columns: ["questionId"],
    },
    {
      name: "IDX_ANSWER_INTERVIEW_QUESTION",
      columns: ["interviewId", "questionId"],
      unique: true,
    },
  ],
});
