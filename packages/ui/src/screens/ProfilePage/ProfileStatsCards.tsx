import { motion } from "framer-motion";
import { 
  CalendarIcon, 
  BarChart4Icon, 
  ClockIcon, 
  TrendingUpIcon,
  AwardIcon,
  AlertTriangleIcon
} from "lucide-react";
import { useCurrentUser } from "../../lib/authentication/authentication-hooks";
import { useInterviewHistory, useUserPracticeAnalytics } from "../../lib/History/interview-history-hooks";

export const ProfileStatsCards = () => {
  const user = useCurrentUser();
  
  const {
    data: interviewHistory,
    isLoading: isLoadingHistory,
    error: errorHistory,
  } = useInterviewHistory(user.data?.id as string);

  const {
    data: analyticsData,
    isLoading: isLoadingAnalytics,
    error: errorAnalytics,
  } = useUserPracticeAnalytics(user.data?.id as string);

  // Helper function to format practice time
  const formatPracticeTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return hours;
  };


  // Helper function to format days active
    const formatDaysActive = (days: number) => {
      if (days === 0) return "Start today";
      if (days === 1) return "1 day active";
      if (days < 7) return `${days} days active`;
      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;
      if (weeks === 1) {
        return remainingDays > 0 ? `1 week, ${remainingDays} days` : "1 week";
      }
      return remainingDays > 0 ? `${weeks} weeks, ${remainingDays} days` : `${weeks} weeks`;
    };

  // Combine data from both sources
  const getStatsData = () => {
    const totalInterviews = analyticsData?.data.totalInterviews || interviewHistory?.totalInterviews || 0;
    const averageScore = analyticsData?.data.overallAverage || interviewHistory?.averageScore || 0;
    const totalHours = interviewHistory?.totalPracticeTime ? formatPracticeTime(interviewHistory.totalPracticeTime) : 0;
    const topPerformingSkill = interviewHistory?.bestSkill || "N/A";
    const lowestPerformingSkill = interviewHistory?.skillNeedsFocus || "N/A";

    return {
      totalInterviews,
      averageScore: Math.round(averageScore),
      totalHours,
      topPerformingSkill,
      lowestPerformingSkill,
    };
  };

  const statsData = getStatsData();

  const stats = [
    {
      icon: <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 3xl:w-7 3xl:h-7 text-[#e8eef2] flex-shrink-0" />,
      title: "Total Interviews",
      value: statsData.totalInterviews,
      subtitle: "Completed sessions",
      delay: 0.2,
    },
    {
      icon: <BarChart4Icon className="h-4 w-4 sm:h-5 sm:w-5 3xl:w-7 3xl:h-7 text-[#e8eef2] flex-shrink-0" />,
      title: "Average Score",
      value: `${statsData.averageScore}%`,
      subtitle: "Overall performance",
      delay: 0.3,
    },
    {
      icon: <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 3xl:w-7 3xl:h-7 text-[#e8eef2] flex-shrink-0" />,
      title: "Practice Time",
      value: `${statsData.totalHours} hrs`,
      subtitle: "Total time invested",
      delay: 0.4,
    },
    {
      icon: <TrendingUpIcon className="h-4 w-4 sm:h-5 sm:w-5 3xl:w-7 3xl:h-7 text-[#e8eef2] flex-shrink-0" />,
      title: "Days Active",
      value: analyticsData?.success 
        ? analyticsData.data.totalDays.toString() 
        : "0",
      subtitle: interviewHistory?.bestSkill 
        ? `Best: ${interviewHistory.bestSkill}` 
        : (interviewHistory?.skillNeedsFocus ? `Focus: ${interviewHistory.skillNeedsFocus}` : "No data yet"),
      delay: 0.3,
    },
    {
      icon: <AwardIcon className="h-4 w-4 sm:h-5 sm:w-5 3xl:w-7 3xl:h-7 text-[#e8eef2] flex-shrink-0" />,
      title: "Top Skill",
      value: statsData.topPerformingSkill,
      subtitle: "Best performing area",
      delay: 0.6,
    },
    {
      icon: <AlertTriangleIcon className="h-4 w-4 sm:h-5 sm:w-5 3xl:w-7 3xl:h-7 text-[#e8eef2] flex-shrink-0" />,
      title: "Focus Area",
      value: statsData.lowestPerformingSkill,
      subtitle: "Needs improvement",
      delay: 0.7,
    },
  ];

  // Loading state
  if (isLoadingHistory || isLoadingAnalytics) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 3xl:gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-[#1d1d20] rounded-lg p-4 sm:p-5 3xl:p-6 shadow-lg h-[120px] animate-pulse"
          >
            <div className="h-4 bg-white/10 rounded mb-3"></div>
            <div className="h-6 bg-white/10 rounded mb-2"></div>
            <div className="h-3 bg-white/10 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (errorHistory || errorAnalytics) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-4">Failed to load profile statistics</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 3xl:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: stat.delay }}
          className="bg-[#1d1d20] rounded-lg p-4 sm:p-5 3xl:p-6 shadow-lg relative overflow-hidden group h-full"
          whileHover={{ 
            y: -5, 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: { duration: 0.2 } 
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
          
          <div className="relative z-10 h-full flex flex-col">
            {/* Header with icon and title */}
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 3xl:mb-4">
              {stat.icon}
              <h3 className="font-['Nunito'] font-bold text-[#e8eef2] text-sm sm:text-base 3xl:text-[1.35rem] leading-tight">
                {stat.title}
              </h3>
            </div>
            
            {/* Value */}
            <p className="font-['Nunito'] text-[#e8eef2] text-lg sm:text-xl md:text-2xl 3xl:text-3xl font-bold mb-2 flex-grow flex items-center">
              {stat.value}
            </p>
            
            {/* Subtitle */}
            <p className="font-['Nunito'] text-[#e8eef2] text-xs sm:text-sm 3xl:text-lg opacity-70">
              {stat.subtitle}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};