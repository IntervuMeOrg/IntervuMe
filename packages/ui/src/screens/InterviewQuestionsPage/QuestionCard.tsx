import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { QuestionContentMCQ } from "./QuestionContentMCQ";
import { QuestionContentCoding } from "./QuestionContentCoding";
import { MCQQuestion, CodingQuestion } from "../../types/questions";

type QuestionCardProps = {
	currentQuestionIndex: number;
	questions: (MCQQuestion | CodingQuestion)[];
	userAnswers: Record<string, string>;
	codeSubmissions?: Record<string, string>;
	setUserAnswers: (questionId: string, selectedOptionId: string) => void;
	setCodeSubmissions?: (questionId: string, code: string) => void;
	onSubmitCode?: (questionId: string, code: string, language: string) => Promise<any>;
	getSubmissionHistory?: (questionId: string) => any[];
	getSubmissionCount?: (questionId: string) => number;
	hasAcceptedSubmission?: (questionId: string) => boolean;
};

export const QuestionCard = ({
	currentQuestionIndex,
	questions,
	userAnswers,
	codeSubmissions = {},
	setUserAnswers,
	setCodeSubmissions,
	onSubmitCode,
	getSubmissionHistory,
	getSubmissionCount,
	hasAcceptedSubmission,
}: QuestionCardProps) => {
	const currentQuestion = questions[currentQuestionIndex];
	const isCoding = currentQuestion.type === "coding";
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
						currentQuestion.type === "coding" ? "lg:pt-10" : ""
					}`}
				>
					{/* Header Section */}
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
						<div className="flex-1">
							{!isCoding && (
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

						{!isCoding && (
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
							isCoding
								? "min-h-[500px] lg:min-h-[600px]"
								: "min-h-[350px] sm:min-h-[350px]"
						}`}
					>
						{isMCQ ? (
							<QuestionContentMCQ
								question={currentQuestion as MCQQuestion}
								userAnswers={userAnswers}
								setUserAnswer={setUserAnswers}
							/>
						) : (
							<QuestionContentCoding
								questions={questions as CodingQuestion[]}
								userAnswers={codeSubmissions}
								setUserAnswers={setCodeSubmissions || (() => {})}
								currentQuestionIndex={currentQuestionIndex}
							/>
						)}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};
