import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { useParams } from "react-router-dom";
import { SidebarToogleButton } from "./SidebarToogleButton";
import { CheckCircleIcon, TimerIcon, XIcon } from "lucide-react";
import { McqQuestion, CodingQuestion } from "../../types/questions";
import { isNil } from "../../lib/utils";
import { useInterviewWithQuestions } from "../../lib/interview/interview-hooks";

type InterviewQuestionsPageHeaderProps = {
  questions: (McqQuestion | CodingQuestion)[];
  setCancelConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarVisible: boolean;
  setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  userAnswers: Record<string, string>;
};

export const InterviewQuestionsPageHeader = ({
  questions,
  setCancelConfirmation,
  sidebarVisible,
  setSidebarVisible,
  userAnswers,
}: InterviewQuestionsPageHeaderProps) => {
  const [timerActive] = useState(true);
  const params = useParams<{ id: string }>();
  const interviewId = params.id || "";
  const { data: interviewWithQuestions } = useInterviewWithQuestions(interviewId);
  
  // Calculate interview data from API response
  const interviewData = {
    title: (interviewWithQuestions?.jobTitle) || "Technical Interview",
    startTime: interviewWithQuestions?.startTime,
    totalQuestions: questions.length,
    timeLimit: interviewWithQuestions?.timeLimit,
  };
  
  const [remainingTime, setRemainingTime] = useState(0);

  // Calculate remaining time based on start time and time limit
  const calculateRemainingTime = useCallback(() => {
    if (!interviewData.startTime || !interviewData.timeLimit) {
      return (interviewData.timeLimit || 60) * 60; // Default to time limit in minutes or 1 hour, convert to seconds
    }

    const startTime = new Date(interviewData.startTime).getTime();
    const currentTime = new Date().getTime();
    const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
    const timeLimitInSeconds = interviewData.timeLimit * 60; // Convert minutes to seconds
    const remaining = Math.max(0, timeLimitInSeconds - elapsedSeconds);
    
    return remaining;
  }, [interviewData.startTime, interviewData.timeLimit]);

  // Update remaining time when interview data changes
  useEffect(() => {
    const remaining = calculateRemainingTime();
    setRemainingTime(remaining);
  }, [calculateRemainingTime]);

  // Format time as HH:MM:SS or MM:SS depending on duration
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
    
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Check if interview has started
  const hasInterviewStarted = () => {
    if (!interviewData.startTime) return true; // Assume started if no start time
    return new Date(interviewData.startTime).getTime() <= new Date().getTime();
  };

  // Get timer display text and color
  const getTimerDisplay = () => {
    if (!hasInterviewStarted()) {
      return {
        text: "Not Started",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10"
      };
    }
    
    if (remainingTime <= 0) {
      return {
        text: "Time Up",
        color: "text-red-400", 
        bgColor: "bg-red-500/10"
      };
    }
    
    if (remainingTime <= 300) { // Last 5 minutes
      return {
        text: formatTime(remainingTime),
        color: "text-red-400",
        bgColor: "bg-red-500/10"
      };
    }
    
    if (remainingTime <= 600) { // Last 10 minutes
      return {
        text: formatTime(remainingTime),
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10"
      };
    }
    
    return {
      text: formatTime(remainingTime),
      color: "text-[#E8EEF2]",
      bgColor: "bg-white/5"
    };
  };

  // Count answered questions - both MCQ and coding
  const answeredQuestionsCount = questions.reduce((count, question) => {
    if (question.type === "mcq") {
      // For MCQ, check if there's an answer in userAnswers
      return count + (userAnswers[question.id] ? 1 : 0);
    } else {
      // For coding questions, check if there's any submission
      const hasSubmission = interviewWithQuestions?.codeSubmissions?.some(
        sub => sub.questionId === question.id
      );
      return count + (hasSubmission ? 1 : 0);
    }
  }, 0);

  // Timer effect - recalculate remaining time every second
  useEffect(() => {
    if (!timerActive) return;

    const timer = setInterval(() => {
      const remaining = calculateRemainingTime();
      setRemainingTime(remaining);
      
      // Stop timer if time is up
      if (remaining <= 0) {
        // Could add interview auto-submission logic here
        console.log("Interview time expired");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, calculateRemainingTime]);

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
                </div>
              </div>

              {/* Desktop view - Status indicators and Exit */}
              <div className="hidden sm:flex items-center gap-2 lg:gap-4">
                {/* Timer */}
                {(() => {
                  const timerDisplay = getTimerDisplay();
                  return (
                    <div className={`flex items-center gap-1.5 px-2 lg:px-3 py-1 rounded-md ${timerDisplay.bgColor}`}>
                      <TimerIcon className={`h-3.5 w-3.5 ${timerDisplay.color}`} />
                      <span className={`font-['Nunito'] font-semibold text-xs lg:text-sm ${timerDisplay.color}`}>
                        {timerDisplay.text}
                      </span>
                    </div>
                  );
                })()}

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
                  onClick={() => setCancelConfirmation(true)}
                  className="h-7 lg:h-8 bg-red-500 hover:bg-red-600 text-white px-3 lg:px-4 rounded-full 
                           shadow-md flex items-center gap-1 transition-all duration-200 text-xs lg:text-sm"
                >
                  <XIcon className="h-3.5 w-3.5" />
                  <span>Cancel</span>
                </Button>
              </div>

              {/* Mobile view - Compact status */}
              <div className="flex sm:hidden md:hidden overflow-hidden items-center gap-2">
                {/* Timer - Mobile */}
                {(() => {
                  const timerDisplay = getTimerDisplay();
                  return (
                    <div className={`flex items-center gap-1 ${timerDisplay.color}`}>
                      <TimerIcon className={`h-3.5 w-3.5 ${timerDisplay.color}`} />
                      <span className={`font-['Nunito'] font-semibold text-xs ${timerDisplay.color}`}>
                        {timerDisplay.text}
                      </span>
                    </div>
                  );
                })()}

                {/* Solved counter - Mobile */}
                <div className="flex items-center gap-1 text-[#E8EEF2]">
                  <CheckCircleIcon className="h-3.5 w-3.5 text-green-500" />
                  <span className="font-['Nunito'] font-semibold text-xs">
                    {answeredQuestionsCount}/{interviewData.totalQuestions}
                  </span>
                </div>

                {/* Exit button - Mobile */}
                <Button
                  onClick={() => setCancelConfirmation(true)}
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