import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionCard } from "./QuestionCard";
import { QuestionListSidebar } from "./SidebarQuestionList";
import { QuestionFooter } from "./QuestionFooter";
import { InterviewQuestionsPageHeader } from "./InterviewQuestionPageHeader";
import { ExitConfirmationModel } from "./ExitConfirmationModel";
import { SubmitConfirmationModal } from "./SubmitConfirmationModal";
import { CustomNotificationBlur } from "./CustomNotificationBlur";
import { MCQQuestion, CodingQuestion } from "../../types/questions";
	import { 
		useInterviewWithQuestions, 
		useStartInterview, 
		useSubmitInterview, 
		useSubmitCode,
		useInterviewSession 
	} from "../../lib/interview/interview-hooks";
import { useCurrentUser } from "../../lib/authentication/authentication-hooks";
import { isNil } from "../../lib/utils";

type Question = MCQQuestion | CodingQuestion;	

export const InterviewQuestionsPage = (): JSX.Element => {
	const navigate = useNavigate();
	const params = useParams<{ id: string }>();
	const user = useCurrentUser();
	
	// Backend integration hooks
	const interviewId = params.id;
	const { data: interviewWithQuestions, isLoading: isLoadingInterview, error: interviewError } = useInterviewWithQuestions(interviewId || "");
	const startInterview = useStartInterview();
	const submitInterview = useSubmitInterview();
	const submitCode = useSubmitCode();
	const { 
		saveAnswerLocally, 
		autoSaveMCQAnswer, 
		saveCodeToLocalStorage, 
		getCodeFromLocalStorage,
		clearCodeFromLocalStorage
	} = useInterviewSession();

	// State for questions - now loaded from backend
	const [questions, setQuestions] = useState<Question[]>([]);
	
	// State for current question index
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	// State for user answers - now includes both MCQ and code answers
	const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
	const [codeSubmissions, setCodeSubmissions] = useState<Record<string, string>>({});
	const [allSubmissionsByQuestion, setAllSubmissionsByQuestion] = useState<Record<string, any[]>>({});

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

	// Load interview data and questions
	useEffect(() => {
		if (interviewWithQuestions && interviewId) {
			// Transform backend questions to frontend format
			const transformedQuestions = interviewWithQuestions.interviewQuestions.map((q: any) => {
				if (q.questionType === "mcq") {
					return {
						id: q.questionId,
						type: "mcq",
						text: q.questionDetails.text,
						options: q.questionDetails.options.map((option: any) => ({
							id: option.id,
							text: option.optionText,
							isCorrect: option.isCorrect,
						})),
						points: 10,
						tags: q.questionDetails.tags,
						explanation: q.questionDetails.explanation,

					} as MCQQuestion;
				} else if (q.questionType === "coding") {
					return {
						id: q.questionId,
						type: "coding",
						title: q.questionDetails.title,
						category: q.questionDetails.category,
						difficulty: q.questionDetails.difficulty,
						points: q.questionDetails.points,
						timeLimit: q.questionDetails.timeLimit,
						problemStatement: q.questionDetails.problemStatement,
						starterCodes: q.questionDetails.starterCode,
						solution: q.questionDetails.solutionCode,
						examples: q.questionDetails.examples || [],
						constraints: q.questionDetails.constraints || [],
						followUp: q.questionDetails.followUp || [],
						tags: q.questionDetails.tags,
						testCases: q.questionDetails.testCases || [],
						explanation: q.questionDetails.explanation,
						memoryLimit: q.questionDetails.memoryLimit,
						hints: q.questionDetails.hints || [],
					} as CodingQuestion;
				}
				return q;
			});

			console.log("Transformed questions:", transformedQuestions);
			setQuestions(transformedQuestions);

			// Load existing answers from backend
			const existingAnswers: Record<string, string> = {};
			interviewWithQuestions.answers.forEach((answer: any) => {
				existingAnswers[answer.questionId.toString()] = answer.selectedOptionId;
			});
			console.log("Existing answers:", existingAnswers);
			setUserAnswers(existingAnswers);

			// Load existing code submissions from backend (group by question, keep most recent)
			const existingCodeSubmissions: Record<string, string> = {};
			const allSubmissionsByQuestion: Record<string, any[]> = {};
			
			// Group submissions by question and sort by submission time (newest first)
			interviewWithQuestions.codeSubmissions.forEach((submission: any) => {
				const questionId = submission.questionId;
				if (!allSubmissionsByQuestion[questionId]) {
					allSubmissionsByQuestion[questionId] = [];
				}
				allSubmissionsByQuestion[questionId].push(submission);
			});

			// Sort each question's submissions by submittedAt (newest first) and get the most recent
			Object.entries(allSubmissionsByQuestion).forEach(([questionId, submissions]) => {
				const sortedSubmissions = submissions.sort((a, b) => 
					new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
				);
				// Use the most recent submission as the current code
				existingCodeSubmissions[questionId] = sortedSubmissions[0].code;
			});

			// Store all submissions in state for history viewing
			setAllSubmissionsByQuestion(allSubmissionsByQuestion);

			// Load code from localStorage (this takes precedence over backend)
			const localCodeSubmissions: Record<string, string> = {};
			transformedQuestions.forEach((question) => {
				if (question.type === "coding") {
					const localCode = getCodeFromLocalStorage(interviewId, question.id.toString());
					if (localCode) {
						localCodeSubmissions[question.id.toString()] = localCode;
					} else if (existingCodeSubmissions[question.id.toString()]) {
						// Fall back to most recent backend submission if no local code exists
						localCodeSubmissions[question.id.toString()] = existingCodeSubmissions[question.id.toString()];
					}
				}
			});

			setCodeSubmissions(localCodeSubmissions);

			// Start the interview if it's not already started
			if (interviewWithQuestions.status === "SCHEDULED") {
				startInterview.mutate(interviewId || "");
			}
		}
	}, [interviewWithQuestions, interviewId, startInterview]);

	// Handle loading and error states
	if (isLoadingInterview) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading interview...</p>
				</div>
			</div>
		);
	}

	if (interviewError || !interviewWithQuestions) {
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

	// Check if a question is answered
	const isQuestionAnswered = (questionId: string): boolean => {
		const question = questions.find(q => q.id === questionId);
		if (!question) return false;
		
		if (question.type === "mcq") {
			return !isNil(userAnswers[questionId]);
		} else if (question.type === "coding") {
			// For coding questions, check if there's at least one accepted submission
			// If no accepted submissions, check if there's any code (current or submitted)
			return hasAcceptedSubmission(questionId) || 
				   getSubmissionCount(questionId) > 0 ||
				   !isNil(codeSubmissions[questionId]);
		}
		return false;
	};

	// Auto-save MCQ answers to backend when they change
	useEffect(() => {
		if (interviewId && user.data?.id && Object.keys(userAnswers).length > 0) {
			Object.entries(userAnswers).forEach(([questionId, selectedOptionId]) => {
				const question = questions.find(q => q.id.toString() === questionId);
				if (question && question.type === "mcq" && selectedOptionId) {
					autoSaveMCQAnswer.mutate({
						interviewId,
						questionId,
						selectedOptionId,
						correctOptionId: question.correctOptionId || "",
						isCorrect: selectedOptionId === question.correctOptionId,
					});
				}
			});
		}
	}, [userAnswers, interviewId, user.data?.id, questions, autoSaveMCQAnswer]);

	// Handle MCQ answer changes
	const handleMCQAnswerChange = (questionId: string, selectedOptionId: string) => {
		console.log("handleMCQAnswerChange called:", { questionId, selectedOptionId });
		console.log("Current userAnswers before update:", userAnswers);
		
		setUserAnswers(prev => {
			const updated = {
				...prev,
				[questionId]: selectedOptionId,
			};
			console.log("Updated userAnswers:", updated);
			return updated;
		});
		// MCQ auto-save is handled by the useEffect above
	};

	// Handle code changes (localStorage only, no backend submission)
	const handleCodeChange = (questionId: string, code: string) => {
		setCodeSubmissions(prev => ({
			...prev,
			[questionId]: code,
		}));

		// Save to localStorage for persistence
		if (interviewId) {
			saveCodeToLocalStorage(interviewId, questionId, code);
		}
	};

	// Get submission history for a question
	const getSubmissionHistory = (questionId: string) => {
		const submissions = allSubmissionsByQuestion[questionId] || [];
		return submissions.sort((a, b) => 
			new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
		);
	};

	// Get the best submission for a question (most recent accepted, or most recent if none accepted)
	const getBestSubmission = (questionId: string) => {
		const submissions = getSubmissionHistory(questionId);
		if (submissions.length === 0) return null;
		
		// Find the most recent accepted submission
		const acceptedSubmission = submissions.find(sub => 
			sub.testCaseResults?.every((result: any) => result.passed === true)
		);
		
		if (acceptedSubmission) return acceptedSubmission;
		
		// If no accepted submissions, return the most recent one
		return submissions[0];
	};

	// Check if a question has at least one accepted submission
	const hasAcceptedSubmission = (questionId: string) => {
		const submissions = allSubmissionsByQuestion[questionId] || [];
		return submissions.some(sub => 
			sub.testCaseResults?.every((result: any) => result.passed === true)
		);
	};

	// Get submission count for a question
	const getSubmissionCount = (questionId: string) => {
		return allSubmissionsByQuestion[questionId]?.length || 0;
	};

	// Handle code submission for a specific question (like LeetCode submit)
	const handleCodeSubmission = async (questionId: string, code: string, language: string = "cpp") => {
		if (!interviewId || !code.trim()) return;

		// Map language to languageId (you may need to adjust these mappings)
		const languageMap: Record<string, number> = {
			cpp: 54,    // C++ (GCC 9.2.0)
			python: 71, // Python (3.8.1)
			java: 62,   // Java (OpenJDK 13.0.1)
		};

		const languageId = languageMap[language] || 54; // Default to C++

		try {
			const submission = await submitCode.mutateAsync({
				interviewId,
				questionId,
				code,
				languageId,
				language: language as any,
			});

			// Update local submissions after successful submission
			setAllSubmissionsByQuestion(prev => {
				const updated = { ...prev };
				if (!updated[questionId]) {
					updated[questionId] = [];
				}
				// Add the new submission to the front (most recent)
				updated[questionId] = [submission, ...updated[questionId]];
				return updated;
			});

			// Show success notification
			setNotification({
				visible: true,
				message: "Code submitted successfully!",
				type: "success",
			});

			return submission;
		} catch (error: any) {
			console.error("Code submission failed:", error);
			
			// Show error notification
			setNotification({
				visible: true,
				message: error.response?.data?.message || "Failed to submit code",
				type: "error",
			});
			
			throw error;
		}
	};

	// Handle final interview submission
	const handleSubmitInterview = () => {
		if (!interviewId) return;

		const mcqAnswers = Object.entries(userAnswers).map(([questionId, selectedOptionId]) => {
			const question = questions.find(q => q.id.toString() === questionId);
			return {
				interviewId,
				questionId,
				selectedOptionId,
				correctOptionId: question?.type === "mcq" ? question.correctOptionId || "" : "",
				isCorrect: question?.type === "mcq" ? selectedOptionId === question.correctOptionId : false,
			};
		});

		const codeSubmissionsArray = Object.entries(codeSubmissions).map(([questionId, code]) => ({
			interviewId,
			questionId,
			languageId: 54, // Default to C++ for final submission
			language: "cpp",
			code,
		}));

		submitInterview.mutate({
			interviewId,
			submission: {
				mcqAnswers,
				codeSubmissions: codeSubmissionsArray,
			},
		}, {
			onSuccess: () => {
				// Clear localStorage after successful submission
				navigate(`/interview/${interviewId}/results`);
				clearCodeFromLocalStorage(interviewId);
			},
		});
	};

	// If no questions, show error
	if (questions.length === 0) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<p className="text-gray-600 mb-4">No questions available for this interview</p>
					<button
						onClick={() => navigate("/interview")}
						className="bg-blue-600 text-white px-4 py-2 rounded"
					>
						Start New Interview
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
						? questions[currentQuestionIndex].type === "coding"
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
					isQuestionAnswered={(questionId: string) => isQuestionAnswered(questionId)}
				/>

				{/* Question Card */}
				<QuestionCard
					questions={questions}
					userAnswers={userAnswers}
					codeSubmissions={codeSubmissions}
					setUserAnswers={handleMCQAnswerChange}
					setCodeSubmissions={handleCodeChange}
					currentQuestionIndex={currentQuestionIndex}
					onSubmitCode={handleCodeSubmission}
					getSubmissionHistory={getSubmissionHistory}
					getSubmissionCount={getSubmissionCount}
					hasAcceptedSubmission={hasAcceptedSubmission}
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
					setSubmitConfirmation={setSubmitConfirmation}
					onSubmit={handleSubmitInterview}
					isSubmitting={submitInterview.isPending}
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
