import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { OTPFormPanel } from "./OTPFormPanel";
import { OTPInputFields } from "./OTPInputFields";
import { OTPTimerResend } from "./OTPTimerResend";
import { OTPVerifyButton } from "./OTPVerifyButton";

export const OTPVerificationPage = (): JSX.Element => {
	const navigate = useNavigate();
	const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
	const [timeLeft, setTimeLeft] = useState<number>(60);
	const [canResend, setCanResend] = useState<boolean>(false);
	const [isVerifying, setIsVerifying] = useState<boolean>(false);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	// Timer effect
	useEffect(() => {
		if (timeLeft > 0) {
			const timerId = setTimeout(() => {
				setTimeLeft(timeLeft - 1);
			}, 1000);
			return () => clearTimeout(timerId);
		} else {
			setCanResend(true);
		}
	}, [timeLeft]);

	// Focus first input on mount
	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	const handleBackToForgetPassword = () => {
		navigate("/forget-password");
	};

	const handleResendOTP = () => {
		if (canResend) {
			setTimeLeft(60);
			setCanResend(false);
			setOtp(["", "", "", "", "", ""]);
			setTimeout(() => {
				if (inputRefs.current[0]) {
					inputRefs.current[0].focus();
				}
			}, 100);
			console.log("Resending OTP...");
		}
	};

	const handleInputChange = (index: number, value: string) => {
		if (value && !/^\d+$/.test(value)) return;

		const newOtp = [...otp];
		newOtp[index] = value.slice(-1);
		setOtp(newOtp);

		if (value && index < 5 && inputRefs.current[index + 1]) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (
			e.key === "Backspace" &&
			!otp[index] &&
			index > 0 &&
			inputRefs.current[index - 1]
		) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text/plain").trim();

		if (/^\d{6}$/.test(pastedData)) {
			const newOtp = pastedData.split("");
			setOtp(newOtp);
			if (inputRefs.current[5]) {
				inputRefs.current[5].focus();
			}
		}
	};

	const handleVerifyOTP = () => {
		const otpValue = otp.join("");
		if (otpValue.length !== 6) return;

		setIsVerifying(true);
		setTimeout(() => {
			setIsVerifying(false);
			navigate("/create-new-password");
		}, 1500);
	};

	return (
		<div className="min-h-screen bg-white flex">
			<OTPFormPanel
				navigate={navigate}
				handleBackToForgetPassword={handleBackToForgetPassword}
				otp={otp}
				inputRefs={inputRefs}
				handleInputChange={handleInputChange}
				handleKeyDown={handleKeyDown}
				handlePaste={handlePaste}
				timeLeft={timeLeft}
				canResend={canResend}
				handleResendOTP={handleResendOTP}
				isVerifying={isVerifying}
				handleVerifyOTP={handleVerifyOTP}
			/>

			{/* Right panel with illustration */}
			<div
				className="hidden lg:flex lg:w-[68%] relative bg-cover bg-center"
				style={{ backgroundImage: "url(/rectangle.png)" }}
			>
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
					className="flex items-center justify-center w-full p-12"
				>
					<img
						className="max-w-full max-h-[80vh] object-contain"
						alt="OTP verification illustration"
						src="/Enter-OTP-bro.png"
					/>
				</motion.div>
			</div>
		</div>
	);
};

export default OTPVerificationPage;