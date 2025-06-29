import { motion } from "framer-motion";
import { LineChartIcon } from "lucide-react";

type PerformanceData = {
  date: string;
  score: number;
};

type ProfilePerformanceChartProps = {
  performanceData: PerformanceData[];
};

export const ProfilePerformanceChart = ({
  performanceData,
}: ProfilePerformanceChartProps) => {
  // Y-axis labels for the chart
  const yAxisLabels = ["100%", "75%", "50%", "25%", "0%"];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="bg-[#1d1d20] rounded-lg p-4 sm:p-5 md:p-6 shadow-lg relative overflow-hidden group"
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 } 
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <LineChartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />
          <h3 className="font-['Nunito'] font-bold text-[#e8eef2] text-base sm:text-lg md:text-xl">
            Performance Trend
          </h3>
        </div>
        
        {/* Chart Container - Responsive heights using Tailwind arbitrary properties */}
        <div className="h-32 sm:h-40 md:h-48 lg:h-[280px] w-full relative [--chart-height:128px] sm:[--chart-height:160px] md:[--chart-height:192px] lg:[--chart-height:280px]">
          {/* Chart Area */}
          <div className="absolute left-8 sm:left-10 bottom-6 sm:bottom-8 right-2 sm:right-4 top-2 sm:top-4">
            {/* Chart Bars */}
            <div className="h-full w-full flex items-end justify-between gap-1 sm:gap-2">
              {performanceData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex flex-col items-center gap-1 sm:gap-2 flex-1 max-w-16"
                >
                  {/* Score tooltip */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-xs sm:text-sm font-bold text-[#e8eef2] mb-1"
                  >
                    {item.score}%
                  </motion.div>
                  
                  {/* Bar - Truly responsive height using CSS custom properties */}
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ 
                      height: `calc(var(--chart-height) * ${item.score / 100})` 
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.4 + index * 0.1,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    className="w-6 sm:w-8 md:w-10 bg-gradient-to-t from-[#0667D0] to-[#033464] rounded-t-sm min-h-[8px]"
                  />
                  
                  {/* Date label */}
                  <span className="text-xs sm:text-sm text-[#e8eef2] text-center leading-tight">
                    {item.date}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-2 sm:top-4 bottom-6 sm:bottom-8 flex flex-col justify-between text-xs sm:text-sm text-[#e8eef2] pr-1 sm:pr-2">
            {yAxisLabels.map((label, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="leading-none"
              >
                {label}
              </motion.span>
            ))}
          </div>
          
          {/* Grid lines */}
          <div className="absolute left-8 sm:left-10 right-2 sm:right-4 top-2 sm:top-4 bottom-6 sm:bottom-8 pointer-events-none">
            {yAxisLabels.map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="absolute w-full border-t border-[#e8eef2]"
                style={{ top: `${(index / (yAxisLabels.length - 1)) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};