import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon, BarChart4Icon } from "lucide-react";
import type { InterviewHistoryResponse } from "../../lib/History/interview-history-api";

type HistoryStatsOverviewProps = {
  interviewHistory: InterviewHistoryResponse;
};

export const HistoryStatsOverview = ({
  interviewHistory,
}: HistoryStatsOverviewProps) => {
  if (!interviewHistory) {
    return (
      <div className="w-full mb-8 sm:mb-10 md:mb-12 text-center text-gray-400">
        No interview history found.
      </div>
    );
  }

  // Helper function to check if a value is valid
  const isValidValue = (value: any): boolean => {
    return value !== null && value !== undefined && !isNaN(value) && value !== '';
  };

  // Helper function to format practice time
  const formatPracticeTime = (totalMinutes: number): string => {
    if (!isValidValue(totalMinutes)){
      return "N/A";
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  // Helper function to format average score
  const formatAverageScore = (score: number): string => {
    if (!isValidValue(score)) {
      return "N/A";
    }
    return `${Math.round(score)}%`;
  };

  // Helper function to format total interviews
  const formatTotalInterviews = (total: number): string => {
    if (!isValidValue(total)) {
      return "N/A";
    }
    return total.toString();
  };

  const stats = [
    {
      icon: <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />,
      title: "Total Interviews",
      value: formatTotalInterviews(interviewHistory.totalInterviews),
      subtitle: "All time",
      delay: 0.2,
      hasData: isValidValue(interviewHistory.totalInterviews),
    },
    {
      icon: <BarChart4Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />,
      title: "Average Score",
      value: formatAverageScore(interviewHistory.averageScore as number),
      subtitle: "Across all interviews",
      delay: 0.3,
      hasData: isValidValue(interviewHistory.averageScore),
    },
    {
      icon: <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />,
      title: "Total Practice Time",
      value: formatPracticeTime(interviewHistory.totalPracticeTime),
      subtitle: "Across all sessions",
      delay: 0.4,
      hasData: isValidValue(interviewHistory.totalPracticeTime),
    },
  ];
  console.log("SSS",interviewHistory)

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 15,
        mass: 0.5,
        delay: 0.1,
      }}
      className="w-full mb-8 sm:mb-10 md:mb-12"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: stat.delay }}
            className="bg-[#1d1d20] rounded-lg p-4 sm:p-5 md:p-6 shadow-lg relative overflow-hidden group"
            whileHover={{ 
              y: -5, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2 } 
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              {/* Header with icon and title */}
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                {stat.icon}
                <h3 className="font-['Nunito'] font-bold text-[#e8eef2] text-sm sm:text-base md:text-lg lg:text-xl leading-tight">
                  {stat.title}
                </h3>
              </div>
              
              {/* Value */}
              <p className={`font-['Nunito'] text-xl sm:text-2xl md:text-3xl font-bold mb-2 ${
                stat.hasData ? 'text-[#e8eef2]' : 'text-[#e8eef2]'
              }`}>
                {stat.value}
              </p>
              
              {/* Subtitle */}
              <p className="font-['Nunito'] text-[#e8eef2] text-xs sm:text-sm opacity-70">
                {stat.hasData ? stat.subtitle : "Data not available"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};