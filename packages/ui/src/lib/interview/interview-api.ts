import api from '../api';
import { McqQuestion, CodingQuestion } from '../../types/questions';
import { FeedbackResponse } from '../../types/ai';

// Types
export interface CreateInterviewRequest {
  userId: string;
  jobDescription: string;
  startTime: string;
  timeLimit: number;
  notes?: string;
}

export interface StartInterviewRequest {
  interviewId: string;
}

export interface SubmitMCQAnswerRequest {
  interviewId: string;
  questionId: string;
  selectedOptionId: string;
  correctOptionId: string;
  isCorrect: boolean;
  timeSpent?: number;
}

export interface SubmitCodeRequest {
  interviewId: string;
  questionId: string;
  language: string;
  code: string;
}

// Code execution types
export interface RunCodeRequest {
  questionId: string;
  language: 'python' | 'cpp' | 'java';
  userCode: string;
  stdin: string;
  expected: string;
  timeLimit: number;
}

export interface RunCodeResult {
  stdout: string;
  status: string;
  time: number;
}

export interface SubmitInterviewRequest {
  mcqAnswers: SubmitMCQAnswerRequest[];
  codeSubmissions: SubmitCodeRequest[];
}

// Question Types
export interface QuestionOption {
  id: string;
  optionText: string;
  isCorrect: boolean;
}

export interface InterviewQuestionWithDetails {
  id: string;
  interviewId: string;
  questionId: string;
  questionType: 'mcq' | 'coding';
  orderIndex: number;
  questionDetails: McqQuestion | CodingQuestion;
  createdAt: string;
  updatedAt: string;
}

export interface McqAnswer {
  id: string;
  interviewId: string;
  questionId: string;
  selectedOptionId: string;
  correctOptionId: string;
  isCorrect: boolean;
  timeSpent?: number;
  createdAt: string;
  updatedAt: string;
}

export interface TestCaseResult {
  id: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  executionTime: number;
  memoryUsed: number;
}

export interface CodeSubmissionWithResults {
  id: string;
  interviewId: string;
  questionId: string;
  code: string;
  language: string;
  submittedAt: string;
  testCaseResults?: TestCaseResult[];
  totalTestCases?: number;
  passedTestCases?: number;
  executionTime?: number;
  memoryUsed?: number;
}

// Response Types
export interface InterviewResponse {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  timeLimit: number;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'EXPIRED';
  totalScore?: number;
  maxScore?: number;
  isPassed?: boolean;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  jobTitle?: string;
  feedback?: FeedbackResponse;
}

export interface InterviewSessionResponse extends InterviewResponse {
  interviewQuestions: InterviewQuestionWithDetails[];
  answers: McqAnswer[];
  codeSubmissions: CodeSubmissionWithResults[];
}

export interface CodeSubmissionResponse {
  id: string;
  interviewId: string;
  questionId: string;
  code: string;
  language: string;
  submittedAt: string;
  testCaseResults?: TestCaseResult[];
}

export interface InterviewSubmissionResult {
  interviewId: string;
  status: string;
  mcqSummary: {
    totalQuestions: number;
    correctAnswers: number;
    totalPoints: number;
    maxPoints: number;
    percentage: number;
    totalTimeSpent: number;
    answers: McqAnswer[];
  };
  codeSubmissions: CodeSubmissionResponse[];
  totalScore: number;
  submittedAt: string;
}

// API functions following your preferred style
export const interviewApi = {
  // Create new interview
  createInterview(request: CreateInterviewRequest) {
    return api.post<InterviewResponse>('/api/interview', request);
  },

  // Get interview details
  getInterview(id: string) {
    return api.get<InterviewResponse>(`/api/interview/${id}`);
  },

  // Get interview with questions
  getInterviewWithQuestions(id: string) {
    return api.get<InterviewSessionResponse>(`/api/interview/${id}/with-questions`);
  },

  // Start interview
  startInterview(id: string) {
    return api.post<InterviewResponse>(`/api/interview/${id}/start`);
  },

  // Submit MCQ answer
  submitMCQAnswer(answer: SubmitMCQAnswerRequest) {
    return api.post<any>('/api/mcq-answer', answer);
  },

  // Submit code
  submitCode(submission: SubmitCodeRequest) {
    return api.post<CodeSubmissionWithResults>('/api/code-submission', submission);
  },

  // Submit complete interview
  submitInterview(id: string) {
    return api.post<InterviewSubmissionResult>(`/api/interview/${id}/submit`);
  },

  // Get user's interviews
  getUserInterviews(userId: string) {
    return api.get<InterviewResponse[]>(`/api/interview/user/${userId}`);
  },

  // Get interview results
  getInterviewResults(interviewId: string) {
    return api.get<InterviewSubmissionResult>(`/api/interview/${interviewId}/results`);
  },

  // Calculate interview score
  calculateScore(interviewId: string) {
    return api.post<InterviewResponse>(`/api/interview/${interviewId}/calculate-score`);
  },

  // Run code with test cases
  runCode(request: RunCodeRequest) {
    return api.post<RunCodeResult>('/api/code-execution/run', request);
  },

  // Delete interview
  deleteInterview(id: string) {
    return api.delete(`/api/interview/${id}`);
  },
};

export default interviewApi; 