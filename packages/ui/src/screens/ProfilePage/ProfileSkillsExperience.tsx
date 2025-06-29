import { motion } from "framer-motion";
import { PlusIcon, XIcon, GraduationCapIcon, BriefcaseIcon, CodeIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  experience: Array<{
    position: string;
    company: string;
    duration: string;
  }>;
};

type ProfileSkillsExperienceProps = {
  userProfile: UserProfile;
  isEditing: boolean;
  setUserProfile: (profile: UserProfile) => void;
  setSkillDialogOpen: (open: boolean) => void;
  showToast: (message: string, type: "success" | "error" | "info") => void;
};

export const ProfileSkillsExperience = ({
  userProfile,
  isEditing,
  setUserProfile,
  setSkillDialogOpen,
  showToast,
}: ProfileSkillsExperienceProps) => {
  // Function to remove a skill
  const removeSkill = (skillToRemove: string) => {
    setUserProfile({
      ...userProfile,
      skills: userProfile.skills.filter((skill) => skill !== skillToRemove),
    });
    showToast(`Skill "${skillToRemove}" removed`, "info");
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="bg-[#1d1d20] rounded-lg p-4 sm:p-5 md:p-6 shadow-lg relative overflow-hidden group"
        whileHover={{ 
          scale: 1.02, 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transition: { duration: 0.2 } 
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <CodeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />
              <h3 className="font-['Nunito'] font-bold text-white text-base sm:text-lg md:text-xl">
                Skills
              </h3>
            </div>
            {isEditing && (
              <Button
                onClick={() => setSkillDialogOpen(true)}
                className="rounded-md h-8 px-3 bg-gradient-to-r from-[#0667D0] to-[#033464] hover:opacity-90 transition-opacity duration-200 flex items-center gap-1 border-0"
              >
                <PlusIcon className="h-3 w-3" />
                <span className="font-['Nunito'] font-medium text-white text-xs">
                  Add
                </span>
              </Button>
            )}
          </div>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-2">
            {userProfile.skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="relative group/skill"
              >
                <span className="bg-white/20 text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded backdrop-blur-sm inline-flex items-center gap-1">
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:bg-red-500/20 rounded-full p-0.5 transition-colors"
                    >
                      <XIcon className="h-3 w-3 text-red-300 hover:text-red-200" />
                    </button>
                  )}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Experience Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="bg-[#1d1d20] rounded-lg p-4 sm:p-5 md:p-6 shadow-lg relative overflow-hidden group"
        whileHover={{ 
          scale: 1.02, 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transition: { duration: 0.2 } 
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <BriefcaseIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />
            <h3 className="font-['Nunito'] font-bold text-white text-base sm:text-lg md:text-xl">
              Experience
            </h3>
          </div>

          {/* Experience List */}
          <div className="space-y-3 sm:space-y-4">
            {userProfile.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="border-l-2 border-[#0667D0] pl-3 sm:pl-4"
              >
                <h4 className="font-['Nunito'] font-semibold text-white text-sm sm:text-base">
                  {exp.position}
                </h4>
                <p className="text-[#e8eef2] text-xs sm:text-sm">
                  {exp.company}
                </p>
                <p className="text-[#e8eef2] text-xs opacity-70">
                  {exp.duration}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Education Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="bg-[#1d1d20] rounded-lg p-4 sm:p-5 md:p-6 shadow-lg relative overflow-hidden group"
        whileHover={{ 
          scale: 1.02, 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transition: { duration: 0.2 } 
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <GraduationCapIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />
            <h3 className="font-['Nunito'] font-bold text-white text-base sm:text-lg md:text-xl">
              Education
            </h3>
          </div>

          {/* Education List */}
          <div className="space-y-3 sm:space-y-4">
            {userProfile.education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="border-l-2 border-[#0667D0] pl-3 sm:pl-4"
              >
                <h4 className="font-['Nunito'] font-semibold text-white text-sm sm:text-base">
                  {edu.degree}
                </h4>
                <p className="text-[#e8eef2] text-xs sm:text-sm">
                  {edu.institution}
                </p>
                <p className="text-[#e8eef2] text-xs opacity-70">
                  {edu.year}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};