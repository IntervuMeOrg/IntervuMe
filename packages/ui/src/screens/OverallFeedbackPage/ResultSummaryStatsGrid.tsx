import { motion } from "framer-motion";
import { CheckCircleIcon, TargetIcon, TrophyIcon } from "lucide-react";

type ResultSummaryStatsGridProps = {
	earnedPoints: number;
	accuracy: number;
	totalQuestions: number;
	correctAnswers: number;
	totalPoints: number;
};

export const ResultSummaryStatsGrid = ({
	totalQuestions,
	correctAnswers,
	accuracy,
	earnedPoints,
	totalPoints,
}: ResultSummaryStatsGridProps) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
			{/* Correct Answers */}
			<motion.div
				variants={{
					hidden: { opacity: 0, y: 20 },
					visible: { opacity: 1, y: 0 },
				}}
				transition={{ delay: 0.6 }}
				className="text-center p-4 bg-white/10 rounded-lg border border-white/20"
			>
				<CheckCircleIcon className="h-8 w-8 text-green-400 mx-auto mb-2" />
				<div className="text-2xl sm:text-3xl font-bold text-white mb-1">
					{correctAnswers}/{totalQuestions}
				</div>
				<div className="text-[#e8eef2] text-sm opacity-80">
					Questions Correct
				</div>
			</motion.div>

			{/* Accuracy */}
			<motion.div
				variants={{
					hidden: { opacity: 0, y: 20 },
					visible: { opacity: 1, y: 0 },
				}}
				transition={{ delay: 0.7 }}
				className="text-center p-4 bg-white/10 rounded-lg border border-white/20"
			>
				<TargetIcon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
				<div className="text-2xl sm:text-3xl font-bold text-white mb-1">
					{accuracy}%
				</div>
				<div className="text-[#e8eef2] text-sm opacity-80">Accuracy Rate</div>
			</motion.div>

			{/* Points Earned */}
			<motion.div
				variants={{
					hidden: { opacity: 0, y: 20 },
					visible: { opacity: 1, y: 0 },
				}}
				transition={{ delay: 0.8 }}
				className="text-center p-4 bg-white/10 rounded-lg border border-white/20"
			>
				<TrophyIcon className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
				<div className="text-2xl sm:text-3xl font-bold text-white mb-1">
					{earnedPoints}/{totalPoints}
				</div>
				<div className="text-[#e8eef2] text-sm opacity-80">Points Earned</div>
			</motion.div>
		</div>
	);
};
