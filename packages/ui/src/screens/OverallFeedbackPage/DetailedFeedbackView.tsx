import { motion } from "framer-motion";
import {
	ArrowLeftIcon,
	CheckCircleIcon,
	XCircleIcon,
	InfoIcon,
	BarChart3Icon,
	TrendingUpIcon,
	AlertTriangleIcon,
	StarIcon,
	ClockIcon,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";
import { QuestionContentMCQ } from "./QuestionContentMCQ";
import { QuestionContentProblemSolving } from "./QuestionContentProblemSolving";
import { QuestionContentPerformance } from "./QuestionContentPerformance";

type Question = MCQQuestion | ProblemSolvingQuestion;

interface DetailedFeedbackViewProps {
	questions: Question[];
	userAnswers: Record<number, string>;
	setShowDetailedFeedback: (show: boolean) => void;
}

export const DetailedFeedbackView = ({
	questions,
	userAnswers,
	setShowDetailedFeedback,
}: DetailedFeedbackViewProps) => {
	// Calculate performance metrics
	const totalQuestions = questions.length;
	const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

	let correctAnswers = 0;
	let earnedPoints = 0;
	let mcqCorrect = 0;
	let mcqTotal = 0;
	let problemSolvingCorrect = 0;
	let problemSolvingTotal = 0;

	questions.forEach((question) => {
		const userAnswer = userAnswers[question.id];
		if (question.type === "mcq") {
			mcqTotal++;
			if (userAnswer === question.correctOptionId) {
				correctAnswers++;
				earnedPoints += question.points;
				mcqCorrect++;
			}
		} else if (question.type === "problem_solving") {
			problemSolvingTotal++;
			if (userAnswer && userAnswer.trim().length > 0) {
				correctAnswers++;
				earnedPoints += Math.floor(question.points * 0.8);
				problemSolvingCorrect++;
			}
		}
	});

	const overallPercentage = Math.round((earnedPoints / totalPoints) * 100);
	const mcqPercentage =
		mcqTotal > 0 ? Math.round((mcqCorrect / mcqTotal) * 100) : 0;
	const problemSolvingPercentage =
		problemSolvingTotal > 0
			? Math.round((problemSolvingCorrect / problemSolvingTotal) * 100)
			: 0;

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
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			className="space-y-6"
		>
			{/* Header */}
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
				<h1 className="font-['Nunito'] font-black text-[#1d1d20] text-2xl sm:text-3xl md:text-4xl">
					Detailed Feedback
				</h1>
				<Button
					onClick={() => setShowDetailedFeedback(false)}
					className="flex items-center gap-2 bg-white/50 hover:bg-white/90 text-[#1d1d20] border border-white/30 rounded-md px-4 py-2"
				>
					<ArrowLeftIcon className="h-4 w-4" />
					<span className="text-sm font-medium">Back to Summary</span>
				</Button>
			</div>

			{/* Performance Analysis Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="bg-[#1d1d20] rounded-lg p-6 sm:p-8 shadow-xl relative overflow-hidden mb-8"
			>
				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

				<div className="relative z-10">
					<div className="flex items-center gap-3 mb-6">
						<BarChart3Icon className="h-6 w-6 text-[#0667D0]" />
						<h2 className="font-['Nunito'] font-bold text-white text-xl sm:text-2xl">
							Performance Analysis
						</h2>
					</div>

					{/* Performance Metrics Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
						{/* Overall Performance */}
						<div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center">
							<TrendingUpIcon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
							<div className="text-2xl font-bold text-white mb-1">
								{overallPercentage}%
							</div>
							<div className="text-[#e8eef2] text-sm opacity-80">
								Overall Score
							</div>
							<div className="w-full bg-white/20 rounded-full h-2 mt-3">
								<div
									className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-500"
									style={{ width: `${overallPercentage}%` }}
								/>
							</div>
						</div>

						{/* MCQ Performance */}
						{mcqTotal > 0 && (
							<div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center">
								<CheckCircleIcon className="h-8 w-8 text-green-400 mx-auto mb-2" />
								<div className="text-2xl font-bold text-white mb-1">
									{mcqPercentage}%
								</div>
								<div className="text-[#e8eef2] text-sm opacity-80">
									Multiple Choice
								</div>
								<div className="text-[#e8eef2] text-xs opacity-60">
									{mcqCorrect}/{mcqTotal} correct
								</div>
								<div className="w-full bg-white/20 rounded-full h-2 mt-3">
									<div
										className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500"
										style={{ width: `${mcqPercentage}%` }}
									/>
								</div>
							</div>
						)}

						{/* Problem Solving Performance */}
						{problemSolvingTotal > 0 && (
							<div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center">
								<AlertTriangleIcon className="h-8 w-8 text-purple-400 mx-auto mb-2" />
								<div className="text-2xl font-bold text-white mb-1">
									{problemSolvingPercentage}%
								</div>
								<div className="text-[#e8eef2] text-sm opacity-80">
									Problem Solving
								</div>
								<div className="text-[#e8eef2] text-xs opacity-60">
									{problemSolvingCorrect}/{problemSolvingTotal} attempted
								</div>
								<div className="w-full bg-white/20 rounded-full h-2 mt-3">
									<div
										className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full transition-all duration-500"
										style={{ width: `${problemSolvingPercentage}%` }}
									/>
								</div>
							</div>
						)}
					</div>

					{/* Skill Assessment */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Strengths */}
						<div className="bg-green-400/10 rounded-lg p-4 border border-green-400/30">
							<h3 className="font-semibold text-green-400 text-lg mb-3 flex items-center gap-2">
								<TrendingUpIcon className="h-5 w-5" />
								Strengths
							</h3>
							<ul className="text-[#e8eef2] text-sm space-y-2">
								{overallPercentage >= 80 && (
									<li>• Strong technical foundation</li>
								)}
								{mcqPercentage >= 70 && (
									<li>• Good conceptual understanding</li>
								)}
								{problemSolvingPercentage >= 60 && (
									<li>• Effective problem-solving approach</li>
								)}
								<li>• Clear code structure and logic</li>
								<li>• Good attention to detail</li>
							</ul>
						</div>

						{/* Areas for Improvement */}
						<div className="bg-orange-400/10 rounded-lg p-4 border border-orange-400/30">
							<h3 className="font-semibold text-orange-400 text-lg mb-3 flex items-center gap-2">
								<AlertTriangleIcon className="h-5 w-5" />
								Areas for Improvement
							</h3>
							<ul className="text-[#e8eef2] text-sm space-y-2">
								{overallPercentage < 70 && (
									<li>• Review core programming concepts</li>
								)}
								{mcqPercentage < 60 && <li>• Study theoretical foundations</li>}
								{problemSolvingPercentage < 50 && (
									<li>• Practice algorithmic thinking</li>
								)}
								<li>• Consider edge cases in solutions</li>
								<li>• Optimize for time and space complexity</li>
							</ul>
						</div>
					</div>

					{/* Recommendations */}
					<div className="mt-6 bg-blue-400/10 rounded-lg p-4 border border-blue-400/30">
						<h3 className="font-semibold text-blue-400 text-lg mb-3">
							Next Steps
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<h4 className="font-medium text-white text-base mb-2">
									Study Resources:
								</h4>
								<ul className="text-[#e8eef2] text-sm space-y-1">
									<li>• LeetCode for algorithm practice</li>
									<li>• System design interview guides</li>
									<li>• Technology-specific documentation</li>
								</ul>
							</div>
							<div>
								<h4 className="font-medium text-white text-base mb-2">
									Practice Areas:
								</h4>
								<ul className="text-[#e8eef2] text-sm space-y-1">
									<li>• Data structures and algorithms</li>
									<li>• Mock technical interviews</li>
									<li>• Code review and optimization</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Questions Feedback */}
			{questions.map((question, index) => {
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
		</motion.div>
	);
};
