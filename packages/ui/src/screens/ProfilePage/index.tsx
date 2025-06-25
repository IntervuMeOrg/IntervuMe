import { useState } from "react";
import { Toast } from "../../components/ui/Toast";
import { SkillInputDialog } from "../../components/ui/SkillInputDialog";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { motion } from "framer-motion";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileCard } from "./ProfileCard";
import { ProfileSkillsExperience } from "./ProfileSkillsExperience";
import { ProfilePerformanceChart } from "./ProfilePerformanceChart";
import { ProfileSkillAnalysis } from "./ProfileSkillAnalysis";
import { ProfileStatsCards } from "./ProfileStatsCards";
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
						<ProfileHeader
							isEditing={isEditing}
							toggleEditMode={toggleEditMode}
							saveProfileChanges={saveProfileChanges}
						/>

						{/* Profile Information Section */}
						<motion.section
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="w-full grid grid-cols-3 gap-6 mb-8"
						>
							{/* Profile Card */}
							<ProfileCard
								userProfile={userProfile}
								isEditing={isEditing}
								setUserProfile={setUserProfile}
							/>

							{/* Skills and Experience */}
							<ProfileSkillsExperience
								userProfile={userProfile}
								isEditing={isEditing}
								setUserProfile={setUserProfile}
								setSkillDialogOpen={setSkillDialogOpen}
								showToast={showToast}
							/>

							{/* Add Skill Button */}
							<SkillInputDialog
								isOpen={skillDialogOpen}
								onClose={() => setSkillDialogOpen(false)}
								onAdd={addSkill}
							/>
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

							<ProfileStatsCards interviewStats={interviewStats} />

							<ProfilePerformanceChart performanceData={performanceData} />

							<ProfileSkillAnalysis interviewStats={interviewStats} />
						</motion.section>
					</div>
				</div>
			</main>
		</NavbarLayout>
	);
};

export default ProfilePage;
