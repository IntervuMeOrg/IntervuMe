import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";

type OTPVerifyButtonProps = {
	otp: string[];
	isVerifying: boolean;
	handleVerifyOTP: () => void;
};

export const OTPVerifyButton = ({
	otp,
	isVerifying,
	handleVerifyOTP,
}: OTPVerifyButtonProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{
				delay: 0.6,
				type: "spring",
				stiffness: 120,
				damping: 12,
				mass: 0.8,
			}}
		>
			<Button
				className="absolute w-[422px] top-[calc(30vh+240px)] left-[61px] h-[59px] rounded-[5px] [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90 font-['Nunito',Helvetica] font-normal text-white text-[17px] tracking-[1.02px] flex items-center justify-center"
				onClick={handleVerifyOTP}
				disabled={otp.join("").length !== 6 || isVerifying}
			>
				{isVerifying ? (
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
						className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
					/>
				) : null}
				{isVerifying ? "Verifying..." : "Verify & Continue"}
			</Button>
		</motion.div>
	);
};
