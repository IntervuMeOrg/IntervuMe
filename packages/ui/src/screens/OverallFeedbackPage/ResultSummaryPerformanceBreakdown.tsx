import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { MCQQuestion, CodingQuestion } from "../../types/questions";

type ResultSummaryPerformanceBreakdownProps = {
	questions: (MCQQuestion | CodingQuestion)[];
	userAnswers: Record<number, string>;
};

export const ResultSummaryPerformanceBreakdown = ({
	questions,
	userAnswers,
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
					const userAnswer = userAnswers[question.id];
					const isCorrect =
						question.type === "mcq"
							? userAnswer === question.correctOptionId
							: userAnswer && userAnswer.trim().length > 0;

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
								{isCorrect ? question.points : 0}/{question.points} pts
							</span>
						</div>
					);
				})}
			</div>
		</motion.div>
	);
};
