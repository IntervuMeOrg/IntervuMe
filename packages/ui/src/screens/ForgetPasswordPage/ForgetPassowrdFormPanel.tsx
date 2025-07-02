import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

type ForgetPassowrdFormPanelProps = {
	navigate: ReturnType<typeof useNavigate>;
	handleBackToLogin: () => void;
	handleSubmit?: () => void;
};

export const ForgetPassowrdFormPanel = ({
	navigate,
	handleBackToLogin,
	handleSubmit,
}: ForgetPassowrdFormPanelProps) => {
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

						{/* Form container */}
						<div className="flex flex-col justify-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-15rem)]">
							<div className="w-full max-w-sm 3xl:max-w-lg mx-auto lg:mx-2 3xl:mx-3">
								{/* Form header */}
								<div className="mb-6 sm:mb-8 3xl:mb-10">
									<h2 className="font-['Nunito'] font-bold text-[#e8eef2] text-md sm:text-lg lg:text-xl 3xl:text-[1.8rem] tracking-wide">
										Forget Password
									</h2>
									<p className="font-['Nunito'] font-medium text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg">
										Enter your email to reset password
									</p>
								</div>

								{/* Form fields */}
								<form className="space-y-4 sm:space-y-3 3xl:space-y-5">
									{/* Email input */}
									<div>
										<Input
											className="h-8 sm:h-10 lg:h-10 3xl:h-14 bg-[#e8eef2] rounded-md px-3 sm:px-4 3xl:px-6 text-black font-['Nunito'] shadow-md w-full text-sm sm:text-base 3xl:text-lg"
											placeholder="Email"
											type="email"
										/>
									</div>

									{/* Submit button */}
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.3, duration: 0.5 }}
									>
										<Button
											className="w-full h-8 sm:h-10 lg:h-10 3xl:h-14 bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] 
                               hover:opacity-90 rounded-md font-['Nunito'] text-sm sm:text-base 3xl:text-[1.3rem] tracking-wide mt-2"
											onClick={handleSubmit}
										>
											Submit
										</Button>
									</motion.div>

									{/* Back to login link */}
									<div className="text-center pt-2 sm:pt-4 mt-6 sm:mt-8 3xl:mt-10">
										<div className="inline-flex items-center gap-x-1 sm:gap-x-2 3xl:gap-x-4">
											<span className="font-['Nunito'] font-medium text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg">
												Remember your password?
											</span>
											<Button
												variant="link"
												onClick={handleBackToLogin}
												className="font-['Nunito'] font-bold text-white text-xs sm:text-xs 3xl:text-sm underline p-0 h-auto hover:opacity-80 tracking-[1px]"
											>
												Back to Login
											</Button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
};
