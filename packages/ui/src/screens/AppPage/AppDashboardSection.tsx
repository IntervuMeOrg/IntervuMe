import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardStats } from "./DashboardStats";
import { DashboardTipsTricks } from "./DashboardTipsTricsk";
import { DashboardActionButtons } from "./DashboardActionButtons";
import { DashboardRecentActivity } from "./DashboardRecentActivity";
import { LightbulbIcon, TrendingUpIcon } from "lucide-react";

type AppDashboardSectionProbs = {
	historySectionRef: React.RefObject<HTMLElement>;
};

export const AppDashboardSection = ({
	historySectionRef,
}: AppDashboardSectionProbs) => {
	// Navigation hook for routing
	const navigate = useNavigate();
	// Reference for carousel container
	const carouselRef = useRef<HTMLDivElement>(null);
	// State for active tip in carousel
	const [activeTip, setActiveTip] = useState(0);

	// Tips and tricks data
	const tipsAndTricks = [
		{
			title: "Research the Company",
			description:
				"Before your interview, thoroughly research the company's mission, values, products, and recent news.",
			icon: <LightbulbIcon className="h-8 w-8 text-yellow-400" />,
		},
		{
			title: "Practice STAR Method",
			description:
				"When answering behavioral questions, use the Situation, Task, Action, Result format for clear, concise responses.",
			icon: <TrendingUpIcon className="h-8 w-8 text-green-400" />,
		},
		{
			title: "Prepare Questions",
			description:
				"Have 3-5 thoughtful questions ready to ask the interviewer about the role, team, or company culture.",
			icon: <LightbulbIcon className="h-8 w-8 text-yellow-400" />,
		},
		{
			title: "Body Language Matters",
			description:
				"Maintain good posture, make appropriate eye contact, and use hand gestures naturally to appear confident.",
			icon: <TrendingUpIcon className="h-8 w-8 text-green-400" />,
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
			viewport={{ once: true, margin: "-20% 0px" }}
			transition={{
				type: "spring",
				stiffness: 80,
				damping: 18,
				mass: 0.7,
			}}
			className="relative py-[10vh] bg-[#1d1d20] w-full"
		>
			<div className="max-w-[1000px] mx-auto px-4">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						delay: 0.4,
						type: "spring",
						stiffness: 100,
						damping: 12,
					}}
					className="font-['Nunito',Helvetica] font-black text-[40px] text-[#e8eef2] mb-8 text-center"
				>
					Your Dashboard
				</motion.h2>

				{/* Dashboard Stats */}
				<DashboardStats />

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
		</motion.section>
	);
};
