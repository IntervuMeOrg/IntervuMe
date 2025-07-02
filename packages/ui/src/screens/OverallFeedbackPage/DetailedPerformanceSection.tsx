import { motion } from "framer-motion";
import { BarChart3Icon } from "lucide-react";
import { DetailedPerfomanceMetrics } from "./DetailedPerfomanceMetrics";
import { DetailedPerformanceSkills } from "./DetailedPerformanceSkills";
import { DetailedPerformanceRecommendations } from "./DetailedPerformanceRecommendations";
import { PerformanceMetrics, SkillAssessment, StudyRecommendations } from "../../types/performance";

interface DetailedPerformanceSectionProps {
  performanceMetrics: PerformanceMetrics;
  skillAssessment: SkillAssessment;
  studyRecommendations: StudyRecommendations;
}

export const DetailedPerformanceSection = ({
  performanceMetrics,
  skillAssessment,
  studyRecommendations,
}: DetailedPerformanceSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-[#1d1d20] rounded-lg p-6 sm:p-8 shadow-xl relative overflow-hidden mb-8"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3Icon className="h-6 w-6 text-[#0667D0]" />
          <h2 className="font-['Nunito'] font-bold text-white text-xl sm:text-2xl">
            Performance Analysis
          </h2>
        </div>

        {/* Performance Metrics Grid */}
        <DetailedPerfomanceMetrics performanceMetrics={performanceMetrics} />

        {/* Skill Assessment */}
        <DetailedPerformanceSkills skillAssessment={skillAssessment} />

        {/* Recommendations */}
        <DetailedPerformanceRecommendations studyRecommendations={studyRecommendations} />
      </div>
    </motion.div>
  );
};