import { useState } from "react";
import {
	Button } from "../../components/ui/button";
import { Card,
	CardContent } from "../../components/ui/card";
import {
	MailIcon,
	MapPinIcon,
	PhoneIcon,
	SaveIcon,
	BriefcaseIcon,
	GraduationCapIcon,
	AwardIcon,
	XCircleIcon,
	PencilIcon,
	PlusIcon,
	BarChart4Icon,
	LineChartIcon,
	ClockIcon,
	TrendingUpIcon,
} from "lucide-react";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import { Toast } from "../../components/ui/Toast";
import { SkillInputDialog } from "../../components/ui/SkillInputDialog";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { motion } from "framer-motion";




// Import UI components
export const ProfilePage = (): JSX.Element => {
	// State for active navigation item tracking
	const activeNavItem = "";
	// State for logged in user (simulated)
	const [userName, setUserName] = useState("Mohamed Essam");

	// State for edit mode
	const [isEditing, setIsEditing] = useState(false);

	// Toast notification state
	const [toast, setToast] = useState<{
		visible: boolean;
		message: string;
		type: "success" | "error" | "info";
	}>({
		visible: false,
		message: "",
		type: "success",
	});

	// Skill dialog state
	const [skillDialogOpen, setSkillDialogOpen] = useState(false);

	// Function to show toast
	const showToast = (
		message: string,
		type: "success" | "error" | "info" = "success"
	) => {
		setToast({ visible: true, message, type });
		setTimeout(() => setToast({ ...toast, visible: false }), 3000);
	};

	// Function to add a new skill
	const addSkill = (skill: string) => {
		if (skill && !userProfile.skills.includes(skill)) {
			setUserProfile({
				...userProfile,
				skills: [...userProfile.skills, skill],
			});
			showToast(`Skill "${skill}" added successfully!`, "success");
		} else if (userProfile.skills.includes(skill)) {
			showToast(`Skill "${skill}" already exists`, "error");
		}
	};

	// User profile data
	const [userProfile, setUserProfile] = useState({
		firstName: "Mohamed",
		lastName: "Essam",
		email: "me21@example.com",
		phone: "+1012 3456 789",
		location: "Cairo, Egypt",
		bio: "Frontend Developer with 3 years of experience specializing in React and TypeScript. Passionate about creating intuitive user interfaces and optimizing web performance.",
		skills: [
			"React",
			"TypeScript",
			"JavaScript",
			"CSS",
			"HTML",
			"Node.js",
			"Git",
			"Problem Solving",
		],
		education: [
			{
				degree: "Bachelor of Computer Science",
				institution: "Cairo University",
				year: "2018 - 2022",
			},
		],
		experience: [
			{
				position: "Frontend Developer",
				company: "Tech Solutions Inc.",
				duration: "2022 - Present",
			},
			{
				position: "Web Development Intern",
				company: "Digital Innovations",
				duration: "2021 - 2022",
			},
		],
	});

	// Performance data for chart
	const performanceData = [
		{ date: "Apr 18", score: 88 },
		{ date: "Apr 25", score: 81 },
		{ date: "May 3", score: 92 },
		{ date: "May 10", score: 78 },
		{ date: "May 15", score: 85 },
	];

	// Interview statistics
	const interviewStats = {
		totalInterviews: 12,
		averageScore: 85,
		totalHours: 8.5,
		skillsImproved: 8,
		topPerformingSkill: "React",
		lowestPerformingSkill: "System Design",
	};

	// Toggle edit mode
	const toggleEditMode = () => {
		setIsEditing(!isEditing);
	};

	// Save profile changes
	const saveProfileChanges = () => {
		// In a real app, this would send data to a backend
		setIsEditing(false);
		// Show success message using our custom toast
		showToast("Profile updated successfully!", "success");
	};

	return (
		<NavbarLayout activeNavItem={activeNavItem} userName={userName}>
			{/* Toast notification */}
			{toast.visible && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast({ ...toast, visible: false })}
				/>
			)}

			{/* Skill Input Dialog */}
			<SkillInputDialog
				isOpen={skillDialogOpen}
				onClose={() => setSkillDialogOpen(false)}
				onAdd={addSkill}
			/>
			<main className="bg-white w-full relative min-h-screen">
				{/* Profile Content */}
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
							}}
							className="w-full flex flex-col items-center mb-8"
						>
							<div className="flex items-center justify-between w-full mb-6">
								<h1 className="font-['Nunito',Helvetica] font-black text-[40px] text-[#1d1d20]">
									My Profile
								</h1>
								<Button
									onClick={isEditing ? saveProfileChanges : toggleEditMode}
									className="rounded-[5px] h-[52px] px-6 [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90"
								>
									{isEditing ? (
										<>
											<SaveIcon className="mr-2 h-5 w-5" />
											<span className="font-['Nunito',Helvetica] font-semibold text-white text-[18px]">
												Save Changes
											</span>
										</>
									) : (
										<>
											<PencilIcon className="mr-2 h-5 w-5" />
											<span className="font-['Nunito',Helvetica] font-semibold text-white text-[18px]">
												Edit Profile
											</span>
										</>
									)}
								</Button>
							</div>
						</motion.section>

						{/* Profile Information Section */}
						<motion.section
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="w-full grid grid-cols-3 gap-6 mb-8"
						>
							{/* Profile Card */}
							<Card className="col-span-1 shadow-md overflow-hidden">
								<CardContent className="p-0">
									<div className="bg-[#1d1d20] h-[120px] relative z-[-1]">
										<div className="absolute inset-0  [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18] " />
									</div>
									<div className="flex flex-col items-center -mt-16 px-6 pb-6">
										<motion.div
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{ duration: 0.5 }}
											className="rounded-full h-[120px] w-[120px] [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] flex items-center justify-center mb-4 border-4 border-white"
										>
											<span className="font-['Nunito',Helvetica] font-black text-white text-[40px]">
												{userProfile.firstName.charAt(0)}
												{userProfile.lastName.charAt(0)}
											</span>
										</motion.div>
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.2, duration: 0.4 }}
										>
											<h2 className="font-['Nunito',Helvetica] font-bold text-[24px] text-[#1d1d20] mb-1">
												{userProfile.firstName} {userProfile.lastName}
											</h2>
											<p className="text-[#666] mb-4">{userProfile.location}</p>
										</motion.div>

										<div className="w-full space-y-4 mt-4">
											<div className="flex items-center">
												<MailIcon className="h-5 w-5 text-[#0667D0] mr-3" />
												<span className="text-[#333]">{userProfile.email}</span>
											</div>
											<div className="flex items-center">
												<PhoneIcon className="h-5 w-5 text-[#0667D0] mr-3" />
												<span className="text-[#333]">{userProfile.phone}</span>
											</div>
											<div className="flex items-center">
												<MapPinIcon className="h-5 w-5 text-[#0667D0] mr-3" />
												<span className="text-[#333]">
													{userProfile.location}
												</span>
											</div>
										</div>

										<div className="w-full mt-6">
											<h3 className="font-['Nunito',Helvetica] font-bold text-[18px] text-[#1d1d20] mb-2">
												Bio
											</h3>
											{isEditing ? (
												<>
													<Textarea
														value={userProfile.bio}
														className="min-h-[320px]"
														onChange={(e) => {
															const maxWords = 30;
															const words = e.target.value
																.split(/\s+/)
																.filter(Boolean);
															if (words.length <= maxWords) {
																setUserProfile({
																	...userProfile,
																	bio: e.target.value,
																});
															} else {
																setUserProfile({
																	...userProfile,
																	bio: words.slice(0, maxWords).join(" "),
																});
															}
														}}
													/>
													<div className="text-xs text-right text-[#666] mt-1">
														{30 -
															userProfile.bio.split(/\s+/).filter(Boolean)
																.length}{" "}
														words remaining
													</div>
												</>
											) : (
												<p className="text-[#666] text-sm">{userProfile.bio}</p>
											)}
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Skills and Experience */}
							<Card className="col-span-2 shadow-md">
								<CardContent className="p-6">
									{/* Skills Section */}
									<div className="mb-8">
										<h3 className="font-['Nunito',Helvetica] font-bold text-[22px] text-[#1d1d20] mb-4 flex items-center">
											<AwardIcon className="mr-2 h-5 w-5 text-[#0667D0]" />
											Skills
										</h3>
										<div className="flex flex-wrap gap-2">
											{userProfile.skills.map((skill, index) => (
												<div
													key={index}
													className="bg-[#e8eef2] text-[#0667D0] px-3 py-1 rounded-full text-sm font-medium flex items-center"
												>
													{skill}
													{isEditing && (
														<XCircleIcon
															className="h-4 w-4 ml-2 text-red-500 cursor-pointer hover:text-red-700"
															onClick={() => {
																const updatedSkills = [...userProfile.skills];
																updatedSkills.splice(index, 1);
																setUserProfile({
																	...userProfile,
																	skills: updatedSkills,
																});
																showToast(`Skill "${skill}" removed`, "info");
															}}
														/>
													)}
												</div>
											))}
											{isEditing && (
												<div
													className="bg-[#f0f7ff] text-[#0667D0] px-3 py-1 rounded-full text-sm font-medium flex items-center cursor-pointer"
													onClick={() => setSkillDialogOpen(true)}
												>
													<PlusIcon className="h-4 w-4 mr-1" />
													Add Skill
												</div>
											)}
											{/*Skill removal in edit mode place here !*/}
										</div>
									</div>

									{/* Education Section */}
									<div className="mb-8">
										<h3 className="font-['Nunito',Helvetica] font-bold text-[22px] text-[#1d1d20] mb-4 flex items-center">
											<GraduationCapIcon className="mr-2 h-5 w-5 text-[#0667D0]" />
											Education
										</h3>
										{userProfile.education.map((edu, index) => (
											<div key={index} className="mb-4 last:mb-0">
												<div className="flex justify-between items-start">
													<div>
														<h4 className="font-['Nunito',Helvetica] font-bold text-[18px] text-[#1d1d20]">
															{isEditing ? (
																<Input
																	value={edu.degree}
																	className="mb-2"
																	onChange={(e) => {
																		const newEducation = [
																			...userProfile.education,
																		];
																		newEducation[index] = {
																			...newEducation[index],
																			degree: e.target.value,
																		};
																		setUserProfile({
																			...userProfile,
																			education: newEducation,
																		});
																	}}
																/>
															) : (
																edu.degree
															)}
														</h4>
														<p className="text-[#666]">
															{isEditing ? (
																<Input
																	value={edu.institution}
																	className="mb-2"
																	onChange={(e) => {
																		const newEducation = [
																			...userProfile.education,
																		];
																		newEducation[index] = {
																			...newEducation[index],
																			institution: e.target.value,
																		};
																		setUserProfile({
																			...userProfile,
																			education: newEducation,
																		});
																	}}
																/>
															) : (
																edu.institution
															)}
														</p>
													</div>
													<div className="text-[#666] text-sm">
														{isEditing ? (
															<Input
																value={edu.year}
																className="w-32"
																onChange={(e) => {
																	const newEducation = [
																		...userProfile.education,
																	];
																	newEducation[index] = {
																		...newEducation[index],
																		year: e.target.value,
																	};
																	setUserProfile({
																		...userProfile,
																		education: newEducation,
																	});
																}}
															/>
														) : (
															edu.year
														)}
													</div>
												</div>
											</div>
										))}
										{isEditing && (
											<Button
												variant="outline"
												className="mt-2 text-[#0667D0] border-[#0667D0] hover:bg-[#f0f7ff] w-full"
												onClick={() => {
													setUserProfile({
														...userProfile,
														education: [
															...userProfile.education,
															{ degree: "", institution: "", year: "" },
														],
													});
												}}
											>
												<PlusIcon className="h-4 w-4 mr-2" />
												Add Education
											</Button>
										)}
									</div>

									{/* Experience Section */}
									<div>
										<h3 className="font-['Nunito',Helvetica] font-bold text-[22px] text-[#1d1d20] mb-4 flex items-center">
											<BriefcaseIcon className="mr-2 h-5 w-5 text-[#0667D0]" />
											Experience
										</h3>
										{userProfile.experience.map((exp, index) => (
											<div key={index} className="mb-4 last:mb-0">
												<div className="flex justify-between items-start">
													<div>
														<h4 className="font-['Nunito',Helvetica] font-bold text-[18px] text-[#1d1d20]">
															{isEditing ? (
																<Input
																	value={exp.position}
																	className="mb-2"
																	onChange={(e) => {
																		const newExperience = [
																			...userProfile.experience,
																		];
																		newExperience[index] = {
																			...newExperience[index],
																			position: e.target.value,
																		};
																		setUserProfile({
																			...userProfile,
																			experience: newExperience,
																		});
																	}}
																/>
															) : (
																exp.position
															)}
														</h4>
														<p className="text-[#666]">
															{isEditing ? (
																<Input
																	value={exp.company}
																	className="mb-2"
																	onChange={(e) => {
																		const newExperience = [
																			...userProfile.experience,
																		];
																		newExperience[index] = {
																			...newExperience[index],
																			company: e.target.value,
																		};
																		setUserProfile({
																			...userProfile,
																			experience: newExperience,
																		});
																	}}
																/>
															) : (
																exp.company
															)}
														</p>
													</div>
													<div className="text-[#666] text-sm">
														{isEditing ? (
															<Input
																value={exp.duration}
																className="w-32"
																onChange={(e) => {
																	const newExperience = [
																		...userProfile.experience,
																	];
																	newExperience[index] = {
																		...newExperience[index],
																		duration: e.target.value,
																	};
																	setUserProfile({
																		...userProfile,
																		experience: newExperience,
																	});
																}}
															/>
														) : (
															exp.duration
														)}
													</div>
												</div>
											</div>
										))}
										{isEditing && (
											<Button
												variant="outline"
												className="mt-2 text-[#0667D0] border-[#0667D0] hover:bg-[#f0f7ff] w-full"
												onClick={() => {
													setUserProfile({
														...userProfile,
														experience: [
															...userProfile.experience,
															{ position: "", company: "", duration: "" },
														],
													});
												}}
											>
												<PlusIcon className="h-4 w-4 mr-2" />
												Add Experience
											</Button>
										)}
									</div>
								</CardContent>
							</Card>
						</motion.section>

						{/* Interview Statistics Section */}
						<motion.section
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className="w-full mb-8"
						>
							<h2 className="font-['Nunito',Helvetica] font-black text-[28px] text-[#1d1d20] mb-6">
								Interview Statistics
							</h2>

							{/* Stats Cards */}
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
														{index === 2 && (
															<ClockIcon className="h-5 w-5 text-white" />
														)}
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

							{/* Performance Chart */}
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

							{/* Skill Analysis */}
							<div className="grid grid-cols-2 gap-6">
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
								>
									<Card className="shadow-md bg-[#1d1d20] relative overflow-hidden border-0 h-full">
										<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
										<CardContent className="p-6 relative z-10">
											<h3 className="font-['Nunito',Helvetica] font-bold text-[22px] text-white mb-4">
												Top Performing Skills
											</h3>
											<div className="space-y-4">
												{[
													{
														skill: interviewStats.topPerformingSkill,
														score: 92,
													},
													{ skill: "JavaScript", score: 88 },
													{ skill: "CSS", score: 85 },
												].map((item, idx) => (
													<motion.div
														key={idx}
														initial={{ opacity: 0, width: 0 }}
														whileInView={{ opacity: 1, width: "auto" }}
														viewport={{ once: true }}
														transition={{ delay: 0.5 + idx * 0.1 }}
													>
														<div className="flex justify-between mb-1">
															<span className="text-white text-opacity-90 font-medium">
																{item.skill}
															</span>
															<span className="text-[#0667D0] font-bold">
																{item.score}%
															</span>
														</div>
														<div className="w-full bg-[#333] bg-opacity-50 rounded-full h-2">
															<motion.div
																initial={{ width: 0 }}
																whileInView={{ width: `${item.score}%` }}
																viewport={{ once: true }}
																transition={{
																	delay: 0.6 + idx * 0.1,
																	duration: 0.8,
																}}
																className="bg-[#0667D0] h-2 rounded-full"
															></motion.div>
														</div>
													</motion.div>
												))}
											</div>
										</CardContent>
									</Card>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
								>
									<Card className="shadow-md bg-[#1d1d20] relative overflow-hidden border-0 h-full">
										<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
										<CardContent className="p-6 relative z-10">
											<h3 className="font-['Nunito',Helvetica] font-bold text-[22px] text-white mb-4">
												Areas for Improvement
											</h3>
											<div className="space-y-4">
												{[
													{
														skill: interviewStats.lowestPerformingSkill,
														score: 65,
													},
													{ skill: "Algorithms", score: 70 },
													{ skill: "Database Design", score: 72 },
												].map((item, idx) => (
													<motion.div
														key={idx}
														initial={{ opacity: 0, width: 0 }}
														whileInView={{ opacity: 1, width: "auto" }}
														viewport={{ once: true }}
														transition={{ delay: 0.5 + idx * 0.1 }}
													>
														<div className="flex justify-between mb-1">
															<span className="text-white text-opacity-90 font-medium">
																{item.skill}
															</span>
															<span className="text-[#f97316] font-bold">
																{item.score}%
															</span>
														</div>
														<div className="w-full bg-[#333] bg-opacity-50 rounded-full h-2">
															<motion.div
																initial={{ width: 0 }}
																whileInView={{ width: `${item.score}%` }}
																viewport={{ once: true }}
																transition={{
																	delay: 0.6 + idx * 0.1,
																	duration: 0.8,
																}}
																className="bg-[#f97316] h-2 rounded-full"
															></motion.div>
														</div>
													</motion.div>
												))}
											</div>
										</CardContent>
									</Card>
								</motion.div>
							</div>
						</motion.section>
					</div>
				</div>
			</main>
		</NavbarLayout>
	);
};

export default ProfilePage;