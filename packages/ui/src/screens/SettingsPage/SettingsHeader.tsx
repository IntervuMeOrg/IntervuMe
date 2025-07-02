import { motion } from "framer-motion";

export const SettingsHeader = () => {
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
      className="w-full mb-8 sm:mb-10 md:mb-12"
    >
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h1 className="font-['Nunito'] font-black text-[#1d1d20] text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 leading-tight">
          Settings
        </h1>
        <p className="font-['Nunito'] text-[#1d1d20] text-sm sm:text-base md:text-lg opacity-80 max-w-2xl mx-auto">
          Manage your account settings and preferences to customize your interview experience
        </p>
      </motion.div>
    </motion.section>
  );
};