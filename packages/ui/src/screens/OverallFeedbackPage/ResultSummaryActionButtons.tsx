import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

type ResultSummaryActionButtonsProps = {
	navigate: ReturnType<typeof useNavigate>;
	setShowDetailedFeedback: (show: boolean) => void;
};

export const ResultSummaryActionButtons = ({
	navigate,
	setShowDetailedFeedback,
}: ResultSummaryActionButtonsProps) => {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 20 },
				visible: { opacity: 1, y: 0 },
			}}
			transition={{ delay: 1.0 }}
			className="flex flex-col sm:flex-row gap-4 justify-center"
		>
			<Button
				onClick={() => {
					window.scrollTo(0, 0);
					setShowDetailedFeedback(true);
				}}
				className="bg-gradient-to-r from-[#0667D0] to-[#033464] hover:opacity-90 text-white px-6 py-3 rounded-md transition-all"
			>
				View Detailed Feedback
			</Button>

			<Button
				onClick={() => {
					window.scrollTo(0, 0);
					navigate("/interview");
				}}
				className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3 rounded-md transition-all"
			>
				Take Another Interview
			</Button>
		</motion.div>
	);
};
