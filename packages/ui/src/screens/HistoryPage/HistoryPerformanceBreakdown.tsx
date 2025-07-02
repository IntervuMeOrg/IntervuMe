import { PieChartIcon } from "lucide-react";
import { motion } from "framer-motion";

const performanceMetrics = [
	{
		label: "Technical Skills",
		percentage: 85,
		color: "bg-[#0667D0]",
		delay: 0.4,
	},
	{ label: "Code Quality", percentage: 92, color: "bg-[#0667D0]", delay: 0.5 },
	{
		label: "Problem Solving",
		percentage: 78,
		color: "bg-[#0667D0]",
		delay: 0.6,
	},
	{
		label: "Overall Performance",
		percentage: 84,
		color: "bg-[#0667D0]",
		delay: 0.7,
	},
];

export const HistoryPerformanceBreakdown = () => {
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			transition={{ delay: 0.3 }}
			className="bg-[#1d1d20] rounded-lg p-4 sm:p-5 md:p-6 shadow-lg relative overflow-hidden group"
			whileHover={{
				scale: 1.02,
				boxShadow:
					"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
				transition: { duration: 0.2 },
			}}
		>
			{/* Gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

			<div className="relative z-10">
				{/* Header */}
				<div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
					<PieChartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />
					<h3 className="font-['Nunito'] font-bold text-[#e8eef2] text-base sm:text-lg md:text-xl">
						Performance Breakdown
					</h3>
				</div>

				{/* Performance Metrics */}
				<div className="space-y-3 sm:space-y-4">
					{performanceMetrics.map((metric, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: metric.delay }}
						>
							{/* Label and percentage */}
							<div className="flex justify-between items-center mb-1 sm:mb-2">
								<span className="text-xs sm:text-sm md:text-base font-medium text-[#e8eef2]">
									{metric.label}
								</span>
								<span className="text-xs sm:text-sm md:text-base font-bold text-[#e8eef2]">
									{metric.percentage}%
								</span>
							</div>

							{/* Progress bar */}
							<div className="w-full bg-white/20 rounded-full h-2 sm:h-2.5">
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
			</div>
		</motion.div>
	);
};
