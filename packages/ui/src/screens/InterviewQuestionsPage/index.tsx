import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionCard } from "./QuestionCard";
import { QuestionListSidebar } from "./SidebarQuestionList";
import { QuestionFooter } from "./QuestionFooter";
import { InterviewQuestionsPageHeader } from "./InterviewQuestionPageHeader";
import { ExitConfirmationModel } from "./ExitConfirmationModel";
import { SubmitConfirmationModal } from "./SubmitConfirmationModal";
import { CustomNotificationBlur } from "./CustomNotificationBlur";
import { McqQuestion, CodingQuestion, McqOption } from "../../types/questions";
import { 
	useInterviewWithQuestions, 
	useStartInterview, 
	useSubmitInterview,
	useInterviewSession 
} from "../../lib/interview/interview-hooks";
import { 
	McqAnswer,
	InterviewQuestionWithDetails,
} from "../../lib/interview/interview-api";
import { useCurrentUser } from "../../lib/authentication/authentication-hooks";

type Question = McqQuestion | CodingQuestion;

export const InterviewQuestionsPage = (): JSX.Element => {
	const navigate = useNavigate();
	const params = useParams<{ id: string }>();
	const user = useCurrentUser();
	
	const interviewId = params.id || "";
	const { data: interviewWithQuestions, isLoading, error } = useInterviewWithQuestions(interviewId);
	const startInterview = useStartInterview();
	const submitInterview = useSubmitInterview();
	const { autoSaveMCQAnswer } = useInterviewSession();

	// Simple state management
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [sidebarVisible, setSidebarVisible] = useState(false);
	const [footerVisible, setFooterVisible] = useState(true);
	const [exitConfirmation, setExitConfirmation] = useState(false);
	const [submitConfirmation, setSubmitConfirmation] = useState(false);
	const [notification, setNotification] = useState<{
		visible: boolean;
		message: string;
		type: "success" | "error" | "info";
	}>({
		visible: false,
		message: "",
		type: "success",
	});

	// Initialize all state variables with empty values first
	const [mcqAnswers, setMcqAnswers] = useState<Record<string, string>>({});
	const [codingQuestionStatus, setCodingQuestionStatus] = useState<Record<string, { hasSubmissions: boolean; hasAccepted: boolean }>>({});

	// Initialize MCQ answers after data loads
	useEffect(() => {
		if (interviewWithQuestions?.answers && Object.keys(mcqAnswers).length === 0) {
			const existingAnswers: Record<string, string> = {};
			interviewWithQuestions.answers.forEach((answer: McqAnswer) => {
				existingAnswers[answer.questionId] = answer.selectedOptionId;
			});
			setMcqAnswers(existingAnswers);
		}
	}, [interviewWithQuestions?.answers]);

	// Initialize coding question status from existing submissions
	useEffect(() => {
		if (interviewWithQuestions?.codeSubmissions) {
			const statusMap: Record<string, { hasSubmissions: boolean; hasAccepted: boolean }> = {};
			
			// Group submissions by question
			const submissionsByQuestion: Record<string, any[]> = {};
			interviewWithQuestions.codeSubmissions.forEach((submission: any) => {
				const questionId = submission.questionId;
				if (!submissionsByQuestion[questionId]) {
					submissionsByQuestion[questionId] = [];
				}
				submissionsByQuestion[questionId].push(submission);
			});

			// Check status for each question with submissions
			Object.entries(submissionsByQuestion).forEach(([questionId, submissions]) => {
				const hasAccepted = submissions.some(sub => 
					sub.testCaseResults?.every((result: any) => result.passed === true)
				);
				statusMap[questionId] = { 
					hasSubmissions: submissions.length > 0, 
					hasAccepted 
				};
			});

			setCodingQuestionStatus(statusMap);
		}
	}, [interviewWithQuestions?.codeSubmissions]);



	// Transform questions once (only when data is available)
	const questions: Question[] = interviewWithQuestions?.interviewQuestions?.map((q: InterviewQuestionWithDetails) => {
		if (q.questionType === "mcq") {
			const mcqDetails = q.questionDetails as McqQuestion;
			const correctOption = mcqDetails.options.find((opt: McqOption) => opt.isCorrect);
			return {
				...mcqDetails,
				id: q.questionId,
				type: "mcq",
				correctOptionId: correctOption ? correctOption.id : "",
			} as McqQuestion;
		} else {
			const codingDetails = q.questionDetails as CodingQuestion;
			return {
				...codingDetails,
				id: q.questionId,
				type: "coding",
			} as CodingQuestion;
		}
	}) || [];



	// Start interview if needed
	useEffect(() => {
		if (interviewWithQuestions?.status === "SCHEDULED") {
			startInterview.mutate(interviewId);
		}
	}, [interviewWithQuestions?.status, startInterview, interviewId]);

	// Handle MCQ answer selection
	const handleMCQAnswerChange = (questionId: string, selectedOptionId: string) => {
		console.log("MCQ Answer Selected:", { questionId, selectedOptionId });
		
		// Update local state
		setMcqAnswers({
			...mcqAnswers,
			[questionId]: selectedOptionId,
		});
		
		// Auto-save to backend
		const question = questions.find(q => q.id === questionId);
		if (question && question.type === "mcq") {
			autoSaveMCQAnswer.mutate({
				interviewId,
				questionId,
				selectedOptionId,
				correctOptionId: question.correctOptionId || "",
				isCorrect: selectedOptionId === question.correctOptionId,
			});
		}
	};



	// Handle final interview submission
	// TODO: remove sent data
	const handleSubmitInterview = () => {
		submitInterview.mutate(interviewId, {
			onSuccess: () => {
				navigate(`/interview/${interviewId}/results`);
			},
		});
	};

	// Handle submission updates from coding questions
	const handleSubmissionUpdate = (questionId: string, hasSubmissions: boolean, hasAccepted: boolean) => {
		setCodingQuestionStatus(prev => ({
			...prev,
			[questionId]: { hasSubmissions, hasAccepted }
		}));
	};

	// Check if question is answered
	const isQuestionAnswered = (questionId: string): boolean => {
		const question = questions.find(q => q.id === questionId);
		if (!question) return false;
		
		if (question.type === "mcq") {
			return !!mcqAnswers[questionId];
		} else {
			// For coding questions, check if they have submissions
			return codingQuestionStatus[questionId]?.hasSubmissions;
		}
	};

	// Loading state
	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading interview...</p>
				</div>
			</div>
		);
	}

	// Error state
	if (error || !interviewWithQuestions) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<p className="text-red-600 mb-4">Failed to load interview</p>
					<button
						onClick={() => navigate("/interview")}
						className="bg-blue-600 text-white px-4 py-2 rounded"
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	// No questions check
	if (questions.length === 0) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<p className="text-gray-600 mb-4">No questions available for this interview</p>
					<button
						onClick={() => navigate("/interview")}
						className="bg-blue-600 text-white px-4 py-2 rounded"
					>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	return (
		<main className="bg-white w-full relative min-h-screen">
			{/* Background image */}
			<img
				className="fixed w-full h-full object-cover"
				alt="Rectangle"
				src="/rectangle.png"
			/>
			
			{/* Header */}
			<InterviewQuestionsPageHeader
				questions={questions}
				currentQuestionIndex={currentQuestionIndex}
				setExitConfirmation={setExitConfirmation}
				sidebarVisible={sidebarVisible}
				setSidebarVisible={setSidebarVisible}
				userAnswers={mcqAnswers}
			/>

			{/* Main Content */}
			<div
				className={`relative z-10 py-[3vh] pb-[10vh] transition-all duration-300 ${
					sidebarVisible
						? questions[currentQuestionIndex].type === "coding"
							? "pl-[370px] overflow-x-hidden"
							: "pl-[370px] pr-[3vw]"
						: "px-[8vw]"
				}`}
			>
				{/* Sidebar */}
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
					currentQuestionIndex={currentQuestionIndex}
					questions={questions}
					userAnswers={mcqAnswers}
					setUserAnswer={handleMCQAnswerChange}
					interviewId={interviewId}
					codeSubmissions={interviewWithQuestions?.codeSubmissions || []}
					onSubmissionUpdate={handleSubmissionUpdate}
				/>
			</div>

			{/* Footer */}
			<QuestionFooter
				questions={questions}
				sidebarVisible={sidebarVisible}
				footerVisible={footerVisible}
				setFooterVisible={setFooterVisible}
				currentQuestionIndex={currentQuestionIndex}
				setCurrentQuestionIndex={setCurrentQuestionIndex}
				setSubmitConfirmation={setSubmitConfirmation}
			/>

			{/* Modals */}
			{exitConfirmation && (
				<ExitConfirmationModel
					navigate={navigate}
					setExitConfirmation={setExitConfirmation}
				/>
			)}

			{submitConfirmation && (
				<SubmitConfirmationModal
					setSubmitConfirmation={setSubmitConfirmation}
					onSubmit={handleSubmitInterview}
					isSubmitting={submitInterview.isPending}
					notification={notification}
					setNotification={setNotification}
				/>
			)}

			{/* Notification */}
			{notification.visible && (
				<CustomNotificationBlur notification={notification} />
			)}
		</main>
	);
};

export default InterviewQuestionsPage;
