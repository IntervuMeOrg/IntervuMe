import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "../../common/base-model";
import { McqAnswer } from "./mcq-answer-types";
import { Interview } from "../../interview/interview-types";

export type McqAnswerSchema = McqAnswer & {
  interview: Interview;
};

export const McqAnswerEntity = new EntitySchema<McqAnswerSchema>({
  name: "mcq_answer",
  columns: {
    ...BaseColumnSchemaPart,
    interviewId: {
      type: String,
      nullable: false,
    },
    questionId: {
      type: String,
      nullable: false,
      comment: "Mcq question ID",
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
      target: "interview",
      joinColumn: { name: "interviewId" },
      onDelete: "CASCADE",
    },
  },
  indices: [
    {
      name: "idx_mcq_answer_interview_id",
      columns: ["interviewId"],
    },
    {
      name: "idx_mcq_answer_question_id",
      columns: ["questionId"],
    },
    {
      name: "idx_mcq_answer_interview_question",
      columns: ["interviewId", "questionId"],
      unique: true,
    },
  ],
});
