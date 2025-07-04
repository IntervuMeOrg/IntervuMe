import { CheckCircleIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { MCQQuestion, CodingQuestion } from "../../types/questions";
import { useEffect, useRef } from "react";

type QuestionListSidebarProps = {
	currentQuestionIndex: number;
	questions: (MCQQuestion | CodingQuestion)[];
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
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Handle clicks outside the sidebar
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarVisible &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setSidebarVisible(false);
			}
		};

		if (sidebarVisible) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [sidebarVisible, setSidebarVisible]);

	// Navigate to specific question
	const goToQuestion = (index: number) => {
		if (index >= 0 && index < questions.length) {
			setCurrentQuestionIndex(index);
			// Close sidebar on mobile after selection
			if (window.innerWidth < 768) {
				setSidebarVisible(false);
			}
		}
	};

	return (
		<>
			{/* Overlay for mobile */}
			{sidebarVisible && (
				<div
					className="fixed inset-0 bg-black/50 z-30 md:hidden"
					onClick={() => setSidebarVisible(false)}
				/>
			)}

			{/* Sidebar */}
			<motion.div
				ref={sidebarRef}
				initial={{ x: "-100%" }}
				animate={{ x: sidebarVisible ? 0 : "-100%" }}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
				className="fixed left-0 top-12 bottom-0 w-[280px] sm:w-[320px] md:w-[350px] 
                   bg-[#1d1d20] shadow-2xl z-40 flex flex-col"
			>
				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />

				{/* Header */}
				<div className="relative bg-[#1d1d20] p-4 border-b border-gray-700">
					<div className="flex justify-between items-center">
						<h2 className="font-['Nunito'] font-bold text-lg text-[#E8EEF2]">
							All Questions
						</h2>
						<Button
							onClick={() => setSidebarVisible(false)}
							variant="ghost"
							size="icon"
							className="h-8 w-8 rounded-full hover:bg-white/10 text-[#E8EEF2]"
						>
							<X className="h-5 w-5" />
						</Button>
					</div>

					{/* Summary */}
					<div className="mt-2 flex items-center gap-4 text-sm text-[#E8EEF2]/70">
						<span>Total: {questions.length}</span>
						<span>
							Answered:{" "}
							{questions.filter((q) => isQuestionAnswered(q.id)).length}
						</span>
					</div>
				</div>

				{/* Questions List */}
				<div className="relative flex-1 overflow-y-auto p-4 space-y-2">
					{questions.map((question, index) => {
						const isActive = currentQuestionIndex === index;
						const isAnswered = isQuestionAnswered(question.id);

						return (
							<motion.div
								key={question.id}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className={`
                  relative p-3 rounded-lg cursor-pointer transition-all duration-200
                  ${
										isActive
											? "bg-gradient-to-r from-[#0667D0] to-[#054E9D] text-white shadow-lg"
											: "bg-white/10 hover:bg-white/20 text-[#E8EEF2]"
									}
                  ${isAnswered ? "ring-2 ring-green-500/50" : ""}
                `}
								onClick={() => goToQuestion(index)}
							>
								{/* Answered indicator */}
								{isAnswered && (
									<div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-green-500 rounded-r-full" />
								)}

								<div className="flex justify-between items-start">
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2">
											<span className="font-['Nunito'] font-semibold text-sm sm:text-base">
												Question {index + 1}
											</span>
											{isAnswered && (
												<CheckCircleIcon className="h-4 w-4 text-green-400 flex-shrink-0" />
											)}
										</div>
										<p className="text-xs sm:text-sm opacity-80 mt-0.5">
											{question.type === "mcq"
												? "Multiple Choice"
												: "Coding"}
										</p>
									</div>

									<span className="text-xs sm:text-sm font-medium ml-2 flex-shrink-0">
										{question.points} pts
									</span>
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* Footer - Quick Stats */}
				<div className="relative p-3 sm:p-4 border-t border-gray-700 bg-[#1d1d20] flex-shrink-0">
					<div className="flex justify-between items-center text-xs sm:text-sm">
						<span className="text-[#E8EEF2]/70">Progress</span>
						<div className="flex items-center gap-2">
							<div className="w-20 sm:w-24 h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
								<div
									className="h-full bg-green-500 transition-all duration-300"
									style={{
										width: `${
											(questions.filter((q) => isQuestionAnswered(q.id))
												.length /
												questions.length) *
											100
										}%`,
									}}
								/>
							</div>
							<span className="text-[#E8EEF2] font-medium">
								{Math.round(
									(questions.filter((q) => isQuestionAnswered(q.id)).length /
										questions.length) *
										100
								)}
								%
							</span>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
};
