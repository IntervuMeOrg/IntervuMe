import { motion } from "framer-motion";
import { CheckCircleIcon } from "lucide-react";
import { Progress } from "../../components/ui/progress";
import { InterviewData } from "../../types/interviewData";


type ResultSummaryQuestionSolvedProps = {
	interviewData: InterviewData;
};

export const ResultSummaryQuestionSolved = ({
	interviewData,
}: ResultSummaryQuestionSolvedProps) => {
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
					<div className="bg-purple-100 p-2 rounded-full">
						<CheckCircleIcon className="h-6 w-6 text-purple-600" />
					</div>
					<div>
						<h3 className="text-sm font-medium text-gray-500">
							Questions Solved
						</h3>
						<p className="text-xl font-bold">
							{interviewData.solvedQuestions}/{interviewData.totalQuestions}
						</p>
					</div>
				</div>
				<div className="mt-3">
					<div className="flex justify-between text-xs text-gray-500 mb-1">
						<span>Completed</span>
						<span>
							{Math.round(
								(interviewData.solvedQuestions / interviewData.totalQuestions) *
									100
							)}
							%
						</span>
					</div>
					<Progress
						value={
							(interviewData.solvedQuestions / interviewData.totalQuestions) *
							100
						}
						className="h-2"
					/>
				</div>
			</div>
		</motion.div>
	);
};
