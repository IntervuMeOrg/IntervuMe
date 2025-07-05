import api from "../api";
import { McqAnswer } from "../../types/mcq";


export const mcqApi = {
    getByInterviewId: async (interviewId: string) => {
        const response = await api.get<McqAnswer[]>(`/api/mcq-answer/interview/${interviewId}`);
        return response.data;
    }
}


