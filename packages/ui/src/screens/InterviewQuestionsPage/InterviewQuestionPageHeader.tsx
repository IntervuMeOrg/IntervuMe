import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { useLocation } from "react-router-dom";
import { SidebarToogleButton } from "./SidebarToogleButton";
import { CheckCircleIcon, TimerIcon, XIcon } from "lucide-react";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";

type InterviewQuestionsPageHeaderProps = {
	questions: (MCQQuestion | ProblemSolvingQuestion)[];

	currentQuestionIndex: number;
	setExitConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
	sidebarVisible: boolean;
	setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
	userAnswers: Record<number, string>;
};

export const InterviewQuestionsPageHeader = ({
	questions,
	currentQuestionIndex,
	setExitConfirmation,
	sidebarVisible,
	setSidebarVisible,
	userAnswers,
}: InterviewQuestionsPageHeaderProps) => {
	// State for timer active
	const [timerActive, setTimerActive] = useState(true);
	// Get interview data from navigation state or use default values
	const location = useLocation();
	const [interviewData, setInterviewData] = useState({
		title: location.state?.title || "Frontend Developer Interview",
		totalTime: location.state?.totalTime || 45 * 60, // 45 minutes in seconds
		totalQuestions: questions.length,
		jobDescription: location.state?.jobDescription || "",
	});
	// State for remaining time
	const [remainingTime, setRemainingTime] = useState(interviewData.totalTime);

	// Format time as MM:SS
	const formatTime = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
			.toString()
			.padStart(2, "0")}`;
	};
	// Count answered questions
	const answeredQuestionsCount = Object.keys(userAnswers).filter(
		(key) =>
			userAnswers[parseInt(key)] !== undefined &&
			userAnswers[parseInt(key)] !== ""
	).length;

	// Timer effect
	useEffect(() => {
		if (!timerActive) return;

		const timer = setInterval(() => {
			setRemainingTime((prev: number) => {
				if (prev <= 0) {
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [timerActive]);

	return (
		<motion.header className="sticky top-0 z-[999] w-full h-[8vh]">
			<nav className="w-full h-[8vh] bg-[#1d1d20] shadow-md">
				<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
				<div className="relative h-full flex items-center justify-between px-[3vw]">
					<div className="flex justify-between items-center w-full">
						{/* Title and progress */}
						<div>
							<h1 className="font-['Nunito',Helvetica] font-bold text-[#E8EEF2] text-[1.2rem] tracking-[0] leading-tight">
								{interviewData.title}
								<p className="font-normal text-[0.8rem] mr-2">
									Progress: {currentQuestionIndex + 1}/
									{interviewData.totalQuestions}
								</p>
							</h1>
						</div>
						{/* Timer, Solved, Exit button */}
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2 px-3 py-1 rounded-md shadow-sm">
								<TimerIcon className="h-4 w-4 text-[#E8EEF2]" />
								<span className="font-['Nunito',Helvetica] font-semibold text-[#E8EEF2]">
									{formatTime(remainingTime)}
								</span>
							</div>
							<div className="flex items-center gap-2 px-3 py-1 rounded-md shadow-sm">
								<CheckCircleIcon className="h-4 w-4 text-green-500" />
								<span className="font-['Nunito',Helvetica] font-semibold text-[#E8EEF2]">
									{answeredQuestionsCount}/{interviewData.totalQuestions} Solved
								</span>
							</div>
							<Button
								onClick={() => setExitConfirmation(true)}
								className="h-8 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow-md flex items-center gap-1 transition-all duration-200"
							>
								<XIcon className="h-4 w-4" />
								<span>Exit</span>
							</Button>
						</div>
					</div>
				</div>
			</nav>
			{/* Sidebar toggle button */}
			<SidebarToogleButton
				sidebarVisible={sidebarVisible}
				setSidebarVisible={setSidebarVisible}
			/>
		</motion.header>
	);
};
