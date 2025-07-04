import api from '../api';

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
  languageId: number;
  language: string;
  code: string;
}

export interface SubmitInterviewRequest {
  mcqAnswers: SubmitMCQAnswerRequest[];
  codeSubmissions: SubmitCodeRequest[];
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
}

export interface InterviewSessionResponse extends InterviewResponse {
  interviewQuestions: any[];
  answers: any[];
  codeSubmissions: any[];
}

export interface CodeSubmissionResponse {
  id: string;
  interviewId: string;
  questionId: string;
  code: string;
  submittedAt: string;
  testCaseResults?: TestCaseResult[];
}

export interface TestCaseResult {
  id: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  isCorrect: boolean;
  executionTime: number;
  memoryUsed: number;
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
    answers: any[];
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
    return api.post<CodeSubmissionResponse>('/api/code-submission', submission);
  },

  // Submit complete interview
  submitInterview(interviewId: string, submission: SubmitInterviewRequest) {
    return api.post<InterviewSubmissionResult>(`/api/interview/${interviewId}/submit`, submission);
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
};

export default interviewApi; 