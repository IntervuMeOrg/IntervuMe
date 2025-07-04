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
	useSubmitCode,
	useInterviewSession 
} from "../../lib/interview/interview-hooks";
import { 
	McqAnswer,
	CodeSubmissionWithResults,
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
	const submitCode = useSubmitCode();
	const { autoSaveMCQAnswer, saveCodeToLocalStorage, getCodeFromLocalStorage } = useInterviewSession();

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
	const [currentCodes, setCurrentCodes] = useState<Record<string, string>>({});
	const [selectedLanguages, setSelectedLanguages] = useState<Record<string, string>>({});
	const [allSubmissionsByQuestion, setAllSubmissionsByQuestion] = useState<Record<string, CodeSubmissionWithResults[]>>({});

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

	// Initialize selected languages after questions load
	useEffect(() => {
		if (interviewWithQuestions?.interviewQuestions && Object.keys(selectedLanguages).length === 0) {
			const initialLanguages: Record<string, string> = {};
			interviewWithQuestions.interviewQuestions.forEach((q: InterviewQuestionWithDetails) => {
				if (q.questionType === "coding") {
					initialLanguages[q.questionId] = "cpp"; // Default to cpp
				}
			});
			setSelectedLanguages(initialLanguages);
		}
	}, [interviewWithQuestions?.interviewQuestions]);

	// Initialize submission history after data loads
	useEffect(() => {
		if (interviewWithQuestions?.codeSubmissions && Object.keys(allSubmissionsByQuestion).length === 0) {
			const submissions: Record<string, CodeSubmissionWithResults[]> = {};
			interviewWithQuestions.codeSubmissions.forEach((submission: CodeSubmissionWithResults) => {
				const questionId = submission.questionId;
				if (!submissions[questionId]) {
					submissions[questionId] = [];
				}
				submissions[questionId].push(submission);
			});
			setAllSubmissionsByQuestion(submissions);
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

	// Initialize code submissions (localStorage + most recent submissions)
	useEffect(() => {
		if (questions.length > 0 && Object.keys(currentCodes).length === 0) {
			const initialCodes: Record<string, string> = {};
			
			questions.forEach((question) => {
				if (question.type === "coding") {
					// Try localStorage first
					const localCode = getCodeFromLocalStorage(interviewId, question.id);
					if (localCode) {
						initialCodes[question.id] = localCode;
					} else {
						// Fall back to most recent submission
						const submissions = allSubmissionsByQuestion[question.id] || [];
						if (submissions.length > 0) {
							const mostRecent = submissions.sort((a, b) => 
								new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
							)[0];
							initialCodes[question.id] = mostRecent.code || "";
						}
					}
				}
			});
			
			if (Object.keys(initialCodes).length > 0) {
				setCurrentCodes(initialCodes);
			}
		}
	}, [questions, allSubmissionsByQuestion, interviewId, getCodeFromLocalStorage]);

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

	// Handle code changes
	const handleCodeChange = (questionId: string, code: string) => {
		setCurrentCodes({
			...currentCodes,
			[questionId]: code,
		});
		saveCodeToLocalStorage(interviewId, questionId, code);
	};

	// Handle code submission
	const handleCodeSubmission = async (questionId: string, code: string, language: string = "cpp") => {
		if (!code.trim()) return;

		try {
			// Store the language used for this submission
			setSelectedLanguages(prev => ({
				...prev,
				[questionId]: language
			}));

			const submission = await submitCode.mutateAsync({
				interviewId,
				questionId,
				code,
				language
			});

			// Update submission history state
			setAllSubmissionsByQuestion(prev => ({
				...prev,
				[questionId]: [submission, ...(prev[questionId] || [])]
			}));

			setNotification({
				visible: true,
				message: "Code submitted successfully!",
				type: "success",
			});

			return submission;
		} catch (error: any) {
			console.error("Code submission failed:", error);
			setNotification({
				visible: true,
				message: error.response?.data?.message || "Failed to submit code",
				type: "error",
			});
			throw error;
		}
	};

	// Handle language change for a specific question
	const handleLanguageChange = (questionId: string, language: string) => {
		setSelectedLanguages(prev => ({
			...prev,
			[questionId]: language
		}));
	};

	// Handle final interview submission
	// TODO: remove sent data
	const handleSubmitInterview = () => {
		const mcqAnswersArray = Object.entries(mcqAnswers).map(([questionId, selectedOptionId]) => {
			const question = questions.find(q => q.id === questionId);
			return {
				interviewId,
				questionId,
				selectedOptionId,
				correctOptionId: question?.type === "mcq" ? question.correctOptionId || "" : "",
				isCorrect: question?.type === "mcq" ? selectedOptionId === question.correctOptionId : false,
			};
		});

		const codeSubmissionsArray = Object.entries(currentCodes).map(([questionId, code]) => ({
			interviewId,
			questionId,
			language: selectedLanguages[questionId] || "cpp",
			code,
		}));

		submitInterview.mutate({
			interviewId,
			submission: {
				mcqAnswers: mcqAnswersArray,
				codeSubmissions: codeSubmissionsArray,
			},
		}, {
			onSuccess: () => {
				navigate(`/interview/${interviewId}/results`);
			},
		});
	};

	// Check if question is answered
	const isQuestionAnswered = (questionId: string): boolean => {
		const question = questions.find(q => q.id === questionId);
		if (!question) return false;
		
		if (question.type === "mcq") {
			return !!mcqAnswers[questionId];
		} else {
			return (allSubmissionsByQuestion[questionId]?.length || 0) > 0;
		}
	};

	// Get submission history for a question
	const getSubmissionHistory = (questionId: string) => {
		return allSubmissionsByQuestion[questionId] || [];
	};

	// Get submission count
	const getSubmissionCount = (questionId: string) => {
		return allSubmissionsByQuestion[questionId]?.length || 0;
	};

	// Check if has accepted submission
	const hasAcceptedSubmission = (questionId: string) => {
		const submissions = allSubmissionsByQuestion[questionId] || [];
		return submissions.some(sub => 
			sub.testCaseResults?.every((result) => result.passed === true)
		);
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
					codeSubmissions={currentCodes}
					selectedLanguages={selectedLanguages}
					setUserAnswer={handleMCQAnswerChange}
					setCodeSubmissions={handleCodeChange}
					onLanguageChange={handleLanguageChange}
					onSubmitCode={handleCodeSubmission}
					getSubmissionHistory={getSubmissionHistory}
					getSubmissionCount={getSubmissionCount}
					hasAcceptedSubmission={hasAcceptedSubmission}
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
