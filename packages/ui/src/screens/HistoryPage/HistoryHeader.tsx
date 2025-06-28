import { motion } from "framer-motion";

export const HistoyHeader = () => {
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
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-['Nunito'] font-black text-[#1d1d20] text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 sm:mb-8 text-center leading-tight"
      >
        Your Interview History
      </motion.h1>
    </motion.section>
  );
};