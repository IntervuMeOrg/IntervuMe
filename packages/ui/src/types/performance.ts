// Performance data types - all data comes from backend
export interface PerformanceMetrics {
  overallPercentage: number;
  mcqPercentage: number;
  mcqCorrect: number;
  mcqTotal: number;
  problemSolvingPercentage: number;
  problemSolvingCorrect: number;
  problemSolvingTotal: number;
}

export interface QuestionPerformance {
  score: number;
  rating: string;
  color: string;
  bgColor: string;
  feedback: string;
}

export interface SkillAssessment {
  strengths: string[];
  improvements: string[];
}

export interface StudyRecommendations {
  recommendations: {
    area: string;
    priority: string;
    actions: string[];
    timeline: string;
  }[];
}

// Main interface for all backend data
export interface DetailedFeedbackData {
  questions: Array<any>; // Your question types
  userAnswers: Record<number, string>;
  performanceMetrics: PerformanceMetrics;
  skillAssessment: SkillAssessment;
  studyRecommendations: StudyRecommendations;
  questionPerformances: Record<number, QuestionPerformance>; // Performance data per question ID
}