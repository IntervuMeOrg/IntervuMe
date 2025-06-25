import { PieChartIcon } from "lucide-react";
import { motion } from "framer-motion";

export const HistoryPerformanceBreakdown = () => {
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			transition={{ delay: 0.3 }}
			className="bg-[#1d1d20] rounded-lg p-5 shadow-lg relative overflow-hidden group"
			whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
		>
			<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]"></div>
			<div className="flex items-center gap-3 mb-4 relative z-10">
				<PieChartIcon className="h-5 w-5 text-[#e8eef2]" />
				<h3 className="font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-xl">
					Performance Breakdown
				</h3>
			</div>
			<div className="space-y-4 relative z-10">
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.4 }}
				>
					<div className="flex justify-between mb-1">
						<span className="text-sm font-medium text-[#e8eef2]">
							Technical Skills
						</span>
						<span className="text-sm font-medium text-[#e8eef2]">85%</span>
					</div>
					<div className="w-full bg-white/20 rounded-full h-2">
						<motion.div
							initial={{ width: 0 }}
							whileInView={{ width: "85%" }}
							viewport={{ once: true }}
							transition={{
								delay: 0.5,
								duration: 0.8,
								ease: "easeOut",
							}}
							className="bg-[#0667D0] h-2 rounded-full"
						></motion.div>
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.5 }}
				>
					<div className="flex justify-between mb-1">
						<span className="text-sm font-medium text-[#e8eef2]">
							Communication
						</span>
						<span className="text-sm font-medium text-[#e8eef2]">92%</span>
					</div>
					<div className="w-full bg-white/20 rounded-full h-2">
						<motion.div
							initial={{ width: 0 }}
							whileInView={{ width: "92%" }}
							viewport={{ once: true }}
							transition={{
								delay: 0.6,
								duration: 0.8,
								ease: "easeOut",
							}}
							className="bg-[#0667D0] h-2 rounded-full"
						></motion.div>
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.6 }}
				>
					<div className="flex justify-between mb-1">
						<span className="text-sm font-medium text-[#e8eef2]">
							Problem Solving
						</span>
						<span className="text-sm font-medium text-[#e8eef2]">78%</span>
					</div>
					<div className="w-full bg-white/20 rounded-full h-2">
						<motion.div
							initial={{ width: 0 }}
							whileInView={{ width: "78%" }}
							viewport={{ once: true }}
							transition={{
								delay: 0.7,
								duration: 0.8,
								ease: "easeOut",
							}}
							className="bg-[#0667D0] h-2 rounded-full"
						></motion.div>
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.7 }}
				>
					<div className="flex justify-between mb-1">
						<span className="text-sm font-medium text-[#e8eef2]">
							Overall Performance
						</span>
						<span className="text-sm font-medium text-[#e8eef2]">84%</span>
					</div>
					<div className="w-full bg-white/20 rounded-full h-2">
						<motion.div
							initial={{ width: 0 }}
							whileInView={{ width: "84%" }}
							viewport={{ once: true }}
							transition={{
								delay: 0.8,
								duration: 0.8,
								ease: "easeOut",
							}}
							className="bg-[#0667D0] h-2 rounded-full"
						></motion.div>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};
