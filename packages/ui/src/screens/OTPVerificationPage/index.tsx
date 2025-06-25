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
	const [timeLeft, setTimeLeft] = useState<number>(60); // 60 seconds timer
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
			// Reset timer and OTP fields
			setTimeLeft(60);
			setCanResend(false);
			setOtp(["", "", "", "", "", ""]);

			// Focus first input after resend
			setTimeout(() => {
				if (inputRefs.current[0]) {
					inputRefs.current[0].focus();
				}
			}, 100);

			// Here you would call your API to resend OTP
			console.log("Resending OTP...");
		}
	};

	const handleInputChange = (index: number, value: string) => {
		// Only allow numbers
		if (value && !/^\d+$/.test(value)) return;

		const newOtp = [...otp];
		// Take only the last character if multiple characters are pasted
		newOtp[index] = value.slice(-1);
		setOtp(newOtp);

		// Auto-focus next input if value is entered
		if (value && index < 5 && inputRefs.current[index + 1]) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		// Move to previous input on backspace if current input is empty
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

		// Check if pasted content is a 6-digit number
		if (/^\d{6}$/.test(pastedData)) {
			const newOtp = pastedData.split("");
			setOtp(newOtp);

			// Focus last input after paste
			if (inputRefs.current[5]) {
				inputRefs.current[5].focus();
			}
		}
	};

	const handleVerifyOTP = () => {
		const otpValue = otp.join("");

		// Check if OTP is complete
		if (otpValue.length !== 6) {
			return;
		}

		setIsVerifying(true);

		// Simulate verification (replace with actual API call)
		setTimeout(() => {
			setIsVerifying(false);
			// For demo purposes, any 6-digit OTP is considered valid
			navigate("/create-new-password");
		}, 1500);
	};

	return (
		<div className="bg-white w-full h-screen">
			<div className="bg-white w-full h-screen relative overflow-hidden">
				<div className="relative h-full bg-[url(/rectangle.png)] bg-cover bg-center w-full">
					<OTPFormPanel
						navigate={navigate}
						handleBackToForgetPassword={handleBackToForgetPassword}
					/>

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

				{/* Right Side Image */}
				<motion.img
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{
						delay: 0.3,
						type: "spring",
						stiffness: 85,
						damping: 16,
						mass: 0.6,
					}}
					className="absolute w-[45vw] h-auto max-h-[80vh] top-[14vh] right-[9vw] transform -translate-y-1/2 object-contain"
					alt="OTP verification illustration"
					src="/Enter-OTP-bro.png"
				/>
			</div>
		</div>
	);
};

export default OTPVerificationPage;
