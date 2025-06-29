import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TrophyIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";
import { ResultSummaryOverallFeedback } from "./ResultSummaryOverallFeedback";
import { PerformanceBreakdown } from "./PerformanceBreakdown";
import { ResultSummaryStatsGrid } from "./ResultSummaryStatsGrid";

type Question = MCQQuestion | ProblemSolvingQuestion;

interface ResultSummaryCardProps {
	questions: Question[];
	userAnswers: Record<number, string>;
	setShowDetailedFeedback: (show: boolean) => void;
}

export const ResultSummaryCard = ({
	questions,
	userAnswers,
	setShowDetailedFeedback,
}: ResultSummaryCardProps) => {
	const navigate = useNavigate();
	// Calculate results
	const totalQuestions = questions.length;
	const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

	let correctAnswers = 0;
	let earnedPoints = 0;

	questions.forEach((question) => {
		const userAnswer = userAnswers[question.id];
		if (question.type === "mcq") {
			if (userAnswer === question.correctOptionId) {
				correctAnswers++;
				earnedPoints += question.points;
			}
		} else if (question.type === "problem_solving") {
			// For problem solving, we'll assume partial credit based on solution quality
			if (userAnswer && userAnswer.trim().length > 0) {
				correctAnswers++;
				earnedPoints += Math.floor(question.points * 0.8); // 80% credit for attempt
			}
		}
	});

	const percentage = Math.round((earnedPoints / totalPoints) * 100);
	const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

	// Determine performance level
	const getPerformanceLevel = (score: number) => {
		if (score >= 90)
			return {
				level: "Excellent",
				color: "text-green-400",
				bgColor: "bg-green-400/20",
			};
		if (score >= 80)
			return {
				level: "Very Good",
				color: "text-blue-400",
				bgColor: "bg-blue-400/20",
			};
		if (score >= 70)
			return {
				level: "Good",
				color: "text-yellow-400",
				bgColor: "bg-yellow-400/20",
			};
		if (score >= 60)
			return {
				level: "Fair",
				color: "text-orange-400",
				bgColor: "bg-orange-400/20",
			};
		return {
			level: "Needs Improvement",
			color: "text-red-400",
			bgColor: "bg-red-400/20",
		};
	};

	const performance = getPerformanceLevel(percentage);

	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 30 },
				visible: { opacity: 1, y: 0 },
			}}
			className="bg-[#1d1d20] rounded-lg p-6 sm:p-8 md:p-10 shadow-xl relative overflow-hidden"
		>
			{/* Gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

			<div className="relative z-10">
				{/* Header */}
				<div className="text-center mb-8">
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
						className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#0667D0] to-[#033464] rounded-full mb-4"
					>
						<TrophyIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
					</motion.div>

					<h1 className="font-['Nunito'] font-black text-white text-2xl sm:text-3xl md:text-4xl mb-2">
						Interview Complete!
					</h1>
					<p className="text-[#e8eef2] text-sm sm:text-base opacity-80">
						Here's how you performed in your interview
					</p>
				</div>

				{/* Score Display */}
				<div className="text-center mb-8">
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
						className="inline-block"
					>
						<div className="text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-2">
							{percentage}%
						</div>
						<div
							className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${performance.bgColor}`}
						>
							<span
								className={`text-sm sm:text-base font-semibold ${performance.color}`}
							>
								{performance.level}
							</span>
						</div>
					</motion.div>
				</div>

				{/* Stats Grid */}
				<ResultSummaryStatsGrid
					correctAnswers={correctAnswers}
					earnedPoints={earnedPoints}
					totalPoints={totalPoints}
					totalQuestions={totalQuestions}
					accuracy={accuracy}
				/>

				{/* Overall Feedback Section */}
				<ResultSummaryOverallFeedback
					accuracy={accuracy}
					totalQuestions={totalQuestions}
					correctAnswers={correctAnswers}
					percentage={percentage}
				/>

				{/* Performance Breakdown */}
				<PerformanceBreakdown questions={questions} userAnswers={userAnswers} />

				{/* Action Buttons */}
				<motion.div
					variants={{
						hidden: { opacity: 0, y: 20 },
						visible: { opacity: 1, y: 0 },
					}}
					transition={{ delay: 1.0 }}
					className="flex flex-col sm:flex-row gap-4 justify-center"
				>
					<Button
						onClick={() => {
							window.scrollTo(0, 0);
							setShowDetailedFeedback(true);
						}}
						className="bg-gradient-to-r from-[#0667D0] to-[#033464] hover:opacity-90 text-white px-6 py-3 rounded-md transition-all"
					>
						View Detailed Feedback
					</Button>

					<Button
						onClick={() => {
							window.scrollTo(0, 0);
							navigate("/start-interview");
						}}
						className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3 rounded-md transition-all"
					>
						Take Another Interview
					</Button>
				</motion.div>
			</div>
		</motion.div>
	);
};
