import { ChevronLeftIcon, ChevronRightIcon, SendIcon } from "lucide-react";
import { motion } from "framer-motion";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";

type QuestionFooterProps = {
	currentQuestionIndex: number;
	questions: (MCQQuestion | ProblemSolvingQuestion)[];
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
	return (
		<>
			{/* Fixed Navigation Footer */}
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: footerVisible ? 1 : 0, y: footerVisible ? 0 : 50 }}
				transition={{ duration: 0.5 }}
				className={`fixed bottom-0 left-0 right-0 bg-[#1d1d20] bg-opacity-95 backdrop-blur-sm py-4 px-8 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] ${
					sidebarVisible ? "hidden" : ""
				}`}
			>
				<div className="h-2 max-w-7xl mx-auto flex justify-between items-center">
					<motion.button
						whileHover={{ scale: 1.05, x: -5 }}
						whileTap={{ scale: 0.95 }}
						onClick={goToPreviousQuestion}
						disabled={currentQuestionIndex === 0}
						className={` min-w-[200px] h-3 flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
							currentQuestionIndex === 0
								? "bg-gray-700 bg-opacity-50 cursor-not-allowed text-gray-400"
								: "bg-[#0667D0] hover:bg-[#054E9D] text-white"
						}`}
					>
						<ChevronLeftIcon className="h-4 w-4" />
						<span className="font-['Nunito',Helvetica] font-semibold">
							Previous
						</span>
					</motion.button>

					<div className="flex items-center gap-2">
						<span className="text-[#E8EEF2] font-['Nunito',Helvetica] text-sm">
							Question {currentQuestionIndex + 1} of {questions.length}
						</span>
						<div className="flex-1 flex items-center justify-center min-w-60 max-w-80 px-4">
							<div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden transition-all duration-300">
								<motion.div
									initial={{ width: 0 }}
									animate={{
										width: `${
											((currentQuestionIndex + 1) / questions.length) * 100
										}%`,
									}}
									className="h-full bg-[#0667D0] rounded-full"
								/>
							</div>
						</div>
					</div>

					<div className="flex gap-4">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setSubmitConfirmation(true)}
							className="mt-1 w-full h-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg"
						>
							<SendIcon className="min-h-4 min-w-4" />
							<span className="font-['Nunito',Helvetica] font-semibold">
								Submit
							</span>
						</motion.button>

						<motion.button
							whileHover={{ scale: 1.05, x: 5 }}
							whileTap={{ scale: 0.95 }}
							onClick={goToNextQuestion}
							disabled={currentQuestionIndex === questions.length - 1}
							className={`mt-1 w-full h-3 flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
								currentQuestionIndex === questions.length - 1
									? "bg-gray-700 bg-opacity-50 cursor-not-allowed text-gray-400"
									: "bg-[#0667D0] hover:bg-[#054E9D] text-white"
							}`}
						>
							<span className="font-['Nunito',Helvetica] font-semibold">
								Next
							</span>
							<ChevronRightIcon className="min-h-4 min-w-4" />
						</motion.button>
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
				className="fixed bottom-11 right-4 bg-[#0667D0] text-white p-2 rounded-full shadow-lg z-50 flex items-center justify-center"
				title={footerVisible ? "Hide navigation" : "Show navigation"}
			>
				<motion.div
					animate={{ rotate: footerVisible ? 180 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<ChevronLeftIcon className="h-5 w-5 rotate-90" />
				</motion.div>
			</motion.button>
		</>
	);
};
