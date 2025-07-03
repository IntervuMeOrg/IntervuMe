import { CodingQuestion } from "../types/questions";

export function mapBackendToCoding(backendData: any): CodingQuestion {
  return {
    id: parseInt(backendData.id),
    type: "coding",
    title: backendData.title,
    category: backendData.category,
    difficulty: backendData.difficulty,
    points: backendData.points,
    timeLimit: backendData.timeLimit,
    problemStatement: backendData.problemStatement,
    examples: backendData.examples, // Already in correct format
    starterCodes: backendData.starterCodes, // Already in correct format
    constraints: backendData.constraints,
    followUp: backendData.follow_up,
    tags: backendData.tags,
    testCases: backendData.testCases.map((testCase: any) => ({
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
      isHidden: testCase.isHidden
    })),
    solution: undefined, // Will be filled later for feedback
    explanation: undefined // Will be filled later for feedback
  };
}