import { motion } from "framer-motion";
import { Progress } from "../../components/ui/progress";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";

type PerformanceBreakdownProbs = {
	questions: (MCQQuestion | ProblemSolvingQuestion)[];
	userAnswers: Record<string, string>;
};

export const PerformanceBreakdown = ({
	questions,
	userAnswers,
}: PerformanceBreakdownProbs) => {
	// Calculate category performance
	const categoryPerformance = {
		mcq: {
			total: questions.filter((q) => q.type === "mcq").length,
			correct: questions.filter(
				(q) =>
					q.type === "mcq" &&
					userAnswers[q.id] === (q as MCQQuestion).correctOptionId
			).length,
		},
		problemSolving: {
			total: questions.filter((q) => q.type === "problem_solving").length,
			correct: questions.filter(
				(q) => q.type === "problem_solving" && userAnswers[q.id] !== undefined
			).length,
		},
	};
	return (
		<motion.div
			className="mt-8"
			variants={{
				hidden: { opacity: 0, y: 30 },
				visible: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.6 },
				},
			}}
		>
			<h3 className="text-lg font-semibold mb-4">Performance Breakdown</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* MCQ Performance */}
				<motion.div
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.5 },
						},
					}}
				>
					<div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
						<div className="flex justify-between items-center mb-4">
							<h4 className="font-medium">Multiple Choice Questions</h4>
							<div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">
								{categoryPerformance.mcq.correct}/
								{categoryPerformance.mcq.total} Correct
							</div>
						</div>
						<Progress
							value={
								(categoryPerformance.mcq.correct /
									categoryPerformance.mcq.total) *
								100
							}
							className="h-2 mb-2"
						/>
						<p className="text-sm text-gray-500 mt-2">
							{categoryPerformance.mcq.correct === categoryPerformance.mcq.total
								? "Excellent! You got all MCQ questions correct."
								: categoryPerformance.mcq.correct >
								  categoryPerformance.mcq.total / 2
								? "Good job! You answered most MCQ questions correctly."
								: "You might want to review the MCQ questions you missed."}
						</p>
					</div>
				</motion.div>

				{/* Problem Solving Performance */}
				<motion.div
					variants={{
						hidden: { opacity: 0, y: 30 },
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.5 },
						},
					}}
				>
					<div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
						<div className="flex justify-between items-center mb-4">
							<h4 className="font-medium">Problem Solving Questions</h4>
							<div className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm font-medium">
								{categoryPerformance.problemSolving.correct}/
								{categoryPerformance.problemSolving.total} Completed
							</div>
						</div>
						<Progress
							value={
								(categoryPerformance.problemSolving.correct /
									categoryPerformance.problemSolving.total) *
								100
							}
							className="h-2 mb-2"
						/>
						<p className="text-sm text-gray-500 mt-2">
							{categoryPerformance.problemSolving.correct ===
							categoryPerformance.problemSolving.total
								? "Great work! You completed all coding challenges."
								: categoryPerformance.problemSolving.correct > 0
								? "You've made good progress on the coding challenges."
								: "You should practice more coding challenges."}
						</p>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};
