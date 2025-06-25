import { motion } from "framer-motion";
import { CheckCircleIcon } from "lucide-react";
import { MCQQuestion } from "../../types/questions";

type QuestionContentMCQProps = {
	questions: MCQQuestion[];
	userAnswers: Record<string, string>;
	currentQuestionIndex: number;
	setUserAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export const QuestionContentMCQ = ({
	questions,
	userAnswers,
	setUserAnswers,
	currentQuestionIndex,
}: QuestionContentMCQProps) => {
	// Handle MCQ answer selection
	const handleMCQAnswer = (questionId: number, optionId: string) => {
		setUserAnswers((prev) => ({
			...prev,
			[questionId]: optionId,
		}));
	};
	return (
		<div>
			<div className="bg-white p-4 rounded-md mb-6">
				<p className="font-['Nunito',Helvetica] text-[1rem] text-[#1d1d20] whitespace-pre-line">
					{questions[currentQuestionIndex].text}
				</p>
			</div>{" "}
			<div className="space-y-4">
				<div className="space-y-3">
					{(questions[currentQuestionIndex] as MCQQuestion).options.map(
						(option) => {
							const isSelected =
								userAnswers[questions[currentQuestionIndex].id] === option.id;
							return (
								<motion.div
									key={option.id}
									whileHover={{ scale: 1.02 }}
									className={`flex items-center p-3 rounded-lg cursor-pointer ${
										isSelected
											? "bg-blue-100 border-2 border-[#0667D0]"
											: "hover:bg-gray-300 border border-gray-300"
									} transition-all duration-200`}
									onClick={() =>
										handleMCQAnswer(
											questions[currentQuestionIndex].id,
											option.id
										)
									}
								>
									<div className="flex-1">
										<p className="font-['Nunito',Helvetica] font-bold text-[1rem] text-[#1d1d20]">
											{option.id.toUpperCase()}.{" "}
											<span className="font-['Nunito',Helvetica] font-normal text-[1rem] text-[#1d1d20]">
												{option.text}
											</span>
										</p>
									</div>
									{isSelected && (
										<CheckCircleIcon className="h-6 w-6 text-[#0667D0] ml-2" />
									)}
								</motion.div>
							);
						}
					)}
				</div>
			</div>
		</div>
	);
};
