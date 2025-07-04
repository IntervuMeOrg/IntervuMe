import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon, PlusIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { HistoyHeader } from "./HistoryHeader";
import { HistoryStatsOverview } from "./HistoryStatsOverview";
import { HistoryPerformanceStatistics } from "./HistoryPerformanceStatistics";
import { useCurrentUser } from "../../lib/authentication/authentication-hooks";
import {
	useInterviewHistory,
	useCompletedInterviews,
} from "../../lib/History/interview-history-hooks";
import { InterviewHistoryResponse } from "../../lib/History/interview-history-api";
import type { InterviewWithStats } from "../../lib/History/interview-history-api";

export const HistoryPage = (): JSX.Element => {
	const user = useCurrentUser();
	const userName = user.data
		? `${user.data.firstName} ${user.data.lastName}`
		: "";

	// Navigation hook for routing
	const navigate = useNavigate();

	// Fixed hook calls with proper variable names
	const {
		data: interviewHistory,
		isLoading: isPendingStatHistory,
		error: errorStateHistory,
	} = useInterviewHistory(user.data?.id as string);
	const {
		data: completedInterviews,
		isLoading: isPendingCompleteInterview,
		error: errorCompleteInterview,
	} = useCompletedInterviews(user.data?.id as string);

	// State for active navigation item tracking
	const activeNavItem = "History";

	// Helper function to format interview data for display
	const formatInterviewForDisplay = (interview: InterviewWithStats) => {
		// Format date from ISO string to readable format
		const formatDate = (dateString: string) => {
			const date = new Date(dateString);
			return date.toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		};

		// Format time from ISO string to readable format
		const formatTime = (dateString: string) => {
			const date = new Date(dateString);
			return date.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
			});
		};

		// Calculate duration from start and end times
		const calculateDuration = (startTime: string, endTime?: string) => {
			if (!endTime) return "N/A";
			const start = new Date(startTime);
			const end = new Date(endTime);
			const durationMs = end.getTime() - start.getTime();
			const minutes = Math.floor(durationMs / (1000 * 60));
			return `${minutes} minutes`;
		};

		// Calculate score percentage
		const calculateScore = (totalScore?: number, maxScore?: number) => {
			if (!totalScore || !maxScore) return 0;
			return Math.round((totalScore / maxScore) * 100);
		};

		return {
			id: interview.userId,
			title: interview.jobTitle || "Interview",
			date: formatDate(interview.startTime),
			time: formatTime(interview.startTime),
			duration: calculateDuration(interview.startTime, interview.endTime),
			score: calculateScore(interview.totalScore, interview.maxScore),
			questions: interview.questionCount,
			skills: interview.uniqueTags,
		};
	};

	// Show loading state
	if (isPendingStatHistory || isPendingCompleteInterview) {
		return (
			<NavbarLayout activeNavItem={activeNavItem} userName={userName}>
				<main className="relative min-h-screen w-full bg-white">
					<div className="absolute inset-0 z-0">
						<img
							className="h-full w-full object-cover"
							alt="Background"
							src="/rectangle.png"
						/>
					</div>
					<div className="relative z-10 min-h-screen w-full flex items-center justify-center">
						<div className="text-center">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0667D0] mx-auto mb-4"></div>
							<p className="text-[#1d1d20] font-['Nunito'] text-lg">
								Loading interview history...
							</p>
						</div>
					</div>
				</main>
			</NavbarLayout>
		);
	}

	// Show error state
	if (errorStateHistory || errorCompleteInterview) {
		return (
			<NavbarLayout activeNavItem={activeNavItem} userName={userName}>
				<main className="relative min-h-screen w-full bg-white">
					<div className="absolute inset-0 z-0">
						<img
							className="h-full w-full object-cover"
							alt="Background"
							src="/rectangle.png"
						/>
					</div>
					<div className="relative z-10 min-h-screen w-full flex items-center justify-center">
						<div className="text-center">
							<p className="text-red-600 font-['Nunito'] text-lg mb-4">
								Error loading interview history
							</p>
							<Button
								onClick={() => window.location.reload()}
								className="bg-[#0667D0] hover:bg-[#054E9D] text-white"
							>
								Retry
							</Button>
						</div>
					</div>
				</main>
			</NavbarLayout>
		);
	}

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
							<HistoryStatsOverview
								interviewHistory={interviewHistory as InterviewHistoryResponse}
							/>

							{/* Performance Statistics Section */}
							<HistoryPerformanceStatistics completedInterviews={completedInterviews} />


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
									{completedInterviews &&
									Array.isArray(completedInterviews) &&
									completedInterviews.length > 0 ? (
										completedInterviews.map(
											(interview: InterviewWithStats, index: number) => {
												const formattedInterview =
													formatInterviewForDisplay(interview);

												return (
													<motion.div
														key={interview.userId}
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
															navigate(
																`/interview/${interview.userId}/results`
															);
														}}
													>
														<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

														<div className="relative z-10">
															<div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
																<div className="flex-1">
																	<h3 className="font-['Nunito'] font-bold text-white text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">
																		{formattedInterview.title}
																	</h3>

																	<div className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-x-6 text-[#e8eef2] mb-2 text-xs sm:text-sm">
																		<div className="flex items-left sm:items-center gap-1">
																			<CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-[#e8eef2]" />
																			<span>{formattedInterview.date}</span>
																		</div>
																		<div className="flex items-left sm:items-center gap-1">
																			<ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 text-[#e8eef2]" />
																			<span>{formattedInterview.time}</span>
																		</div>
																		<div className="flex items-left sm:items-center gap-1">
																			<span>{formattedInterview.duration}</span>
																		</div>
																		<div className="flex items-left sm:items-center gap-1">
																			<span>
																				{formattedInterview.questions} questions
																			</span>
																		</div>
																	</div>
																</div>

																<div className="flex flex-row lg:flex-col items-center lg:items-end gap-2">
																	<div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
																		{formattedInterview.score}%
																	</div>
																	<div className="text-xs sm:text-sm text-[#e8eef2]/80">
																		Score
																	</div>
																</div>
															</div>

															<div className="mt-4">
																<h4 className="font-['Nunito'] font-semibold text-white text-sm sm:text-base mb-2 sm:mb-3">
																	Skills Assessed:
																</h4>
																<div className="flex flex-wrap gap-2">
																	{formattedInterview.skills.map(
																		(skill, skillIndex) => (
																			<span
																				key={skillIndex}
																				className="bg-white/20 text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded backdrop-blur-sm"
																			>
																				{skill}
																			</span>
																		)
																	)}
																</div>
															</div>
															<div className="mt-4 sm:mt-6 flex justify-end">
																<Button
																	className="rounded-md px-3 sm:px-4 md:px-6 py-2 h-auto bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] hover:opacity-90 transition-opacity duration-200 border-0"
																	onClick={(e) => {
																		e.stopPropagation();
																		window.scrollTo(0, 0);
																		navigate(
																			`/interview/${interview.userId}/results`
																		);
																	}}
																>
																	<span className="font-['Nunito'] font-semibold text-white text-xs sm:text-sm md:text-base">
																		View Details
																	</span>
																</Button>
															</div>
														</div>
													</motion.div>
												);
											}
										)
									) : (
										<motion.div
											initial={{ opacity: 0, y: 30 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, margin: "-5% 0px" }}
											className="bg-[#1d1d20] rounded-lg p-6 sm:p-8 text-center inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"
										>
											<div className="text-white/60 mb-4">
											
												<ClockIcon className="h-12 w-12 mx-auto mb-3" />
												<h3 className="font-['Nunito'] font-bold text-lg sm:text-xl mb-2">
													No Interviews Yet
												</h3>
												<p className="text-sm sm:text-base">
													Start your first interview to see your history here.
												</p>
											</div>
										</motion.div>
										
									)}
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
										onClick={() => {
											window.scrollTo(0, 0);
											navigate("/interview");
										}}
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
