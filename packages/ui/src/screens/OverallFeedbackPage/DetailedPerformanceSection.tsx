import { motion } from "framer-motion";
import { BarChart3Icon } from "lucide-react";
import { DetailedPerfomanceMetrics } from "./DetailedPerfomanceMetrics";
import { DetailedPerformanceSkills } from "./DetailedPerformanceSkills";

type DetailedPerformanceSection = {
	overallPercentage: number;
	mcqPercentage: number;
	mcqCorrect: number;
	mcqTotal: number;
	problemSolvingPercentage: number;
	problemSolvingCorrect: number;
	problemSolvingTotal: number;
};

export const DetailedPerformanceSection = ({
	overallPercentage,
	mcqPercentage,
	mcqCorrect,
	mcqTotal,
	problemSolvingPercentage,
	problemSolvingCorrect,
	problemSolvingTotal,
}: DetailedPerformanceSection) => {
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
				<DetailedPerfomanceMetrics
					overallPercentage={overallPercentage}
					mcqPercentage={mcqPercentage}
					mcqCorrect={mcqCorrect}
					mcqTotal={mcqTotal}
					problemSolvingPercentage={problemSolvingPercentage}
					problemSolvingCorrect={problemSolvingCorrect}
					problemSolvingTotal={problemSolvingTotal}
				/>

				{/* Skill Assessment */}
				<DetailedPerformanceSkills
					overallPercentage={overallPercentage}
					mcqPercentage={mcqPercentage}
					problemSolvingPercentage={problemSolvingPercentage}
				/>

				{/* Recommendations */}
				<div className="mt-6 bg-blue-400/10 rounded-lg p-4 border border-blue-400/30">
					<h3 className="font-semibold text-blue-400 text-lg mb-3">
						Next Steps
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<h4 className="font-medium text-white text-base mb-2">
								Study Resources:
							</h4>
							<ul className="text-[#e8eef2] text-sm space-y-1">
								<li>• LeetCode for algorithm practice</li>
								<li>• System design interview guides</li>
								<li>• Technology-specific documentation</li>
							</ul>
						</div>
						<div>
							<h4 className="font-medium text-white text-base mb-2">
								Practice Areas:
							</h4>
							<ul className="text-[#e8eef2] text-sm space-y-1">
								<li>• Data structures and algorithms</li>
								<li>• Mock technical interviews</li>
								<li>• Code review and optimization</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};
