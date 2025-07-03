import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { OTPFormPanel } from "./OTPFormPanel";
import {
	useVerifyOTP,
	useForgotPassword,
	authenticationSession,
} from "../../lib/authentication/authentication-hooks";

export const OTPVerificationPage = (): JSX.Element => {
	const navigate = useNavigate();
	useEffect(() => {
		// If the user is already authenticated, redirect them
		if (authenticationSession.isAuthenticated()) {
			navigate("/app", { replace: true });
		}
	}, []);
	const location = useLocation();
	const { mutate: verifyOTP, isPending, error } = useVerifyOTP();
	const { mutate: resendOTP } = useForgotPassword();

	const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
	const [timeLeft, setTimeLeft] = useState<number>(60);
	const [canResend, setCanResend] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [showError, setShowError] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	const email = location.state?.email || "";

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

	// Error handling effect
	useEffect(() => {
		if (error) {
			const msg =
				error?.response?.data?.message ||
				error?.message ||
				"OTP verification failed";
			setErrorMessage(msg);
			setShowError(true);
			const timeout = setTimeout(() => setShowError(false), 3000);
			return () => clearTimeout(timeout);
		}
	}, [error]);

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
		if (canResend && email) {
			resendOTP(
				{ email },
				{
					onSuccess: () => {
						setTimeLeft(60);
						setCanResend(false);
						setOtp(["", "", "", "", "", ""]);
						setTimeout(() => {
							if (inputRefs.current[0]) {
								inputRefs.current[0].focus();
							}
						}, 100);
						setSuccessMessage("New verification code sent successfully!");
						setTimeout(() => setSuccessMessage(""), 3000); // Clear after 3 seconds
					},
					onError: (error) => {
						const msg =
							error?.response?.data?.message ||
							error?.message ||
							"Failed to resend OTP";
						setErrorMessage(msg);
						setShowError(true);
						setTimeout(() => setShowError(false), 3000);
					},
				}
			);
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
		if (otpValue.length !== 6 || !email) return;
		verifyOTP(
			{ email, otp: otpValue },
			{
				onSuccess: () => {
					navigate("/create-new-password", { state: { email: email } });
				},
			}
		);
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
				isVerifying={isPending}
				handleVerifyOTP={handleVerifyOTP}
				errorMessage={showError ? errorMessage : ""}
				successMessage={successMessage}
			/>

			{/* Right panel with illustration */}
			<div
				className="hidden lg:flex lg:w-[68%] relative bg-cover bg-center overflow-hidden"
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
