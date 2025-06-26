import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

type OurViewSectionProps = {
  navigate: ReturnType<typeof useNavigate>;
};

export const OurViewSection = ({ navigate }: OurViewSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.7 }}
      className="relative py-16 md:py-20 lg:py-24 xl:py-28 bg-[#1d1d20] w-full"
    >
      <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto text-center px-4 md:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            type: "spring",
            stiffness: 100,
            damping: 12,
          }}
          className="font-['Nunito',Helvetica] font-black text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-[#e8eef2] mb-6 md:mb-8 lg:mb-10 xl:mb-12"
        >
          Our View
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 12,
          }}
          className="font-['Nunito',Helvetica] text-base md:text-lg lg:text-xl xl:text-2xl text-[#e8eef2] leading-[1.6] mb-10 md:mb-12 lg:mb-14 xl:mb-16"
        >
          The goal of this project is to create a personalized mock interview
          assistant that generates tailored questions, adapts difficulty,
          provides feedback, and simulates realistic interviews with helpful
          resources.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 12,
          }}
        >
          <Button
            onClick={() => navigate("/login")}
            className="rounded-[5px] h-12 md:h-14 lg:h-16 xl:h-18 w-44 md:w-48 lg:w-52 xl:w-56 [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90 transition-all duration-200 hover:scale-105"
          >
            <span className="font-['Nunito',Helvetica] font-semibold text-white text-base md:text-lg lg:text-xl xl:text-2xl">
              Start now
            </span>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};
