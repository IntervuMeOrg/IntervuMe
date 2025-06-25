import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type QuestionNavigationProps = {
	questions: (MCQQuestion | ProblemSolvingQuestion)[];
	currentQuestionIndex: number;
	setCurrentQuestionIndex: (index: number) => void;
};

export const QuestionNavigation = ({
	questions,
	currentQuestionIndex,
	setCurrentQuestionIndex,
}: QuestionNavigationProps) => {
	// Navigate to next question in detailed feedback
	const goToNextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	// Navigate to previous question in detailed feedback
	const goToPreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 20 },
				visible: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.4 },
				},
			}}
			className="flex justify-between items-center mb-6"
		>
			<Button
				onClick={goToPreviousQuestion}
				disabled={currentQuestionIndex === 0}
				className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
					currentQuestionIndex === 0
						? "bg-gray-200 text-gray-400 cursor-not-allowed"
						: "bg-gray-200 hover:bg-gray-300 text-gray-700"
				}`}
			>
				<ChevronLeftIcon className="h-4 w-4" />
				<span>Previous</span>
			</Button>

			<div className="text-center">
				<span className="text-sm text-gray-500">
					Question {currentQuestionIndex + 1} of {questions.length}
				</span>
				<div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mt-1 mx-auto">
					<div
						className="h-full bg-[#0667D0] rounded-full"
						style={{
							width: `${
								((currentQuestionIndex + 1) / questions.length) * 100
							}%`,
						}}
					/>
				</div>
			</div>

			<Button
				onClick={goToNextQuestion}
				disabled={currentQuestionIndex === questions.length - 1}
				className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
					currentQuestionIndex === questions.length - 1
						? "bg-gray-200 text-gray-400 cursor-not-allowed"
						: "bg-gray-200 hover:bg-gray-300 text-gray-700"
				}`}
			>
				<span>Next</span>
				<ChevronRightIcon className="h-4 w-4" />
			</Button>
		</motion.div>
	);
};
