import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { motion } from "framer-motion";

export const ForgetPasswordPage = (): JSX.Element => {
	const navigate = useNavigate();

	const handleBackToLogin = () => {
		navigate("/login");
	};

	const handleSubmit = () => {
		// Handle form submission logic here
		navigate("/otp-verification"); // Navigate to OTP verification page
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

					{/* Back to Login button */}
					<motion.div
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2 }}
						className="absolute top-[12vh] left-[46px] z-10"
					>
						<Button
							variant="link"
							onClick={handleBackToLogin}
							className="font-['Nunito',Helvetica] font-bold text-[#c7d3dd] text-[14px] tracking-[0.7px] p-0 h-auto flex items-center gap-1"
						>
							<motion.img
								src="/back.png"
								alt="Back"
								width={14}
								height={20}
								initial={{ x: -5 }}
								animate={{ x: 0 }}
								transition={{ duration: 0.2 }}
							/>
							Back to Login
						</Button>
					</motion.div>

					{/* Heading */}
					<div className="absolute w-[378px] top-[32vh] left-[65px] font-['Nunito',Helvetica] font-extrabold text-[#e8eef2] text-[31px] tracking-[1.80px]">
						Forget your Password?
					</div>

					{/* Description */}
					<div className="absolute w-[311px] h-10 top-[calc(30vh+50px)] left-[68px] font-['Nunito',Helvetica] font-bold text-[#c7d3dd] text-[12px] tracking-[0.78px] leading-normal mt-2">
						Don&apos;t worry, happens to all of us. Enter your email below to
						recover your password
					</div>

					{/* Email Input */}
					<Card className="absolute w-[422px] top-[calc(30vh+120px)] left-[61px] shadow-[0px_4px_4px_#00000040] border-0 mt-2">
						<CardContent className="p-0">
							<Input
								className="w-[420px] h-[59px] bg-[#e8eef2] rounded-[5px] px-4 font-['Nunito',Helvetica] text-base placeholder:opacity-[0.57] placeholder:text-black placeholder:tracking-[0.96px]"
								placeholder="Email"
							/>
						</CardContent>
					</Card>

					{/* Submit Button */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							delay: 0.6,
							type: "spring",
							stiffness: 120,
							damping: 12,
							mass: 0.8,
						}}
					>
						<Button
							className="absolute w-[422px] top-[calc(30vh+220px)] left-[61px] h-[59px] rounded-[5px] [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90 font-['Nunito',Helvetica] font-normal text-white text-[17px] tracking-[1.02px]"
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</motion.div>
				</div>

				{/* Right Side Image */}
				<motion.img
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{
						delay: 0.3,
						type: "spring",
						stiffness: 85,
						damping: 16,
						mass: 0.6,
					}}
					className="absolute w-[45vw] h-auto max-h-[80vh] top-[14vh] right-[9vw] transform -translate-y-1/2 object-contain"
					alt="Reset password illustration"
					src="/reset-password-bro-1.png"
				/>
			</div>
		</div>
	);
};

export default ForgetPasswordPage;