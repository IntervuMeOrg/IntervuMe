import { useState } from "react";
import { motion } from "framer-motion";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { DetailedFeedbackView } from "./DetailedFeedbackView";
import { ResultSummaryCard } from "./ResultSummaryCard";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";

type Question = MCQQuestion | ProblemSolvingQuestion;

export const OverallFeedbackPage = (): JSX.Element => {
	// State for logged in user (simulated)
	const [userName, setUserName] = useState("Mohamed Essam");

	// State for detailed feedback visibility
	const [showDetailedFeedback, setShowDetailedFeedback] = useState(false);

	// Mock questions data with correct answers and explanations
	const [questions, setQuestions] = useState<Question[]>([
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
			type: "problem_solving",
			name: "Two Sum",
			difficulty: "Medium",
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
		// {
		// 	id: 4,
		// 	type: "mcq",
		// 	text: "Which lifecycle method is called after a component is rendered for the first time?",
		// 	options: [
		// 		{ id: "a", text: "componentDidMount" },
		// 		{ id: "b", text: "componentWillMount" },
		// 		{ id: "c", text: "componentDidUpdate" },
		// 		{ id: "d", text: "componentWillUpdate" },
		// 	],
		// 	points: 10,
		// 	correctOptionId: "a",
		// 	explanation:
		// 		"componentDidMount is called after a component is mounted (inserted into the DOM tree). This is a good place to set up subscriptions or fetch data from an API.",
		// },
		// {
		// 	id: 5,
		// 	type: "problem_solving",
		// 	name: "Valid Palindrome",
		// 	difficulty: "Easy",
		// 	text: "Implement a function to check if a string is a palindrome, ignoring case and non-alphanumeric characters.",
		// 	examples: [
		// 		{
		// 			input: "'A man, a plan, a canal: Panama'",
		// 			output: "true",
		// 			explanation: "'amanaplanacanalpanama' is a palindrome",
		// 		},
		// 	],
		// 	constraints: [
		// 		"The input string may contain printable ASCII characters",
		// 		"We define empty string as valid palindrome",
		// 	],
		// 	points: 15,
		// 	solution: `function isPalindrome(s) {\n  // Remove non-alphanumeric characters and convert to lowercase\n  const cleanStr = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();\n  \n  // Check if the string reads the same forward and backward\n  let left = 0;\n  let right = cleanStr.length - 1;\n  \n  while (left < right) {\n    if (cleanStr[left] !== cleanStr[right]) {\n      return false;\n    }\n    left++;\n    right--;\n  }\n  \n  return true;\n}`,
		// 	explanation:
		// 		"This solution first cleans the string by removing non-alphanumeric characters and converting to lowercase. Then it uses two pointers (from start and end) to check if the string reads the same in both directions.",
		// },
	]);

	// Mock user answers
	const [userAnswers, setUserAnswers] = useState<Record<number, string>>({
		1: "d", // Correct
		2: "b", // Incorrect (correct is c)
		3: `function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) {\n        return [i, j];\n      }\n    }\n  }\n  return [];\n}`, // Correct but inefficient
		4: "a", // Correct
		5: `function isPalindrome(s) {\n  const alphanumeric = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();\n  return alphanumeric === alphanumeric.split('').reverse().join('');\n}`, // Correct
	});

	// State for active navigation item tracking
	const activeNavItem = "";

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
								setShowDetailedFeedback={setShowDetailedFeedback}
							/>
						</motion.div>
					) : (
						// Detailed Feedback View
						<DetailedFeedbackView
							questions={questions}
							userAnswers={userAnswers}
							setShowDetailedFeedback={setShowDetailedFeedback}
						/>
					)}
				</div>
			</main>
		</NavbarLayout>
	);
};

export default OverallFeedbackPage;
