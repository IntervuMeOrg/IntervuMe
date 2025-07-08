import { useState } from "react";
import { motion } from "framer-motion";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { DetailedFeedbackView } from "./DetailedFeedbackView";
import { ResultSummaryCard } from "./ResultSummaryCard";
import { McqQuestion, CodingQuestion, McqOption } from "../../types/questions";
import { useCurrentUser } from "../../lib/authentication/authentication-hooks";
import { useParams } from "react-router-dom";
import { useMcqAnswers } from "../../lib/mcq/mcq-hooks";
import { InterviewQuestionWithDetails } from "../../lib/interview/interview-api";
import { useInterviewWithQuestions } from "../../lib/interview/interview-hooks";

type Question = McqQuestion | CodingQuestion;

export const OverallFeedbackPage = (): JSX.Element => {
	const user = useCurrentUser();
	const params = useParams();
	const interviewId = params.id as string;
	const userName = user.data 
		? `${user.data.firstName} ${user.data.lastName}`
		: '';
	// State for detailed feedback visibility
	const [showDetailedFeedback, setShowDetailedFeedback] = useState(false);

	const { data: interviewWithQuestions } = useInterviewWithQuestions(interviewId);

		// Transform questions once (only when data is available)
		const questions: Question[] = interviewWithQuestions?.interviewQuestions?.map(
			(q: InterviewQuestionWithDetails) => {
				if (q.questionType === "mcq") {
					const mcqDetails = q.questionDetails as McqQuestion;
					const correctOption = mcqDetails.options.find(
						(opt: McqOption) => opt.isCorrect
					);
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
			}
		) || [];

	// Real user answers
	const { data: userAnswers } = useMcqAnswers(interviewId);



	// State for active navigation item tracking
	const activeNavItem = "";

	const totalPoints = questions.reduce(
		(sum, q) => sum + q.points,
		0
	);
	const totalQuestions = questions.length;
	const correctAnswers = questions.filter((q) => {
		if (q.type === "mcq") {
			const userAnswer = (userAnswers || []).find((answer) => answer.questionId === q.id)?.selectedOptionId;
			return userAnswer === q.correctOptionId;
		} else {
			// Get all submissions for this question
			const questionSubmissions = (interviewWithQuestions?.codeSubmissions || []).filter(
				(sub) => sub.questionId === q.id
			);

			if (questionSubmissions.length > 0) {
				// Find the submission with the most passed test cases
				const bestSubmission = questionSubmissions.reduce((best, current) => {
					const bestPassedCount = best.passedTestCases ?? 
						(best.testCaseResults?.filter((result) => result.passed === true).length || 0);
					const currentPassedCount = current.passedTestCases ?? 
						(current.testCaseResults?.filter((result) => result.passed === true).length || 0);
					
					return currentPassedCount > bestPassedCount ? current : best;
				}, questionSubmissions[0]);

				const passedCount = bestSubmission.passedTestCases ?? 
					(bestSubmission.testCaseResults?.filter((result) => result.passed === true).length || 0);
				const totalCount = bestSubmission.totalTestCases ?? 
					(bestSubmission.testCaseResults?.length || 0);
				
				return passedCount === totalCount && totalCount > 0;
			}
			return false;
		}
	}).length;

	const earnedPoints = questions.reduce((sum, q) => {
		if (q.type === "mcq") {
			const userAnswer = (userAnswers || []).find((answer) => answer.questionId === q.id)?.selectedOptionId;
			return sum + (userAnswer === q.correctOptionId ? q.points : 0);
		} else {
			// Get all submissions for this question
			const questionSubmissions = (interviewWithQuestions?.codeSubmissions || []).filter(
				(sub) => sub.questionId === q.id
			);

			if (questionSubmissions.length > 0) {
				// Find the submission with the most passed test cases
				const bestSubmission = questionSubmissions.reduce((best, current) => {
					const bestPassedCount = best.passedTestCases ?? 
						(best.testCaseResults?.filter((result) => result.passed === true).length || 0);
					const currentPassedCount = current.passedTestCases ?? 
						(current.testCaseResults?.filter((result) => result.passed === true).length || 0);
					
					return currentPassedCount > bestPassedCount ? current : best;
				}, questionSubmissions[0]);

				const passedCount = bestSubmission.passedTestCases ?? 
					(bestSubmission.testCaseResults?.filter((result) => result.passed === true).length || 0);
				const totalCount = bestSubmission.totalTestCases ?? 
					(bestSubmission.testCaseResults?.length || 0);
				
				return sum + (passedCount === totalCount && totalCount > 0 ? q.points : 0);
			}
			return sum;
		}
	}, 0);

	let mcqCorrect = 0;
	let mcqTotal = 0;
	let problemSolvingCorrect = 0;
	let problemSolvingTotal = 0;

	questions.forEach((question) => {
		if (question.type === "mcq") {
			mcqTotal++;
			const userAnswer = (userAnswers || []).find((answer) => answer.questionId === question.id)?.selectedOptionId;
			if (userAnswer === question.correctOptionId) {
				mcqCorrect++;
			}
		} else if (question.type === "coding") {
			problemSolvingTotal++;
			// Get all submissions for this question
			const questionSubmissions = (interviewWithQuestions?.codeSubmissions || []).filter(
				(sub) => sub.questionId === question.id
			);

			if (questionSubmissions.length > 0) {
				// Find the submission with the most passed test cases
				const bestSubmission = questionSubmissions.reduce((best, current) => {
					const bestPassedCount = best.passedTestCases ?? 
						(best.testCaseResults?.filter((result) => result.passed === true).length || 0);
					const currentPassedCount = current.passedTestCases ?? 
						(current.testCaseResults?.filter((result) => result.passed === true).length || 0);
					
					return currentPassedCount > bestPassedCount ? current : best;
				}, questionSubmissions[0]);

				const passedCount = bestSubmission.passedTestCases ?? 
					(bestSubmission.testCaseResults?.filter((result) => result.passed === true).length || 0);
				const totalCount = bestSubmission.totalTestCases ?? 
					(bestSubmission.testCaseResults?.length || 0);
				
				if (passedCount === totalCount && totalCount > 0) {
					problemSolvingCorrect++;
				}
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
								userAnswers={userAnswers || []}
								codeSubmissions={interviewWithQuestions?.codeSubmissions || []}
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
							setShowDetailedFeedback={setShowDetailedFeedback}
						/>
					)}
				</div>
			</main>
		</NavbarLayout>
	);
};

export default OverallFeedbackPage;
