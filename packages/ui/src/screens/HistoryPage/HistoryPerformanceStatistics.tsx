import { motion } from "framer-motion";
import { HistoryPerformanceBreakdown } from "./HistoryPerformanceBreakdown";
import { HistoryPerformanceOverTimeChart } from "./HistoryPerformanceOverTimeChart";

// Performance data for chart
const performanceData = [
  { date: "Apr 18", score: 88 },
  { date: "Apr 25", score: 81 },
  { date: "May 3", score: 92 },
  { date: "May 10", score: 78 },
  { date: "May 15", score: 85 },
];

export const HistoryPerformanceStatistics = () => {
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
      <h2 className="font-['Nunito'] font-bold text-[#1d1d20] text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6">
        Performance Statistics
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Performance Over Time Chart */}
        <HistoryPerformanceOverTimeChart performanceData={performanceData} />
        
        {/* Performance Breakdown */}
        <HistoryPerformanceBreakdown />
      </div>
    </motion.section>
  );
};