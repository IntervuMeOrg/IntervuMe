import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon, InfoIcon } from "lucide-react";
import { QuestionContentMCQ } from "./QuestionContentMCQ";
import { QuestionContentProblemSolving } from "./QuestionContentProblemSolving";
import { QuestionContentPerformance } from "./QuestionContentPerformance";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";
type Question = MCQQuestion | ProblemSolvingQuestion;

type DetailedQuestionsFeedbackProp = {
	questions: Question[];
	userAnswers: Record<number, string>;
};

export const DetailedQuestionsFeedback = ({
	questions,
	userAnswers,
}: DetailedQuestionsFeedbackProp) => {
	// Function to get performance rating for individual questions
	const getQuestionPerformance = (question: Question, userAnswer: string) => {
		if (question.type === "mcq") {
			const isCorrect = userAnswer === question.correctOptionId;
			return {
				score: isCorrect ? 100 : 0,
				rating: isCorrect ? "Excellent" : "Incorrect",
				color: isCorrect ? "text-green-400" : "text-red-400",
				bgColor: isCorrect ? "bg-green-400/20" : "bg-red-400/20",
				feedback: isCorrect
					? "Perfect! You demonstrated strong understanding of this concept."
					: "Review this topic and practice similar questions to improve your understanding.",
			};
		} else {
			// Problem solving - more nuanced scoring
			if (!userAnswer || userAnswer.trim().length === 0) {
				return {
					score: 0,
					rating: "No Attempt",
					color: "text-gray-400",
					bgColor: "bg-gray-400/20",
					feedback:
						"No solution was provided. Try to attempt the problem even with a basic approach.",
				};
			}

			// Simulate code quality analysis
			const hasOptimalSolution =
				userAnswer.includes("Map") || userAnswer.includes("HashMap");
			const hasBruteForce =
				userAnswer.includes("for") && userAnswer.includes("for");

			if (hasOptimalSolution) {
				return {
					score: 95,
					rating: "Excellent",
					color: "text-green-400",
					bgColor: "bg-green-400/20",
					feedback:
						"Outstanding! You provided an optimal solution with good time complexity.",
				};
			} else if (hasBruteForce) {
				return {
					score: 75,
					rating: "Good",
					color: "text-yellow-400",
					bgColor: "bg-yellow-400/20",
					feedback:
						"Good attempt! Your solution works but could be optimized for better time complexity.",
				};
			} else {
				return {
					score: 60,
					rating: "Fair",
					color: "text-orange-400",
					bgColor: "bg-orange-400/20",
					feedback:
						"Your approach shows understanding but needs refinement in implementation.",
				};
			}
		}
	};
	
	return (
		<>
			{questions.map((question: Question, index: number) => {
				const userAnswer = userAnswers[question.id];
				const isCorrect =
					question.type === "mcq"
						? userAnswer === question.correctOptionId
						: !!(userAnswer && userAnswer.trim().length > 0);

				const performance = getQuestionPerformance(question, userAnswer);

				return (
					<motion.div
						key={question.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 + index * 0.1 }}
						className="bg-[#1d1d20] rounded-lg p-6 sm:p-8 shadow-xl relative overflow-hidden"
					>
						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

						<div className="relative z-10">
							{/* Question Header */}
							<div className="flex items-center gap-3 mb-4">
								<div className="flex items-center gap-2">
									{isCorrect ? (
										<CheckCircleIcon className="h-6 w-6 text-green-400" />
									) : (
										<XCircleIcon className="h-6 w-6 text-red-400" />
									)}
									<span className="font-bold text-white text-lg">
										Question {index + 1}
									</span>
								</div>

								<span
									className={`px-3 py-1 rounded-full text-sm font-medium ${
										question.type === "mcq"
											? "bg-blue-400/20 text-blue-400"
											: "bg-purple-400/20 text-purple-400"
									}`}
								>
									{question.type === "mcq"
										? "Multiple Choice"
										: "Problem Solving"}
								</span>

								<span className="text-[#e8eef2] text-sm">
									{question.points} points
								</span>
							</div>

							{/* Question Text */}
							<div className="mb-6">
								<h3 className="font-['Nunito'] font-bold text-white text-lg mb-3">
									{question.type === "problem_solving"
										? question.name
										: "Question"}
								</h3>
								<p className="text-[#e8eef2] text-base leading-relaxed">
									{question.text}
								</p>
							</div>

							{/* MCQ Specific Content */}
							{question.type === "mcq" && (
								<QuestionContentMCQ
									question={question}
									userAnswer={userAnswer}
								/>
							)}

							{/* Problem Solving Specific Content */}
							{question.type === "problem_solving" && (
								<QuestionContentProblemSolving
									question={question}
									userAnswer={userAnswer}
								/>
							)}

							{/* Explanation */}
							<div className="bg-blue-400/10 p-4 rounded-lg border border-blue-400/30 mb-6">
								<div className="flex items-start gap-3">
									<InfoIcon className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
									<div>
										<h4 className="font-semibold text-blue-400 text-base mb-2">
											Explanation
										</h4>
										<p className="text-[#e8eef2] text-sm leading-relaxed">
											{question.explanation}
										</p>
									</div>
								</div>
							</div>

							{/* Your Performance Section */}
							<QuestionContentPerformance
								question={question}
								performance={performance}
								isCorrect={isCorrect}
							/>
						</div>
					</motion.div>
				);
			})}
		</>
	);
};
