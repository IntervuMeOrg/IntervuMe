import { motion } from "framer-motion";
import { BarChart3Icon } from "lucide-react";

type ResultSummaryOverallFeedbackProps = {
	overallPercentage: number;
	accuracy: number;
	totalQuestions: number;
	correctAnswers: number;
};

export const ResultSummaryOverallFeedback = ({
	overallPercentage,
	accuracy,
	totalQuestions,
	correctAnswers,
}: ResultSummaryOverallFeedbackProps) => {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 20 },
				visible: { opacity: 1, y: 0 },
			}}
			transition={{ delay: 0.85 }}
			className="bg-white/10 rounded-lg p-4 sm:p-6 border border-white/20 mb-8"
		>
			<div className="flex items-center gap-3 mb-4">
				<BarChart3Icon className="h-6 w-6 text-[#0667D0]" />
				<h3 className="font-['Nunito'] font-bold text-white text-lg sm:text-xl">
					Overall Feedback
				</h3>
			</div>

			<div className="space-y-4">
				{/* Strengths */}
				<div>
					<h4 className="font-semibold text-green-400 text-base mb-2">
						Strengths:
					</h4>
					<ul className="text-[#e8eef2] text-sm space-y-1 ml-4">
						{overallPercentage >= 80 && (
							<li>• Excellent understanding of core concepts</li>
						)}
						{accuracy >= 70 && <li>• Good problem-solving approach</li>}
						{correctAnswers >= totalQuestions * 0.6 && (
							<li>• Solid technical knowledge</li>
						)}
						<li>• Clear communication of ideas</li>
					</ul>
				</div>

				{/* Areas for Improvement */}
				<div>
					<h4 className="font-semibold text-orange-400 text-base mb-2">
						Areas for Improvement:
					</h4>
					<ul className="text-[#e8eef2] text-sm space-y-1 ml-4">
						{overallPercentage < 70 && <li>• Review fundamental concepts</li>}
						{accuracy < 60 && <li>• Practice more coding problems</li>}
						<li>• Consider edge cases in solutions</li>
						<li>• Optimize time complexity when possible</li>
					</ul>
				</div>

				{/* Recommendations */}
				<div>
					<h4 className="font-semibold text-blue-400 text-base mb-2">
						Recommendations:
					</h4>
					<ul className="text-[#e8eef2] text-sm space-y-1 ml-4">
						<li>• Practice similar problems daily</li>
						<li>• Review data structures and algorithms</li>
						<li>• Mock interviews with peers</li>
						<li>• Study system design patterns</li>
					</ul>
				</div>
			</div>
		</motion.div>
	);
};
