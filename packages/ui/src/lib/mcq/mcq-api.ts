import api from "../api";


export const mcqApi = {
    getByInterviewId: async (interviewId: string) => {
        const response = await api.get(`/api/mcq-answer/interview/${interviewId}`);
        return response.data;
    }
}


