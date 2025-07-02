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
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative py-16 sm:py-20 md:py-24 lg:py-16 3xl:py-24 bg-[#1d1d20] w-full overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 3xl:px-1">
        <div className="max-w-3xl 3xl:max-w-5xl mx-auto text-center">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-['Nunito'] font-black text-2xl sm:text-3xl md:text-4xl 3xl:text-5xl text-[#e8eef2] mb-6 sm:mb-8 3xl:mb-14 break-words"
          >
            Our View
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-['Nunito'] text-sm sm:text-base md:text-lg 3xl:text-2xl text-[#e8eef2] leading-relaxed mb-8 sm:mb-10 md:mb-12 break-words px-2 sm:px-0 3xl:px-0"
          >
            The goal of this project is to create a personalized mock interview
            assistant that generates tailored questions, adapts difficulty,
            provides feedback, and simulates realistic interviews with helpful
            resources.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="px-2 sm:px-0"
          >
            <Button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto px-6 sm:px-12 3xl:px-20 py-2.5 sm:py-3 3xl:py-4 h-auto
                         rounded-md bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464]
                         hover:opacity-90 transition-opacity duration-200"
            >
              <span className="font-['Nunito'] font-semibold text-white text-sm sm:text-base 3xl:text-xl">
                Start now
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};