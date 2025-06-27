import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { motion } from "framer-motion";
import {
	CalendarIcon,
	ClockIcon,
	PlusIcon,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { HistoyHeader } from "./HistoryHeader";
import { HistoryStatsOverview } from "./HistoryStatsOverview";
import { HistoryPerformanceStatistics } from "./HistoryPerformanceStatistics";

export const HistoryPage = (): JSX.Element => {
	// State for logged in user (simulated)
	const [userName, setUserName] = useState("Mohamed Essam");
	// Navigation hook for routing
	const navigate = useNavigate();

	// Mock interview history data
	const interviewHistory = [
		{
			id: 1,
			title: "Frontend Developer Interview",
			date: "June 28, 2025",
			time: "14:30",
			duration: "45 minutes",
			score: 75,
			questions: 3,
			skills: ["React", "JavaScript", "CSS", "Problem Solving"],
		},
		{
			id: 2,
			title: "React Technical Assessment",
			date: "May 10, 2025",
			time: "10:15",
			duration: "30 minutes",
			score: 78,
			questions: 8,
			skills: ["React Hooks", "State Management", "API Integration"],
		},
		{
			id: 3,
			title: "Backend Interview Practice",
			date: "May 3, 2025",
			time: "16:45",
			duration: "40 minutes",
			score: 92,
			questions: 10,
			skills: ["Technical Skills", "Problem Solving", "Code Quality"],
		},
		{
			id: 4,
			title: "Full Stack Developer Interview",
			date: "April 25, 2025",
			time: "11:00",
			duration: "60 minutes",
			score: 81,
			questions: 15,
			skills: ["Node.js", "React", "MongoDB", "System Design"],
		},
		{
			id: 5,
			title: "JavaScript Fundamentals",
			date: "April 18, 2025",
			time: "09:30",
			duration: "25 minutes",
			score: 88,
			questions: 20,
			skills: ["JavaScript", "ES6", "Algorithms"],
		},
	];
	// State for active navigation item tracking
	const activeNavItem = "History";

	return (
		<NavbarLayout activeNavItem={activeNavItem} userName={userName}>
			<main className="bg-white w-full relative min-h-screen">
				{/* History Content */}
				<div className="bg-white w-full min-h-screen relative z-0 pb-20">
					{/* Background image */}
					<img
						className="h-full object-cover w-full absolute top-0 left-0"
						alt="Rectangle"
						src="/rectangle.png"
					/>

					{/* Main content container */}
					<div className="relative z-10 pt-[5vh] flex flex-col items-center pb-[2vh] max-w-[1200px] mx-auto px-6">
						{/* Header Section */}
						<HistoyHeader />

						{/* Stats Overview Section */}
						<HistoryStatsOverview interviewHistory={interviewHistory} />

						{/* Performance Statistics Section */}
						<HistoryPerformanceStatistics />

						{/* Interview History List Section */}
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
							className="w-full"
						>
							<h2 className="font-['Nunito',Helvetica] font-bold text-[#1d1d20] text-2xl mb-4">
								Recent Interviews
							</h2>

							<div className="space-y-4">
								{interviewHistory.map((interview, index) => (
									<motion.div
										key={interview.id}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, margin: "-5% 0px" }}
										transition={{
											delay: 0.1 * index,
											type: "spring",
											stiffness: 80,
											damping: 12,
										}}
										whileHover={{
											scale: 1.02,
											boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
										}}
										className="bg-[#1d1d20] rounded-lg p-6 shadow-md hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
										onClick={() => {
											// need to modify by DOM so when back the view didn't change
											window.scrollTo(0, 0);
											navigate("/overall-feedback");
										}}
									>
										<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]"></div>
										<div className="flex justify-between items-start">
											<div>
												<h3 className="font-['Nunito',Helvetica] font-bold text-white text-xl mb-2">
													{interview.title}
												</h3>
												<div className="flex items-center gap-4 text-[#e8eef2] mb-3">
													<div className="flex items-center gap-1">
														<CalendarIcon className="h-4 w-4 text-[#e8eef2]" />
														<span className="text-sm">{interview.date}</span>
													</div>
													<div className="flex items-center gap-1">
														<ClockIcon className="h-4 w-4 text-[#e8eef2]" />
														<span className="text-sm">{interview.time}</span>
													</div>
													<div className="flex items-center gap-1">
														<span className="text-sm">
															{interview.duration}
														</span>
													</div>
													<div className="flex items-center gap-1">
														<span className="text-sm">
															{interview.questions} questions
														</span>
													</div>
												</div>
											</div>
											<div className="flex flex-col items-end">
												{/*[background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)]*/}
												<div className="flex items-center gap-2">
													<div className="text-2xl font-bold text-white">
														{interview.score}%
													</div>
													<div className="text-sm text-[#e8eef2]/80">Score</div>
												</div>
											</div>
										</div>
										<div className="mt-[-20px]">
											<h4 className="font-['Nunito',Helvetica] font-semibold text-[#1d1d20] text-sm mb-2">
												Skills Assessed:
											</h4>
											<div className="flex flex-wrap gap-2">
												{interview.skills.map((skill, index) => (
													<span
														key={index}
														className="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded"
													>
														{skill}
													</span>
												))}
											</div>
										</div>
										<div className="mt-4 flex justify-end">
											<Button
												className="rounded-[5px] px-4 [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90"
												onClick={() => {
													window.scrollTo(0, 0);
													navigate("/overall-feedback");
												}}
											>
												<span className="font-['Nunito',Helvetica] font-semibold text-white text-sm">
													View Details
												</span>
											</Button>
										</div>
									</motion.div>
								))}
							</div>
						</motion.section>

						{/* Start New Interview Button Section */}
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
							className="flex justify-center mt-10"
						>
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Button
									className="rounded-[5px] h-[52px] px-6 [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90 flex items-center gap-2"
									onClick={() => navigate("/start-interview")}
								>
									<PlusIcon className="h-5 w-5" />
									<span className="font-['Nunito',Helvetica] font-semibold text-white text-[18px]">
										Start New Interview
									</span>
								</Button>
							</motion.div>
						</motion.section>
					</div>
				</div>
			</main>
		</NavbarLayout>
	);
};

export default HistoryPage;
