export interface AssessmentQuestion {
  id: string;
  type: "mcq" | "problem_solving";
  question: string;
  tags: string[];
  correct_answer?: string;
  candidate_answer: string;
  is_correct: boolean;
  time_taken?: number;
}

export interface AssessmentResults {
  job_title: string;
  total_questions: number;
  mcq_questions: AssessmentQuestion[];
  problem_solving_questions: AssessmentQuestion[];
  overall_score: number;
  mcq_score: number;
  problem_solving_score: number;
  total_time_taken: number;
}

// Simplified version for AI feedback (reduced context)
export interface SimplifiedAssessmentQuestion {
  type: "mcq" | "problem_solving";
  tags: string[];
  is_correct: boolean;
}

export interface SimplifiedAssessmentResults {
  job_title: string;
  total_questions: number;
  overall_score: number;
  mcq_score: number;
  problem_solving_score: number;
  mcq_questions: SimplifiedAssessmentQuestion[];
  problem_solving_questions: SimplifiedAssessmentQuestion[];
}

export interface FeedbackResponse {
  overall_performance: {
    score_percentage: number;
    performance_level:
      | "Excellent"
      | "Good"
      | "Average"
      | "Below Average"
      | "Poor";
    summary: string;
  };
  strengths: Array<{
    area: string;
    details: string;
    evidence: string;
  }>;
  weaknesses: Array<{
    area: string;
    details: string;
    evidence: string;
    impact: string;
  }>;
  improvement_recommendations: Array<{
    area: string;
    priority: "High" | "Medium" | "Low";
    specific_actions: string[];
    resources: string[];
    estimated_time: string;
  }>;
  question_analysis: {
    mcq_performance: {
      correct_count: number;
      total_count: number;
      weak_topics: string[];
      strong_topics: string[];
    };
    problem_solving_performance: {
      correct_count: number;
      total_count: number;
      common_mistakes: string[];
      approach_feedback: string;
    };
  };
  job_readiness: {
    current_level: "Entry Level" | "Junior" | "Mid-Level" | "Senior" | "Expert";
    target_level: string;
    readiness_percentage: number;
    key_gaps: string[];
    timeline_to_readiness: string;
  };
  next_steps: string[];
}
