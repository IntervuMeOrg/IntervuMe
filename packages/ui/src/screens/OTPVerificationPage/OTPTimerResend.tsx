import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";

type OTPTimerResentProps = {
	timeLeft: number;
	canResend: boolean;
	handleResendOTP: () => void;
};

export const OTPTimerResend = ({
	timeLeft,
	canResend,
	handleResendOTP,
}: OTPTimerResentProps) => {
	return (
		<div className="absolute w-[422px] top-[calc(30vh+180px)] left-[61px] flex justify-between items-center">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
				className="font-['Nunito',Helvetica] font-bold text-[#c7d3dd] text-[12px] mt-2"
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
					className={`font-['Nunito',Helvetica] font-bold text-[14px] tracking-[0.7px] p-0 h-auto ${
						canResend
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
