import { motion } from "framer-motion";
import { QuestionContentMCQ } from "./QuestionContentMCQ";
import { QuestionContentProblemSolving } from "./QuestionContentProblemSolving";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";

type QuestionContentProps = {
	questions: (MCQQuestion | ProblemSolvingQuestion)[];
	userAnswers: Record<string, string>;
	currentQuestionIndex: number;
};

export const QuestionContent = ({
	questions,
	userAnswers,
	currentQuestionIndex,
}: QuestionContentProps) => {
	// Check if a question is answered
	const isQuestionAnswered = (questionId: number): boolean => {
		return (
			userAnswers[questionId] !== undefined && userAnswers[questionId] !== ""
		);
	};

	// Check if an MCQ answer is correct
	const isMCQAnswerCorrect = (question: MCQQuestion): boolean => {
		return userAnswers[question.id] === question.correctOptionId;
	};
	return (
		<motion.div
			key={currentQuestionIndex}
			initial="hidden"
			animate="visible"
			exit="hidden"
			variants={{
				hidden: { opacity: 0, y: 30 },
				visible: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.5 },
				},
			}}
			className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
		>
			{questions[currentQuestionIndex].type === "mcq" ? (
				// MCQ Question Feedback
				<QuestionContentMCQ
					questions={questions as MCQQuestion[]}
					userAnswers={userAnswers}
					currentQuestionIndex={currentQuestionIndex}
					isMCQAnswerCorrect={isMCQAnswerCorrect}
				/>
			) : (
				// Problem Solving Question Feedback
				<QuestionContentProblemSolving
					questions={questions as ProblemSolvingQuestion[]}
					userAnswers={userAnswers}
					currentQuestionIndex={currentQuestionIndex}
					isQuestionAnswered={isQuestionAnswered}
				/>
			)}
		</motion.div>
	);
};
