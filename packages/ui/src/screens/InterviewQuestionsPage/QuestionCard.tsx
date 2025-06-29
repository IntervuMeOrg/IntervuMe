import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { QuestionContentMCQ } from "./QuestionContentMCQ";
import { QuestionContentProblemSolving } from "./QuestionContentProblemSolving";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";

type QuestionCardProps = {
	currentQuestionIndex: number;
	questions: (MCQQuestion | ProblemSolvingQuestion)[];
	userAnswers: Record<string, string>;
	setUserAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export const QuestionCard = ({
	currentQuestionIndex,
	questions,
	userAnswers,
	setUserAnswers,
}: QuestionCardProps) => {
	const currentQuestion = questions[currentQuestionIndex];
	const isProblemSolving = currentQuestion.type === "problem_solving";
	const isMCQ = currentQuestion.type === "mcq";

	const cardRef = useRef<HTMLDivElement>(null);

	// Auto-scroll to top when question index changes
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "auto" });
		if (currentQuestion.type === "mcq")
			cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });

	}, [currentQuestionIndex, currentQuestion.type]);
	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				type: "spring" as "spring",
				stiffness: 100,
				damping: 15,
			},
		},
	};

	return (
		<motion.div
			ref={cardRef}
			key={currentQuestionIndex}
			initial="hidden"
			animate="visible"
			variants={cardVariants}
			className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
		>
			<Card className="bg-[#E8EEF2] shadow-xl border-0 overflow-hidden">
				<CardContent
					className={`p-4 sm:p-6 lg:p-8 ${
						currentQuestion.type === "problem_solving" ? "lg:pt-10" : ""
					}`}
				>
					{/* Header Section */}
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
						<div className="flex-1">
							{!isProblemSolving && (
								<>
									<h2 className="font-['Nunito'] font-bold text-xl sm:text-2xl lg:text-3xl text-[#1d1d20]">
										Question {currentQuestionIndex + 1}
									</h2>
									<p className="text-sm sm:text-base text-gray-600 mt-1">
										Multiple Choice Question
									</p>
								</>
							)}
						</div>

						{!isProblemSolving && (
							<div className="self-start sm:self-auto">
								<span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-[#0667D0] text-white">
									{currentQuestion.points} points
								</span>
							</div>
						)}
					</div>

					{/* Question Content Container */}
					<div
						className={`${
							isProblemSolving
								? "min-h-[500px] lg:min-h-[600px]"
								: "min-h-[350px] sm:min-h-[350px]"
						}`}
					>
						{isMCQ ? (
							<QuestionContentMCQ
								questions={
									questions.filter((q) => q.type === "mcq") as MCQQuestion[]
								}
								userAnswers={userAnswers}
								setUserAnswers={setUserAnswers}
								currentQuestionIndex={currentQuestionIndex}
							/>
						) : (
							<QuestionContentProblemSolving
								questions={questions as ProblemSolvingQuestion[]}
								userAnswers={userAnswers}
								setUserAnswers={setUserAnswers}
								currentQuestionIndex={currentQuestionIndex}
							/>
						)}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};
