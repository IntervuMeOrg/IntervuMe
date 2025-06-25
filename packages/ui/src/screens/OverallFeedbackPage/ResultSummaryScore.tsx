import { motion } from "framer-motion";
import { Progress } from "../../components/ui/progress";
import { AwardIcon } from "lucide-react";
import { InterviewData } from "../../types/interviewData";

type ResultSummaryScoreProps = {
	interviewData: InterviewData;
};

export const ResultSummaryScore = ({
	interviewData,
}: ResultSummaryScoreProps) => {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 30 },
				visible: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.5 },
				},
			}}
		>
			<div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
				<div className="flex items-center gap-3">
					<div className="bg-amber-100 p-2 rounded-full">
						<AwardIcon className="h-6 w-6 text-amber-600" />
					</div>
					<div>
						<h3 className="text-sm font-medium text-gray-500">Score</h3>
						<p className="text-xl font-bold">
							{interviewData.earnedPoints}/{interviewData.totalPoints}
						</p>
					</div>
				</div>
				<div className="mt-3">
					<div className="flex justify-between text-xs text-gray-500 mb-1">
						<span>Points Earned</span>
						<span>
							{Math.round(
								(interviewData.earnedPoints / interviewData.totalPoints) * 100
							)}
							%
						</span>
					</div>
					<Progress
						value={
							(interviewData.earnedPoints / interviewData.totalPoints) * 100
						}
						className="h-2"
					/>
				</div>
			</div>
		</motion.div>
	);
};
