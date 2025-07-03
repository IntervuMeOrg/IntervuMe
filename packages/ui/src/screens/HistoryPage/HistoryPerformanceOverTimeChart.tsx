import { LineChartIcon } from "lucide-react";
import { motion } from "framer-motion";

type PerformanceData = { date: string; score: number };
type Props = { performanceData: PerformanceData[] };

export const HistoryPerformanceOverTimeChart = ({ performanceData }: Props) => {
  const yAxisLabels = ["100%", "75%", "50%", "25%", "0%"];

  return (
    <motion.div
		initial={{ opacity: 0, x: 20 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			transition={{ delay: 0.3 }}
			className="bg-[#1d1d20] rounded-lg p-4 sm:p-5 md:p-6 shadow-lg relative overflow-hidden group font-['Nunito']"
			whileHover={{
				scale: 1.02,
				boxShadow:
					"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
				transition: { duration: 0.2 },
			}}
    >
		
	{/* Gradient overlay */}
	<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <LineChartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />
       					<h3 className="font-['Nunito'] font-bold text-[#e8eef2] text-base sm:text-lg md:text-xl">
Performance Over Time</h3>
      </div>

      {/* Chart Box: fixed height, reserve bottom space */}
      <div className="relative h-52">
        {/* Y‑axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between place-items-center text-xs text-white">
          {yAxisLabels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>

        {/* Grid lines */}
        <div className="absolute left-9 right-0 top-0 bottom-0">
          {yAxisLabels.map((_, i) => (
            <div
              key={i}
              className="absolute w-full border-t border-white/20"
              style={{ top: `${(i / (yAxisLabels.length - 1)) * 100}%` }}
            ></div>
          ))}
        </div>

        {/* Bars + labels container */}
        <div className="absolute left-8 right-0 bottom-0 top-0 flex justify-between px-2 ">
          {performanceData.map((item, idx) => (
            <div key={idx} className="flex-1 max-w-[60px] relative">
              {/* Bar (absolute bottom) */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${item.score}%` }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 sm:w-10 bg-[#0667D0] rounded-t-md"
              />

              {/* Date & Score below */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-2 text-center">
                <div className="text-xs text-[#e8eef2]">{item.date}</div>
                <div className="text-xs text-[#e8eef2] font-medium">{item.score}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
