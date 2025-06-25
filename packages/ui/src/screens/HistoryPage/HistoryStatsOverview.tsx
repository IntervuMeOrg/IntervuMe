import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon, BarChart4Icon } from "lucide-react";

type interviewHistory = {
	id: number;
	title: string;
	date: string;
	time: string;
	duration: string;
	score: number;
	questions: number;
	skills: string[];
};

type HistoryStatsOverviewProps = {
	interviewHistory: interviewHistory[];
};

export const HistoryStatsOverview = ({
	interviewHistory,
}: HistoryStatsOverviewProps) => {
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
			className="grid grid-cols-3 gap-6 w-full mb-10"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.2 }}
				className="bg-[#1d1d20] rounded-lg p-6 shadow-lg relative overflow-hidden group"
				whileHover={{ y: -5, transition: { duration: 0.2 } }}
			>
				<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]"></div>
				<div className="flex items-center gap-3 mb-2 relative z-10">
					<CalendarIcon className="h-5 w-5 text-[#e8eef2]" />
					<h3 className="font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-xl">
						Total Interviews
					</h3>
				</div>
				<p className="font-['Nunito',Helvetica] text-[#e8eef2] text-3xl font-bold relative z-10">
					{interviewHistory.length}
				</p>
				<p className="font-['Nunito',Helvetica] text-[#e8eef2] text-sm opacity-70 mt-2 relative z-10">
					Last 30 days
				</p>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.3 }}
				className="bg-[#1d1d20] rounded-lg p-6 shadow-lg relative overflow-hidden group"
				whileHover={{ y: -5, transition: { duration: 0.2 } }}
			>
				<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]"></div>
				<div className="flex items-center gap-3 mb-2 relative z-10">
					<BarChart4Icon className="h-5 w-5 text-[#e8eef2]" />
					<h3 className="font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-xl">
						Average Score
					</h3>
				</div>
				<p className="font-['Nunito',Helvetica] text-[#e8eef2] text-3xl font-bold relative z-10">
					{Math.round(
						interviewHistory.reduce(
							(acc, interview) => acc + interview.score,
							0
						) / interviewHistory.length
					)}
					%
				</p>
				<p className="font-['Nunito',Helvetica] text-[#e8eef2] text-sm opacity-70 mt-2 relative z-10">
					Across all interviews
				</p>
			</motion.div>
			{/*						<div className="[background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] rounded-lg p-6 shadow-lg relative overflow-hidden group">
			 */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.4 }}
				className="bg-[#1d1d20] rounded-lg p-6 shadow-lg relative overflow-hidden group"
				whileHover={{ y: -5, transition: { duration: 0.2 } }}
			>
				<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]"></div>
				<div className="flex items-center gap-3 mb-2 relative z-10">
					<ClockIcon className="h-5 w-5 text-[#e8eef2]" />
					<h3 className="font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-xl">
						Total Practice Time
					</h3>
				</div>
				<p className="font-['Nunito',Helvetica] text-[#e8eef2] text-3xl font-bold relative z-10">
					3.3 hrs
				</p>
				<p className="font-['Nunito',Helvetica] text-[#e8eef2] text-sm opacity-70 mt-2 relative z-10">
					Across all sessions
				</p>
			</motion.div>
		</motion.section>
	);
};
