import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
	ChevronLeftIcon,
	ChevronRightIcon, 
	CheckCircleIcon,
	AlertCircleIcon,
	TimerIcon,
	SendIcon,
	XIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { EditorLayout } from "../../components/layout/EditorLayout";

// Question type definitions
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
};

type Question = MCQQuestion | ProblemSolvingQuestion;

export const InterviewQuestionsPage = (): JSX.Element => {
	// Navigation hook for routing
	const navigate = useNavigate();

	// Mock questions data
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
		},
		{
			id: 6,
			type: "problem_solving",
			name: "Debounce Function",
			difficulty: "Medium",
			text: "Create a function that implements a basic debounce mechanism.",
			examples: [
				{
					input: "debounce(searchFunction, 300)",
					output: "Executes once after 300ms",
					explanation: "Multiple calls within 300ms delay execution",
				},
			],
			constraints: [
				"The returned function should cancel pending executions",
				"Should handle multiple rapid calls correctly",
			],
			points: 25,
		},
		{
			id: 7,
			type: "problem_solving",
			name: "Flatten Nested Array",
			difficulty: "Medium",
			text: "Implement a function that flattens a nested array.",
			examples: [
				{
					input: "[1, [2, [3, 4], 5], 6]",
					output: "[1, 2, 3, 4, 5, 6]",
				},
			],
			constraints: [
				"Should handle arbitrarily nested arrays",
				"Return new array without modifying original",
			],
			points: 20,
		},
		{
			id: 8,
			type: "mcq",
			text: "What is the purpose of the 'key' prop when rendering a list of elements in React?",
			options: [
				{ id: "a", text: "It's required for CSS styling" },
				{
					id: "b",
					text: "It helps React identify which items have changed, are added, or are removed",
				},
				{ id: "c", text: "It's used for encryption purposes" },
				{ id: "d", text: "It determines the order of elements in the DOM" },
			],
			points: 10,
		},
		{
			id: 9,
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
		},
		{
			id: 10,
			type: "mcq",
			text: "Which of the following is true about React's virtual DOM?",
			options: [
				{ id: "a", text: "It directly manipulates the browser's DOM" },
				{
					id: "b",
					text: "It's slower than directly manipulating the browser's DOM",
				},
				{ id: "c", text: "It's a lightweight copy of the actual DOM" },
				{ id: "d", text: "It requires special browser plugins to work" },
			],
			points: 10,
		},
		{
			id: 11,
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
		},
		{
			id: 12,
			type: "mcq",
			text: "What is the correct way to conditionally render a component in React?",
			options: [
				{ id: "a", text: "if (condition) { return <Component />; }" },
				{ id: "b", text: "condition && <Component />" },
				{ id: "c", text: "<Component if={condition} />" },
				{ id: "d", text: "<If condition={condition}><Component /></If>" },
			],
			points: 10,
		},
	]);
	// Get interview data from navigation state or use default values
	const location = useLocation();
	const [interviewData, setInterviewData] = useState({
		title: location.state?.title || "Frontend Developer Interview",
		totalTime: location.state?.totalTime || 45 * 60, // 45 minutes in seconds
		totalQuestions: questions.length,
		jobDescription: location.state?.jobDescription || "",
	});
	// State for current question index
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	// State for user answers
	const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
	// State for remaining time
	const [remainingTime, setRemainingTime] = useState(interviewData.totalTime);
	// State for timer active
	const [timerActive, setTimerActive] = useState(true);
	// State for question list sidebar visibility
	const [sidebarVisible, setSidebarVisible] = useState(false);
	// State for footer visibility
	const [footerVisible, setFooterVisible] = useState(true);

	// States for confirmation modals
	const [exitConfirmation, setExitConfirmation] = useState<boolean>(false);
	const [submitConfirmation, setSubmitConfirmation] = useState<boolean>(false);

	// State for console visibility and active tab
	const [consoleVisible, setConsoleVisible] = useState(false);

	const [consoleTab, setConsoleTab] = useState<
		"testcases" | "output" | "submissions"
	>("testcases");
	// State for code execution output
	const [codeOutput, setCodeOutput] = useState<string>("");
	// State for submission status
	const [submissionStatus, setSubmissionStatus] = useState<{
		status: "success" | "error" | "pending" | "none";
		message: string;
		testCasesPassed?: number;
		totalTestCases?: number;
	}>({ status: "none", message: "" });

	// Format time as MM:SS
	const formatTime = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
			.toString()
			.padStart(2, "0")}`;
	};

	// Timer effect
	useEffect(() => {
		if (!timerActive) return;

		const timer = setInterval(() => {
			setRemainingTime((prev: number) => {
				if (prev <= 0) {
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [timerActive]);

	// Handle MCQ answer selection
	const handleMCQAnswer = (questionId: number, optionId: string) => {
		setUserAnswers((prev) => ({
			...prev,
			[questionId]: optionId,
		}));
	};

	// Handle problem solving answer
	const handleProblemSolvingAnswer = (questionId: number, answer: string) => {
		setUserAnswers((prev) => ({
			...prev,
			[questionId]: answer,
		}));
	};

	// Navigate to next question
	const goToNextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	// Navigate to previous question
	const goToPreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	// Navigate to specific question
	const goToQuestion = (index: number) => {
		if (index >= 0 && index < questions.length) {
			setCurrentQuestionIndex(index);
		}
	};

	// Add this state for the custom notification
	const [notification, setNotification] = useState<{
		visible: boolean;
		message: string;
		type: "success" | "error" | "info";
	}>({
		visible: false,
		message: "",
		type: "success",
	});

	// Submit the interview
	const handleSubmitInterview = () => {
		// In a real app, this would submit answers to a backend
		console.log("Submitting interview answers:", userAnswers);
		setSubmitConfirmation(false);
		// Show success notification instead of alert
		setNotification({
			visible: true,
			message: "Interview submitted successfully!",
			type: "success",
		});

		// Hide notification after 2 seconds
		setTimeout(() => {
			setNotification({ ...notification, visible: false });
			window.scrollTo(0, 0);
			navigate("/overall-feedback");
		}, 2000);
	};

	// Check if a question is answered
	const isQuestionAnswered = (questionId: number): boolean => {
		return (
			userAnswers[questionId] !== undefined && userAnswers[questionId] !== ""
		);
	};

	// Count answered questions
	const answeredQuestionsCount = Object.keys(userAnswers).filter(
		(key) =>
			userAnswers[parseInt(key)] !== undefined &&
			userAnswers[parseInt(key)] !== ""
	).length;

	// Calculate total points
	const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

	// Calculate earned points (in a real app, this would be based on correct answers)
	const earnedPoints = questions
		.filter((q) => isQuestionAnswered(q.id))
		.reduce((sum, q) => sum + q.points, 0);

	// Animation variants
	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				type: "spring" as const,
				stiffness: 100,
				damping: 15,
			},
		},
	};

	const sidebarVariants = {
		closed: { x: "-100%", opacity: 0 },
		open: { x: 0, opacity: 1 },
	};

	return (
		<main className="bg-white w-full relative min-h-screen">
			{/* Background image */}
			<img
				className="fixed w-full h-full object-cover"
				alt="Rectangle"
				src="/rectangle.png"
			/>

			{/* Simplified header */}
			<motion.header className="sticky top-0 z-[999] w-full h-[8vh]">
				<nav className="w-full h-[8vh] bg-[#1d1d20] shadow-md">
					<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
					<div className="relative h-full flex items-center justify-between px-[3vw]">
						<div className="flex justify-between items-center w-full">
							{/* Title and progress */}
							<div>
								<h1 className="font-['Nunito',Helvetica] font-bold text-[#E8EEF2] text-[1.2rem] tracking-[0] leading-tight">
									{interviewData.title}
									<p className="font-normal text-[0.8rem] mr-2">
										Progress: {currentQuestionIndex + 1}/
										{interviewData.totalQuestions}
									</p>
								</h1>
							</div>
							{/* Timer, Solved, Exit button */}
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2 px-3 py-1 rounded-md shadow-sm">
									<TimerIcon className="h-4 w-4 text-[#E8EEF2]" />
									<span className="font-['Nunito',Helvetica] font-semibold text-[#E8EEF2]">
										{formatTime(remainingTime)}
									</span>
								</div>
								<div className="flex items-center gap-2 px-3 py-1 rounded-md shadow-sm">
									<CheckCircleIcon className="h-4 w-4 text-green-500" />
									<span className="font-['Nunito',Helvetica] font-semibold text-[#E8EEF2]">
										{answeredQuestionsCount}/{interviewData.totalQuestions}{" "}
										Solved
									</span>
								</div>
								<Button
									onClick={() => setExitConfirmation(true)}
									className="h-8 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow-md flex items-center gap-1 transition-all duration-200"
								>
									<XIcon className="h-4 w-4" />
									<span>Exit</span>
								</Button>
							</div>
						</div>
					</div>
				</nav>
				{/* Sidebar toggle button */}
				<Button
					onClick={() => setSidebarVisible(!sidebarVisible)}
					className="absolute rounded-[50px] w-[100px] left-[0px] top-[94px] h-7 bg-[#1d1d20] text-[#1d1d20] shadow-sm pl-[100px]"
					size="sm"
					asChild
				>
					<motion.button
						initial={false}
						animate={{
							x: sidebarVisible ? 200 : -55,
							scale: sidebarVisible ? 0 : 1.0,
							// rotate: sidebarVisible ? 180 : 0,
							// scaleX: sidebarVisible? 0 : 1.0,
							// backgroundColor: sidebarVisible? "#E8EEF2" : "#1d1d20",
							// borderRadius: sidebarVisible? "50px" : "50px",
							// width: sidebarVisible ? "0px" : "100px",
							// height: sidebarVisible ? "0px" : "40px",
						}}
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
						<motion.img
							src="/sidebar.png"
							alt="Sidebar"
							className="fixed h-5 w-5 mr-3"
							animate={{ rotate: sidebarVisible ? 0 : 180 }}
							transition={{
								duration: 0.3,
								type: "spring",
								stiffness: 200,
								damping: 25,
							}}
						/>
					</motion.button>
				</Button>
			</motion.header>

			{/* Main Content */}
			<div
				className={`relative z-10 py-[3vh] pb-[10vh] transition-all duration-300 ${
					sidebarVisible
						? questions[currentQuestionIndex].type === "problem_solving"
							? "pl-[370px] overflow-x-hidden"
							: "pl-[370px] pr-[3vw]"
						: "px-[8vw]"
				}`}
			>
				{/* Questions List Sidebar */}
				<motion.div
					initial={{ x: "-100%" }}
					animate={{ x: sidebarVisible ? 0 : "-100%" }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className="fixed left-0 top-[8vh] h-[92vh] w-[350px] bg-[#1d1d20] shadow-lg z-40 overflow-y-auto"
				>
					<div className="absolute h-[1600px] inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18] z-[-1]" />
					<div className="p-4">
						<div className="flex justify-between items-center mb-4">
							<h2 className="font-['Nunito',Helvetica] font-bold text-[1.2rem] text-[#E8EEF2]">
								All Questions
							</h2>
							<Button
								onClick={() => setSidebarVisible(false)}
								className=" p-1 rounded-full"
							>
								{/* <XIcon className="h-5 w-5 text-[#1d1d20]" /> */}
								<motion.img
									src="/sidebar.png"
									alt="Sidebar"
									className="fixed absolute h-5 w-5 mr-3"
								/>
							</Button>
						</div>

						<div className="space-y-2">
							{questions.map((question, index) => (
								<div
									key={question.id}
									className={`p-3 rounded-md cursor-pointer transition-colors ${
										currentQuestionIndex === index
											? "bg-[#0667D0] text-white"
											: "bg-white hover:bg-gray-300 text-[#1d1d20]"
									}
										${isQuestionAnswered(question.id) ? "border-l-4 border-green-500" : ""}`}
									onClick={() => goToQuestion(index)}
								>
									<div className="flex justify-between items-center">
										<span className="font-['Nunito',Helvetica] font-medium">
											Question {index + 1}
										</span>
										<div className="flex items-center gap-2">
											<span className="text-sm">{question.points} pts</span>
											{isQuestionAnswered(question.id) && (
												<CheckCircleIcon className="h-4 w-4 text-green-500" />
											)}
										</div>
									</div>
									<p className="text-sm truncate mt-1">
										{question.type === "mcq"
											? "Multiple Choice"
											: "Problem Solving"}
									</p>
								</div>
							))}
						</div>
					</div>
				</motion.div>

				{/* Question Card */}
				<div className="flex justify-between items-center">
					<motion.div
						key={currentQuestionIndex}
						initial="hidden"
						animate="visible"
						variants={cardVariants}
						className="w-full mx-auto"
					>
						<Card
							className={`bg-[#E8EEF2] shadow-lg border-0 overflow-hidden ${
								questions[currentQuestionIndex].type === "problem_solving"
									? "h-[calc(120vh-150px)] w-full"
									: ""
							}`}
						>
							<CardContent className="p-6 flex flex-col h-full">
								<div className="flex justify-between items-start mb-4">
									<div>
										<h2 className="font-['Nunito',Helvetica] font-bold text-[1.5rem] text-[#1d1d20]">
											{questions[currentQuestionIndex].type ===
											"problem_solving"
												? ""
												: `Question ${currentQuestionIndex + 1}`}
										</h2>
										<p className="text-sm text-gray-500">
											{questions[currentQuestionIndex].type === "mcq"
												? "Multiple Choice Question"
												: ""}
										</p>
									</div>
									<div className="bg-[#0667D0] text-white px-3 py-1 rounded-full text-sm font-semibold">
										{questions[currentQuestionIndex].type === "problem_solving"
											? ""
											: questions[currentQuestionIndex].points + " points"}
									</div>
								</div>

								{/* Question Content - MCQ or Problem Solving */}
								{questions[currentQuestionIndex].type === "mcq" ? (
									<div>
										<div className="bg-white p-4 rounded-md mb-6">
											<p className="font-['Nunito',Helvetica] text-[1rem] text-[#1d1d20] whitespace-pre-line">
												{questions[currentQuestionIndex].text}
											</p>
										</div>{" "}
										<div className="space-y-4">
											<div className="space-y-3">
												{(
													questions[currentQuestionIndex] as MCQQuestion
												).options.map((option) => {
													const isSelected =
														userAnswers[questions[currentQuestionIndex].id] ===
														option.id;
													return (
														<motion.div
															key={option.id}
															whileHover={{ scale: 1.02 }}
															className={`flex items-center p-3 rounded-lg cursor-pointer ${
																isSelected
																	? "bg-blue-100 border-2 border-[#0667D0]"
																	: "hover:bg-gray-300 border border-gray-300"
															} transition-all duration-200`}
															onClick={() =>
																handleMCQAnswer(
																	questions[currentQuestionIndex].id,
																	option.id
																)
															}
														>
															<div className="flex-1">
																<p className="font-['Nunito',Helvetica] font-bold text-[1rem] text-[#1d1d20]">
																	{option.id.toUpperCase()}.{" "}
																	<span className="font-['Nunito',Helvetica] font-normal text-[1rem] text-[#1d1d20]">
																		{option.text}
																	</span>
																</p>
															</div>
															{isSelected && (
																<CheckCircleIcon className="h-6 w-6 text-[#0667D0] ml-2" />
															)}
														</motion.div>
													);
												})}
											</div>
										</div>
									</div>
								) : (
									<div className="mt-[-40px] flex h-auto min-h-[calc(100vh-150px)] gap-4">
										{/* Problem description - Left side */}
										<div className="w-[55%] rounded-md p-4 overflow-y-auto max-h-[calc(100vh-150px)]">
											<Card className="shadow-md border border-gray-200 overflow-visible h-auto">
												<CardContent className="p-6">
													<div className="mb-3">
														<h3 className="font-bold text-2xl mb-1 flex justify-between items-start">
															<span className="flex-1">
																{
																	(
																		questions[
																			currentQuestionIndex
																		] as ProblemSolvingQuestion
																	).name
																}
															</span>
															<span className="bg-[#0667D0] text-white px-3 py-1 rounded-full text-sm font-semibold ml-4">
																{questions[currentQuestionIndex].points} points
															</span>
														</h3>
														<span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">
															{
																(
																	questions[
																		currentQuestionIndex
																	] as ProblemSolvingQuestion
																).difficulty
															}
														</span>
													</div>
													<div className="text-gray-700 whitespace-pre-line">
														{
															(
																questions[
																	currentQuestionIndex
																] as ProblemSolvingQuestion
															).text
														}
													</div>

													{/* Examples Section */}
													<div className="mt-6 space-y-4">
														{(
															questions[
																currentQuestionIndex
															] as ProblemSolvingQuestion
														).examples.map((example, idx) => (
															<div key={idx}>
																<p className="font-semibold text-medium">
																	Example {idx + 1}:
																</p>
																<div className="mt-2 p-3 bg-gray-100 rounded-md">
																	<div className="space-y-2">
																		<p>
																			<span className="font-medium">
																				Input:
																			</span>{" "}
																			{example.input}
																		</p>
																		<p>
																			<span className="font-medium">
																				Output:
																			</span>{" "}
																			{example.output}
																		</p>
																		{example.explanation && (
																			<p>
																				<span className="font-medium">
																					Explanation:
																				</span>{" "}
																				{example.explanation}
																			</p>
																		)}
																	</div>
																</div>
															</div>
														))}
													</div>

													{/* Constraints Section */}
													<div className="mt-6">
														<p className="font-semibold text-m mb-2">
															Constraints:
														</p>
														<div className="p-3 bg-gray-100 rounded-md">
															<ul className="list-disc pl-4 space-y-1">
																{(
																	questions[
																		currentQuestionIndex
																	] as ProblemSolvingQuestion
																).constraints.map((constraint, idx) => (
																	<li
																		key={idx}
																		className="text-m text-gray-700"
																	>
																		{constraint}
																	</li>
																))}
															</ul>
														</div>
													</div>
												</CardContent>
											</Card>
										</div>

										{/* Code editor - Right side */}
										{/* Using the reusable EditorLayout component */}
										<div className="w-[55%] h-auto min-h-[calc(100vh-150px)] max-h-[calc(10vh-150px)]">
											<EditorLayout
												initialValue={
													userAnswers[questions[currentQuestionIndex].id] ||
													"// Write your solution here\n"
												}
												language="javascript"
												height="100%"
												onChange={(value) =>
													handleProblemSolvingAnswer(
														questions[currentQuestionIndex].id,
														value || ""
													)
												}
												showConsole={consoleVisible}
												consoleOutput={codeOutput}
												questions={questions}
												currentQuestionIndex={currentQuestionIndex}
												submissionStatus={submissionStatus}
												onRun={() => {
													// Simulate code execution
													setCodeOutput(
														"// Output would appear here\n// This is a simulated output\nconsole.log('Hello, world!');"
													);
													setConsoleVisible(true);
													setConsoleTab("output");
												}}
												onSubmit={() => {
													// Simulate submission with random results
													const isSuccess = Math.random() > 0.3; // 70% chance of success
													const testCasesPassed = isSuccess
														? 5
														: Math.floor(Math.random() * 4) + 1; // 1-4 if failed

													setSubmissionStatus({
														status: isSuccess ? "success" : "error",
														message: isSuccess
															? "Your solution passed all test cases. Great job!"
															: "Your solution failed on some test cases. Check the error details and try again.",
														testCasesPassed: testCasesPassed,
														totalTestCases: 5,
													});

													handleProblemSolvingAnswer(
														questions[currentQuestionIndex].id,
														userAnswers[questions[currentQuestionIndex].id] ||
															""
													);

													setConsoleVisible(true);
													setConsoleTab("submissions");
												}}
												availableLanguages={[
													{ value: "cpp", label: "C++" },
													{ value: "javascript", label: "JavaScript" },
													{ value: "python", label: "Python" },
													{ value: "java", label: "Java" },
												]}
											/>
										</div>
									</div>
								)}
								{/* Removed navigation buttons from card */}
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
			{/* Fixed Navigation Footer */}
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: footerVisible ? 1 : 0, y: footerVisible ? 0 : 50 }}
				transition={{ duration: 0.5 }}
				className={`fixed bottom-0 left-0 right-0 bg-[#1d1d20] bg-opacity-95 backdrop-blur-sm py-4 px-8 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] ${
					sidebarVisible ? "hidden" : ""
				}`}
			>
				<div className="h-2 max-w-7xl mx-auto flex justify-between items-center">
					<motion.button
						whileHover={{ scale: 1.05, x: -5 }}
						whileTap={{ scale: 0.95 }}
						onClick={goToPreviousQuestion}
						disabled={currentQuestionIndex === 0}
						className={` min-w-[200px] h-3 flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
							currentQuestionIndex === 0
								? "bg-gray-700 bg-opacity-50 cursor-not-allowed text-gray-400"
								: "bg-[#0667D0] hover:bg-[#054E9D] text-white"
						}`}
					>
						<ChevronLeftIcon className="h-4 w-4" />
						<span className="font-['Nunito',Helvetica] font-semibold">
							Previous
						</span>
					</motion.button>

					<div className="flex items-center gap-2">
						<span className="text-[#E8EEF2] font-['Nunito',Helvetica] text-sm">
							Question {currentQuestionIndex + 1} of {questions.length}
						</span>
						<div className="flex-1 flex items-center justify-center min-w-60 max-w-80 px-4">
							<div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden transition-all duration-300">
								<motion.div
									initial={{ width: 0 }}
									animate={{
										width: `${
											((currentQuestionIndex + 1) / questions.length) * 100
										}%`,
									}}
									className="h-full bg-[#0667D0] rounded-full"
								/>
							</div>
						</div>
					</div>

					<div className="flex gap-4">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setSubmitConfirmation(true)}
							className="mt-1 w-full h-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg"
						>
							<SendIcon className="min-h-4 min-w-4" />
							<span className="font-['Nunito',Helvetica] font-semibold">
								Submit
							</span>
						</motion.button>

						<motion.button
							whileHover={{ scale: 1.05, x: 5 }}
							whileTap={{ scale: 0.95 }}
							onClick={goToNextQuestion}
							disabled={currentQuestionIndex === questions.length - 1}
							className={`mt-1 w-full h-3 flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
								currentQuestionIndex === questions.length - 1
									? "bg-gray-700 bg-opacity-50 cursor-not-allowed text-gray-400"
									: "bg-[#0667D0] hover:bg-[#054E9D] text-white"
							}`}
						>
							<span className="font-['Nunito',Helvetica] font-semibold">
								Next
							</span>
							<ChevronRightIcon className="min-h-4 min-w-4" />
						</motion.button>
					</div>
				</div>
			</motion.div>

			{/* Footer Toggle Button */}
			<motion.button
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={() => setFooterVisible(!footerVisible)}
				className="fixed bottom-11 right-4 bg-[#0667D0] text-white p-2 rounded-full shadow-lg z-50 flex items-center justify-center"
				title={footerVisible ? "Hide navigation" : "Show navigation"}
			>
				<motion.div
					animate={{ rotate: footerVisible ? 180 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<ChevronLeftIcon className="h-5 w-5 rotate-90" />
				</motion.div>
			</motion.button>

			{/* Exit Confirmation Modal */}
			{exitConfirmation && (
				<>
					{/* Backdrop blur overlay */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999]"
						style={{ backdropFilter: "blur(4px)" }}
					/>

					{/* Centered confirmation modal */}
					<div className="fixed inset-0 flex items-center justify-center z-[1000]">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
						>
							<div className="bg-[#1d1d20] border border-gray-700 px-8 py-6 rounded-xl shadow-2xl max-w-md">
								<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full">
									<AlertCircleIcon className="h-10 w-10 text-red-500" />
								</div>
								<h3 className="font-['Nunito',Helvetica] text-xl font-semibold text-center text-white mb-2">
									Exit Interview?
								</h3>
								<p className="text-gray-300 text-center mb-6">
									Are you sure you want to exit this interview? Your progress
									will not be saved.
								</p>
								<div className="flex justify-center gap-4">
									<Button
										onClick={() => setExitConfirmation(false)}
										className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full"
									>
										Cancel
									</Button>
									<Button
										onClick={() => {
											setExitConfirmation(false);
											navigate("/");
										}}
										className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
									>
										Exit Interview
									</Button>
								</div>
							</div>
						</motion.div>
					</div>
				</>
			)}

			{/* Submit Confirmation Modal */}
			{submitConfirmation && (
				<>
					{/* Backdrop blur overlay */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999]"
						style={{ backdropFilter: "blur(4px)" }}
					/>

					{/* Centered confirmation modal */}
					<div className="fixed inset-0 flex items-center justify-center z-[1000]">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
						>
							<div className="bg-[#1d1d20] border border-gray-700 px-8 py-6 rounded-xl shadow-2xl max-w-md">
								<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full">
									<CheckCircleIcon className="h-10 w-10 text-green-500" />
								</div>
								<h3 className="font-['Nunito',Helvetica] text-xl font-semibold text-center text-white mb-2">
									Submit Interview?
								</h3>
								<p className="text-gray-300 text-center mb-6">
									Are you sure you want to submit this interview? Once
									submitted, you cannot make any changes.
								</p>
								<div className="flex justify-center gap-4">
									<Button
										onClick={() => setSubmitConfirmation(false)}
										className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full"
									>
										Cancel
									</Button>
									<Button
										onClick={handleSubmitInterview}
										className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
									>
										Submit Interview
									</Button>
								</div>
							</div>
						</motion.div>
					</div>
				</>
			)}

			{/* Custom Notification with Backdrop Blur */}
			{notification.visible && (
				<>
					{/* Backdrop blur overlay */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999]"
						style={{ backdropFilter: "blur(4px)" }}
					/>

					{/* Centered notification */}
					<div className="fixed inset-0 flex items-center justify-center z-[1000]">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
						>
							<div
								className={`px-8 py-6 rounded-xl shadow-2xl flex flex-col items-center gap-4 max-w-md ${
									notification.type === "success"
										? "bg-gradient-to-r from-[#0667D0] to-[#054E9D] text-white"
										: notification.type === "error"
										? "bg-gradient-to-r from-red-600 to-red-700 text-white"
										: "bg-gradient-to-r from-gray-700 to-gray-800 text-white"
								}`}
							>
								<div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full">
									{notification.type === "success" && (
										<CheckCircleIcon className="h-10 w-10" />
									)}
									{notification.type === "error" && (
										<AlertCircleIcon className="h-10 w-10" />
									)}
								</div>
								<span className="font-['Nunito',Helvetica] text-xl font-semibold text-center">
									{notification.message}
								</span>
								<p className="text-white/80 text-center text-sm">
									You will be redirected to the feedback page shortly.
								</p>
							</div>
						</motion.div>
					</div>
				</>
			)}
		</main>
	);
};

export default InterviewQuestionsPage;