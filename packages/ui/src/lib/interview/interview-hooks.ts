import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  interviewApi,
  CreateInterviewRequest,
  SubmitMCQAnswerRequest,
  SubmitCodeRequest,
  InterviewResponse,
  InterviewSessionResponse,
  InterviewSubmissionResult,
  RunCodeRequest,
  CodeSubmissionWithResults,
} from "./interview-api";

// Create interview hook
export const useCreateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreateInterviewRequest) => {
      const response = await interviewApi.createInterview(request);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
    onError: (error: any) => {
      console.error(
        "Create interview failed:",
        error.response?.data?.message || error.message
      );
    },
  });
};

// Get interview hook
export const useInterview = (id: string) => {
  return useQuery({
    queryKey: ["interview", id],
    queryFn: async () => {
      const response = await interviewApi.getInterview(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get interview with questions hook
export const useInterviewWithQuestions = (id: string) => {
  return useQuery({
    queryKey: ["interview-session", id],
    queryFn: async () => {
      const response = await interviewApi.getInterviewWithQuestions(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes (questions don't change during interview)
    gcTime: 1000 * 60 * 15, // 15 minutes garbage collection time
  });
};

// Start interview hook
export const useStartInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await interviewApi.startInterview(id);
      return response.data;
    },
    onSuccess: (data: InterviewResponse) => {
      // Invalidate interview queries to update status
      queryClient.invalidateQueries({ queryKey: ["interview", data.id] });
      queryClient.invalidateQueries({ queryKey: ["interview-session", data.id] });
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
    onError: (error: any) => {
      console.error(
        "Start interview failed:",
        error.response?.data?.message || error.message
      );
    },
  });
};

// Submit MCQ answer hook (immediate backend submission)
export const useSubmitMCQAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (answer: SubmitMCQAnswerRequest) => {
      const response = await interviewApi.submitMCQAnswer(answer);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate interview session to update answers
      queryClient.invalidateQueries({ 
        queryKey: ["interview-session", variables.interviewId] 
      });
    },
    onError: (error: any) => {
      console.error(
        "Submit MCQ answer failed:",
        error.response?.data?.message || error.message
      );
    },
  });
};

// Submit code hook (only for final submission, not auto-save)
export const useSubmitCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (submission: SubmitCodeRequest) => {
      const response = await interviewApi.submitCode(submission);
      return response.data;
    },
    onSuccess: (data: CodeSubmissionWithResults) => {
      // Invalidate interview session to update submissions
      queryClient.invalidateQueries({ 
        queryKey: ["interview-session", data.interviewId] 
      });
    },
    onError: (error: any) => {
      console.error(
        "Submit code failed:",
        error.response?.data?.message || error.message
      );
    },
  });
};

// Run code hook (for testing individual test cases)
export const useRunCode = () => {
  return useMutation({
    mutationFn: async (request: RunCodeRequest) => {
      const response = await interviewApi.runCode(request);
      return response.data;
    },
    onError: (error: any) => {
      console.error(
        "Run code failed:",
        error.response?.data?.message || error.message
      );
    },
  });
};

// Submit complete interview hook
export const useSubmitInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (interviewId: string) => {
      const response = await interviewApi.submitInterview(interviewId);
      return response.data;
    },
    onSuccess: (data: InterviewSubmissionResult) => {
      // Invalidate all interview-related queries
      queryClient.invalidateQueries({ queryKey: ["interview", data.interviewId] });
      queryClient.invalidateQueries({ queryKey: ["interview-session", data.interviewId] });
      queryClient.invalidateQueries({ queryKey: ["interviews"] });

    },
    onError: (error: any) => {
      console.error(
        "Submit interview failed:",
        error.response?.data?.message || error.message
      );
    },
  });
};

// Get user interviews hook
export const useUserInterviews = (userId: string) => {
  return useQuery({
    queryKey: ["interviews", userId],
    queryFn: async () => {
      const response = await interviewApi.getUserInterviews(userId);
      return response.data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get interview results hook
export const useInterviewResults = (interviewId: string) => {
  return useQuery({
    queryKey: ["interview-results", interviewId],
    queryFn: async () => {
      const response = await interviewApi.getInterviewResults(interviewId);
      return response.data;
    },
    enabled: !!interviewId,
    staleTime: 1000 * 60 * 10, // 10 minutes (results don't change)
  });
};

// Calculate interview score hook
export const useCalculateScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (interviewId: string) => {
      const response = await interviewApi.calculateScore(interviewId);
      return response.data;
    },
    onSuccess: (data: InterviewResponse) => {
      // Invalidate interview queries to update score
      queryClient.invalidateQueries({ queryKey: ["interview", data.id] });
      queryClient.invalidateQueries({ queryKey: ["interview-results", data.id] });
    },
    onError: (error: any) => {
      console.error(
        "Calculate score failed:",
        error.response?.data?.message || error.message
      );
    },
  });
};

// Real-time interview progress hook
export const useInterviewProgress = (interviewId: string) => {
  return useQuery({
    queryKey: ["interview-progress", interviewId],
    queryFn: async () => {
      const response = await interviewApi.getInterviewWithQuestions(interviewId);
      return {
        totalQuestions: response.data.interviewQuestions.length,
        answeredQuestions: response.data.answers.length + response.data.codeSubmissions.length,
        mcqAnswered: response.data.answers.length,
        codeSubmitted: response.data.codeSubmissions.length,
        status: response.data.status,
      };
    },
    enabled: !!interviewId,
    refetchInterval: 30000, // Refetch every 30 seconds for progress updates
  });
};

// Interview session management with different auto-save strategies
export const useInterviewSession = () => {
  const queryClient = useQueryClient();

  // Save answer locally (optimistic update)
  const saveAnswerLocally = (interviewId: string, questionId: string, answer: string) => {
    queryClient.setQueryData(
      ["interview-session", interviewId],
      (old: InterviewSessionResponse | undefined) => {
        if (!old) return old;
        
        // Update the local state optimistically
        const updatedAnswers = {
          ...old.answers,
          [questionId]: answer,
        };
        
        return {
          ...old,
          answers: updatedAnswers,
        };
      }
    );
  };

  // Auto-save MCQ answers (immediate backend submission)
  const autoSaveMCQAnswer = useMutation({
    mutationFn: async (answer: SubmitMCQAnswerRequest) => {
      const response = await interviewApi.submitMCQAnswer(answer);
      return response.data;
    },
    onError: (error: any) => {
      console.error("Auto-save MCQ failed:", error.response?.data?.message || error.message);
    },
  });

  // Local storage utilities for code persistence
  const saveCodeToLocalStorage = (interviewId: string, questionId: string, code: string) => {
    const key = `interview_${interviewId}_question_${questionId}_code`;
    try {
      localStorage.setItem(key, code);
    } catch (error) {
      console.warn("Failed to save code to localStorage:", error);
    }
  };

  const getCodeFromLocalStorage = (interviewId: string, questionId: string): string => {
    const key = `interview_${interviewId}_question_${questionId}_code`;
    try {
      return localStorage.getItem(key) || "";
    } catch (error) {
      console.warn("Failed to get code from localStorage:", error);
      return "";
    }
  };

  const clearCodeFromLocalStorage = (interviewId: string) => {
    try {
      const keys = Object.keys(localStorage).filter(key => 
        key.startsWith(`interview_${interviewId}_`) && key.includes('_code')
      );
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.warn("Failed to clear code from localStorage:", error);
    }
  };

  return {
    saveAnswerLocally,
    autoSaveMCQAnswer,
    saveCodeToLocalStorage,
    getCodeFromLocalStorage,
    clearCodeFromLocalStorage,
  };
}; 