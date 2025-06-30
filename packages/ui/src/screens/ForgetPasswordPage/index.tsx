import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ForgetPassowrdFormPanel } from "./ForgetPassowrdFormPanel";
export const ForgetPasswordPage = (): JSX.Element => {
	const navigate = useNavigate();

	const handleBackToLogin = () => {
		navigate("/login");
	};

	const handleSubmit = () => {
		navigate("/otp-verification");
	};

	return (
		<div className="min-h-screen bg-white flex">
			<ForgetPassowrdFormPanel
				navigate={navigate}
				handleBackToLogin={handleBackToLogin}
				handleSubmit={handleSubmit}
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
