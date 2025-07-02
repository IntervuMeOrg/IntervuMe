import { motion } from "framer-motion";
import { 
  CalendarIcon, 
  BarChart4Icon, 
  ClockIcon, 
  TrendingUpIcon,
  AwardIcon,
  AlertTriangleIcon
} from "lucide-react";

type InterviewStats = {
  totalInterviews: number;
  averageScore: number;
  totalHours: number;
  skillsImproved: number;
  topPerformingSkill: string;
  lowestPerformingSkill: string;
};

type ProfileStatsCardsProps = {
  interviewStats: InterviewStats;
};

export const ProfileStatsCards = ({ interviewStats }: ProfileStatsCardsProps) => {
  const stats = [
    {
      icon: <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 3xl:w-7 3xl:h-7 text-[#e8eef2] flex-shrink-0" />,
      title: "Total Interviews",
      value: interviewStats.totalInterviews.toString(),
      subtitle: "Completed sessions",
      delay: 0.2,
    },
    {
      icon: <BarChart4Icon className="h-4 w-4 sm:h-5 sm:w-5 3xl:w-7 3xl:h-7 text-[#e8eef2] flex-shrink-0" />,
      title: "Average Score",
      value: `${interviewStats.averageScore}%`,
      subtitle: "Overall performance",
      delay: 0.3,
    },
    {
      icon: <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 3xl:w-7 3xl:h-7 text-[#e8eef2] flex-shrink-0" />,
      title: "Practice Time",
      value: `${interviewStats.totalHours} hrs`,
      subtitle: "Total time invested",
      delay: 0.4,
    },
    {
      icon: <TrendingUpIcon className="h-4 w-4 sm:h-5 sm:w-5 3xl:w-7 3xl:h-7 text-[#e8eef2] flex-shrink-0" />,
      title: "Skills Improved",
      value: interviewStats.skillsImproved.toString(),
      subtitle: "Areas of growth",
      delay: 0.5,
    },
    {
      icon: <AwardIcon className="h-4 w-4 sm:h-5 sm:w-5 3xl:w-7 3xl:h-7 text-[#e8eef2] flex-shrink-0" />,
      title: "Top Skill",
      value: interviewStats.topPerformingSkill,
      subtitle: "Best performing area",
      delay: 0.6,
    },
    {
      icon: <AlertTriangleIcon className="h-4 w-4 sm:h-5 sm:w-5 3xl:w-7 3xl:h-7 text-[#e8eef2] flex-shrink-0" />,
      title: "Focus Area",
      value: interviewStats.lowestPerformingSkill,
      subtitle: "Needs improvement",
      delay: 0.7,
    },
  ];

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