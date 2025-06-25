import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { QuestionContent } from "./QuestionContent";
import { QuestionNavigation } from "./QuestionNavigation";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";

type DetailedFeedbackViewProbs = {
	questions: (MCQQuestion | ProblemSolvingQuestion)[];
	userAnswers: Record<string, string>;
	setShowDetailedFeedback: (show: boolean) => void;
};

export const DetailedFeedbackView = ({
	questions,
	userAnswers,
	setShowDetailedFeedback,
}: DetailedFeedbackViewProbs) => {
	// State for current question index in detailed feedback
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={{
				hidden: {},
				visible: {
					transition: {
						staggerChildren: 0.15,
					},
				},
			}}
			className="space-y-6"
		>
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
								<h2 className="text-2xl font-bold">Detailed Feedback</h2>
								<Button
									onClick={() => setShowDetailedFeedback(false)}
									className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full shadow-md flex items-center gap-1 transition-all duration-200"
								>
									<ChevronLeftIcon className="h-4 w-4" />
									<span>Back to Summary</span>
								</Button>
							</div>
							<p className="mt-2 opacity-90">
								Review each question with correct answers and explanations.
							</p>
						</div>

						<div className="p-6">
							{/* Question Navigation */}
							<QuestionNavigation
								questions={questions}
								currentQuestionIndex={currentQuestionIndex}
								setCurrentQuestionIndex={setCurrentQuestionIndex}
							/>

							{/* Question Content */}
							<QuestionContent
								questions={questions}
								userAnswers={userAnswers}
								currentQuestionIndex={currentQuestionIndex}
							/>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</motion.div>
	);
};
