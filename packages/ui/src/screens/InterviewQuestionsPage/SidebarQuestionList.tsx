import { CheckCircleIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";

type QuestionListSidebarProps = {
	currentQuestionIndex: number;
	questions: (MCQQuestion | ProblemSolvingQuestion)[];
	setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
	sidebarVisible: boolean;
	setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
	isQuestionAnswered: (questionId: number) => boolean;
};

export const QuestionListSidebar = ({
	currentQuestionIndex,
	questions,
	setCurrentQuestionIndex,
	sidebarVisible,
	setSidebarVisible,
	isQuestionAnswered,
}: QuestionListSidebarProps) => {
	// Navigate to specific question
	const goToQuestion = (index: number) => {
		if (index >= 0 && index < questions.length) {
			setCurrentQuestionIndex(index);
		}
	};
	return (
		<motion.div
			initial={{ x: "-100%" }}
			animate={{ x: sidebarVisible ? 0 : "-100%" }}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
			className="fixed left-0 top-[8vh] h-[92vh] w-[350px] bg-[#1d1d20] shadow-lg z-40 overflow-y-auto"
		>
			<div className="absolute h-[1600px] inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18] z-[-1]" />
			<div className="p-4">
				<div className="flex justify-between items-center mb-4">
					<h2 className="font-['Nunito',Helvetica] font-bold text-[1.2rem] text-[#E8EEF2]">
						All Questions
					</h2>
					<Button
						onClick={() => setSidebarVisible(false)}
						className=" p-1 rounded-full"
					>
						{/* <XIcon className="h-5 w-5 text-[#1d1d20]" /> */}
						<motion.img
							src="/sidebar.png"
							alt="Sidebar"
							className="fixed absolute h-5 w-5 mr-3"
						/>
					</Button>
				</div>

				<div className="space-y-2">
					{questions.map((question, index) => (
						<div
							key={question.id}
							className={`p-3 rounded-md cursor-pointer transition-colors ${
								currentQuestionIndex === index
									? "bg-[#0667D0] text-white"
									: "bg-white hover:bg-gray-300 text-[#1d1d20]"
							}
										${isQuestionAnswered(question.id) ? "border-l-4 border-green-500" : ""}`}
							onClick={() => goToQuestion(index)}
						>
							<div className="flex justify-between items-center">
								<span className="font-['Nunito',Helvetica] font-medium">
									Question {index + 1}
								</span>
								<div className="flex items-center gap-2">
									<span className="text-sm">{question.points} pts</span>
									{isQuestionAnswered(question.id) && (
										<CheckCircleIcon className="h-4 w-4 text-green-500" />
									)}
								</div>
							</div>
							<p className="text-sm truncate mt-1">
								{question.type === "mcq"
									? "Multiple Choice"
									: "Problem Solving"}
							</p>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	);
};
