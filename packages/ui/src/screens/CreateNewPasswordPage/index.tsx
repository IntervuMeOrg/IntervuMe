import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CreateNewPasswordFormPanel } from "./CreateNewPasswordFormPanel";
export const CreateNewPasswordPage = (): JSX.Element => {
	const navigate = useNavigate();

	const handleBackToLogin = () => {
		navigate("/login");
	};

	const handleSetPassword = () => {
		// Add password validation logic here
		navigate("/login");
	};

	return (
		<div className="min-h-screen bg-white flex">
			<CreateNewPasswordFormPanel
				handleSetPassword={handleSetPassword}
				navigate={navigate}
				handleBackToLogin={handleBackToLogin}
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
						alt="Reset password illustration"
						src="/reset-password-bro-1.png"
					/>
				</motion.div>
			</div>
		</div>
	);
};

export default CreateNewPasswordPage;
