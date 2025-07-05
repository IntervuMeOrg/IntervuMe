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