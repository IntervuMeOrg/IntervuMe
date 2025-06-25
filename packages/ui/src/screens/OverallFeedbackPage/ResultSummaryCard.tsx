import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { useLocation } from "react-router-dom";
import { AwardIcon, FileTextIcon } from "lucide-react";
import { ResultSummaryScore } from "./ResultSummaryScore";
import { PerformanceBreakdown } from "./PerformanceBreakdown";
import { ResultSummaryQuestionSolved } from "./ResultSummaryQuestionSolved";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";

type ResultSummaryCardProbs = {
	questions: (MCQQuestion | ProblemSolvingQuestion)[];
	userAnswers: Record<string, string>;
	setShowDetailedFeedback: (show: boolean) => void;
};

export const ResultSummaryCard = ({
	questions,
	userAnswers,
	setShowDetailedFeedback,
}: ResultSummaryCardProbs) => {
	// Get location state from navigation
	const location = useLocation();
	// Mock interview data (in a real app, this would come from the previous page)
	const [interviewData, setInterviewData] = useState({
		title: location.state?.title || "Frontend Developer Interview",
		totalTime: location.state?.totalTime || 45 * 60, // 45 minutes in seconds
		timeSpent: location.state?.timeSpent || 38 * 60 + 45, // 38 minutes and 45 seconds
		remainingTime: location.state?.remainingTime || 6 * 60 + 15, // 6 minutes and 15 seconds
		totalQuestions: 10,
		solvedQuestions: 8,
		totalPoints: 150,
		earnedPoints: 115,
		jobDescription: location.state?.jobDescription || "",
	});

	// Calculate performance metrics
	const correctAnswers = questions.filter((q) => {
		if (q.type === "mcq") {
			return userAnswers[q.id] === q.correctOptionId;
		}
		return userAnswers[q.id] !== undefined; // For problem solving, we'll assume it's correct if answered
	}).length;

	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 30 },
				visible: {
					opacity: 1,
					y: 0,
					transition: {
						duration: 0.6,
						type: "spring",
						stiffness: 80,
					},
				},
			}}
		>
			<Card className="w-full overflow-hidden shadow-lg border-0">
				<CardContent className="p-0">
					<div className="bg-gradient-to-r from-[#0667D0] to-[#054E9D] p-6 text-white">
						<div className="flex justify-between items-center">
							<h2 className="text-2xl  font-['Nunito',Helvetica] font-bold">
								{interviewData.title} - Results
							</h2>
							<div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
								<AwardIcon className="h-5 w-5" />
								<span className="font-['Nunito',Helvetica] font-semibold">
									Score:{" "}
									{Math.round(
										(interviewData.earnedPoints / interviewData.totalPoints) *
											100
									)}
									%
								</span>
							</div>
						</div>
						<p className=" font-['Nunito',Helvetica] mt-2 opacity-90">
							You've completed the {interviewData.title}. Here's your
							performance summary.
						</p>
					</div>

					<div className="font-['Nunito',Helvetica] p-6">
						<motion.div
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
							variants={{
								hidden: {},
								visible: {
									transition: {
										staggerChildren: 0.12,
									},
								},
							}}
							initial="hidden"
							animate="visible"
						>
							{/* Question Solved */}
							<ResultSummaryQuestionSolved interviewData={interviewData} />

							{/* Score */}
							<ResultSummaryScore interviewData={interviewData} />
							{/* ...other cards if any... */}
						</motion.div>

						{/* Performance Breakdown */}
						<PerformanceBreakdown
							questions={questions}
							userAnswers={userAnswers}
						/>

						{/* Overall Feedback */}
						<div className="mt-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
							<h3 className="text-lg font-semibold mb-4">Overall Feedback</h3>
							<p className="text-gray-700 mb-4">
								{correctAnswers === questions.length
									? "Excellent performance! You've demonstrated a strong understanding of the concepts tested in this interview."
									: correctAnswers > questions.length * 0.7
									? "Great job! You've shown good knowledge in most areas. Review the questions you missed to further improve."
									: correctAnswers > questions.length * 0.5
									? "Good effort! You've passed this interview but there's room for improvement. Focus on the areas where you struggled."
									: "You need more practice in the areas covered by this interview. Review the detailed feedback to identify your weak points."}
							</p>
							<div className="flex justify-center mt-6">
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setShowDetailedFeedback(true)}
									className="bg-[#0667D0] hover:bg-[#054E9D] text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg"
								>
									<FileTextIcon className="h-5 w-5" />
									<span className="font-semibold">View Detailed Feedback</span>
								</motion.button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};
