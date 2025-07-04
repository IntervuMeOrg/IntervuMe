import api from '../api';


export interface InterviewHistoryResponse {
  totalInterviews: number;
  averageScore: number;
  totalPracticeTime: number;
  bestSkill: string;
  skillNeedsFocus: string;
  latestScore: number;
  improvementTrend: number;
}

export interface InterviewWithStats {
  userId: string;
  startTime: string;
  endTime?: string;
  timeLimit: number;
  status?: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "EXPIRED";
  totalScore?: number;
  maxScore?: number;
  isPassed?: boolean;
  notes?: string;
  isActive?: boolean;
  jobTitle?: string;
  feedback?: any;
  questionCount: number;
  uniqueTags: string[];
}

// API functions following your preferred style
export const interviewHistoryApi = {
  getInterviewHistory(userId: string) {
    return api.get<InterviewHistoryResponse>(`/user/${userId}/history`);
  },

  getCompletedInterviews(userId: string) {
    return api.get<InterviewWithStats[]>(`/user/${userId}/completed`);
  }

//   getUpcomingInterviews(userId: string) {
//     return api.get<UpcomingInterview[]>(`/user/${userId}/upcoming`);
//   },

//   getUserAnalytics(userId: string, params?: AnalyticsRequest) {
//     return api.get<UserPracticeAnalytics>(`/analytics/${userId}`, { params });
//   },
};

export default interviewHistoryApi;