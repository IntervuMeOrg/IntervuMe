

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { 
  CheckCircleIcon,
  AwardIcon,
  FileTextIcon,
  ChevronLeftIcon, 
  ChevronRightIcon,
  AlertCircleIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";

// Question type definitions (same as InterviewQuestionsPage)
type MCQOption = {
	id: string;
	text: string;
};

type MCQQuestion = {
	id: number;
	type: "mcq";
	text: string;
	options: MCQOption[];
	points: number;
	correctOptionId?: string; // Added for feedback
	explanation?: string; // Added for feedback
};

type ProblemSolvingQuestion = {
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

type Question = MCQQuestion | ProblemSolvingQuestion;

export const OverallFeedbackPage = (): JSX.Element => {
	// State for logged in user (simulated)
	const [userName, setUserName] = useState("Mohamed Essam");
	// Navigation hook for routing
	const navigate = useNavigate();
	// Get location state from navigation
	const location = useLocation();

	// State for detailed feedback visibility
	const [showDetailedFeedback, setShowDetailedFeedback] = useState(false);
	// State for current question index in detailed feedback
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	// Mock interview data (in a real app, this would come from the previous page)
	const [interviewData, setInterviewData] = useState({
		title: location.state?.title || "Frontend Developer Interview",
		totalTime: location.state?.totalTime || 45 * 60, // 45 minutes in seconds
		timeSpent: location.state?.timeSpent || 38 * 60 + 45, // 38 minutes and 45 seconds
		remainingTime: location.state?.remainingTime || 6 * 60 + 15, // 6 minutes and 15 seconds
		totalQuestions: 10,
		solvedQuestions: 8,
		totalPoints: 150,
		earnedPoints: 115,
		jobDescription: location.state?.jobDescription || "",
	});

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
		{
			id: 4,
			type: "mcq",
			text: "Which lifecycle method is called after a component is rendered for the first time?",
			options: [
				{ id: "a", text: "componentDidMount" },
				{ id: "b", text: "componentWillMount" },
				{ id: "c", text: "componentDidUpdate" },
				{ id: "d", text: "componentWillUpdate" },
			],
			points: 10,
			correctOptionId: "a",
			explanation:
				"componentDidMount is called after a component is mounted (inserted into the DOM tree). This is a good place to set up subscriptions or fetch data from an API.",
		},
		{
			id: 5,
			type: "problem_solving",
			name: "Valid Palindrome",
			difficulty: "Easy",
			text: "Implement a function to check if a string is a palindrome, ignoring case and non-alphanumeric characters.",
			examples: [
				{
					input: "'A man, a plan, a canal: Panama'",
					output: "true",
					explanation: "'amanaplanacanalpanama' is a palindrome",
				},
			],
			constraints: [
				"The input string may contain printable ASCII characters",
				"We define empty string as valid palindrome",
			],
			points: 15,
			solution: `function isPalindrome(s) {\n  // Remove non-alphanumeric characters and convert to lowercase\n  const cleanStr = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();\n  \n  // Check if the string reads the same forward and backward\n  let left = 0;\n  let right = cleanStr.length - 1;\n  \n  while (left < right) {\n    if (cleanStr[left] !== cleanStr[right]) {\n      return false;\n    }\n    left++;\n    right--;\n  }\n  \n  return true;\n}`,
			explanation:
				"This solution first cleans the string by removing non-alphanumeric characters and converting to lowercase. Then it uses two pointers (from start and end) to check if the string reads the same in both directions.",
		},
	]);

	// Mock user answers
	const [userAnswers, setUserAnswers] = useState<Record<number, string>>({
		1: "d", // Correct
		2: "b", // Incorrect (correct is c)
		3: `function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) {\n        return [i, j];\n      }\n    }\n  }\n  return [];\n}`, // Correct but inefficient
		4: "a", // Correct
		5: `function isPalindrome(s) {\n  const alphanumeric = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();\n  return alphanumeric === alphanumeric.split('').reverse().join('');\n}`, // Correct
	});

	// Calculate performance metrics
	const correctAnswers = questions.filter((q) => {
		if (q.type === "mcq") {
			return userAnswers[q.id] === q.correctOptionId;
		}
		return userAnswers[q.id] !== undefined; // For problem solving, we'll assume it's correct if answered
	}).length;

	// Calculate category performance
	const categoryPerformance = {
		mcq: {
			total: questions.filter((q) => q.type === "mcq").length,
			correct: questions.filter(
				(q) =>
					q.type === "mcq" &&
					userAnswers[q.id] === (q as MCQQuestion).correctOptionId
			).length,
		},
		problemSolving: {
			total: questions.filter((q) => q.type === "problem_solving").length,
			correct: questions.filter(
				(q) => q.type === "problem_solving" && userAnswers[q.id] !== undefined
			).length,
		},
	};

	// Navigate to next question in detailed feedback
	const goToNextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	// Navigate to previous question in detailed feedback
	const goToPreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	// Check if a question is answered
	const isQuestionAnswered = (questionId: number): boolean => {
		return (
			userAnswers[questionId] !== undefined && userAnswers[questionId] !== ""
		);
	};

	// Check if an MCQ answer is correct
	const isMCQAnswerCorrect = (question: MCQQuestion): boolean => {
		return userAnswers[question.id] === question.correctOptionId;
	};

	// State for active navigation item tracking
	const activeNavItem = "";

	return (
		<NavbarLayout
			activeNavItem={activeNavItem}
			userName={userName}
		>
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
							<motion.div
								variants={{
									hidden: { opacity: 0, y: 30 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.6,
											type: "spring",
											stiffness: 80,
										},
									},
								}}
							>
								<Card className="w-full overflow-hidden shadow-lg border-0">
									<CardContent className="p-0">
										<div className="bg-gradient-to-r from-[#0667D0] to-[#054E9D] p-6 text-white">
											<div className="flex justify-between items-center">
												<h2 className="text-2xl  font-['Nunito',Helvetica] font-bold">
													{interviewData.title} - Results
												</h2>
												<div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
													<AwardIcon className="h-5 w-5" />
													<span className="font-['Nunito',Helvetica] font-semibold">
														Score:{" "}
														{Math.round(
															(interviewData.earnedPoints /
																interviewData.totalPoints) *
																100
														)}
														%
													</span>
												</div>
											</div>
											<p className=" font-['Nunito',Helvetica] mt-2 opacity-90">
												You've completed the {interviewData.title}. Here's your
												performance summary.
											</p>
										</div>

										<div className="font-['Nunito',Helvetica] p-6">
											<motion.div
												className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
												variants={{
													hidden: {},
													visible: {
														transition: {
															staggerChildren: 0.12,
														},
													},
												}}
												initial="hidden"
												animate="visible"
											>
												{/* Time Spent */}
												<motion.div
													variants={{
														hidden: { opacity: 0, y: 30 },
														visible: {
															opacity: 1,
															y: 0,
															transition: { duration: 0.5 },
														},
													}}
												>
													<div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
														<div className="flex items-center gap-3">
															<div className="bg-purple-100 p-2 rounded-full">
																<CheckCircleIcon className="h-6 w-6 text-purple-600" />
															</div>
															<div>
																<h3 className="text-sm font-medium text-gray-500">
																	Questions Solved
																</h3>
																<p className="text-xl font-bold">
																	{interviewData.solvedQuestions}/
																	{interviewData.totalQuestions}
																</p>
															</div>
														</div>
														<div className="mt-3">
															<div className="flex justify-between text-xs text-gray-500 mb-1">
																<span>Completed</span>
																<span>
																	{Math.round(
																		(interviewData.solvedQuestions /
																			interviewData.totalQuestions) *
																			100
																	)}
																	%
																</span>
															</div>
															<Progress
																value={
																	(interviewData.solvedQuestions /
																		interviewData.totalQuestions) *
																	100
																}
																className="h-2"
															/>
														</div>
													</div>
												</motion.div>

												{/* Score */}
												<motion.div
													variants={{
														hidden: { opacity: 0, y: 30 },
														visible: {
															opacity: 1,
															y: 0,
															transition: { duration: 0.5 },
														},
													}}
												>
													<div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
														<div className="flex items-center gap-3">
															<div className="bg-amber-100 p-2 rounded-full">
																<AwardIcon className="h-6 w-6 text-amber-600" />
															</div>
															<div>
																<h3 className="text-sm font-medium text-gray-500">
																	Score
																</h3>
																<p className="text-xl font-bold">
																	{interviewData.earnedPoints}/
																	{interviewData.totalPoints}
																</p>
															</div>
														</div>
														<div className="mt-3">
															<div className="flex justify-between text-xs text-gray-500 mb-1">
																<span>Points Earned</span>
																<span>
																	{Math.round(
																		(interviewData.earnedPoints /
																			interviewData.totalPoints) *
																			100
																	)}
																	%
																</span>
															</div>
															<Progress
																value={
																	(interviewData.earnedPoints /
																		interviewData.totalPoints) *
																	100
																}
																className="h-2"
															/>
														</div>
													</div>
												</motion.div>
												{/* ...other cards if any... */}
											</motion.div>

											{/* Performance Breakdown */}
											<motion.div
												className="mt-8"
												variants={{
													hidden: { opacity: 0, y: 30 },
													visible: {
														opacity: 1,
														y: 0,
														transition: { duration: 0.6 },
													},
												}}
											>
												<h3 className="text-lg font-semibold mb-4">
													Performance Breakdown
												</h3>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
													{/* MCQ Performance */}
													<motion.div
														variants={{
															hidden: { opacity: 0, y: 30 },
															visible: {
																opacity: 1,
																y: 0,
																transition: { duration: 0.5 },
															},
														}}
													>
														<div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
															<div className="flex justify-between items-center mb-4">
																<h4 className="font-medium">
																	Multiple Choice Questions
																</h4>
																<div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">
																	{categoryPerformance.mcq.correct}/
																	{categoryPerformance.mcq.total} Correct
																</div>
															</div>
															<Progress
																value={
																	(categoryPerformance.mcq.correct /
																		categoryPerformance.mcq.total) *
																	100
																}
																className="h-2 mb-2"
															/>
															<p className="text-sm text-gray-500 mt-2">
																{categoryPerformance.mcq.correct ===
																categoryPerformance.mcq.total
																	? "Excellent! You got all MCQ questions correct."
																	: categoryPerformance.mcq.correct >
																	  categoryPerformance.mcq.total / 2
																	? "Good job! You answered most MCQ questions correctly."
																	: "You might want to review the MCQ questions you missed."}
															</p>
														</div>
													</motion.div>

													{/* Problem Solving Performance */}
													<motion.div
														variants={{
															hidden: { opacity: 0, y: 30 },
															visible: {
																opacity: 1,
																y: 0,
																transition: { duration: 0.5 },
															},
														}}
													>
														<div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
															<div className="flex justify-between items-center mb-4">
																<h4 className="font-medium">
																	Problem Solving Questions
																</h4>
																<div className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm font-medium">
																	{categoryPerformance.problemSolving.correct}/
																	{categoryPerformance.problemSolving.total}{" "}
																	Completed
																</div>
															</div>
															<Progress
																value={
																	(categoryPerformance.problemSolving.correct /
																		categoryPerformance.problemSolving.total) *
																	100
																}
																className="h-2 mb-2"
															/>
															<p className="text-sm text-gray-500 mt-2">
																{categoryPerformance.problemSolving.correct ===
																categoryPerformance.problemSolving.total
																	? "Great work! You completed all coding challenges."
																	: categoryPerformance.problemSolving.correct >
																	  0
																	? "You've made good progress on the coding challenges."
																	: "You should practice more coding challenges."}
															</p>
														</div>
													</motion.div>
												</div>
											</motion.div>

											{/* Overall Feedback */}
											<div className="mt-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
												<h3 className="text-lg font-semibold mb-4">
													Overall Feedback
												</h3>
												<p className="text-gray-700 mb-4">
													{correctAnswers === questions.length
														? "Excellent performance! You've demonstrated a strong understanding of the concepts tested in this interview."
														: correctAnswers > questions.length * 0.7
														? "Great job! You've shown good knowledge in most areas. Review the questions you missed to further improve."
														: correctAnswers > questions.length * 0.5
														? "Good effort! You've passed this interview but there's room for improvement. Focus on the areas where you struggled."
														: "You need more practice in the areas covered by this interview. Review the detailed feedback to identify your weak points."}
												</p>
												<div className="flex justify-center mt-6">
													<motion.button
														whileHover={{ scale: 1.05 }}
														whileTap={{ scale: 0.95 }}
														onClick={() => setShowDetailedFeedback(true)}
														className="bg-[#0667D0] hover:bg-[#054E9D] text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg"
													>
														<FileTextIcon className="h-5 w-5" />
														<span className="font-semibold">
															View Detailed Feedback
														</span>
													</motion.button>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						</motion.div>
					) : (
						// Detailed Feedback View
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
							<motion.div
								variants={{
									hidden: { opacity: 0, y: 30 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.6,
											type: "spring",
											stiffness: 80,
										},
									},
								}}
							>
								<Card className="w-full overflow-hidden shadow-lg border-0">
									<CardContent className="p-0">
										<div className="bg-gradient-to-r from-[#0667D0] to-[#054E9D] p-6 text-white">
											<div className="flex justify-between items-center">
												<h2 className="text-2xl font-bold">
													Detailed Feedback
												</h2>
												<Button
													onClick={() => setShowDetailedFeedback(false)}
													className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full shadow-md flex items-center gap-1 transition-all duration-200"
												>
													<ChevronLeftIcon className="h-4 w-4" />
													<span>Back to Summary</span>
												</Button>
											</div>
											<p className="mt-2 opacity-90">
												Review each question with correct answers and
												explanations.
											</p>
										</div>

										<div className="p-6">
											{/* Question Navigation */}
											<motion.div
												variants={{
													hidden: { opacity: 0, y: 20 },
													visible: {
														opacity: 1,
														y: 0,
														transition: { duration: 0.4 },
													},
												}}
												className="flex justify-between items-center mb-6"
											>
												<Button
													onClick={goToPreviousQuestion}
													disabled={currentQuestionIndex === 0}
													className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
														currentQuestionIndex === 0
															? "bg-gray-200 text-gray-400 cursor-not-allowed"
															: "bg-gray-200 hover:bg-gray-300 text-gray-700"
													}`}
												>
													<ChevronLeftIcon className="h-4 w-4" />
													<span>Previous</span>
												</Button>

												<div className="text-center">
													<span className="text-sm text-gray-500">
														Question {currentQuestionIndex + 1} of{" "}
														{questions.length}
													</span>
													<div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mt-1 mx-auto">
														<div
															className="h-full bg-[#0667D0] rounded-full"
															style={{
																width: `${
																	((currentQuestionIndex + 1) /
																		questions.length) *
																	100
																}%`,
															}}
														/>
													</div>
												</div>

												<Button
													onClick={goToNextQuestion}
													disabled={
														currentQuestionIndex === questions.length - 1
													}
													className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
														currentQuestionIndex === questions.length - 1
															? "bg-gray-200 text-gray-400 cursor-not-allowed"
															: "bg-gray-200 hover:bg-gray-300 text-gray-700"
													}`}
												>
													<span>Next</span>
													<ChevronRightIcon className="h-4 w-4" />
												</Button>
											</motion.div>

											{/* Question Content */}
											<motion.div
												key={currentQuestionIndex}
												initial="hidden"
												animate="visible"
												exit="hidden"
												variants={{
													hidden: { opacity: 0, y: 30 },
													visible: {
														opacity: 1,
														y: 0,
														transition: { duration: 0.5 },
													},
												}}
												className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
											>
												{questions[currentQuestionIndex].type === "mcq" ? (
													// MCQ Question Feedback
													<div>
														<div className="mb-4">
															<h3 className="text-lg font-semibold mb-2">
																Question {currentQuestionIndex + 1}: Multiple
																Choice
															</h3>
															<p className="text-gray-700">
																{questions[currentQuestionIndex].text}
															</p>
														</div>

														<div className="mb-6">
															<h4 className="font-medium text-gray-700 mb-2">
																Options:
															</h4>
															<RadioGroup
																value={
																	userAnswers[
																		questions[currentQuestionIndex].id
																	] || ""
																}
																className="space-y-2"
															>
																{(
																	questions[currentQuestionIndex] as MCQQuestion
																).options.map((option) => {
																	const isCorrect =
																		option.id ===
																		(
																			questions[
																				currentQuestionIndex
																			] as MCQQuestion
																		).correctOptionId;
																	const isSelected =
																		userAnswers[
																			questions[currentQuestionIndex].id
																		] === option.id;

																	return (
																		<div
																			key={option.id}
																			className={`flex items-center space-x-2 p-3 rounded-md ${
																				isCorrect
																					? "bg-green-50 border border-green-200"
																					: isSelected && !isCorrect
																					? "bg-red-50 border border-red-200"
																					: "bg-gray-50 border border-gray-200"
																			}`}
																		>
																			<RadioGroupItem
																				value={option.id}
																				id={`option-${option.id}`}
																				disabled
																			/>
																			<Label
																				htmlFor={`option-${option.id}`}
																				className="flex-1 cursor-pointer"
																			>
																				{option.text}
																			</Label>
																			{isCorrect && (
																				<CheckCircleIcon className="h-5 w-5 text-green-500" />
																			)}
																			{isSelected && !isCorrect && (
																				<AlertCircleIcon className="h-5 w-5 text-red-500" />
																			)}
																		</div>
																	);
																})}
															</RadioGroup>
														</div>

														<div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
															<h4 className="font-medium text-blue-700 mb-2">
																Explanation:
															</h4>
															<p className="text-gray-700">
																{
																	(
																		questions[
																			currentQuestionIndex
																		] as MCQQuestion
																	).explanation
																}
															</p>
														</div>

														<div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
															<div className="flex justify-between items-center">
																<h4 className="font-medium text-gray-700">
																	Your Performance:
																</h4>
																<div
																	className={`px-3 py-1 rounded-full text-sm font-medium ${
																		isMCQAnswerCorrect(
																			questions[
																				currentQuestionIndex
																			] as MCQQuestion
																		)
																			? "bg-green-100 text-green-700"
																			: "bg-red-100 text-red-700"
																	}`}
																>
																	{isMCQAnswerCorrect(
																		questions[
																			currentQuestionIndex
																		] as MCQQuestion
																	)
																		? "Correct"
																		: "Incorrect"}
																</div>
															</div>
															<p className="text-sm text-gray-500 mt-2">
																{isMCQAnswerCorrect(
																	questions[currentQuestionIndex] as MCQQuestion
																)
																	? "Great job! You selected the correct answer."
																	: `You selected option ${
																			userAnswers[
																				questions[currentQuestionIndex].id
																			]
																	  } instead of the correct option ${
																			(
																				questions[
																					currentQuestionIndex
																				] as MCQQuestion
																			).correctOptionId
																	  }.`}
															</p>
														</div>
													</div>
												) : (
													// Problem Solving Question Feedback
													<div>
														<div className="mb-4">
															<div className="flex justify-between items-center mb-2">
																<h3 className="text-lg font-semibold">
																	Problem {currentQuestionIndex + 1}:{" "}
																	{
																		(
																			questions[
																				currentQuestionIndex
																			] as ProblemSolvingQuestion
																		).name
																	}
																</h3>
																<span
																	className={`px-2 py-1 rounded text-xs font-medium ${
																		(
																			questions[
																				currentQuestionIndex
																			] as ProblemSolvingQuestion
																		).difficulty === "Easy"
																			? "bg-green-100 text-green-700"
																			: (
																					questions[
																						currentQuestionIndex
																					] as ProblemSolvingQuestion
																			  ).difficulty === "Medium"
																			? "bg-yellow-100 text-yellow-700"
																			: "bg-red-100 text-red-700"
																	}`}
																>
																	{
																		(
																			questions[
																				currentQuestionIndex
																			] as ProblemSolvingQuestion
																		).difficulty
																	}
																</span>
															</div>
															<p className="text-gray-700">
																{
																	(
																		questions[
																			currentQuestionIndex
																		] as ProblemSolvingQuestion
																	).text
																}
															</p>
														</div>

														<div className="mb-6">
															<h4 className="font-medium text-gray-700 mb-2">
																Examples:
															</h4>
															<div className="space-y-3">
																{(
																	questions[
																		currentQuestionIndex
																	] as ProblemSolvingQuestion
																).examples.map((example, idx) => (
																	<div
																		key={idx}
																		className="bg-gray-50 p-3 rounded-md border border-gray-200"
																	>
																		<div className="grid grid-cols-2 gap-4">
																			<div>
																				<p className="text-xs text-gray-500 mb-1">
																					Input:
																				</p>
																				<pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
																					{example.input}
																				</pre>
																			</div>
																			<div>
																				<p className="text-xs text-gray-500 mb-1">
																					Output:
																				</p>
																				<pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
																					{example.output}
																				</pre>
																			</div>
																		</div>
																		{example.explanation && (
																			<p className="mt-2 text-xs text-gray-600">
																				<span className="font-medium">
																					Explanation:
																				</span>{" "}
																				{example.explanation}
																			</p>
																		)}
																	</div>
																))}
															</div>
														</div>

														<div className="mb-6">
															<h4 className="font-medium text-gray-700 mb-2">
																Your Solution:
															</h4>
															<pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
																{userAnswers[
																	questions[currentQuestionIndex].id
																] || "No solution submitted"}
															</pre>
														</div>

														<div className="mb-6">
															<h4 className="font-medium text-gray-700 mb-2">
																Optimal Solution:
															</h4>
															<pre className="bg-blue-50 p-4 rounded-md overflow-x-auto text-sm border border-blue-100">
																{
																	(
																		questions[
																			currentQuestionIndex
																		] as ProblemSolvingQuestion
																	).solution
																}
															</pre>
														</div>

														<div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
															<h4 className="font-medium text-blue-700 mb-2">
																Explanation:
															</h4>
															<p className="text-gray-700">
																{
																	(
																		questions[
																			currentQuestionIndex
																		] as ProblemSolvingQuestion
																	).explanation
																}
															</p>
														</div>

														<div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
															<div className="flex justify-between items-center">
																<h4 className="font-medium text-gray-700">
																	Your Performance:
																</h4>
																<div
																	className={`px-3 py-1 rounded-full text-sm font-medium ${
																		isQuestionAnswered(
																			questions[currentQuestionIndex].id
																		)
																			? "bg-green-100 text-green-700"
																			: "bg-red-100 text-red-700"
																	}`}
																>
																	{isQuestionAnswered(
																		questions[currentQuestionIndex].id
																	)
																		? "Attempted"
																		: "Not Attempted"}
																</div>
															</div>
															<p className="text-sm text-gray-500 mt-2">
																{isQuestionAnswered(
																	questions[currentQuestionIndex].id
																)
																	? "You submitted a solution for this problem. Compare your approach with the optimal solution."
																	: "You didn't submit a solution for this problem. Review the optimal solution to learn the approach."}
															</p>
														</div>
													</div>
												)}
											</motion.div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						</motion.div>
					)}
				</div>
			</main>
		</NavbarLayout>
	);
};

export default OverallFeedbackPage;