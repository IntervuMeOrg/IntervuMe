import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionCard } from "./QuestionCard";
import { QuestionListSidebar } from "./SidebarQuestionList";
import { QuestionFooter } from "./QuestionFooter";
import { InterviewQuestionsPageHeader } from "./InterviewQuestionPageHeader";
import { ExitConfirmationModel } from "./ExitConfirmationModel";
import { SubmitConfirmationModal } from "./SubmitConfirmationModal";
import { CustomNotificationBlur } from "./CustomNotificationBlur";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";

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
			difficulty: "Easy",
			text: "You are given an array of integers nums and an integer target. Your task is to return the indices of any two distinct elements in the array whose sum is equal to the target. If no such pair exists, print -1. Note that there may be multiple correct answers — returning any one valid pair is acceptable.",
			examples: [
				{
					input: "nums = [2,7,11,15], target = 9",
					output: "[0,1]",
					explanation: "nums[0] + nums[1] = 2 + 7 = 9",
				},
				{
					input: "nums = [3,2,4], target = 6",
					output: "[1,2]",
					explanation: "nums[1] + nums[2] = 2 + 4 = 6",
				},
			],
			constraints: [
				"2 <= nums.length <= 10^4",
				"-10^3 <= nums[i] <= 10^3",
				"-10^4 <= target <= 10^4",
			],
			points: 20,
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
		// },
		// {
		// 	id: 6,
		// 	type: "problem_solving",
		// 	name: "Debounce Function",
		// 	difficulty: "Medium",
		// 	text: "Create a function that implements a basic debounce mechanism.",
		// 	examples: [
		// 		{
		// 			input: "debounce(searchFunction, 300)",
		// 			output: "Executes once after 300ms",
		// 			explanation: "Multiple calls within 300ms delay execution",
		// 		},
		// 	],
		// 	constraints: [
		// 		"The returned function should cancel pending executions",
		// 		"Should handle multiple rapid calls correctly",
		// 	],
		// 	points: 25,
		// },
		// {
		// 	id: 7,
		// 	type: "problem_solving",
		// 	name: "Flatten Nested Array",
		// 	difficulty: "Medium",
		// 	text: "Implement a function that flattens a nested array.",
		// 	examples: [
		// 		{
		// 			input: "[1, [2, [3, 4], 5], 6]",
		// 			output: "[1, 2, 3, 4, 5, 6]",
		// 		},
		// 	],
		// 	constraints: [
		// 		"Should handle arbitrarily nested arrays",
		// 		"Return new array without modifying original",
		// 	],
		// 	points: 20,
		// },
		// {
		// 	id: 8,
		// 	type: "mcq",
		// 	text: "What is the purpose of the 'key' prop when rendering a list of elements in React?",
		// 	options: [
		// 		{ id: "a", text: "It's required for CSS styling" },
		// 		{
		// 			id: "b",
		// 			text: "It helps React identify which items have changed, are added, or are removed",
		// 		},
		// 		{ id: "c", text: "It's used for encryption purposes" },
		// 		{ id: "d", text: "It determines the order of elements in the DOM" },
		// 	],
		// 	points: 10,
		// },
		// {
		// 	id: 9,
		// 	type: "problem_solving",
		// 	name: "Two Sum",
		// 	difficulty: "Medium",
		// 	text: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
		// 	examples: [
		// 		{
		// 			input: "nums = [2,7,11,15], target = 9",
		// 			output: "[0,1]",
		// 			explanation: "Because nums[0] + nums[1] == 9",
		// 		},
		// 	],
		// 	constraints: [
		// 		"2 <= nums.length <= 10^4",
		// 		"-10^9 <= nums[i] <= 10^9",
		// 		"-10^9 <= target <= 10^9",
		// 		"Only one valid answer exists.",
		// 	],
		// 	points: 20,
		// },
		// {
		// 	id: 10,
		// 	type: "mcq",
		// 	text: "Which of the following is true about React's virtual DOM?",
		// 	options: [
		// 		{ id: "a", text: "It directly manipulates the browser's DOM" },
		// 		{
		// 			id: "b",
		// 			text: "It's slower than directly manipulating the browser's DOM",
		// 		},
		// 		{ id: "c", text: "It's a lightweight copy of the actual DOM" },
		// 		{ id: "d", text: "It requires special browser plugins to work" },
		// 	],
		// 	points: 10,
		// },
		// {
		// 	id: 11,
		// 	type: "problem_solving",
		// 	name: "Two Sum",
		// 	difficulty: "Medium",
		// 	text: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
		// 	examples: [
		// 		{
		// 			input: "nums = [2,7,11,15], target = 9",
		// 			output: "[0,1]",
		// 			explanation: "Because nums[0] + nums[1] == 9",
		// 		},
		// 	],
		// 	constraints: [
		// 		"2 <= nums.length <= 10^4",
		// 		"-10^9 <= nums[i] <= 10^9",
		// 		"-10^9 <= target <= 10^9",
		// 		"Only one valid answer exists.",
		// 	],
		// 	points: 20,
		// },
		// {
		// 	id: 12,
		// 	type: "mcq",
		// 	text: "What is the correct way to conditionally render a component in React?",
		// 	options: [
		// 		{ id: "a", text: "if (condition) { return <Component />; }" },
		// 		{ id: "b", text: "condition && <Component />" },
		// 		{ id: "c", text: "<Component if={condition} />" },
		// 		{ id: "d", text: "<If condition={condition}><Component /></If>" },
		// 	],
		// 	points: 10,
		// },
	]);

	// State for current question index
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	// State for user answers
	const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

	// State for question list sidebar visibility
	const [sidebarVisible, setSidebarVisible] = useState(false);
	// State for footer visibility
	const [footerVisible, setFooterVisible] = useState(true);

	// States for confirmation modals
	const [exitConfirmation, setExitConfirmation] = useState<boolean>(false);
	const [submitConfirmation, setSubmitConfirmation] = useState<boolean>(false);

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

	// Check if a question is answered
	const isQuestionAnswered = (questionId: number): boolean => {
		return (
			userAnswers[questionId] !== undefined && userAnswers[questionId] !== ""
		);
	};

	{
		/* MAY BE USED LATER
	// Calculate total points
	const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

	// Calculate earned points (in a real app, this would be based on correct answers)
	const earnedPoints = questions
		.filter((q) => isQuestionAnswered(q.id))
		.reduce((sum, q) => sum + q.points, 0);
*/
	}

	return (
		<main className="bg-white w-full relative min-h-screen">
			{/* Background image */}
			<img
				className="fixed w-full h-full object-cover"
				alt="Rectangle"
				src="/rectangle.png"
			/>
			{/* Simplified header */}
			<InterviewQuestionsPageHeader
				questions={questions}
				currentQuestionIndex={currentQuestionIndex}
				setExitConfirmation={setExitConfirmation}
				sidebarVisible={sidebarVisible}
				setSidebarVisible={setSidebarVisible}
				userAnswers={userAnswers}
			/>

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
				<QuestionListSidebar
					questions={questions}
					sidebarVisible={sidebarVisible}
					currentQuestionIndex={currentQuestionIndex}
					setSidebarVisible={setSidebarVisible}
					setCurrentQuestionIndex={setCurrentQuestionIndex}
					isQuestionAnswered={isQuestionAnswered}
				/>

				{/* Question Card */}
				<QuestionCard
					questions={questions}
					userAnswers={userAnswers}
					setUserAnswers={setUserAnswers}
					currentQuestionIndex={currentQuestionIndex}
				/>
			</div>

			<QuestionFooter
				questions={questions}
				sidebarVisible={sidebarVisible}
				footerVisible={footerVisible}
				setFooterVisible={setFooterVisible}
				currentQuestionIndex={currentQuestionIndex}
				setCurrentQuestionIndex={setCurrentQuestionIndex}
				setSubmitConfirmation={setSubmitConfirmation}
			/>

			{/* Exit Confirmation Modal */}
			{exitConfirmation && (
				<ExitConfirmationModel
					navigate={navigate}
					setExitConfirmation={setExitConfirmation}
				/>
			)}

			{/* Submit Confirmation Modal */}
			{submitConfirmation && (
				<SubmitConfirmationModal
					navigate={navigate}
					setSubmitConfirmation={setSubmitConfirmation}
					userAnswers={userAnswers}
					notification={notification}
					setNotification={setNotification}
				/>
			)}

			{/* Custom Notification with Backdrop Blur */}
			{notification.visible && (
				<CustomNotificationBlur notification={notification} />
			)}
		</main>
	);
};

export default InterviewQuestionsPage;
