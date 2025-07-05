import { useQuery } from "@tanstack/react-query";
import { mcqApi } from "./mcq-api";
import { interviewApi } from "../interview/interview-api";

export const useMcqAnswers = (interviewId: string) => {
    return useQuery({
        queryKey: ["mcq-answers", interviewId],
        queryFn: () => mcqApi.getByInterviewId(interviewId),
        enabled: !!interviewId,
    });
};


export const useInterviewQuestions = (interviewId: string) => {
    return useQuery({
        queryKey: ["interview-questions", interviewId],
        queryFn: () => interviewApi.getInterviewWithQuestions(interviewId),
        enabled: !!interviewId,
    });
};