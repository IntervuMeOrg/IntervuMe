import { AssessmentResults } from "./types";

export const keywordPrompt = (jobDescription: string): string => `
Analyze the following job description and extract relevant keywords. The extracted keywords should match the following JSON structure exactly:

{
  "job_title": "extracted job title",
  "skills": ["list of technical and soft skills"],
  "programming_languages": ["list of programming languages"],
  "tools_technologies": ["list of tools, platforms, cloud services, and frameworks"],
  "experience": "experience level or years",
  "seniority": "Determine the seniority level based on the job requirements and responsibilities. Return exactly one of: 'entry' (junior/entry-level), 'mid' (mid-level/intermediate), or 'senior' (senior/expert-level)",
  "qualifications": ["list of qualifications"],
  "company_name": "the company name"
}

IMPORTANT: Only extract information that is explicitly mentioned in the job description. If any field cannot be found or is not clearly stated, leave it empty:
- Use empty string "" for text fields that are not found
- Use empty array [] for array fields that are not found
- Do not assume, guess, or infer values that are not explicitly stated
- Do not use placeholder values like "N/A", "Not specified", or similar

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
1. Scoring:
   - MCQ: Count correct answers vs total questions
   - Coding: Only count problems where tests_passed equals total_tests
   - Include difficulty level in assessment

2. Language and Tone:
   - Use simple, clear language
   - Be encouraging while honest
   - Focus on growth opportunities
   - Don't use variable names in the feedback, use normal english words

3. Content Focus:
   - Only analyze data from the assessment
   - Identify patterns in failed questions
   - Link recommendations directly to assessment performance
   - Keep feedback concise and actionable

4. Structure:
   - Start with strengths
   - Group related gaps together
   - Prioritize recommendations by impact
   - Provide specific, achievable recommendations

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
    {"area": "skill/topic", "details": "Specific gap or missing skill"}
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
