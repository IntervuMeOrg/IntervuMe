import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

type DashboardActionButtonsProps = {
  navigate: ReturnType<typeof useNavigate>;
};

export const DashboardActionButtons = ({
  navigate,
}: DashboardActionButtonsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
    >
      <Button
        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 h-auto
                   rounded-md bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] 
                   hover:opacity-90 transition-opacity"
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/start-interview");
        }}
      >
        <span className="font-['Nunito'] font-semibold text-white text-sm sm:text-base">
          Start New Interview
        </span>
      </Button>
      
      <Button
        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 h-auto
                   rounded-md bg-white/10 hover:bg-white/20 transition-colors"
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/history");
        }}
      >
        <span className="font-['Nunito'] font-semibold text-white text-sm sm:text-base">
          View Full History
        </span>
      </Button>
    </motion.div>
  );
};