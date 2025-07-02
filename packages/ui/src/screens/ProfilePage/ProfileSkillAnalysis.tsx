import { motion } from "framer-motion";
import { PieChartIcon } from "lucide-react";

type InterviewStats = {
  totalInterviews: number;
  averageScore: number;
  totalHours: number;
  skillsImproved: number;
  topPerformingSkill: string;
  lowestPerformingSkill: string;
};

type ProfileSkillAnalysisProps = {
  interviewStats: InterviewStats;
};

export const ProfileSkillAnalysis = ({ interviewStats }: ProfileSkillAnalysisProps) => {
  const skillMetrics = [
    { label: "Technical Skills", percentage: 92, color: "bg-[#0667D0]", delay: 0.4 },
    { label: "Problem Solving", percentage: 85, color: "bg-[#0667D0]", delay: 0.5 },
    { label: "Communication", percentage: 78, color: "bg-[#0667D0]", delay: 0.6 },
    { label: "System Design", percentage: 65, color: "bg-[#0667D0]", delay: 0.7 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="bg-[#1d1d20] rounded-lg p-4 sm:p-5 3xl:p-6 shadow-lg relative overflow-hidden group h-full flex flex-col"
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 } 
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 3xl:mb-8">
          <PieChartIcon className="h-4 w-4 sm:h-5 sm:w-5 3xl:w-6 3xl:h-6 text-[#e8eef2] flex-shrink-0" />
          <h3 className="font-['Nunito'] font-bold text-[#e8eef2] text-base sm:text-lg md:text-xl 3xl:text-2xl">
            Skill Analysis
          </h3>
        </div>
        
        {/* Skill Metrics - Takes up available space */}
        <div className="space-y-3 sm:space-y-4 3xl:space-y-5 flex-grow">
          {skillMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: metric.delay }}
            >
              {/* Label and percentage */}
              <div className="flex justify-between items-center mb-1 sm:mb-2 3xl:mb-3">
                <span className="text-xs sm:text-sm md:text-base 3xl:text-lg font-medium text-[#e8eef2]">
                  {metric.label}
                </span>
                <span className="text-xs sm:text-sm md:text-base 3xl:text-lg font-bold text-[#e8eef2]">
                  {metric.percentage}%
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-white/20 rounded-full h-2 sm:h-2.5 3xl:h-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${metric.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{
                    delay: metric.delay + 0.1,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className={`${metric.color} h-full rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Insights - Fixed at bottom */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 3xl:pt-8 border-t border-white/20">
          <h4 className="font-['Nunito'] font-semibold text-[#e8eef2] text-sm sm:text-base 3xl:text-lg mb-3">
            Key Insights
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm 3xl:text-lg">
              <span className="text-[#e8eef2]/80">Strongest Area:</span>
              <span className="text-green-400 font-medium">{interviewStats.topPerformingSkill}</span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm 3xl:text-lg">
              <span className="text-[#e8eef2]/80">Focus Area:</span>
              <span className="text-orange-400 font-medium">{interviewStats.lowestPerformingSkill}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};