import { useEffect, useState } from "react";
import { Toast } from "../../components/ui/Toast";
import { SkillInputDialog } from "../../components/ui/SkillInputDialog";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { motion } from "framer-motion";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileCard } from "./ProfileCard";
import { ProfileSkillsExperience } from "./ProfileSkillsExperience";
import { ProfileSkillAnalysis } from "./ProfileSkillAnalysis";
import { ProfileStatsCards } from "./ProfileStatsCards";
import { useCurrentUser } from "../../lib/authentication/authentication-hooks";

export const ProfilePage = (): JSX.Element => {
  const user = useCurrentUser();
  // State for active navigation item tracking
  const activeNavItem = "";
  // State for logged in user (simulated)
  const [userName, setUserName] = useState("");

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);

  useEffect(()=>{
    setUserName(`${user.data?.firstName} ${user.data?.lastName}`);
  },[user.data?.firstName, user.data?.lastName])

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
    firstName: user.data?.firstName,
    lastName: user.data?.lastName,
    email: user.data?.email,
    phone: user.data?.phone, 
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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 3xl:px-10  3xl:max-w-screen-3xl max-w-7xl">
            <div className="py-8 sm:py-12 md:py-16 lg:py-20 3xl:py-24">
              
              {/* Header Section */}
              <ProfileHeader
                isEditing={isEditing}
                toggleEditMode={toggleEditMode}
                saveProfileChanges={saveProfileChanges}
              />

              {/* Profile Information Section */}
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
                className="w-full mb-8 sm:mb-10 md:mb-12 3xl:mb-14"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Profile Card */}
                  <div className="lg:col-span-1">
                    <ProfileCard
                      userProfile={userProfile}
                      isEditing={isEditing}
                      setUserProfile={setUserProfile}
                    />
                  </div>

                  {/* Skills and Experience */}
                  <div className="lg:col-span-2">
                    <ProfileSkillsExperience
                      userProfile={userProfile}
                      isEditing={isEditing}
                      setUserProfile={setUserProfile}
                      setSkillDialogOpen={setSkillDialogOpen}
                      showToast={showToast}
                    />
                  </div>
                </div>

                {/* Add Skill Dialog */}
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
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 15,
                  mass: 0.5,
                  delay: 0.2,
                }}
                className="w-full"
              >
                <h2 className="font-['Nunito'] font-bold text-[#1d1d20] text-lg sm:text-xl md:text-2xl lg:text-3xl 3xl:text-[2.7rem] mb-6 sm:mb-8 3xl:mb-10">
                  Interview Statistics
                </h2>

                {/* Balanced Layout: Stats Cards + Skill Analysis */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                  {/* Stats Cards - Takes 2/3 of the width on xl screens */}
                  <div className="xl:col-span-2">
                    <ProfileStatsCards interviewStats={interviewStats} />
                  </div>
                  
                  {/* Skill Analysis - Takes 1/3 of the width on xl screens */}
                  <div className="xl:col-span-1">
                    <ProfileSkillAnalysis interviewStats={interviewStats} />
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </main>
    </NavbarLayout>
  );
};

export default ProfilePage;