import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { CheckCircleIcon, AlertCircleIcon } from "lucide-react";
import { MCQQuestion } from "../../types/questions";


type QuestionContentMCQProbs = {
	questions: MCQQuestion[];
	userAnswers: Record<string, string>;
	currentQuestionIndex: number;
	isMCQAnswerCorrect: (question: MCQQuestion) => boolean;
};

export const QuestionContentMCQ = ({
	questions,
	userAnswers,
	currentQuestionIndex,
	isMCQAnswerCorrect,
}: QuestionContentMCQProbs) => {
	return (
		<div>
			<div className="mb-4">
				<h3 className="text-lg font-semibold mb-2">
					Question {currentQuestionIndex + 1}: Multiple Choice
				</h3>
				<p className="text-gray-700">{questions[currentQuestionIndex].text}</p>
			</div>

			<div className="mb-6">
				<h4 className="font-medium text-gray-700 mb-2">Options:</h4>
				<RadioGroup
					value={userAnswers[questions[currentQuestionIndex].id] || ""}
					className="space-y-2"
				>
					{(questions[currentQuestionIndex] as MCQQuestion).options.map(
						(option) => {
							const isCorrect =
								option.id ===
								(questions[currentQuestionIndex] as MCQQuestion)
									.correctOptionId;
							const isSelected =
								userAnswers[questions[currentQuestionIndex].id] === option.id;

							return (
								<div
									key={option.id}
									className={`flex items-center space-x-2 p-3 rounded-md ${
										isCorrect
											? "bg-green-50 border border-green-200"
											: isSelected && !isCorrect
											? "bg-red-50 border border-red-200"
											: "bg-gray-50 border border-gray-200"
									}`}
								>
									<RadioGroupItem
										value={option.id}
										id={`option-${option.id}`}
										disabled
									/>
									<Label
										htmlFor={`option-${option.id}`}
										className="flex-1 cursor-pointer"
									>
										{option.text}
									</Label>
									{isCorrect && (
										<CheckCircleIcon className="h-5 w-5 text-green-500" />
									)}
									{isSelected && !isCorrect && (
										<AlertCircleIcon className="h-5 w-5 text-red-500" />
									)}
								</div>
							);
						}
					)}
				</RadioGroup>
			</div>

			<div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
				<h4 className="font-medium text-blue-700 mb-2">Explanation:</h4>
				<p className="text-gray-700">
					{(questions[currentQuestionIndex] as MCQQuestion).explanation}
				</p>
			</div>

			<div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
				<div className="flex justify-between items-center">
					<h4 className="font-medium text-gray-700">Your Performance:</h4>
					<div
						className={`px-3 py-1 rounded-full text-sm font-medium ${
							isMCQAnswerCorrect(questions[currentQuestionIndex] as MCQQuestion)
								? "bg-green-100 text-green-700"
								: "bg-red-100 text-red-700"
						}`}
					>
						{isMCQAnswerCorrect(questions[currentQuestionIndex] as MCQQuestion)
							? "Correct"
							: "Incorrect"}
					</div>
				</div>
				<p className="text-sm text-gray-500 mt-2">
					{isMCQAnswerCorrect(questions[currentQuestionIndex] as MCQQuestion)
						? "Great job! You selected the correct answer."
						: `You selected option ${
								userAnswers[questions[currentQuestionIndex].id]
						  } instead of the correct option ${
								(questions[currentQuestionIndex] as MCQQuestion).correctOptionId
						  }.`}
				</p>
			</div>
		</div>
	);
};
