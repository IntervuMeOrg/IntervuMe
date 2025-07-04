export type MCQOption = {
	id: string;
	text: string;
};

export type MCQQuestion = {
	id: string;
	type: "mcq";
	text: string;
	options: MCQOption[];
	points: number;
	correctOptionId?: string; // Added for feedback
	explanation?: string; // Added for feedback
};

export type CodingQuestion = {
  id: string;
  type: "coding";
  title: string;
  category: string;
  difficulty: string;
  points: number;
  timeLimit: number;
  problemStatement: string;
  examples: { input: string; output: string; explanation?: string }[];
  starterCodes: {
    codeHeader: {
      cpp: string;
      java: string;
      python: string;
    };
    codeStarter: {
      cpp: string;
      java: string;
      python: string;
    };
    codeFooter: {
      cpp: string;
      java: string;
      python: string;
    };
  };
  constraints: string[];
  followUp: string[];
  tags: string[];
  testCases: {
    input: string;
    expectedOutput: string;
    isHidden: boolean;
  }[];
  solution?: string; // For feedback
  explanation?: string; // For feedback
};
