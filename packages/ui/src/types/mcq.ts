
export interface McqAnswer {
    id: string;
    createdAt: string;
    updatedAt: string;
    interviewId: string;
    questionId: string;
    selectedOptionId: string;
    correctOptionId: string;
    isCorrect: boolean;
    timeSpent?: number;
}