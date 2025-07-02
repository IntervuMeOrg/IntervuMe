import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";

type OTPTimerResendProps = {
	timeLeft: number;
	canResend: boolean;
	handleResendOTP: () => void;
};

export const OTPTimerResend = ({
	timeLeft,
	canResend,
	handleResendOTP,
}: OTPTimerResendProps) => {
	return (
		<div className="flex justify-between items-center mb-6 3xl:mb-8">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
				className="font-['Nunito'] font-medium text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg"
			>
				{!canResend ? `Resend code in ${timeLeft}s` : "Code expired"}
			</motion.div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
			>
				<Button
					variant="link"
					onClick={handleResendOTP}
					disabled={!canResend}
					className={`font-['Nunito'] font-medium text-xs sm:text-sm 3xl:text-lg p-0 h-auto transition-colors
						${canResend
							? "text-[#0667D0] hover:text-[#054E9D]"
							: "text-[#c7d3dd] opacity-50 cursor-not-allowed"
						}`}
				>
					Resend Code
				</Button>
			</motion.div>
		</div>
	);
};