import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateNewPasswordFormPanel } from "./CreateNewPasswordFormPanel";
import { authenticationSession } from "../../lib/authentication/authentication-hooks";
import { useEffect, useState } from "react";
import { useResetPassword } from "../../lib/authentication/authentication-hooks";

export const CreateNewPasswordPage = (): JSX.Element => {
	const navigate = useNavigate();
	const location = useLocation();
	
	const { mutate: resetPassword, isPending, error } = useResetPassword();
	const [errorMessage, setErrorMessage] = useState("");
	const [showError, setShowError] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	const email = location.state?.email || "";

	useEffect(() => {
		// If the user is already authenticated, redirect them
		if (authenticationSession.isAuthenticated()) {
			sessionStorage.removeItem("resetFlowStep");
			navigate("/app", { replace: true });
		}
	}, [navigate]);

	useEffect(() => {
		const step = sessionStorage.getItem("resetFlowStep");
		if (step !== "otp") {
			sessionStorage.removeItem("resetFlowStep");
			navigate("/login", { replace: true });
		}
	}, []);

	useEffect(() => {
		// Handle API error
		if (error) {
			const errorMsg = (error as any)?.response?.data?.message || 
							 (error as any)?.message || 
							 "Failed to reset password";
			setErrorMessage(errorMsg);
			setShowError(true);
			setTimeout(() => setShowError(false), 5000);
		}
	}, [error]);

	const handleBackToLogin = () => {
		sessionStorage.removeItem("resetFlowStep");
		navigate("/login");
	};

	const handleSetPassword = (newPassword: string, confirmPassword: string) => {
		// Clear previous errors
		setErrorMessage("");
		setShowError(false);
		setSuccessMessage("");

		// Basic client-side validation (form validation should handle this, but double-check)
		if (newPassword !== confirmPassword) {
			setErrorMessage("Passwords don't match");
			setShowError(true);
			setTimeout(() => setShowError(false), 3000);
			return;
		}

		if (newPassword.length < 8) {
			setErrorMessage("Password must be at least 8 characters");
			setShowError(true);
			setTimeout(() => setShowError(false), 3000);
			return;
		}

		if (!email) {
			setErrorMessage("Email is required for password reset");
			setShowError(true);
			setTimeout(() => setShowError(false), 3000);
			return;
		}

		// Call the API
		resetPassword(
			{ 
				email: email, 
				password: newPassword 
			},
			{
				onSuccess: () => {
					setSuccessMessage("Password reset successfully! Redirecting to login...");
					sessionStorage.removeItem("resetFlowStep");
					setTimeout(() => navigate("/login"), 2000);
				},
				onError: (error: any) => {
					const errorMsg = error?.response?.data?.message || 
									 error?.message || 
									 "Failed to reset password";
					setErrorMessage(errorMsg);
					setShowError(true);
					setTimeout(() => setShowError(false), 5000);
				}
			}
		);
	};

	return (
		<div className="min-h-screen bg-white flex">
			<CreateNewPasswordFormPanel
				handleSetPassword={handleSetPassword}
				navigate={navigate}
				handleBackToLogin={handleBackToLogin}
				isLoading={isPending}
				errorMessage={errorMessage}
				showError={showError}
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
						alt="Reset password illustration"
						src="/reset-password-bro-1.png"
					/>
				</motion.div>
			</div>
		</div>
	);
};

export default CreateNewPasswordPage;