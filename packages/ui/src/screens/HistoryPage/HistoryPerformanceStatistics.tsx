import { motion } from "framer-motion";
import { HistoryPerformanceOverTimeChart } from "./HistoryPerformanceOverTimeChart";
import type { InterviewWithStats } from "../../lib/History/interview-history-api";

type HistoryPerformanceStatisticsProps = {
	completedInterviews?: InterviewWithStats[];
};
export const HistoryPerformanceStatistics = ({
	completedInterviews,
}: HistoryPerformanceStatisticsProps) => {
	// Remove the fake performanceData array and replace with:
	const formatPerformanceData = (interviews: InterviewWithStats[]) => {
		if (!interviews || !Array.isArray(interviews)) return [];

		return interviews
			.map((interview) => {
				// Format date like "May 18" from ISO string
				const date = new Date(interview.startTime);
				const formattedDate = date.toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
				});

				// Use totalScore directly since it's already a percentage
				const score = interview.totalScore || 0;

				return {
					date: formattedDate,
					score: score,
					originalDate: date, // Keep original date for sorting
				};
			})
			.sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime()) // Sort by original date
			.map(({ date, score }) => ({ date, score })); // Remove originalDate from final result
	};
	
	const performanceData = formatPerformanceData(completedInterviews || []);

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

			<div className="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-4">
				{/* Performance Over Time Chart */}
				<HistoryPerformanceOverTimeChart performanceData={performanceData} />

				{/* Performance Breakdown */}
				{/* <HistoryPerformanceBreakdown /> */}
			</div>
		</motion.section>
	);
};
