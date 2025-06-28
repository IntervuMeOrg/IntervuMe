import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";

type CreateNewPasswordFormPanelProps = {
	handleSetPassword?: () => void;
	handleBackToLogin?: () => void;
	navigate: ReturnType<typeof useNavigate>;
};

export const CreateNewPasswordFormPanel = ({
	handleSetPassword,
	handleBackToLogin,
	navigate,
}: CreateNewPasswordFormPanelProps) => {
	return (
		<>
			{/* Left panel with form */}
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
					<div className="flex-1 p-6 sm:p-8 lg:p-10 xl:p-8">
						{/* Logo */}
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.2, duration: 0.5 }}
							onClick={() => navigate("/")}
							className="mb-6 sm:mb-8"
						>
							<h1 className="font-['Nunito'] font-extrabold text-white text-lg sm:text-xl lg:text-2xl tracking-wider cursor-pointer drop-shadow-lg">
								INTERVU ME
							</h1>
						</motion.div>

						{/* Back button - MOVED HERE */}
						<motion.div
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2 }}
							className="mb-4"
						>
							<Button
								variant="link"
								onClick={handleBackToLogin}
								className="font-['Nunito'] font-bold text-[#c7d3dd] text-xs sm:text-sm p-0 h-auto flex items-center gap-1 hover:text-white"
							>
								<img
									src="/back.png"
									alt="Back"
									className="w-3 h-3 sm:w-4 sm:h-4"
								/>
								Back to Login
							</Button>
						</motion.div>

						{/* Form container */}
						<div className="flex flex-col justify-center min-h-[calc(100vh-12rem)] sm:min-h-[calc(100vh-15rem)]">
							<div className="w-full max-w-sm mx-auto lg:mx-2">
								{/* Header */}
								<div className="mb-6 sm:mb-8">
									<h2 className="font-['Nunito'] font-bold text-[#e8eef2] text-md sm:text-lg lg:text-xl tracking-wide">
										Create New Password
									</h2>
									<p className="font-['Nunito'] font-medium text-[#c7d3dd] text-xs sm:text-sm">
										Your new password must be different from previous used
										passwords
									</p>
								</div>

								{/* Form fields */}
								<form className="space-y-4 sm:space-y-5">
									{/* Password input */}
									<div>
										<Input
											className="h-8 sm:h-10 lg:h-10 bg-[#e8eef2] rounded-md px-3 sm:px-4 text-black font-['Nunito'] shadow-md w-full text-sm sm:text-base placeholder:text-black/60"
											placeholder="Create Password"
											type="password"
										/>
									</div>

									{/* Confirm password input */}
									<div>
										<Input
											className="h-8 sm:h-10 lg:h-10 bg-[#e8eef2] rounded-md px-3 sm:px-4 text-black font-['Nunito'] shadow-md w-full text-sm sm:text-base placeholder:text-black/60"
											placeholder="Re-enter Password"
											type="password"
										/>
									</div>

									{/* Password requirements */}
									<div className="mt-3 space-y-1">
										<p className="font-['Nunito'] font-normal text-[#c7d3dd] text-xs">
											Password must:
										</p>
										<ul className="list-disc list-inside space-y-1 ml-2">
											<li className="font-['Nunito'] font-normal text-[#c7d3dd] text-xs">
												Be at least 8 characters long
											</li>
											<li className="font-['Nunito'] font-normal text-[#c7d3dd] text-xs">
												Contain at least one uppercase letter
											</li>
											<li className="font-['Nunito'] font-normal text-[#c7d3dd] text-xs">
												Contain at least one number
											</li>
										</ul>
									</div>

									{/* Set password button */}
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.3, duration: 0.5 }}
									>
										<Button
											className="w-full h-8 sm:h-10 lg:h-10 bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] 
                               hover:opacity-90 rounded-md font-['Nunito'] text-sm sm:text-base tracking-wide mt-5"
											onClick={handleSetPassword}
										>
											Set Password
										</Button>
									</motion.div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
};