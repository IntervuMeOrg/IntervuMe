import { motion } from "framer-motion";
import type { InterviewHistoryResponse } from "../../lib/History/interview-history-api";
import type { AnalyticsSummaryResponse } from "../../lib/History/interview-history-api";

type DashboardStatsProps = {
  interviewHistory?: InterviewHistoryResponse;
  analyticsSummary?: AnalyticsSummaryResponse;
};

export const DashboardStats = ({ interviewHistory, analyticsSummary }: DashboardStatsProps) => {
  // Helper function to format practice time
  const formatPracticeTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  // Helper function to format improvement trend
  const formatImprovementTrend = (trend?: number) => {
    if (!trend) return "No change";
    const sign = trend > 0 ? "+" : "";
    return `${sign}${trend}% from last month`;
  };

  // Helper function to get the best data source for total interviews
  const getTotalInterviews = () => {
    // Prioritize analytics summary if available, fallback to interview history
    if (analyticsSummary?.success && analyticsSummary.data.totalInterviews !== undefined) {
      return analyticsSummary.data.totalInterviews;
    }
    return interviewHistory?.totalInterviews || 0;
  };

  // Helper function to get the best data source for average score
  const getAverageScore = () => {
    // Prioritize analytics summary if available, fallback to interview history
    if (analyticsSummary?.success && analyticsSummary.data.overallAverage !== undefined) {
      return analyticsSummary.data.overallAverage;
    }
    return interviewHistory?.averageScore;
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

  const stats = [
    {
      title: "Interviews Completed",
      value: getTotalInterviews().toString(),
      subtitle: analyticsSummary?.success 
        ? formatDaysActive(analyticsSummary.data.totalDays)
        : "Keep practicing!", // Fallback subtitle
      delay: 0.1,
    },
    {
      title: "Average Score",
      value: (() => {
        const avgScore = getAverageScore();
        return avgScore ? `${Math.round(avgScore)}%` : "N/A";
      })(),
      subtitle: formatImprovementTrend(interviewHistory?.improvementTrend),
      delay: 0.2,
    },
    {
      title: "Days Active",
      value: analyticsSummary?.success 
        ? analyticsSummary.data.totalDays.toString() 
        : "0",
      subtitle: interviewHistory?.bestSkill 
        ? `Best: ${interviewHistory.bestSkill}` 
        : (interviewHistory?.skillNeedsFocus ? `Focus: ${interviewHistory.skillNeedsFocus}` : "No data yet"),
      delay: 0.3,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 3xl:gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: stat.delay, duration: 0.5 }}
          className="bg-white/10 rounded-lg p-4 sm:p-5 md:p-6 3xl:p-8 backdrop-blur-sm"
        >
          <h3 className="font-['Nunito'] font-bold text-[#e8eef2] text-base sm:text-lg md:text-xl 3xl:text-[1.7rem] mb-2 3xl:mb-4">
            {stat.title}
          </h3>
          <p className="font-['Nunito'] text-[#e8eef2] text-2xl sm:text-3xl 3xl:text-4xl font-bold">
            {stat.value}
          </p>
          <p className="font-['Nunito'] text-[#e8eef2] text-xs sm:text-sm 3xl:text-lg opacity-70 mt-2 3xl:mt-4">
            {stat.subtitle}
          </p>
        </motion.div>
      ))}
    </div>
  );
};