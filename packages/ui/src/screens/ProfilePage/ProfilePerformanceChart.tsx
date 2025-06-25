import { Card, CardContent } from "../../components/ui/card";
import { motion } from "framer-motion";

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
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true }}
			transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
		>
			<Card className="shadow-md mb-8 bg-[#1d1d20] relative overflow-hidden border-0">
				<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
				<CardContent className="p-6 relative z-10">
					<h3 className="font-['Nunito',Helvetica] font-bold text-[22px] text-white mb-4">
						Performance Trend
					</h3>
					<div className="h-[250px] w-full">
						<div className="h-full w-full rounded-lg border border-[#444] p-4 relative">
							{/* Chart Title and Legend */}
							<div className="flex justify-between items-center mb-4">
								<div className="flex items-center">
									<div className="w-3 h-3 rounded-full bg-[#0667D0] mr-2"></div>
									<span className="text-white text-opacity-80 text-sm">
										Interview Score
									</span>
								</div>
								<div className="text-white text-opacity-60 text-xs">
									Last 5 Interviews
								</div>
							</div>

							{/* Chart Grid */}
							<div className="absolute left-12 right-4 top-12 bottom-8 flex flex-col justify-between">
								{[0, 25, 50, 75, 100].reverse().map((tick, i) => (
									<div
										key={i}
										className="w-full border-t border-[#444] border-opacity-50 relative h-0"
									>
										<span className="absolute -left-8 -top-2 text-xs text-white text-opacity-60">
											{tick}%
										</span>
									</div>
								))}
							</div>

							{/* Chart Bars */}
							<div className="absolute left-12 right-4 top-12 bottom-8 flex items-end justify-between">
								{performanceData.map((item, index) => {
									const height = (item.score / 100) * 100;

									return (
										<motion.div
											key={index}
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ delay: 0.2 + index * 0.1 }}
											className="flex flex-col items-center w-1/5"
										>
											<div className="relative w-12 flex justify-center group">
												<motion.div
													initial={{ height: 0 }}
													whileInView={{ height }}
													viewport={{ once: true }}
													transition={{
														delay: 0.4 + index * 0.1,
														duration: 0.5,
														ease: "easeOut",
													}}
													className="w-8 bg-[#0667D0] rounded-t-sm relative"
												>
													<div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#0667D0] text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
														Score: {item.score}%
													</div>
												</motion.div>
											</div>
											<span className="text-xs text-white text-opacity-70 mt-2">
												{item.date}
											</span>
										</motion.div>
									);
								})}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};