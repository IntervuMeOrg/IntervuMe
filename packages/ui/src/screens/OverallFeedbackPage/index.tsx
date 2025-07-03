import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { DetailedFeedbackView } from "./DetailedFeedbackView";
import { ResultSummaryCard } from "./ResultSummaryCard";
import { MCQQuestion, CodingQuestion } from "../../types/questions";
import { DetailedFeedbackData } from "../../types/performance";
import { useCurrentUser } from "../../lib/authentication/authentication-hooks";

type Question = MCQQuestion | CodingQuestion;

const feedbackData: DetailedFeedbackData = {
	questions: [
		{
			id: 1,
			type: "mcq",
			text: "Which of the following is NOT a React Hook?",
			options: [
				{ id: "a", text: "useState" },
				{ id: "b", text: "useEffect" },
				{ id: "c", text: "useHistory" },
				{ id: "d", text: "useReactState" },
			],
			points: 10,
			correctOptionId: "d",
			explanation:
				"'useReactState' is not a built-in React Hook. The other options (useState, useEffect, and useHistory) are all valid React Hooks, with useHistory being part of react-router.",
		},
		{
			id: 2,
			type: "mcq",
			text: "What is the correct way to pass a prop called 'name' to a component?",
			options: [
				{ id: "a", text: "<Component {name='John'} />" },
				{ id: "b", text: "<Component name='John' />" },
				{ id: "c", text: '<Component name="John" />' },
				{ id: "d", text: "<Component props={name: 'John'} />" },
			],
			points: 10,
			correctOptionId: "c",
			explanation:
				"The correct way to pass a prop in JSX is using the attribute syntax with the prop name followed by the value in quotes. Both single and double quotes work in JSX, but double quotes are more common.",
		},
		{
			id: 3,
			type: "coding",
			name: "Two Sum",
			text: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
			examples: [
				{
					input: "nums = [2,7,11,15], target = 9",
					output: "[0,1]",
					explanation: "Because nums[0] + nums[1] == 9",
				},
			],
			constraints: [
				"2 <= nums.length <= 10^4",
				"-10^9 <= nums[i] <= 10^9",
				"-10^9 <= target <= 10^9",
				"Only one valid answer exists.",
			],
			points: 20,
			solution: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`,

			explanation:
				"This solution uses a hash map to store each number and its index. For each number, we check if its complement (target - current number) exists in the map. If it does, we've found our pair. This approach has O(n) time complexity.",
		},
	],
	userAnswers: {
		1: "d", // Correct
		2: "b", // Incorrect (correct is c)
		3: `function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) {\n        return [i, j];\n      }\n    }\n  }\n  return [];\n}`, // Correct but inefficient
	},
	performanceMetrics: {
		overallPercentage: 75, // Updated to match actual performance
		mcqPercentage: 50, // 1 correct out of 2 MCQs = 50%
		mcqCorrect: 1,
		mcqTotal: 2, // Fixed: you have 2 MCQ questions
		problemSolvingPercentage: 100, // 1 correct out of 1 = 100%
		problemSolvingCorrect: 1,
		problemSolvingTotal: 1,
	},
	skillAssessment: {
		strengths: [
			"Strong understanding of algorithmic complexity",
			"Good problem-solving approach",
			"Clean code structure",
			"Effective use of data structures",
		],
		improvements: [
			"Consider edge cases more thoroughly",
			"Add input validation",
			"Optimize space complexity where possible",
			"Practice more dynamic programming problems",
		],
	},
	studyRecommendations: {
		studyResources: [
			"LeetCode Algorithm Problems",
			"Cracking the Coding Interview",
			"Algorithm Design Manual",
			"GeeksforGeeks Data Structures",
		],
		practiceAreas: [
			"Hash Maps and Sets",
			"Two Pointer Techniques",
			"Dynamic Programming",
			"Tree Traversal Algorithms",
		],
	},
	questionPerformances: {
		1: {
			score: 100,
			rating: "Excellent",
			color: "text-green-400",
			bgColor: "bg-green-400/10",
			feedback:
				"Perfect! You correctly identified that 'useReactState' is not a built-in React Hook. Great knowledge of React fundamentals.",
		},
		2: {
			score: 40,
			rating: "Needs Improvement",
			color: "text-red-400",
			bgColor: "bg-red-400/10",
			feedback:
				"Incorrect answer. The correct way to pass props in JSX is using double quotes. Review JSX syntax and prop passing conventions.",
		},
		3: {
			score: 85,
			rating: "Very Good",
			color: "text-blue-400",
			bgColor: "bg-blue-400/10",
			feedback:
				"Great solution! Your nested loop approach works correctly and handles all cases. Consider optimizing to O(n) time complexity using a hash map for better performance on larger inputs.",
		},
	},
};
export const OverallFeedbackPage = (): JSX.Element => {
	const user = useCurrentUser();

	const userName = user.data 
		? `${user.data.firstName} ${user.data.lastName}`
		: '';
	// State for detailed feedback visibility
	const [showDetailedFeedback, setShowDetailedFeedback] = useState(false);

	// Mock questions data with correct answers and explanations
	const [questions, setQuestions] = useState<Question[]>(
		feedbackData.questions
	);

	// Mock user answers
	const [userAnswers, setUserAnswers] = useState<Record<number, string>>(
		feedbackData.userAnswers
	);

	// State for active navigation item tracking
	const activeNavItem = "";

	const totalPoints = feedbackData.questions.reduce(
		(sum, q) => sum + q.points,
		0
	);
	const totalQuestions = questions.length;
	const correctAnswers = feedbackData.questions.filter((q) => {
		const userAnswer = feedbackData.userAnswers[q.id];
		return q.type === "mcq"
			? userAnswer === q.correctOptionId
			: !!(userAnswer && userAnswer.trim().length > 0);
	}).length;
	const earnedPoints = feedbackData.questions.reduce((sum, q) => {
		const userAnswer = feedbackData.userAnswers[q.id];
		const isCorrect =
			q.type === "mcq"
				? userAnswer === q.correctOptionId
				: !!(userAnswer && userAnswer.trim().length > 0);
		return sum + (isCorrect ? q.points : 0);
	}, 0);
	let mcqCorrect = 0;
	let mcqTotal = 0;
	let problemSolvingCorrect = 0;
	let problemSolvingTotal = 0;

	questions.forEach((question) => {
		const userAnswer = userAnswers[question.id];
		if (question.type === "mcq") {
			mcqTotal++;
			if (userAnswer === question.correctOptionId) {
				mcqCorrect++;
			}
		} else if (question.type === "coding") {
			problemSolvingTotal++;
			if (userAnswer && userAnswer.trim().length > 0) {
				problemSolvingCorrect++;
			}
		}
	});

	const overallPercentage = Math.round((earnedPoints / totalPoints) * 100);
	const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

	return (
		<NavbarLayout activeNavItem={activeNavItem} userName={userName}>
			<main className="bg-white w-full relative min-h-screen">
				{/* Background image */}
				<img
					className="fixed w-full h-full object-cover"
					alt="Rectangle"
					src="/rectangle.png"
				/>
				{/* Main Content */}
				<div className="relative z-10 py-[3vh] px-[8vw]">
					{!showDetailedFeedback ? (
						// Overall Feedback View
						<motion.div
							initial="hidden"
							animate="visible"
							variants={{
								hidden: {},
								visible: {
									transition: {
										staggerChildren: 0.15,
									},
								},
							}}
							className="space-y-6"
						>
							{/* Results Summary Card */}
							<ResultSummaryCard
								questions={questions}
								userAnswers={userAnswers}
								overallPercentage={overallPercentage}
								earnedPoints={earnedPoints}
								totalPoints={totalPoints}
								totalQuestions={totalQuestions}
								correctAnswers={correctAnswers}
								accuracy={accuracy}
								setShowDetailedFeedback={setShowDetailedFeedback}
							/>
						</motion.div>
					) : (
						// Detailed Feedback View
						<DetailedFeedbackView
							data={feedbackData}
							setShowDetailedFeedback={setShowDetailedFeedback}
						/>
					)}
				</div>
			</main>
		</NavbarLayout>
	);
};

export default OverallFeedbackPage;
