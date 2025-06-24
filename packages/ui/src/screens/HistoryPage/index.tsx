import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { motion } from "framer-motion";
import {
	CalendarIcon,
	ClockIcon,
	BarChart4Icon,
	LineChartIcon,
	PieChartIcon,
	PlusIcon,
} from "lucide-react";
import { Button } from "../../components/ui/button";

export const HistoryPage = (): JSX.Element => {
	// State for logged in user (simulated)
	const [userName, setUserName] = useState("Mohamed Essam");
	// Navigation hook for routing
	const navigate = useNavigate();

	// Performance data for chart
	const performanceData = [
		{ date: "Apr 18", score: 88 },
		{ date: "Apr 25", score: 81 },
		{ date: "May 3", score: 92 },
		{ date: "May 10", score: 78 },
		{ date: "May 15", score: 85 },
	];

	// Mock interview history data
	const interviewHistory = [
		{
			id: 1,
			title: "Frontend Developer Interview",
			date: "May 15, 2023",
			time: "14:30",
			duration: "45 minutes",
			score: 85,
			questions: 12,
			skills: ["React", "JavaScript", "CSS", "Problem Solving"],
		},
		{
			id: 2,
			title: "React Technical Assessment",
			date: "May 10, 2023",
			time: "10:15",
			duration: "30 minutes",
			score: 78,
			questions: 8,
			skills: ["React Hooks", "State Management", "API Integration"],
		},
		{
			id: 3,
			title: "Behavioral Interview Practice",
			date: "May 3, 2023",
			time: "16:45",
			duration: "40 minutes",
			score: 92,
			questions: 10,
			skills: ["Communication", "Problem Solving", "Team Collaboration"],
		},
		{
			id: 4,
			title: "Full Stack Developer Interview",
			date: "April 25, 2023",
			time: "11:00",
			duration: "60 minutes",
			score: 81,
			questions: 15,
			skills: ["Node.js", "React", "MongoDB", "System Design"],
		},
		{
			id: 5,
			title: "JavaScript Fundamentals",
			date: "April 18, 2023",
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
		<NavbarLayout
			activeNavItem={activeNavItem}
			userName={userName}
		>
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
							className="w-full mb-8"
						>
							{/* Back button */}
							{/* <div className="self-start mb-6">
							<Button
								className="bg-transparent hover:bg-white/10 text-[#1d1d20] flex items-center gap-2"
								onClick={() => navigate("/main-page-after-login")}
							>
								<ArrowLeftIcon className="h-4 w-4" />
								<span className="font-['Nunito',Helvetica] font-medium">
									Back to Dashboard
								</span>
							</Button>
						</div> */}

							{/* Page Title */}
							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className="font-['Nunito',Helvetica] font-black text-[#1d1d20] text-[40px] mb-8 text-center"
							>
								Your Interview History
							</motion.h1>
						</motion.section>

						{/* Stats Overview Section */}
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

						{/* Performance Statistics Section */}
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
							className="w-full mb-10"
						>
							<h2 className="font-['Nunito',Helvetica] font-bold text-[#1d1d20] text-2xl mb-4">
								Performance Statistics
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Performance Over Time Chart */}
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
													<span className="text-xs text-[#e8eef2]">
														{item.date}
													</span>
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

								{/* Performance Breakdown */}
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
												<span className="text-sm font-medium text-[#e8eef2]">
													85%
												</span>
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
												<span className="text-sm font-medium text-[#e8eef2]">
													92%
												</span>
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
												<span className="text-sm font-medium text-[#e8eef2]">
													78%
												</span>
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
												<span className="text-sm font-medium text-[#e8eef2]">
													84%
												</span>
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
							</div>
						</motion.section>

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