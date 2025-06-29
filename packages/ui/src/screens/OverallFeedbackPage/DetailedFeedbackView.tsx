import { motion } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";
import { DetailedQuestionsFeedback } from "./DetailedQuestionsFeedback";
import { DetailedPerformanceSection } from "./DetailedPerformanceSection";

type Question = MCQQuestion | ProblemSolvingQuestion;

interface DetailedFeedbackViewProps {
	questions: Question[];
	overallPercentage:number,
	mcqPercentage:number,
	mcqCorrect:number,
	mcqTotal:number,
	problemSolvingPercentage:number,
	problemSolvingCorrect:number,
	problemSolvingTotal:number,
	userAnswers: Record<number, string>;
	setShowDetailedFeedback: (show: boolean) => void;

}

export const DetailedFeedbackView = ({
	questions,
	userAnswers,
	overallPercentage,
	mcqPercentage,
	mcqCorrect,
	mcqTotal,
	problemSolvingPercentage,
	problemSolvingCorrect,
	problemSolvingTotal,
	setShowDetailedFeedback,
}: DetailedFeedbackViewProps) => {
	// Calculate performance metrics
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			className="space-y-6"
		>
			{/* Header */}
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
				<h1 className="font-['Nunito'] font-black text-[#1d1d20] text-2xl sm:text-3xl md:text-4xl">
					Detailed Feedback
				</h1>
				<Button
					onClick={() => setShowDetailedFeedback(false)}
					className="flex items-center gap-2 bg-white/50 hover:bg-white/90 text-[#1d1d20] border border-white/30 rounded-md px-4 py-2"
				>
					<ArrowLeftIcon className="h-4 w-4" />
					<span className="text-sm font-medium">Back to Summary</span>
				</Button>
			</div>

			{/* Performance Analysis Section */}
			<DetailedPerformanceSection
				overallPercentage={overallPercentage}
				mcqPercentage={mcqPercentage}
				mcqCorrect={mcqCorrect}
				mcqTotal={mcqTotal}
				problemSolvingPercentage={problemSolvingPercentage}
				problemSolvingCorrect={problemSolvingCorrect}
				problemSolvingTotal={problemSolvingTotal}
			/>

			{/* Questions Feedback */}
			<DetailedQuestionsFeedback
				questions={questions}
				userAnswers={userAnswers}
			/>
		</motion.div>
	);
};
