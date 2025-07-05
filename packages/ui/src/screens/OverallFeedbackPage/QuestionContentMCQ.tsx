import { motion } from "framer-motion";
import { CheckCircleIcon, InfoIcon, XCircleIcon } from "lucide-react";
import { McqQuestion } from "../../types/questions";

type QuestionContentMCQProps = {
	question: McqQuestion;
	userAnswer: string;
};

export const QuestionContentMCQ = ({
	question,
	userAnswer,
}: QuestionContentMCQProps) => {

	return (
		<div className="space-y-4">
			{/* Question Section */}
			<div className="font-['Nunito'] bg-white/5 rounded-lg p-4 sm:p-5 border-l-4 border-[#0667D0]">
				<div className="flex items-start gap-2 mb-2">
					<span className="font-['Nunito'] text-xs sm:text-sm font-semibold text-[#0667D0] uppercase tracking-wider">
						Question
					</span>
				</div>
				<p className="font-['Nunito'] text-sm sm:text-base lg:text-lg text-white leading-relaxed whitespace-pre-line">
					{question.text}
				</p>
			</div>

			{/* Answer Options */}
			<div className="space-y-2">
				<p className="text-xs sm:text-sm font-semibold text-white/80 uppercase tracking-wider pl-1">
					Answer Review:
				</p>
				
				{question.options.map((option, index) => {
					const isUserAnswer = userAnswer === option.id;
					const isCorrectOption = option.isCorrect;
					const optionLetter = String.fromCharCode(65 + index);

					return (
						<motion.div
							key={option.id}
							whileHover={{ scale: 1.005 }}
							whileTap={{ scale: 0.995 }}
							className={`
								relative rounded-lg transition-all duration-200
								${isCorrectOption
									? "bg-emerald-500/5 border border-emerald-500/30"
									: isUserAnswer && !isCorrectOption
									? "bg-red-500/5 border border-red-500/30"
									: "bg-white/5 border border-white/10"
								}
							`}
						>
							<div className="flex items-center p-3 sm:p-4">
								{/* Option Letter */}
								<div className={`
									flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full font-['Nunito'] font-bold text-xs sm:text-sm
									${isCorrectOption
										? "bg-emerald-500/20 text-emerald-300"
										: isUserAnswer && !isCorrectOption
										? "bg-red-500/20 text-red-300"
										: "bg-white/10 text-white/80"
									}
									transition-colors duration-200 flex-shrink-0
								`}>
									{optionLetter}
								</div>

								{/* Option Text */}
								<p className={`flex-1 ml-3 font-['Nunito'] text-sm sm:text-base leading-snug ${
									isCorrectOption
										? "text-emerald-100"
										: isUserAnswer && !isCorrectOption
										? "text-red-100"
										: "text-white/90"
								}`}>
									{option.optionText}
								</p>

								{/* Indicator Icons */}
								{(isCorrectOption || (isUserAnswer && !isCorrectOption)) && (
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ type: "spring", stiffness: 500, damping: 30 }}
										className="ml-2 flex-shrink-0"
									>
										{isCorrectOption ? (
											<CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
										) : (
											<XCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
										)}
									</motion.div>
								)}
							</div>
						</motion.div>
					);
				})}
			</div>

			              {/* Explanation */}
			{question.explanation && (
                  <div className="bg-blue-400/10 p-4 rounded-lg border border-blue-400/30 mb-6">
                    <div className="flex items-start gap-3">
                      <InfoIcon className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-400 text-base mb-2">
                          Explanation
                        </h4>
                        <p className="text-[#e8eef2] text-sm leading-relaxed">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
		</div>
	);
};
