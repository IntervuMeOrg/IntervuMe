import { ChevronLeftIcon, ChevronRightIcon, SendIcon } from "lucide-react";
import { motion } from "framer-motion";
import { McqQuestion, CodingQuestion } from "../../types/questions";

type QuestionFooterProps = {
	currentQuestionIndex: number;
	questions: (McqQuestion | CodingQuestion)[];
	setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
	sidebarVisible: boolean;
	footerVisible: boolean;
	setFooterVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setSubmitConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
};

export const QuestionFooter = ({
	currentQuestionIndex,
	questions,
	setCurrentQuestionIndex,
	sidebarVisible,
	footerVisible,
	setFooterVisible,
	setSubmitConfirmation,
}: QuestionFooterProps) => {
	// Navigate to next question
	const goToNextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	// Navigate to previous question
	const goToPreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const progressPercentage =
		((currentQuestionIndex + 1) / questions.length) * 100;

	return (
		<>
			{/* Fixed Navigation Footer */}
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: footerVisible ? 1 : 0, y: footerVisible ? 0 : 50 }}
				transition={{ duration: 0.3 }}
				className={`fixed bottom-0 left-0 right-0 h-12 bg-[#1d1d20]/95 backdrop-blur-sm shadow-[0_-4px_10px_rgba(0,0,0,0.3)] z-40 ${
					sidebarVisible ? "md:pl-[350px]" : ""
				} ${!footerVisible ? "pointer-events-none" : ""}`}
			>
				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

				<div className="relative h-full">
					<div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
						{/* Mobile Layout */}
						<div className="flex sm:hidden w-full items-center gap-2">
							{/* Progress indicator - Mobile */}
							<div className="flex items-center gap-2 text-xs text-[#E8EEF2] min-w-fit">
								<span>
									{currentQuestionIndex + 1}/{questions.length}
								</span>
								<div className="w-12 h-1.5 bg-gray-700 rounded-full overflow-hidden">
									<motion.div
										initial={{ width: 0 }}
										animate={{ width: `${progressPercentage}%` }}
										transition={{ duration: 0.5 }}
										className="h-full bg-gradient-to-r from-[#0667D0] to-[#054E9D] rounded-full"
									/>
								</div>
							</div>

							{/* Buttons - Mobile */}
							<div className="flex flex-1 gap-1.5">
								<motion.button
									whileTap={{ scale: 0.95 }}
									onClick={goToPreviousQuestion}
									disabled={currentQuestionIndex === 0}
									className={`flex-1 flex items-center justify-center gap-0.5 px-2 py-1.5 rounded-md transition-all duration-200 text-xs font-['Nunito'] font-semibold
                    ${
											currentQuestionIndex === 0
												? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
												: "bg-[#0667D0] hover:bg-[#054E9D] text-white active:bg-[#033464]"
										}`}
								>
									<ChevronLeftIcon className="h-3.5 w-3.5" />
									<span className="hidden xs:inline">Prev</span>
								</motion.button>

								<motion.button
									whileTap={{ scale: 0.95 }}
									onClick={() => setSubmitConfirmation(true)}
									className="flex items-center justify-center gap-0.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-md transition-all duration-200 text-xs font-['Nunito'] font-semibold"
								>
									<SendIcon className="h-3.5 w-3.5" />
									<span>Submit</span>
								</motion.button>

								<motion.button
									whileTap={{ scale: 0.95 }}
									onClick={goToNextQuestion}
									disabled={currentQuestionIndex === questions.length - 1}
									className={`flex-1 flex items-center justify-center gap-0.5 px-2 py-1.5 rounded-md transition-all duration-200 text-xs font-['Nunito'] font-semibold
                    ${
											currentQuestionIndex === questions.length - 1
												? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
												: "bg-[#0667D0] hover:bg-[#054E9D] text-white active:bg-[#033464]"
										}`}
								>
									<span className="hidden xs:inline">Next</span>
									<ChevronRightIcon className="h-3.5 w-3.5" />
								</motion.button>
							</div>
						</div>

						{/* Desktop Layout */}
						<div className="hidden sm:flex items-center justify-between gap-4 w-full">
							{/* Previous Button */}
							<motion.button
								whileHover={{ scale: 1.02, x: -2 }}
								whileTap={{ scale: 0.98 }}
								onClick={goToPreviousQuestion}
								disabled={currentQuestionIndex === 0}
								className={`flex items-center gap-1.5 px-3 lg:px-4 py-1.5 h-8 rounded-full transition-all duration-200 font-['Nunito'] font-semibold text-sm
                  ${
										currentQuestionIndex === 0
											? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
											: "bg-[#0667D0] hover:bg-[#054E9D] text-white shadow-lg"
									}`}
							>
								<ChevronLeftIcon className="h-3.5 w-3.5" />
								<span>Previous</span>
							</motion.button>

							{/* Progress Section */}
							<div className="flex-1 flex items-center justify-center gap-3 max-w-md">
								<span className="text-[#E8EEF2] font-['Nunito'] text-xs lg:text-sm whitespace-nowrap">
									{currentQuestionIndex + 1} / {questions.length}
								</span>
								<div className="flex-1">
									<div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
										<motion.div
											initial={{ width: 0 }}
											animate={{ width: `${progressPercentage}%` }}
											transition={{ duration: 0.5 }}
											className="h-full bg-gradient-to-r from-[#0667D0] to-[#054E9D] rounded-full"
										/>
									</div>
								</div>
								<span className="text-[#E8EEF2] font-['Nunito'] text-xs lg:text-sm">
									{Math.round(progressPercentage)}%
								</span>
							</div>

							{/* Action Buttons */}
							<div className="flex gap-2 lg:gap-3">
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => setSubmitConfirmation(true)}
									className="flex items-center gap-1.5 px-3 lg:px-4 py-1.5 h-8 bg-green-600 hover:bg-green-700 text-white rounded-full transition-all duration-200 shadow-lg font-['Nunito'] font-semibold text-sm"
								>
									<SendIcon className="h-3.5 w-3.5" />
									<span>Submit</span>
								</motion.button>

								<motion.button
									whileHover={{ scale: 1.02, x: 2 }}
									whileTap={{ scale: 0.98 }}
									onClick={goToNextQuestion}
									disabled={currentQuestionIndex === questions.length - 1}
									className={`flex items-center gap-1.5 px-3 lg:px-4 py-1.5 h-8 rounded-full transition-all duration-200 font-['Nunito'] font-semibold text-sm
                    ${
											currentQuestionIndex === questions.length - 1
												? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
												: "bg-[#0667D0] hover:bg-[#054E9D] text-white shadow-lg"
										}`}
								>
									<span>Next</span>
									<ChevronRightIcon className="h-3.5 w-3.5" />
								</motion.button>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Footer Toggle Button */}
			<motion.button
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={() => setFooterVisible(!footerVisible)}
				className="fixed bottom-16 right-4 sm:bottom-16 sm:right-6 bg-[#0667D0] hover:bg-[#054E9D] text-white p-2 rounded-full shadow-lg z-50 flex items-center justify-center transition-colors duration-200"
				title={footerVisible ? "Hide navigation" : "Show navigation"}
			>
				<motion.div
					animate={{ rotate: footerVisible ? 180 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<ChevronLeftIcon className="h-4 w-4 rotate-90" />
				</motion.div>
			</motion.button>
		</>
	);
};
