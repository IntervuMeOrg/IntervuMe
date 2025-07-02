import { motion } from "framer-motion";
import { EditIcon, SaveIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

type ProfileHeaderProps = {
  isEditing: boolean;
  toggleEditMode: () => void;
  saveProfileChanges: () => void;
};

export const ProfileHeader = ({
  isEditing,
  toggleEditMode,
  saveProfileChanges,
}: ProfileHeaderProps) => {
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
      className="w-full mb-6 sm:mb-8 md:mb-10 3xl:mb-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        {/* Page Title - Reduced sizes across all breakpoints */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-['Nunito'] font-black text-[#1d1d20] text-xl sm:text-2xl md:text-3xl lg:text-4xl 3xl:text-5xl leading-tight"
        >
          My Profile
        </motion.h1>

        {/* Edit/Save Button - Slightly smaller */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={isEditing ? saveProfileChanges : toggleEditMode}
            className="rounded-md h-9 sm:h-10 3xl:h-12 px-3 sm:px-5 3xl:px-7 bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 border-0"
          >
            {isEditing ? (
              <SaveIcon className="h-4 w-4 3xl:w-6 3xl:h-6" />
            ) : (
              <EditIcon className="h-4 w-4 3xl:w-6 3xl:h-6" />
            )}
            <span className="font-['Nunito'] font-semibold text-white text-sm 3xl:text-lg">
              {isEditing ? "Save Changes" : "Edit Profile"}
            </span>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};