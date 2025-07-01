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
	const currentQuestion = questions[currentQuestionIndex];
	const selectedAnswer = userAnswers[currentQuestion.id];

	// Handle MCQ answer selection
	const handleMCQAnswer = (questionId: number, optionId: string) => {
		setUserAnswers((prev) => ({
			...prev,
			[questionId]: optionId,
		}));
	};

	return (
		<div className="space-y-4">
			{/* Question Section with Distinct Styling */}
			<div className="font-['Nunito'] bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm p-4 sm:p-5 border-l-4 border-[#0667D0]">
				<div className="flex items-start gap-2 mb-2">
					<span className="font-['Nunito']text-xs sm:text-sm font-semibold text-[#0667D0] uppercase tracking-wider">
						Question
					</span>
				</div>
				<p className="font-['Nunito'] text-sm sm:text-base lg:text-lg text-[#1d1d20] leading-relaxed whitespace-pre-line">
					{currentQuestion.text}
				</p>
			</div>

			{/* Answer Options */}
			<div className="space-y-2">
				{/* Section Label */}
				<p className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
					Choose your answer:
				</p>
				
				{currentQuestion.options.map((option, index) => {
					const isSelected = selectedAnswer === option.id;
					const optionLetter = String.fromCharCode(65 + index);

					return (
						<motion.div
							key={option.id}
							whileHover={{ scale: 1.005 }}
							whileTap={{ scale: 0.995 }}
							onClick={() => handleMCQAnswer(currentQuestion.id, option.id)}
							className={`
								relative group cursor-pointer rounded-lg transition-all duration-200
								${
									isSelected
										? "bg-blue-50 border-2 border-[#0667D0] shadow-sm"
										: "bg-gray-50 border border-gray-300 hover:bg-white hover:border-gray-400 hover:shadow-sm"
								}
							`}
						>
							<div className="flex items-center p-3 sm:p-4">
								{/* Option Letter */}
								<div
									className={`
										flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full font-['Nunito'] font-bold text-xs sm:text-sm
										${
											isSelected
												? "bg-[#0667D0] text-white"
												: "bg-white text-gray-700 border border-gray-300 group-hover:bg-gray-100"
										}
										transition-colors duration-200 flex-shrink-0
									`}
								>
									{optionLetter}
								</div>

								{/* Option Text */}
								<p className="flex-1 ml-3 font-['Nunito'] text-sm sm:text-base text-[#1d1d20] leading-snug">
									{option.text}
								</p>

								{/* Selected Indicator */}
								{isSelected && (
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ type: "spring", stiffness: 500, damping: 30 }}
										className="ml-2 flex-shrink-0"
									>
										<CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#0667D0]" />
									</motion.div>
								)}
							</div>
						</motion.div>
					);
				})}
			</div>

			{/* Answer Status - Only on mobile */}
			{selectedAnswer && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="sm:hidden"
				>
					<p className="text-xs text-center text-gray-500 font-['Nunito'] mt-2">
						Tap any option to change your answer
					</p>
				</motion.div>
			)}
		</div>
	);
};