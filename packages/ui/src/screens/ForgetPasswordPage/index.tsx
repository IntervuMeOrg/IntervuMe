import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ForgetPassowrdFormPanel } from "./ForgetPassowrdFormPanel";
import { Toast } from "../../components/ui/Toast";
import { authenticationSession, useForgotPassword } from "../../lib/authentication/authentication-hooks";

export const ForgetPasswordPage = (): JSX.Element => {
	const navigate = useNavigate();
	useEffect(() => {
		// If the user is already authenticated, redirect them
		if (authenticationSession.isAuthenticated()) {
			navigate("/app", { replace: true });
		}
	}, []);
	const { mutate: forgetPassword, isPending, error } = useForgotPassword();
	const [errorMessage, setErrorMessage] = useState("");
	const [showError, setShowError] = useState(false);
  	// Error handling effect
	useEffect(() => {
		if (error) {
		const msg = error?.response?.data?.message || error?.message || "Failed to send reset email";
		setErrorMessage(msg);
		setShowError(true);
		const timeout = setTimeout(() => setShowError(false), 3000);
		return () => clearTimeout(timeout);
		}
	}, [error]);

	const handleBackToLogin = () => {
		navigate("/login");
	};

	const handleSubmit = (data: { email: string }) => {
		forgetPassword(data, {
			onSuccess: () => {
				sessionStorage.setItem("resetFlowStep", "forgot");
				navigate("/otp-verification", {state: { email: data.email} });
			}
		});
	};

	// Toast notification state
	const [toast, setToast] = useState<{
		visible: boolean;
		message: string;
		type: "success" | "error" | "info";
	}>({
		visible: false,
		message: "",
		type: "success",
	});

	// Function to show toast
	const showToast = (
		message: string,
		type: "success" | "error" | "info" = "success"
	) => {
		setToast({ visible: true, message, type });
		setTimeout(() => setToast({ ...toast, visible: false }), 4000);
	};

	return (
		<div className="min-h-screen bg-white flex">
			{/* Toast notification */}
			{toast.visible && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast({ ...toast, visible: false })}
				/>
			)}
			<ForgetPassowrdFormPanel
				navigate={navigate}
				handleBackToLogin={handleBackToLogin}
				handleSubmit={handleSubmit}
				isLoading={isPending}
				errorMessage={showError ? errorMessage : ""}
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
						alt="Reset password illustration"
						src="/reset-password-bro-1.png"
					/>
				</motion.div>
			</div>
		</div>
	);
};

export default ForgetPasswordPage;
