import { AppDataSource } from "../../database/data-source";
import { apId } from "../../common/id-generator";
import { AnswerEntitySchema } from "./answer.entity";
import {
  CreateAnswerSchema,
  AnswerSchema,
  UpdateAnswerSchema,
} from "./answer-types";
import { mcqQuestionService } from "../mcqQuestion/mcqQuestion.service";
import { interviewService } from "../../interview/interview.service";

const AnswerRepository = () => {
  return AppDataSource.getRepository(AnswerEntitySchema);
};

export const answerService = {
  async create(request: CreateAnswerSchema): Promise<AnswerSchema> {
    const mcqQuestion = await mcqQuestionService.getById(request.questionId);
    if (!mcqQuestion) {
      throw new Error("MCQ Question not found");
    }

    const interview = await interviewService.getById(request.interviewId);
    if (!interview || interview.status === "COMPLETED") {
      throw new Error("Cannot submit answer - interview is completed");
    }

    const existingAnswer = await AnswerRepository().findOne({
      where: {
        interviewId: request.interviewId,
        questionId: request.questionId,
      },
    });

    if (existingAnswer) {
      throw new Error("Answer already exists for this question");
    }

    const selectedOption = mcqQuestion.options.find(
      (opt) => opt.id === request.selectedOptionId
    );
    const correctOption = mcqQuestion.options.find((opt) => opt.isCorrect);

    if (!selectedOption) {
      throw new Error("Selected option not found");
    }

    if (!correctOption) {
      throw new Error("No correct option found for this question");
    }

    const isCorrect = selectedOption.isCorrect;

    const answer = AnswerRepository().create({
      id: apId(),
      interviewId: request.interviewId,
      questionId: request.questionId,
      selectedOptionId: request.selectedOptionId,
      correctOptionId: correctOption.id,
      isCorrect,
      timeSpent: request.timeSpent,
    });

    return await AnswerRepository().save(answer);
  },

  async getById(id: string): Promise<AnswerSchema | null> {
    const answer = await AnswerRepository().findOne({ where: { id } });

    if (!answer) {
      throw new Error("Answer not found");
    }

    return answer;
  },

  async getByInterviewId(interviewId: string): Promise<AnswerSchema[]> {
    return await AnswerRepository().find({ where: { interviewId } });
  },

  async getByInterviewAndQuestion(
    interviewId: string,
    questionId: string
  ): Promise<AnswerSchema | null> {
    const answer = await AnswerRepository().findOne({
      where: { interviewId, questionId },
    });

    if (!answer) {
      throw new Error("Answer not found for this question");
    }

    return answer;
  },

  async update(
    id: string,
    updates: UpdateAnswerSchema
  ): Promise<AnswerSchema | null> {
    const answer = await AnswerRepository().findOne({ where: { id } });

    if (!answer) {
      throw new Error("Answer not found");
    }

    const interview = await interviewService.getById(answer.interviewId);
    if (!interview || interview.status === "COMPLETED") {
      throw new Error("Cannot update answer - interview is completed");
    }

    if (
      updates.selectedOptionId &&
      updates.selectedOptionId !== answer.selectedOptionId
    ) {
      const mcqQuestion = await mcqQuestionService.getById(answer.questionId);
      if (!mcqQuestion) throw new Error("Question not found");

      const newSelectedOption = mcqQuestion.options.find(
        (opt) => opt.id === updates.selectedOptionId
      );

      if (!newSelectedOption) {
        throw new Error("New selected option not found");
      }

      const isCorrect = newSelectedOption.isCorrect;
      const points = isCorrect ? 1 : 0;

      Object.assign(answer, {
        selectedOption: updates.selectedOptionId,
        isCorrect,
        points,
        timeSpent: updates.timeSpent,
        updatedAt: new Date().toISOString(),
      });
    } else {
      Object.assign(answer, updates, { updatedAt: new Date().toDateString() });
    }

    return await AnswerRepository().save(answer);
  },

  async delete(id: string): Promise<void> {
    const answer = await AnswerRepository().findOne({ where: { id } });

    if (!answer) {
      throw new Error("Answer not found");
    }

    const interview = await interviewService.getById(answer.interviewId);
    if (!interview || interview.status === "COMPLETED") {
      throw new Error("Cannot delete answer - interview is completed");
    }

    await AnswerRepository().remove(answer);
  },

  async getInterviewSummary(interviewId: string) {
    const answers = await this.getByInterviewId(interviewId);

    const totalQuestions = answers.length;
    const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
    const totalPoints = answers.reduce(
      (sum, answer) => sum + (answer.isCorrect ? 1 : 0),
      0
    );
    const maxPoints = answers.length;
    const percentage = (totalPoints / maxPoints) * 100;
    const totalTimeSpent = answers.reduce(
      (sum, answer) => sum + (answer.timeSpent || 0),
      0
    );

    return {
      totalQuestions,
      correctAnswers,
      totalPoints,
      maxPoints,
      percentage: Math.round(percentage * 100) / 100,
      totalTimeSpent,
      answers,
    };
  },
};
