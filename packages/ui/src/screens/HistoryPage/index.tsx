import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon, PlusIcon } from "lucide-react";
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
			<main className="relative min-h-screen w-full bg-white">
				{/* Background container with proper responsive handling */}
				<div className="absolute inset-0 z-0">
					<img
						className="h-full w-full object-cover"
						alt="Background"
						src="/rectangle.png"
					/>
				</div>

				{/* Main content with proper responsive container */}
				<div className="relative z-10 min-h-screen w-full">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
						<div className="py-8 sm:py-12 md:py-16 lg:py-20">
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
								className="w-full mb-8 sm:mb-10 md:mb-12"
							>
								<h2 className="font-['Nunito'] font-bold text-[#1d1d20] text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6">
									Recent Interviews
								</h2>

								<div className="space-y-4 sm:space-y-6">
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
											className="bg-[#1d1d20] rounded-lg p-4 sm:p-5 md:p-6 shadow-md hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
											onClick={() => {
												window.scrollTo(0, 0);
												navigate("/overall-feedback");
											}}
										>
											{/* Gradient overlay */}
											<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

											<div className="relative z-10">
												<div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
													{/* Interview Info */}
													<div className="flex-1">
														<h3 className="font-['Nunito'] font-bold text-white text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">
															{interview.title}
														</h3>

														{/* Interview Details - Horizontal Flex */}
														<div className="flex flex-col sm:flex-row flex-wrap sm:items-center  gap-x-6 text-[#e8eef2] mb-2 text-xs sm:text-sm">
															<div className="flex items-left sm:items-center gap-1">
																<CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-[#e8eef2]" />
																<span>{interview.date}</span>
															</div>
															<div className="flex items-left sm:items-center gap-1">
																<ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 text-[#e8eef2]" />
																<span>{interview.time}</span>
															</div>
															<div className="flex items-left sm:items-center gap-1">
																<span>{interview.duration}</span>
															</div>
															<div className="flex items-left sm:items-center gap-1">
																<span>{interview.questions} questions</span>
															</div>
														</div>
													</div>

													{/* Score Display */}
													<div className="flex flex-row lg:flex-col items-center lg:items-end gap-2">
														<div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
															{interview.score}%
														</div>
														<div className="text-xs sm:text-sm text-[#e8eef2]/80">
															Score
														</div>
													</div>
												</div>

												{/* Skills Section */}
												<div className="mt-4">
													<h4 className="font-['Nunito'] font-semibold text-white text-sm sm:text-base mb-2 sm:mb-3">
														Skills Assessed:
													</h4>
													<div className="flex flex-wrap gap-2">
														{interview.skills.map((skill, skillIndex) => (
															<span
																key={skillIndex}
																className="bg-white/20 text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded backdrop-blur-sm"
															>
																{skill}
															</span>
														))}
													</div>
												</div>

												{/* View Details Button */}
												<div className="mt-4 sm:mt-6 flex justify-end">
													<Button
														className="rounded-md px-3 sm:px-4 md:px-6 py-2 h-auto bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] hover:opacity-90 transition-opacity duration-200 border-0"
														onClick={(e) => {
															e.stopPropagation();
															window.scrollTo(0, 0);
															navigate("/overall-feedback");
														}}
													>
														<span className="font-['Nunito'] font-semibold text-white text-xs sm:text-sm md:text-base">
															View Details
														</span>
													</Button>
												</div>
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
								className="flex justify-center"
							>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button
										className="rounded-md h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 sm:gap-3 border-0"
										onClick={() => navigate("/start-interview")}
									>
										<PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
										<span className="font-['Nunito'] font-semibold text-white text-sm sm:text-base md:text-lg">
											Start New Interview
										</span>
									</Button>
								</motion.div>
							</motion.section>
						</div>
					</div>
				</div>
			</main>
		</NavbarLayout>
	);
};

export default HistoryPage;
