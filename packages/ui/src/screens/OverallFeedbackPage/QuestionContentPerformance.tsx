import { MCQQuestion, CodingQuestion } from "../../types/questions";
import { StarIcon } from "lucide-react";

type Performance = {
	rating: string;
	color: string;
	bgColor: string;
	score: number;
	feedback: string;
};

type QuestionContentPerformanceProps = {
	question: MCQQuestion | CodingQuestion;
	performance: Performance;
	isCorrect: boolean;
};

export const QuestionContentPerformance = ({
	question,
	performance,
	isCorrect,
}: QuestionContentPerformanceProps) => {
	return (
		<div
			className={`${performance.bgColor} p-4 rounded-lg border border-opacity-30`}
		>
			<div className="flex items-start gap-3">
				<StarIcon
					className={`h-5 w-5 ${performance.color} mt-0.5 flex-shrink-0`}
				/>
				<div className="flex-1">
					<div className="flex flex-col md:flex-row items-center justify-between mb-3">
						<h4 className={`font-semibold ${performance.color} text-base`}>
							Your Performance
						</h4>
						<div className="flex items-center gap-3">
							<span className={`text-sm font-medium ${performance.color}`}>
								{performance.rating}
							</span>
							<div className="flex items-center gap-2">
								<span className="text-white text-lg font-bold">
									{performance.score}%
								</span>
								<div className="w-16 bg-white/20 rounded-full h-2">
									<div
										className={`h-full rounded-full transition-all duration-500 ${
											performance.score >= 90
												? "bg-green-400"
												: performance.score >= 70
												? "bg-yellow-400"
												: performance.score >= 50
												? "bg-orange-400"
												: "bg-red-400"
										}`}
										style={{ width: `${performance.score}%` }}
									/>
								</div>
							</div>
						</div>
					</div>

					<p className="text-[#e8eef2] text-sm leading-relaxed mb-3">
						{performance.feedback}
					</p>

					{/* Performance Metrics */}
					<div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-center">
						<div className="bg-white/10 rounded-lg p-2">
							<div className="text-white text-sm font-semibold">
								{isCorrect ? question.points : 0}/{question.points}
							</div>
							<div className="text-[#e8eef2] text-xs opacity-70">Points</div>
						</div>

						<div className="bg-white/10 rounded-lg p-2">
							<div className="text-white text-sm font-semibold">
								{question.type === "mcq" ? "Instant" : "~3 min"}
							</div>
							<div className="text-[#e8eef2] text-xs opacity-70">Time</div>
						</div>

						<div className="bg-white/10 rounded-lg p-2">
							<div className="text-white text-sm font-semibold">
								{question.type === "mcq" ? "Basic" : "Medium"}
							</div>
							<div className="text-[#e8eef2] text-xs opacity-70">
								Difficulty
							</div>
						</div>

						<div className="bg-white/10 rounded-lg p-2">
							<div className="text-white text-sm font-semibold">
								{question.type === "mcq" ? "Theory" : "Coding"}
							</div>
							<div className="text-[#e8eef2] text-xs opacity-70">Type</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
