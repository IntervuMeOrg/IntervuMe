import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { useLocation } from "react-router-dom";
import { SidebarToogleButton } from "./SidebarToogleButton";
import { CheckCircleIcon, TimerIcon, XIcon } from "lucide-react";
import { MCQQuestion, CodingQuestion } from "../../types/questions";
import { isNil } from "../../lib/utils";

type InterviewQuestionsPageHeaderProps = {
  questions: (MCQQuestion | CodingQuestion)[];
  currentQuestionIndex: number;
  setExitConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarVisible: boolean;
  setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  userAnswers: Record<string, string>;
};

export const InterviewQuestionsPageHeader = ({
  questions,
  currentQuestionIndex,
  setExitConfirmation,
  sidebarVisible,
  setSidebarVisible,
  userAnswers,
}: InterviewQuestionsPageHeaderProps) => {
  const [timerActive] = useState(true);
  const location = useLocation();
  
  const [interviewData] = useState({
    title: location.state?.title,
    totalTime: location.state?.totalTime,
    totalQuestions: questions.length,
    jobDescription: location.state?.jobDescription,
  });
  
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
    (key) => !isNil(userAnswers[key])
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
    <motion.header className="sticky top-0 z-50 w-full">
      <nav className="bg-[#1d1d20] shadow-lg">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
        
        <div className="relative">
          <div className="max-w-7xl 2xl:max-w-full mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
            <div className="h-12 flex items-center justify-between">
              {/* Title and progress */}
              <div className="flex-1 min-w-0 mr-4 flex items-center gap-3">
                <div>
                  <h1 className="font-['Nunito'] font-bold text-[#E8EEF2] text-sm sm:text-base lg:text-xl tracking-tight leading-none truncate">
                    {interviewData.title}
                  </h1>
                  <p className="font-['Nunito'] font-normal text-[#E8EEF2]/80 text-xs leading-none mt-0.2">
                    Progress: {currentQuestionIndex + 1}/{interviewData.totalQuestions}
                  </p>
                </div>
              </div>

              {/* Desktop view - Status indicators and Exit */}
              <div className="hidden sm:flex items-center gap-2 lg:gap-4">
                {/* Timer */}
                <div className="flex items-center gap-1.5 px-2 lg:px-3 py-1 bg-white/5 rounded-md">
                  <TimerIcon className="h-3.5 w-3.5 text-[#E8EEF2]" />
                  <span className="font-['Nunito'] font-semibold text-[#E8EEF2] text-xs lg:text-sm">
                    {formatTime(remainingTime)}
                  </span>
                </div>

                {/* Solved counter */}
                <div className="flex items-center gap-1.5 px-2 lg:px-3 py-1 bg-white/5 rounded-md">
                  <CheckCircleIcon className="h-3.5 w-3.5 text-green-500" />
                  <span className="font-['Nunito'] font-semibold text-[#E8EEF2] text-xs lg:text-sm">
                    {answeredQuestionsCount}/{interviewData.totalQuestions}
                    <span className="hidden lg:inline"> Solved</span>
                  </span>
                </div>

                {/* Exit button */}
                <Button
                  onClick={() => setExitConfirmation(true)}
                  className="h-7 lg:h-8 bg-red-500 hover:bg-red-600 text-white px-3 lg:px-4 rounded-full 
                           shadow-md flex items-center gap-1 transition-all duration-200 text-xs lg:text-sm"
                >
                  <XIcon className="h-3.5 w-3.5" />
                  <span>Exit</span>
                </Button>
              </div>

              {/* Mobile view - Compact status */}
              <div className="flex sm:hidden md:hidden overflow-hidden items-center gap-2">
                {/* Timer - Mobile */}
                <div className="flex items-center gap-1 text-[#E8EEF2]">
                  <TimerIcon className="h-3.5 w-3.5" />
                  <span className="font-['Nunito'] font-semibold text-xs">
                    {formatTime(remainingTime)}
                  </span>
                </div>

                {/* Solved counter - Mobile */}
                <div className="flex items-center gap-1 text-[#E8EEF2]">
                  <CheckCircleIcon className="h-3.5 w-3.5 text-green-500" />
                  <span className="font-['Nunito'] font-semibold text-xs">
                    {answeredQuestionsCount}/{interviewData.totalQuestions}
                  </span>
                </div>

                {/* Exit button - Mobile */}
                <Button
                  onClick={() => setExitConfirmation(true)}
                  className="h-7 bg-red-500 hover:bg-red-600 text-white px-2 rounded-md
                           shadow-md flex items-center gap-0.5 transition-all duration-200"
                >
                  <XIcon className="h-3.5 w-3.5" />
                </Button>
              </div>
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