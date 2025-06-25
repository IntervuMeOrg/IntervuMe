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
	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				type: "spring" as const,
				stiffness: 100,
				damping: 15,
			},
		},
	};
	return (
		<div className="flex justify-between items-center">
			<motion.div
				key={currentQuestionIndex}
				initial="hidden"
				animate="visible"
				variants={cardVariants}
				className="w-full mx-auto"
			>
				<Card
					className={`bg-[#E8EEF2] shadow-lg border-0 overflow-hidden ${
						questions[currentQuestionIndex].type === "problem_solving"
							? "h-[calc(120vh-150px)] w-full"
							: ""
					}`}
				>
					<CardContent className="p-6 flex flex-col h-full">
						<div className="flex justify-between items-start mb-4">
							<div>
								<h2 className="font-['Nunito',Helvetica] font-bold text-[1.5rem] text-[#1d1d20]">
									{questions[currentQuestionIndex].type === "problem_solving"
										? ""
										: `Question ${currentQuestionIndex + 1}`}
								</h2>
								<p className="text-sm text-gray-500">
									{questions[currentQuestionIndex].type === "mcq"
										? "Multiple Choice Question"
										: ""}
								</p>
							</div>
							<div className="bg-[#0667D0] text-white px-3 py-1 rounded-full text-sm font-semibold">
								{questions[currentQuestionIndex].type === "problem_solving"
									? ""
									: questions[currentQuestionIndex].points + " points"}
							</div>
						</div>

						{/* Question Content - MCQ or Problem Solving */}
						{questions[currentQuestionIndex].type === "mcq" ? (
							<QuestionContentMCQ
								questions={questions as MCQQuestion[]}
								userAnswers={userAnswers}
								setUserAnswers={setUserAnswers}
								currentQuestionIndex={currentQuestionIndex}
							/>
						) : (
							<>
								{/* Problem Solving Question Content */}
								<QuestionContentProblemSolving
									questions={questions as ProblemSolvingQuestion[]}
									userAnswers={userAnswers}
									setUserAnswers={setUserAnswers}
									currentQuestionIndex={currentQuestionIndex}
								/>
							</>
						)}
						{/* Removed navigation buttons from card */}
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
};
