import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

type DashboardTipsTricksProps = {
	carouselRef: React.RefObject<HTMLDivElement>;
	tipsAndTricks: {
		title: string;
		description: string;
		icon: React.ReactNode;
	}[];
	activeTip: number;
	setActiveTip: (index: number) => void;
	navigateTip: (direction: "next" | "prev") => void;
};

export const DashboardTipsTricks = ({
	carouselRef,
	tipsAndTricks,
	activeTip,
	setActiveTip,
	navigateTip,
}: DashboardTipsTricksProps) => {
	return (
		<motion.div
			id="tipsAndTricks"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.7 }}
			className="w-full mb-8"
		>
			<h3 className="font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-xl mb-4">
				Interview Tips & Tricks
			</h3>
			<div className="relative">
				<div
					ref={carouselRef}
					className="bg-gradient-to-r from-[#0667D0] to-[#033464] rounded-lg p-6 shadow-lg relative overflow-hidden"
				>
					<div className="absolute top-1/2 -translate-y-1/2 left-2 z-10">
						<Button
							variant="ghost"
							size="icon"
							className="bg-white/20 hover:bg-white/30 rounded-full h-8 w-8"
							onClick={() => navigateTip("prev")}
						>
							<ChevronLeftIcon className="h-5 w-5 text-white" />
						</Button>
					</div>
					<div className="absolute top-1/2 -translate-y-1/2 right-2 z-10">
						<Button
							variant="ghost"
							size="icon"
							className="bg-white/20 hover:bg-white/30 rounded-full h-8 w-8"
							onClick={() => navigateTip("next")}
						>
							<ChevronRightIcon className="h-5 w-5 text-white" />
						</Button>
					</div>
					<div className="flex items-center gap-6">
						<div className="flex-shrink-0 bg-white/10 p-4 rounded-full">
							{tipsAndTricks[activeTip].icon}
						</div>
						<div>
							<h3 className="font-['Nunito',Helvetica] font-bold text-white text-xl mb-2">
								{tipsAndTricks[activeTip].title}
							</h3>
							<p className="font-['Nunito',Helvetica] text-white text-sm opacity-90">
								{tipsAndTricks[activeTip].description}
							</p>
						</div>
					</div>
					<div className="flex justify-center mt-4 gap-1">
						{tipsAndTricks.map((_, index) => (
							<div
								key={index}
								className={`h-1.5 rounded-full transition-all ${
									index === activeTip ? "w-6 bg-white" : "w-1.5 bg-white/40"
								}`}
								onClick={() => setActiveTip(index)}
							></div>
						))}
					</div>
				</div>
			</div>
		</motion.div>
	);
};
