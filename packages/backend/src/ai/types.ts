export interface AssessmentMCQQuestion  {
  type: "mcq";
  tags: string[];
  is_correct: boolean;
}

export interface ProblemSolvingQuestion {
  type: "problem_solving";
  tags: string[];
  tests_passed: number;
  total_tests: number;
}

export interface AssessmentResults {
  total_questions: number;
  overall_score: number;
  mcq_score: number;
  problem_solving_score: number;
  mcq_questions: AssessmentMCQQuestion[];
  problem_solving_questions: ProblemSolvingQuestion[];
}

export interface MCQQuestion {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct_answer: "A" | "B" | "C" | "D";
  explanation: string;
}

export interface TopicAllocation {
  [topic: string]: number;
}

export interface AllocationResponse {
  allocations: TopicAllocation;
}

export interface KeywordExtractionResponse {
  job_title: string;
  skills: string[];
  programming_languages: string[];
  tools_technologies: string[];
  experience: string;
  qualifications: string[];
  company_name: string;
}

export interface MatchedSkill {
  skill: string;
  matched_category: string;
}

export interface SimilarityResponse {
  matched_skills: MatchedSkill[];
}


export interface FeedbackResponse {
  overall_performance: {
    score_percentage: number;
    level: "Excellent" | "Good" | "Average" | "Below Average" | "Poor";
    summary: string;
  };
  strengths: Array<{
    area: string;
    details: string;
  }>;
  critical_gaps: Array<{
    area: string;
    details: string;
    impact: string;
  }>;
  recommendations: Array<{
    area: string;
    priority: "High" | "Medium" | "Low";
    actions: string[];
    timeline: string;
  }>;
  job_readiness: {
    current_level: "Entry Level" | "Junior" | "Mid-Level" | "Senior" | "Expert";
    readiness_percentage: number;
  };
  next_steps: string[];
}

export interface CodingDifficultyResponse {
  difficulties: ("easy" | "medium" | "hard")[];
  reasoning: string;
}

export interface ComprehensiveAnalysisResponse {
  jobTitle: string,
  keywords: KeywordExtractionResponse;
  mcqAllocation: AllocationResponse;
  similarity: SimilarityResponse;
  codingDifficulty: CodingDifficultyResponse;
}
