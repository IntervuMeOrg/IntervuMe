import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { OTPInputFields } from "./OTPInputFields";
import { OTPTimerResend } from "./OTPTimerResend";
import { OTPVerifyButton } from "./OTPVerifyButton";

type OTPFormPanelProps = {
	navigate: ReturnType<typeof useNavigate>;
	handleBackToForgetPassword: () => void;
	otp: string[];
	inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
	handleInputChange: (index: number, value: string) => void;
	handleKeyDown: (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>
	) => void;
	handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
	timeLeft: number;
	canResend: boolean;
	handleResendOTP: () => void;
	isVerifying: boolean;
	handleVerifyOTP: () => void;
};

export const OTPFormPanel = ({
	navigate,
	handleBackToForgetPassword,
	otp,
	inputRefs,
	handleInputChange,
	handleKeyDown,
	handlePaste,
	timeLeft,
	canResend,
	handleResendOTP,
	isVerifying,
	handleVerifyOTP,
}: OTPFormPanelProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className="w-full lg:w-[32%] bg-[#1d1d20] relative flex flex-col min-h-screen overflow-hidden"
		>
			{/* Gradient overlay */}
			<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18] rounded-[3px]" />

			{/* Scrollable content container */}
			<div className="relative z-10 flex flex-col h-full">
				<div className="flex-1 p-6 sm:p-8 lg:p-10 xl:p-8 3xl:p-12">
					{/* Logo */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						onClick={() => navigate("/")}
						className="mb-6 sm:mb-8"
					>
						<h1 className="font-['Nunito'] font-extrabold text-white text-lg sm:text-xl lg:text-2xl 3xl:text-[2.1rem] tracking-wider cursor-pointer drop-shadow-lg">
							INTERVU ME
						</h1>
					</motion.div>

					{/* Back button */}
					<motion.div
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2 }}
						className="mb-4"
					>
						<Button
							variant="link"
							onClick={handleBackToForgetPassword}
							className="font-['Nunito'] font-bold text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg p-0 h-auto flex items-center gap-1 hover:text-white"
						>
							<img
								src="/back.png"
								alt="Back"
								className="w-3 h-3 sm:w-4 sm:h-4 3xl:w-5 3xl:h-5"
							/>
							Back to Email
						</Button>
					</motion.div>

					{/* Form container */}
					<div className="flex flex-col justify-center min-h-[calc(100vh-12rem)] sm:min-h-[calc(100vh-15rem)]">
						<div className="w-full max-w-sm 3xl:max-w-lg mx-auto lg:mx-2 3xl:mx-3">
							{/* Header */}
							<div className="mb-6 sm:mb-8 3xl:mb-10">
								<h2 className="font-['Nunito'] font-bold text-[#e8eef2] text-md sm:text-lg lg:text-xl 3xl:text-[1.8rem] tracking-wide">
									Verify Your Email
								</h2>
								<p className="font-['Nunito'] font-medium text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg mt-2">
									We've sent a 6-digit verification code to your email. Enter
									the code below to continue.
								</p>
							</div>

							{/* OTP Input Fields */}
							<OTPInputFields
								otp={otp}
								inputRefs={inputRefs}
								handleInputChange={handleInputChange}
								handleKeyDown={handleKeyDown}
								handlePaste={handlePaste}
							/>

							{/* Timer and Resend */}
							<OTPTimerResend
								timeLeft={timeLeft}
								canResend={canResend}
								handleResendOTP={handleResendOTP}
							/>

							{/* Verify Button */}
							<OTPVerifyButton
								otp={otp}
								isVerifying={isVerifying}
								handleVerifyOTP={handleVerifyOTP}
							/>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};
