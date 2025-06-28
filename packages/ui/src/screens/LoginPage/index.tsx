import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { motion } from "framer-motion";

export const LoginPage = (): JSX.Element => {
	const navigate = useNavigate();

	const handleSignUpClick = () => {
		navigate("/register", { state: { fromLogin: true } });
	};

	const handleForgetPassword = () => {
		navigate("/forget-password");
	};

	const handleLogin = () => {
		navigate("/app");
	};

	return (
		<div className="min-h-screen bg-white flex">
			{/* Left panel with login form */}
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

						{/* Login form container */}
						<div className="flex flex-col justify-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-15rem)]">
							<div className="w-full max-w-sm mx-auto lg:mx-2">
								{/* Login header */}
								<div className="mb-6 sm:mb-8">
									<h2 className="font-['Nunito'] font-bold text-[#e8eef2] text-md sm:text-lg lg:text-xl tracking-wide">
										Login
									</h2>
									<p className="font-['Nunito'] font-medium text-[#c7d3dd] text-xs sm:text-sm">
										Login to access interviewing tech
									</p>
								</div>

								{/* Form fields */}
								<form className="space-y-4 sm:space-y-5">
									{/* Email input */}
									<div>
										<Input
											className="h-6 sm:h-8 lg:h-10 bg-[#e8eef2] rounded-md px-3 sm:px-4 text-black font-['Nunito'] shadow-md w-full text-sm sm:text-base"
											placeholder="Email"
											type="email"
										/>
									</div>

									{/* Password input */}
									<div>
										<Input
											className="h-6 sm:h-8 lg:h-10 bg-[#e8eef2] rounded-md px-3 sm:px-4 text-black font-['Nunito'] shadow-md w-full text-sm sm:text-base"
											placeholder="Password"
											type="password"
										/>
									</div>

									{/* Remember me and forgot password */}
									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
										<div className="flex items-center gap-2">
											<Checkbox
												id="remember-me"
												className="bg-[#e8eef2] rounded h-4 w-4"
											/>
											<label
												htmlFor="remember-me"
												className="font-['Nunito'] font-normal text-white text-xs sm:text-sm opacity-90"
											>
												Remember Me
											</label>
										</div>

										<Button
											variant="link"
											onClick={handleForgetPassword}
											className="font-['Nunito'] font-medium text-[#c7d3dd] text-xs sm:text-sm p-0 h-auto hover:text-white"
										>
											Forgot password?
										</Button>
									</div>

									{/* Login button */}
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.3, duration: 0.5 }}
									>
										<Button
											className="w-full h-6 sm:h-8 lg:h-10 bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] 
                               hover:opacity-90 rounded-md font-['Nunito'] text-sm sm:text-base tracking-wide mt-5"
											onClick={handleLogin}
										>
											Login
										</Button>
									</motion.div>

									{/* Google login button */}
									<div>
										<Button
											variant="outline"
											className="w-full h-6 sm:h-8 lg:h-10 bg-[#e8eef2] hover:bg-[#d8dee2] rounded-md flex items-center justify-center gap-2 sm:gap-3 text-black
											overflow-hidden"
										>
											<img
												className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-cover"
												alt="Google"
												src="/google-1.png"
											/>
											<span className="font-['Nunito'] font-normal text-sm sm:text-base">
												Continue With Google
											</span>
										</Button>
									</div>

									{/* Sign up link */}
									<div className="text-center pt-2 sm:pt-4 mt-6 sm:mt-8">
										<div className="inline-flex items-center gap-x-1 sm:gap-x-2">
											<span className="font-['Nunito'] font-medium text-[#c7d3dd] text-xs sm:text-sm">
												Don't have an account?
											</span>
											<Button
												variant="link"
												onClick={handleSignUpClick}
												className="font-['Nunito'] font-bold text-white text-xs sm:text-xs underline p-0 h-auto hover:opacity-80 tracking-[1px]"
											>
												Sign Up for free
											</Button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

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
						alt="Login illustration"
						src="/login-bro-1.png"
					/>
				</motion.div>
			</div>
		</div>
	);
};

export default LoginPage;
