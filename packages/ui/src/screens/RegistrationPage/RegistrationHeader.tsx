import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type RegistrationHeaderProps = {
	navigate: ReturnType<typeof useNavigate>;
	handleBackToLogin: () => void;
};

export const RegistrationHeader = ({
	navigate,
	handleBackToLogin,
}: RegistrationHeaderProps) => {
	return (
		<div className="px-6 sm:px-8 lg:px-12 py-6 sm:py-8 3xl:py-10">
			{/* Logo */}
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}
				onClick={() => navigate("/")}
				className="cursor-pointer mb-6 sm:mb-4 3xl:mb-6"
			>
				<h1 className="font-['Nunito'] font-extrabold text-white text-lg sm:text-xl lg:text-2xl 3xl:text-[2.1rem] tracking-wider drop-shadow-lg">
					INTERVU ME
				</h1>
			</motion.div>

			{/* Back to Login and User Details - side by side */}
			<div className="flex flex-col sm:flex-row sm:items-center">
				{/* Back to Login button */}
				<motion.div
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3, duration: 0.5 }}
				>
					<Button
						variant="link"
						onClick={handleBackToLogin}
								className="font-['Nunito'] font-bold text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg p-0 h-auto flex items-center gap-1 hover:text-white"
					>
						<motion.img
							src="/back.png"
							alt="Back"
							width={16}
							height={16}
							className="w-4 h-4 3xl:w-5 3xl:h-5"
							initial={{ x: -5 }}
							animate={{ x: 0 }}
							transition={{ duration: 0.2 }}
						/>
						Back to Login
					</Button>
				</motion.div>
			</div>
		</div>
	);
};
