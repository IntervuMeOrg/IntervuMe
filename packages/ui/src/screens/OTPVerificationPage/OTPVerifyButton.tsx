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
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3, duration: 0.5 }}
		>
			<Button
				className="w-full h-8 sm:h-10 lg:h-10 3xl:h-14 bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] 
					hover:opacity-90 rounded-md font-['Nunito'] text-sm sm:text-base 3xl:text-[1.3rem] tracking-wide
					disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
				onClick={handleVerifyOTP}
				disabled={otp.join("").length !== 6 || isVerifying}
			>
				{isVerifying && (
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
						className="w-4 h-4 3xl:w-6 3xl:h-6 border-2 border-white border-t-transparent rounded-full mr-2"
					/>
				)}
				{isVerifying ? "Verifying..." : "Verify & Continue"}
			</Button>
		</motion.div>
	);
};
