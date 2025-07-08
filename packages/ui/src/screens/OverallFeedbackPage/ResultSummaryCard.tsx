import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TrophyIcon } from "lucide-react";
import { McqQuestion, CodingQuestion } from "../../types/questions";
import { ResultSummaryOverallFeedback } from "./ResultSummaryOverallFeedback";
import { ResultSummaryPerformanceBreakdown } from "./ResultSummaryPerformanceBreakdown";
import { ResultSummaryStatsGrid } from "./ResultSummaryStatsGrid";
import { ResultSummaryActionButtons } from "./ResultSummaryActionButtons";
import { McqAnswer } from "../../types/mcq";
import { CodeSubmissionWithResults } from "../../lib/interview/interview-api";

type Question = McqQuestion | CodingQuestion;

interface ResultSummaryCardProps {
	questions: Question[];
	correctAnswers: number;
	earnedPoints: number;
	totalPoints: number;
	totalQuestions: number;
	overallPercentage:number;
	accuracy:number;
	userAnswers: McqAnswer[];
	codeSubmissions: CodeSubmissionWithResults[];
	setShowDetailedFeedback: (show: boolean) => void;
}

export const ResultSummaryCard = ({
	questions,
	userAnswers,
	codeSubmissions,
	totalQuestions,
	totalPoints,
	earnedPoints,
	correctAnswers,
	overallPercentage,
	accuracy,
	setShowDetailedFeedback,
}: ResultSummaryCardProps) => {

	const navigate = useNavigate();

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

	const performance = getPerformanceLevel(overallPercentage);

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
							{overallPercentage}%
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
				<ResultSummaryOverallFeedback/>

				{/* Performance Breakdown */}
				<ResultSummaryPerformanceBreakdown questions={questions} userAnswers={userAnswers} codeSubmissions={codeSubmissions} />

				{/* Action Buttons */}
				<ResultSummaryActionButtons
					navigate={navigate}
					setShowDetailedFeedback={setShowDetailedFeedback}
				/>
			</div>
		</motion.div>
	);
};
