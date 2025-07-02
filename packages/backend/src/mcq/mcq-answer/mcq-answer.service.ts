import { AppDataSource } from '../../database/data-source';
import { McqAnswerEntity } from './mcq-answer.entity';
import { mcqQuestionService } from '../mcq-question/mcq-question.service';
import { interviewService } from '../../interview/interview.service';
import {
  apId,
  CreateMcqAnswerRequestBody,
  McqAnswer,
  UpdateMcqAnswerRequestBody,
  McqOption,
} from '@shared';

import { isNil } from '../../common/utils';

const mcqAnswerRepository = () => {
  return AppDataSource.getRepository(McqAnswerEntity);
};

export const mcqAnswerService = {
  async create(request: CreateMcqAnswerRequestBody): Promise<McqAnswer> {
    const mcqQuestion = await mcqQuestionService.get(request.questionId);
    if (isNil(mcqQuestion)) {
      throw new Error('Mcq Question not found');
    }

    const interview = await interviewService.get(request.interviewId);
    if (isNil(interview) || interview.status === 'COMPLETED') {
      throw new Error('Cannot submit answer - interview is completed');
    }

    const existingAnswer = await mcqAnswerRepository().findOne({
      where: {
        interviewId: request.interviewId,
        questionId: request.questionId,
      },
    });

    if (existingAnswer) {
      throw new Error('Answer already exists for this question');
    }

    const selectedOption = mcqQuestion.options.find(
      (opt: McqOption) => opt.id === request.selectedOptionId
    );
    const correctOption = mcqQuestion.options.find(
      (opt: McqOption) => opt.isCorrect
    );

    if (!selectedOption) {
      throw new Error('Selected option not found');
    }

    if (!correctOption) {
      throw new Error('No correct option found for this question');
    }

    const isCorrect = selectedOption.isCorrect;

    const answer = mcqAnswerRepository().create({
      id: apId(),
      interviewId: request.interviewId,
      questionId: request.questionId,
      selectedOptionId: request.selectedOptionId,
      correctOptionId: correctOption.id,
      isCorrect,
      timeSpent: request.timeSpent,
    });

    return await mcqAnswerRepository().save(answer);
  },

  async get(id: string): Promise<McqAnswer> {
    const answer = await mcqAnswerRepository().findOne({ where: { id } });

    if (isNil(answer)) {
      throw new Error('Answer not found');
    }

    return answer;
  },

  async getByInterviewId(interviewId: string): Promise<McqAnswer[]> {
    return await mcqAnswerRepository().find({ where: { interviewId } });
  },

  async getByInterviewAndQuestion(
    interviewId: string,
    questionId: string
  ): Promise<McqAnswer> {
    const answer = await mcqAnswerRepository().findOne({
      where: { interviewId, questionId },
    });

    if (isNil(answer)) {
      throw new Error('Answer not found for this question');
    }

    return answer;
  },

  async update(
    id: string,
    updates: UpdateMcqAnswerRequestBody
  ): Promise<McqAnswer> {
    const answer = await mcqAnswerRepository().findOne({ where: { id } });

    if (isNil(answer)) {
      throw new Error('Answer not found');
    }

    const interview = await interviewService.get(answer.interviewId);
    if (isNil(interview) || interview.status === 'COMPLETED') {
      throw new Error('Cannot update answer - interview is completed');
    }

    if (
      updates.selectedOptionId &&
      updates.selectedOptionId !== answer.selectedOptionId
    ) {
      const mcqQuestion = await mcqQuestionService.get(answer.questionId);
      if (isNil(mcqQuestion)) throw new Error('Question not found');

      const newSelectedOption = mcqQuestion.options.find(
        (opt: McqOption) => opt.id === updates.selectedOptionId
      );

      if (!newSelectedOption) {
        throw new Error('New selected option not found');
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

    return await mcqAnswerRepository().save(answer);
  },

  async delete(id: string): Promise<void> {
    const answer = await mcqAnswerRepository().findOne({ where: { id } });

    if (isNil(answer)) {
      throw new Error('Answer not found');
    }

    const interview = await interviewService.get(answer.interviewId);
    if (isNil(interview) || interview.status === 'COMPLETED') {
      throw new Error('Cannot delete answer - interview is completed');
    }

    await mcqAnswerRepository().remove(answer);
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
