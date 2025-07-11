import { useQuery } from "@tanstack/react-query";
import {
	interviewHistoryApi,
	InterviewHistoryResponse,
	InterviewWithStats,
	AnalyticsSummaryResponse,
} from "./interview-history-api";



export const useInterviewHistory = (userId: string, options = {}) => {
    return useQuery<InterviewHistoryResponse>({
        queryKey: ["interview-history", userId],
        queryFn: async () => {
            const response = await interviewHistoryApi.getInterviewHistory(userId);
			
            return response.data;
        },
        enabled: !!userId,
        ...options,
    });
};

export const useCompletedInterviews = (userId: string, options = {}) => {
  return useQuery<InterviewWithStats[]>({
    queryKey: ["completed-interviews", userId],
    queryFn: async () => {
      const response = await interviewHistoryApi.getCompletedInterviews(userId);
      return response.data;
    },
    enabled: !!userId,
    ...options,
  });
};

export const useUserPracticeAnalytics = (userId: string, options = {}) => {
  return useQuery<AnalyticsSummaryResponse>({
    queryKey: ["user-practice-analytics", userId],
    queryFn: async () => {
      const response = await interviewHistoryApi.getUserAnalyticsSummary(userId);
      return response.data;
    },
    enabled: !!userId,
    ...options,
  });
};

export default useInterviewHistory;