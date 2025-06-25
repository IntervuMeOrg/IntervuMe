import { LineChartIcon } from "lucide-react";
import { motion } from "framer-motion";

type PerformanceData = {
	date: string;
	score: number;
};

type HistoryPerformanceOverTimeChartProps = {
	performanceData: PerformanceData[];
};

export const HistoryPerformanceOverTimeChart = ({
	performanceData,
}: HistoryPerformanceOverTimeChartProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			transition={{ delay: 0.2 }}
			className="bg-[#1d1d20] rounded-lg p-6 shadow-lg relative overflow-hidden group"
			whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
		>
			<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]"></div>
			<div className="flex items-center gap-3 mb-4 relative z-10">
				<LineChartIcon className="h-5 w-5 text-[#e8eef2]" />
				<h3 className="font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-xl">
					Performance Over Time
				</h3>
			</div>
			<div className="h-[200px] w-full relative z-10">
				{/* Simple chart visualization using divs */}
				<div className="absolute left-[30px] bottom-[-10px] w-full h-full flex items-end justify-between px-2 ">
					{performanceData.map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 + index * 0.1 }}
							className="flex flex-col items-center gap-1 w-1/5"
						>
							<motion.div
								initial={{ height: 0 }}
								whileInView={{ height: `${item.score * 1.6}px` }}
								viewport={{ once: true }}
								transition={{
									delay: 0.4 + index * 0.1,
									duration: 0.5,
									ease: "easeOut",
								}}
								className="w-8 bg-[#0667D0] rounded-t-sm"
							></motion.div>
							<span className="text-xs text-[#e8eef2]">{item.date}</span>
						</motion.div>
					))}
				</div>

				{/* Y-axis labels */}
				<div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-[#e8eef2] pr-2 mt-[10px]">
					<span>100%</span>
					<span>75%</span>
					<span>50%</span>
					<span>25%</span>
					<span>0%</span>
				</div>
			</div>
		</motion.div>
	);
};
