import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon, BarChart4Icon } from "lucide-react";

type interviewHistory = {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  score: number;
  questions: number;
  skills: string[];
};

type HistoryStatsOverviewProps = {
  interviewHistory: interviewHistory[];
};

export const HistoryStatsOverview = ({
  interviewHistory,
}: HistoryStatsOverviewProps) => {
  // Calculate total practice time from duration strings
  const calculateTotalTime = () => {
    const totalMinutes = interviewHistory.reduce((acc, interview) => {
      const minutes = parseInt(interview.duration.split(' ')[0]);
      return acc + minutes;
    }, 0);
    
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    
    if (hours > 0) {
      return `${hours}.${Math.round((remainingMinutes / 60) * 10)} hrs`;
    }
    return `${totalMinutes} min`;
  };

  const stats = [
    {
      icon: <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />,
      title: "Total Interviews",
      value: interviewHistory.length.toString(),
      subtitle: "Last 30 days",
      delay: 0.2,
    },
    {
      icon: <BarChart4Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />,
      title: "Average Score",
      value: `${Math.round(
        interviewHistory.reduce((acc, interview) => acc + interview.score, 0) /
          interviewHistory.length
      )}%`,
      subtitle: "Across all interviews",
      delay: 0.3,
    },
    {
      icon: <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />,
      title: "Total Practice Time",
      value: calculateTotalTime(),
      subtitle: "Across all sessions",
      delay: 0.4,
    },
  ];

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
              <p className="font-['Nunito'] text-[#e8eef2] text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                {stat.value}
              </p>
              
              {/* Subtitle */}
              <p className="font-['Nunito'] text-[#e8eef2] text-xs sm:text-sm opacity-70">
                {stat.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};