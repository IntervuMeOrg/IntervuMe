import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardStats } from "./DashboardStats";
import { DashboardTipsTricks } from "./DashboardTipsTricsk";
import { DashboardActionButtons } from "./DashboardActionButtons";
import { DashboardRecentActivity } from "./DashboardRecentActivity";
import { LightbulbIcon, TrendingUpIcon } from "lucide-react";
import { useCurrentUser } from "../../lib/authentication/authentication-hooks";
import { useInterviewHistory, useUserPracticeAnalytics } from "../../lib/History/interview-history-hooks";

type AppDashboardSectionProps = {
  historySectionRef: React.RefObject<HTMLElement>;
};

export const AppDashboardSection = ({
  historySectionRef,
}: AppDashboardSectionProps) => {
  // Navigation hook for routing
  const navigate = useNavigate();
  // Reference for carousel container
  const carouselRef = useRef<HTMLDivElement>(null);
  // State for active tip in carousel
  const [activeTip, setActiveTip] = useState(0);

  // Get current user
  const user = useCurrentUser();

  // Fetch dashboard data
  const {
    data: interviewHistory,
    isLoading: isLoadingHistory,
    error: errorHistory,
  } = useInterviewHistory(user.data?.id as string);

  const {
    data: analyticsSummary,
    isLoading: isLoadingAnalytics,
    error: errorAnalytics,
  } = useUserPracticeAnalytics(user.data?.id as string);

  // Tips and tricks data
  const tipsAndTricks = [
    {
      title: "Research the Company",
      description:
        "Before your interview, thoroughly research the company's mission, values, products, and recent news.",
      icon: <LightbulbIcon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />,
    },
    {
      title: "Practice STAR Method",
      description:
        "When answering behavioral questions, use the Situation, Task, Action, Result format for clear, concise responses.",
      icon: <TrendingUpIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />,
    },
    {
      title: "Prepare Questions",
      description:
        "Have 3-5 thoughtful questions ready to ask the interviewer about the role, team, or company culture.",
      icon: <LightbulbIcon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />,
    },
    {
      title: "Body Language Matters",
      description:
        "Maintain good posture, make appropriate eye contact, and use hand gestures naturally to appear confident.",
      icon: <TrendingUpIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />,
    },
  ];

  // Function to navigate through tips
  const navigateTip = (direction: "next" | "prev") => {
    if (direction === "next") {
      setActiveTip((prev) =>
        prev === tipsAndTricks.length - 1 ? 0 : prev + 1
      );
    } else {
      setActiveTip((prev) =>
        prev === 0 ? tipsAndTricks.length - 1 : prev - 1
      );
    }
  };

  return (
    <motion.section
      ref={historySectionRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative py-16 sm:py-20 md:py-24 lg:py-30 3xl:py-24 bg-[#1d1d20] w-full"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 3xl:px-1 max-w-5xl 3xl:max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-['Nunito'] font-black text-2xl sm:text-3xl md:text-4xl 3xl:text-5xl text-[#e8eef2] mb-8 sm:mb-10 md:mb-12 3xl:mb-14 text-center"
        >
          Your Dashboard
        </motion.h2>
        
        {/* Dashboard Components */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12 3xl:space-y-14">
          {/* Dashboard Stats - now with proper data */}
          <DashboardStats 
            interviewHistory={interviewHistory}
            analyticsSummary={analyticsSummary}
          />
          
          {/* Tips and Tricks Carousel Section */}
          <DashboardTipsTricks
            carouselRef={carouselRef}
            tipsAndTricks={tipsAndTricks}
            activeTip={activeTip}
            setActiveTip={setActiveTip}
            navigateTip={navigateTip}
          />
          
          {/* Recent Activity */}
          <DashboardRecentActivity />
          
          {/* Action Buttons */}
          <DashboardActionButtons navigate={navigate} />
        </div>
      </div>
    </motion.section>
  );
};