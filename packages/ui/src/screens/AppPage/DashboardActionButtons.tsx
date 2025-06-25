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
			transition={{ delay: 0.9 }}
			className="flex justify-center gap-4"
		>
			<Button
				className="rounded-[5px] h-[52px] px-6 [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90"
				onClick={() => {
					window.scrollTo(0, 0); // Reset scroll position to top
					navigate("/start-interview");
				}}
			>
				<span className="font-['Nunito',Helvetica] font-semibold text-white text-[18px]">
					Start New Interview
				</span>
			</Button>
			<Button
				className="rounded-[5px] h-[52px] px-6 bg-white/10 hover:bg-white/20"
				onClick={() => {
					window.scrollTo(0, 0); // Reset scroll position to top
					navigate("/history");
				}}
			>
				<span className="font-['Nunito',Helvetica] font-semibold text-white text-[18px]">
					View Full History
				</span>
			</Button>
		</motion.div>
	);
};
