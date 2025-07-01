import { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
	const location = useLocation();
	const navigate = useNavigate();
	
	// Get questions from navigation state (no more mock data here)
	const [questions] = useState<Question[]>(location.state?.questions || []);

	// If no questions were passed, redirect back
	useEffect(() => {
		if (questions.length === 0) {
			navigate('/start-interview'); // or wherever your start page is
		}
	}, [questions, navigate]);

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
