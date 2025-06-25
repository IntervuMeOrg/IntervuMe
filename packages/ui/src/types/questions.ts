export type MCQOption = {
	id: string;
	text: string;
};

export type MCQQuestion = {
	id: number;
	type: "mcq";
	text: string;
	options: MCQOption[];
	points: number;
	correctOptionId?: string; // Added for feedback
	explanation?: string; // Added for feedback
};

export type ProblemSolvingQuestion = {
	id: number;
	type: "problem_solving";
	name: string;
	difficulty: string;
	text: string;
	examples: { input: string; output: string; explanation?: string }[];
	constraints: string[];
	points: number;
	solution?: string; // Added for feedback
	explanation?: string; // Added for feedback
};
