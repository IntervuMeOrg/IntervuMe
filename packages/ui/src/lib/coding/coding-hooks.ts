import { useQuery } from "@tanstack/react-query";
import codingApi from "./coding-api";

export const useCodeSubmissionsByInterviewAndQuestion = (interviewId: string, questionId: string) => {
    return useQuery({
        queryKey: ["code-submissions-by-interview-and-question", interviewId, questionId],
        queryFn: () => codingApi.getCodeSubmissionsByInterviewAndQuestion(interviewId, questionId),
        enabled: !!interviewId && !!questionId,
    });
}