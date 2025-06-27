import { AssessmentResults, SimplifiedAssessmentResults } from "./types";

export const keywordPrompt = (jobDescription: string): string => `
Analyze the following job description and extract relevant keywords. The extracted keywords should match the following JSON structure exactly:

{
  "job_title": "extracted job title",
  "skills": ["list of technical and soft skills"],
  "programming_languages": ["list of programming languages"],
  "tools_technologies": ["list of tools, platforms, cloud services, and frameworks"],
  "experience": "experience level or years",
  "qualifications": ["list of qualifications"],
  "company_name": "company name or N/A"
}

Return only the JSON output.
Job Description:
${jobDescription}
`;

export const mcqPrompt = (topic: string, number: number): string => `
I want you to generate only a multiple-choice question (MCQ) on the given topic. The MCQ should have four answer choices (A, B, C, D) with one correct answer. Provide the output strictly in JSON format as specified below:

Topic: ${topic}
Generate only ${number} MCQs in JSON.
`;

export const mcqAllocPrompt = (
  jobDescription: string,
  topics: string[],
  totalMCQs: number
): string => `
Instructions:
- Carefully analyze the job description to identify the relative importance of each topic (programming languages, tools, or technologies).
- Allocate exactly ${totalMCQs} MCQs across these topics **proportionally**, based on their emphasis or priority in the job description. 
- Output must be valid JSON only, following the structure below.

Job Description:
${jobDescription}

Topics to consider (languages & technologies):
${JSON.stringify(topics)}
`;

export const similarityPrompt = (
  skillsList: string[],
  categoriesList: string[]
): string => `
You are an expert in skill classification and semantic similarity matching. Your task is to map a given list of skills to the most relevant categories from a predefined database.

Input:
- Skills: ${JSON.stringify(skillsList)}
- Categories: ${JSON.stringify(categoriesList)}

Return valid JSON:
{
  "matched_skills": [
    { "skill": "Skill Name", "matched_category": "Category Name" }
  ]
}
`;

export const feedbackPrompt = (
  assessmentResults: SimplifiedAssessmentResults
): string => `
You are an expert technical interviewer and career coach. Analyze the following assessment results and provide comprehensive, actionable feedback for the candidate.

Assessment Data:
${JSON.stringify(assessmentResults, null, 2)}

Please provide feedback in the following JSON structure:

{
  "overall_performance": {
    "score_percentage": number,
    "performance_level": "Excellent" | "Good" | "Average" | "Below Average" | "Poor",
    "summary": "Brief overall assessment summary"
  },
  "strengths": [
    {
      "area": "Technology/Skill area name",
      "details": "Specific details about what they did well",
      "evidence": "Reference to specific questions or patterns"
    }
  ],
  "weaknesses": [
    {
      "area": "Technology/Skill area name",
      "details": "Specific details about areas needing improvement",
      "evidence": "Reference to specific questions or patterns",
      "impact": "How this weakness affects their job readiness"
    }
  ],
  "improvement_recommendations": [
    {
      "area": "Technology/Skill area name",
      "priority": "High" | "Medium" | "Low",
      "specific_actions": [
        "Actionable step 1",
        "Actionable step 2"
      ],
      "resources": [
        "Recommended learning resource 1",
        "Recommended learning resource 2"
      ],
      "estimated_time": "Time estimate to improve (e.g., '2-3 weeks')"
    }
  ],
  "question_analysis": {
    "mcq_performance": {
      "correct_count": number,
      "total_count": number,
      "weak_topics": ["list of topics with poor performance"],
      "strong_topics": ["list of topics with good performance"]
    },
    "problem_solving_performance": {
      "correct_count": number,
      "total_count": number,
      "common_mistakes": ["list of common mistake patterns"],
      "approach_feedback": "Feedback on problem-solving approach"
    }
  },
  "job_readiness": {
    "current_level": "Entry Level" | "Junior" | "Mid-Level" | "Senior" | "Expert",
    "target_level": "Expected level for the job",
    "readiness_percentage": number,
    "key_gaps": ["List of critical gaps to address"],
    "timeline_to_readiness": "Estimated time to reach job readiness"
  },
  "next_steps": [
    "Immediate action item 1",
    "Immediate action item 2",
    "Long-term goal 1"
  ]
}

Analysis Guidelines:
1. Identify patterns in correct/incorrect answers by technology tags
2. Assess problem-solving approach and logical thinking
3. Provide specific, actionable recommendations
4. Be encouraging but honest about areas needing improvement
5. Prioritize recommendations based on job requirements
6. Include specific learning resources and practice suggestions

Return only valid JSON with the feedback analysis.
`;

// Utility function to convert full assessment results to simplified version
export const simplifyAssessmentResults = (
  fullResults: AssessmentResults
): SimplifiedAssessmentResults => {
  return {
    job_title: fullResults.job_title,
    total_questions: fullResults.total_questions,
    overall_score: fullResults.overall_score,
    mcq_score: fullResults.mcq_score,
    problem_solving_score: fullResults.problem_solving_score,
    mcq_questions: fullResults.mcq_questions.map((q) => ({
      type: q.type,
      tags: q.tags,
      is_correct: q.is_correct,
    })),
    problem_solving_questions: fullResults.problem_solving_questions.map(
      (q) => ({
        type: q.type,
        tags: q.tags,
        is_correct: q.is_correct,
      })
    ),
  };
};
