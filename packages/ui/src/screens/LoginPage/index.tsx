import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { motion } from "framer-motion";

export const LoginPage = (): JSX.Element => {
	const navigate = useNavigate();
	// Handle transition to registration page
	const handleSignUpClick = () => {
		// Delay navigation to allow animation to complete
		navigate("/register", { state: { fromLogin: true } });
	};

	const handleForgetPassword = () => {
		navigate("/forget-password");
	};

	const handleLogin = () => {
		// Handle login logic here
		navigate("/main-page-after-login");
	};
	return (
		<div className="bg-white w-full h-screen">
			<div className="bg-white w-full h-screen relative overflow-hidden">
				<div className="relative h-full bg-[url(/rectangle.png)] bg-cover bg-center w-full">
					{/* Left panel with login form */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-10% 0px" }}
						transition={{
							type: "spring",
							stiffness: 85,
							damping: 16,
							mass: 0.6,
						}}
						className="absolute w-[552px] h-full top-0 left-0 bg-[#1d1d20] overflow-hidden"
					>
						{/* Gradient overlay */}
						<div className="h-full [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
					</motion.div>
					{/* Logo */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{
							delay: 0.2,
							type: "spring",
							stiffness: 120,
							damping: 10,
						}}
						onClick={() => navigate("/")}
						className="absolute w-[324px] h-[76px] top-[5vh] left-0 [text-shadow:0px_4px_4px_#00000040] font-['Nunito',Helvetica] font-extrabold text-white text-[32px] text-center tracking-[1.92px] leading-normal cursor-pointer"
					>
						INTERVU&nbsp;&nbsp;ME
					</motion.div>

					{/* Login header */}
					<div className="absolute w-[84px] h-[51px] top-[15.6vh] left-[73px] font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-[22px] tracking-[1.62px] leading-normal">
						Login
					</div>
					<div className="absolute w-[auto] h-[18px] top-[18vh] left-[73px] font-['Nunito',Helvetica] font-bold text-[#c7d3dd] text-[11px] tracking-[0.78px] leading-normal mt-2">
						Login to access interviewing tech
					</div>

					{/* Email input */}
					<div className="absolute w-[422px] top-[254px] left-[66px]">
						<Input
							className="h-[52px] bg-[#e8eef2] rounded-[5px] px-4 text-black font-['Nunito',Helvetica] shadow-[0px_4px_4px_#00000040]"
							placeholder="Email"
							type="email"
						/>
					</div>

					{/* Password input */}
					<div className="absolute w-[422px] top-[346px] left-[66px]">
						<div className="relative">
							<Input
								className="h-[52px] bg-[#e8eef2] rounded-[5px] px-4 text-black font-['Nunito',Helvetica] shadow-[0px_4px_4px_#00000040]"
								placeholder="Password"
								type="password"
							/>
						</div>
					</div>

					{/* Remember me and forgot password */}
					<div className="absolute flex items-center gap-[10px] top-[435px] left-[66px]">
						<Checkbox
							id="remember-me"
							className="bg-[#e8eef2] rounded-[5px] h-[18px] w-[18px] [&_svg]:h-3 [&_svg]:w-3"
						/>
						<label
							htmlFor="remember-me"
							className="opacity-[0.87] font-['Nunito',Helvetica] font-normal text-white text-[13px] tracking-[0.8px]"
						>
							Remember Me
						</label>
					</div>

					<div className="absolute top-[420px] left-[350px]">
						<Button
							variant="link"
							onClick={handleForgetPassword}
							className="font-['Nunito',Helvetica] font-bold text-[#c7d3dd] text-[11px] tracking-[0.7px] p-0 h-auto"
						>
							forget password?
						</Button>
					</div>

					{/* Login button */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							delay: 0.6,
							type: "spring",
							stiffness: 100,
							damping: 15,
						}}
						className="absolute w-[422px] top-[535px] left-[66px]"
					>
						<Button
							className="w-full h-[52px] [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90 rounded-[5px] font-['Nunito',Helvetica] text-[17px] tracking-[1.02px]"
							onClick={handleLogin}
						>
							Login
						</Button>
					</motion.div>
				</div>

				{/* Google login button */}
				<div className="absolute w-[422px] top-[615px] left-[66px]">
					<Button
						variant="outline"
						className="w-full h-[52px] bg-[#e8eef2] rounded-[5px] flex items-center justify-center gap-4 text-black"
					>
						<img
							className="w-[39px] h-[39px] object-cover"
							alt="Google"
							src="/google-1.png"
						/>
						<span className="font-['Nunito',Helvetica] font-normal text-[17px] tracking-[1.02px]">
							Continue With Google
						</span>
					</Button>
				</div>

				{/* Sign up link */}
				<div className="absolute flex items-center justify-center gap-8 top-[697px] left-[105px]">
					<span className="opacity-80 font-['Nunito',Helvetica] font-medium text-[#c7d3dd] text-[13px] tracking-[2px]">
						Don&apos;t have an account?
					</span>
					<Button
						variant="link"
						onClick={handleSignUpClick}
						className="font-['Nunito',Helvetica] font-extrabold text-white text-[13px] tracking-[1px] underline p-0 h-auto"
					>
						Sign Up for free
					</Button>
				</div>
			</div>

			{/* Right panel with illustration */}
			<motion.img
				initial={{ opacity: 0, x: 20 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true, margin: "-10% 0px" }}
				transition={{ delay: 0.4, type: "spring", stiffness: 80, damping: 18 }}
				className="absolute w-[45vw] h-auto max-h-[80vh] top-[14vh] right-[9vw] transform -translate-y-1/2 object-contain"
				alt="Login illustration"
				src="/login-bro-1.png"
			/>
		</div>
	);
};

export default LoginPage;