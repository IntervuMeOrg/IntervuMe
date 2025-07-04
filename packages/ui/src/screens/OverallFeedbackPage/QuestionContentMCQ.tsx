import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { McqQuestion } from "../../types/questions";

type QuestionContentMCQProps = {
	question: McqQuestion;
	userAnswer: string | null;
};

export const QuestionContentMCQ = ({
	question,
	userAnswer,
}: QuestionContentMCQProps) => {
	return (
		<div className="mb-6">
			<h4 className="font-semibold text-white text-base mb-3">Options:</h4>
			<div className="space-y-2">
				{question.options.map((option) => {
					const isUserAnswer = userAnswer === option.id;
					const isCorrectOption = option.id === question.correctOptionId;

					return (
						<div
							key={option.id}
							className={`p-3 rounded-lg border-2 ${
								isCorrectOption
									? "border-green-400 bg-green-400/20"
									: isUserAnswer
									? "border-red-400 bg-red-400/20"
									: "border-white/20 bg-white/10"
							}`}
						>
							<div className="flex items-center gap-3">
								<span className="font-bold text-white">
									{option.id.toUpperCase()}.
								</span>
								<span className="text-[#e8eef2]">{option.text}</span>
								{isCorrectOption && (
									<CheckCircleIcon className="h-5 w-5 text-green-400 ml-auto" />
								)}
								{isUserAnswer && !isCorrectOption && (
									<XCircleIcon className="h-5 w-5 text-red-400 ml-auto" />
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
