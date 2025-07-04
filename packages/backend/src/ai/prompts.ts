import { AssessmentResults } from "./types";

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
Generate ${number} multiple-choice question(s) on: ${topic}

Format as JSON array:
[
  {
    "question": "question text",
    "options": {
      "A": "option A",
      "B": "option B", 
      "C": "option C",
      "D": "option D"
    },
    "correct_answer": "A|B|C|D",
    "explanation": "brief explanation"
  }
]
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

Topics: ${JSON.stringify(topics, null, 2)}

Return JSON:
{
  "allocations": {
    "topic_name": count,
    "topic_name": count,
    ...
  }
}
`;

export const similarityPrompt = (
  skillsList: string[],
  categoriesList: string[]
): string => `
You are an expert in skill classification and semantic similarity matching. Your task is to map a given list of skills to the most relevant categories from a predefined database.

Input:
- Skills: ${JSON.stringify(skillsList, null, 2)}
- Categories: ${JSON.stringify(categoriesList, null, 2)}

Return JSON:
{
  "matched_skills": [
    {"skill": "skill_name", "matched_category": "category_name"}
  ]
}
`;

export const feedbackPrompt = (
  assessmentResults: AssessmentResults
): string => `
You are an expert technical interviewer and career coach. Analyze the following assessment results and provide comprehensive, actionable feedback for the candidate.

Analysis Guidelines:
1. Calculate scores accurately based on the provided data
2. For MCQ questions: Count correct answers vs total MCQ questions
3. For problem-solving questions: 
   - A question is considered "solved" only if tests_passed equals total_tests
   - If tests_passed < total_tests, the candidate failed that problem
   - Analyze performance by difficulty level and technology tags
4. Identify specific knowledge gaps based on failed questions and their tags
5. Provide concrete, actionable recommendations targeting weak areas
6. Be encouraging but brutally honest about actual performance
7. Base all analysis strictly on the provided assessment data
8. Don't make assumptions about performance not evident in the data

CRITICAL: Only provide recommendations related to the specific technologies, concepts, and question types that were actually tested in this assessment. Do not suggest learning unrelated technologies or concepts that weren't part of the assessment.

Key Analysis Points:
- Overall score should reflect actual performance across all questions
- Problem-solving score should be based on completely solved problems only
- Identify specific technology areas where the candidate struggled
- Provide targeted recommendations for failed problem types and tags
- All recommendations must be directly related to the tags and question types in the assessment

Assessment Data:
${JSON.stringify(assessmentResults, null, 2)}

Return JSON:
{
  "overall_performance": {
    "score_percentage": number,
    "level": "Excellent|Good|Average|Below Average|Poor",
    "summary": "Brief overall assessment summary"
  },
  "strengths": [
    {"area": "skill/topic", "details": "what they did well"}
  ],
  "critical_gaps": [
    {"area": "skill/topic", "details": "Specific details about areas needing improvement", "impact": "How this affects job readiness"}
  ],
  "recommendations": [
    {
      "area": "skill/topic",
      "priority": "High|Medium|Low",
      "actions": ["specific step 1", "specific step 2"],
      "timeline": "time estimate"
    }
  ],
  "job_readiness": {
    "current_level": "Entry Level|Junior|Mid-Level|Senior|Expert",
    "readiness_percentage": number
  },
  "next_steps": ["immediate action 1", "immediate action 2", "long-term goal 1"]
}
`;

export const codingDifficultyPrompt = (jobDescription: string): string =>
  `Analyze the following job description and determine the appropriate difficulty levels for 2 coding questions that would be suitable for this role.

Job Description:
${jobDescription}

Based on the role's seniority level, required skills, and experience expectations, select exactly 2 difficulty levels from: easy, medium, hard.

Consider:
- Junior/Entry-level roles: easy or medium
- Mid-level roles: medium or hard  
- Senior/Lead roles: medium or hard
- The same difficulty can be selected twice if appropriate

Return your response in the following JSON format:
{
  "difficulties": ["difficulty1", "difficulty2"],
  "reasoning": "Brief explanation of why these difficulty levels are appropriate for this role"
}

Example response:
{
  "difficulties": ["medium", "hard"],
  "reasoning": "This is a senior software engineer role requiring 5+ years of experience with complex system design, so medium and hard questions are appropriate to assess advanced problem-solving skills."
}`;
