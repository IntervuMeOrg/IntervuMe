import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { McqQuestion, CodingQuestion } from "../../types/questions";
import { McqAnswer } from "../../types/mcq";
import { CodeSubmissionWithResults } from "../../lib/interview/interview-api";

type ResultSummaryPerformanceBreakdownProps = {
	questions: (McqQuestion | CodingQuestion)[];
	userAnswers: McqAnswer[];
	codeSubmissions?: CodeSubmissionWithResults[];
};

export const ResultSummaryPerformanceBreakdown = ({
	questions,
	userAnswers,
	codeSubmissions = [],
}: ResultSummaryPerformanceBreakdownProps) => {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 20 },
				visible: { opacity: 1, y: 0 },
			}}
			transition={{ delay: 0.9 }}
			className="bg-white/10 rounded-lg p-4 sm:p-6 border border-white/20 mb-8"
		>
			<h3 className="font-['Nunito'] font-bold text-white text-lg sm:text-xl mb-4">
				Performance Breakdown
			</h3>

			<div className="space-y-3">
				{questions.map((question, index) => {
					let isCorrect = false;
					let earnedPoints = 0;

					if (question.type === "mcq") {
						const userAnswer = userAnswers.find(
							(answer) => answer.questionId === question.id
						)?.selectedOptionId;
						isCorrect = userAnswer === question.correctOptionId;
						earnedPoints = isCorrect ? question.points : 0;
					} else {
						// Get all submissions for this question
						const questionSubmissions = codeSubmissions.filter(
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
							
							isCorrect = passedCount === totalCount && totalCount > 0;
							earnedPoints = isCorrect ? question.points : 0;
						}
					}

					return (
						<div
							key={question.id}
							className="flex items-center justify-between"
						>
							<div className="flex items-center gap-3">
								{isCorrect ? (
									<CheckCircleIcon className="h-5 w-5 text-green-400" />
								) : (
									<XCircleIcon className="h-5 w-5 text-red-400" />
								)}
								<span className="text-[#e8eef2] text-sm">
									Question {index + 1} (
									{question.type === "mcq" ? "MCQ" : "Coding"})
								</span>
							</div>
							<span className="text-white font-semibold text-sm">
								{earnedPoints}/{question.points} pts
							</span>
						</div>
					);
				})}
			</div>
		</motion.div>
	);
};
