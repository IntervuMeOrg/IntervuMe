import { Card, CardContent } from "../../components/ui/card";
import { motion } from "framer-motion";
import { InterviewStats } from "../../types/interviewStats";
import {
	BarChart4Icon,
	LineChartIcon,
	ClockIcon,
	TrendingUpIcon,
} from "lucide-react";

type ProfileStatsCardsProps = {
	interviewStats: InterviewStats;
};

export const ProfileStatsCards = ({
	interviewStats,
}: ProfileStatsCardsProps) => {
	return (
		<div className="grid grid-cols-4 gap-6 mb-8">
			{[0, 1, 2, 3].map((index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3 + index * 0.1 }}
					className="h-full"
				>
					<Card className="shadow-sm bg-[#1d1d20] relative overflow-hidden border-0">
						<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
						<CardContent className="p-4 relative z-10">
							<div className="flex items-center justify-between mb-2">
								<h3 className="font-['Nunito',Helvetica] font-bold text-white text-sm">
									{index === 0 && "TOTAL INTERVIEWS"}
									{index === 1 && "AVERAGE SCORE"}
									{index === 2 && "TOTAL HOURS"}
									{index === 3 && "SKILLS IMPROVED"}
								</h3>
								<div className="bg-[#0667D0] p-2 rounded-full ml-[15px]">
									{index === 0 && (
										<BarChart4Icon className="h-5 w-5 text-white" />
									)}
									{index === 1 && (
										<LineChartIcon className="h-5 w-5 text-white" />
									)}
									{index === 2 && <ClockIcon className="h-5 w-5 text-white" />}
									{index === 3 && (
										<TrendingUpIcon className="h-5 w-5 text-white" />
									)}
								</div>
							</div>
							<p className="font-['Nunito',Helvetica] font-bold text-[32px] text-white">
								{index === 0 && interviewStats.totalInterviews}
								{index === 1 && `${interviewStats.averageScore}%`}
								{index === 2 && interviewStats.totalHours}
								{index === 3 && interviewStats.skillsImproved}
							</p>
							<p className="text-white text-opacity-70 text-sm">
								{index === 0 && "+3 this month"}
								{index === 1 && "+5% from last month"}
								{index === 2 && "Practice time"}
								{index === 3 && "Technical & Soft Skills"}
							</p>
						</CardContent>
					</Card>
				</motion.div>
			))}
		</div>
	);
};
