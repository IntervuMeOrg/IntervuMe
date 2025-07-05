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
		const userAnswer = (userAnswers || []).find((answer) => answer.questionId === q.id)?.selectedOptionId;
		return q.type === "mcq"
			? userAnswer === q.correctOptionId
			: !!(userAnswer && userAnswer.trim().length > 0);
	}).length;
	const earnedPoints = questions.reduce((sum, q) => {
		const userAnswer = (userAnswers || []).find((answer) => answer.questionId === q.id)?.selectedOptionId;
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
		const userAnswer = (userAnswers || []).find((answer) => answer.questionId === question.id)?.selectedOptionId;
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
								userAnswers={userAnswers || []}
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
