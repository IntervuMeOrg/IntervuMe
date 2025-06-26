
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

export const mcqAllocPrompt = (jobDescription: string, topics: string[], totalMCQs: number): string => `
Instructions:
- Carefully analyze the job description to identify the relative importance of each topic (programming languages, tools, or technologies).
- Allocate exactly ${totalMCQs} MCQs across these topics **proportionally**, based on their emphasis or priority in the job description. 
- Output must be valid JSON only, following the structure below.

Job Description:
${jobDescription}

Topics to consider (languages & technologies):
${JSON.stringify(topics)}
`;

export const similarityPrompt = (skillsList: string[], categoriesList: string[]): string => `
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
