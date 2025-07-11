import api from "../../lib/api";

export interface CodeSubmission {
  id: string;
  createdAt: string;
  updatedAt: string;
  interviewId: string;
  questionId: string;
  code: string;
  submittedAt: string;
  score: number;
  totalTests: number;
}


const codingApi = {
    getCodeSubmissionsByInterviewAndQuestion(interviewId: string, questionId: string) {
        return api.get<CodeSubmission[]>(`/api/code-submission/interview/${interviewId}/question/${questionId}`);
    }
}


export default codingApi;