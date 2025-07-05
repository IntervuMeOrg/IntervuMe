import api from '../api';


export interface InterviewHistoryResponse {
  totalInterviews: number;
  averageScore?: number;
  totalPracticeTime: number;
  bestSkill?: string;
  skillNeedsFocus?: string;
  latestScore?: number;
  improvementTrend?: number;
}

export interface InterviewWithStats {
  id: string; 
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

interface AnalyticsSummaryData {
  totalDays: number;
  totalInterviews: number;
  overallAverage: number;
}

export interface AnalyticsSummaryResponse {
  success: boolean;
  data: AnalyticsSummaryData;
}

// API functions following your preferred style
export const interviewHistoryApi = {
  getInterviewHistory(userId: string) {
    return api.get<InterviewHistoryResponse>(`api/interview/user/${userId}/history`);
  },

  getCompletedInterviews(userId: string) {
    return api.get<InterviewWithStats[]>(`api/interview/user/${userId}/completed`);
  },

  getUserAnalyticsSummary(userId: string) {
    return api.get<AnalyticsSummaryResponse>(`api/interview/analytics/${userId}/summary`);
  }

//   getUpcomingInterviews(userId: string) {
//     return api.get<UpcomingInterview[]>(`/user/${userId}/upcoming`);
//   },

//   getUserAnalytics(userId: string, params?: AnalyticsRequest) {
//     return api.get<UserPracticeAnalytics>(`/analytics/${userId}`, { params });
//   },
};

export default interviewHistoryApi;