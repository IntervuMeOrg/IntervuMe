// Backend types (for API responses)
export type McqOption = {
	id: string;
	optionText: string;
	isCorrect?: boolean;
};


export type McqQuestion = {
	id: string;
	type: "mcq";
	text: string;
	options: McqOption[];
	points: number;
	explanation?: string;
	tags?: string[];
	// Frontend helper field
	correctOptionId?: string;
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
	starterCode: {
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
	examples: Array<{
		input: string;
		output: string;
		explanation?: string;
	}>;
	constraints?: string[];
	followUp?: string[];
	hints?: string[];
	tags?: string[];
	testCases?: Array<{
		input: string;
		expectedOutput: string;
		isHidden: boolean;
	}>;
	solutionCode?: string;
	memoryLimit?: number;
};
