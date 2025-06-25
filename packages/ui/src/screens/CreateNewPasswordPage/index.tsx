import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { CreateNewPasswordFormPanel } from "./CreateNewPasswordFormPanel";

export const CreateNewPasswordPage = (): JSX.Element => {
	const navigate = useNavigate();

	const handleBackToLogin = () => {
		navigate("/login");
	};

	const handleBackToForgetPassword = () => {
		navigate("/forget-password");
	};

	return (
		<div className="bg-white w-full h-screen">
			<div className="bg-white w-full h-screen relative overflow-hidden">
				<div className="relative h-full bg-[url(/rectangle.png)] bg-cover bg-center w-full">
					<CreateNewPasswordFormPanel
						handleBackToForgetPassword={handleBackToForgetPassword}
					/>

					{/* Password Input */}
					<Card className="absolute w-[422px] top-[calc(30vh+120px)] left-[61px] shadow-[0px_4px_4px_#00000040] border-0 mt-2">
						<CardContent className="p-0">
							<Input
								type="password"
								className="w-[420px] h-[59px] bg-[#e8eef2] rounded-[5px] px-4 font-['Nunito',Helvetica] text-base placeholder:opacity-[0.57] placeholder:text-black placeholder:tracking-[0.96px]"
								placeholder="Create Password"
							/>
						</CardContent>
					</Card>

					{/* Confirm Password Input */}
					<Card className="absolute w-[422px] top-[calc(30vh+190px)] left-[61px] shadow-[0px_4px_4px_#00000040] border-0 mt-2">
						<CardContent className="p-0">
							<Input
								type="password"
								className="w-[420px] h-[59px] bg-[#e8eef2] rounded-[5px] px-4 font-['Nunito',Helvetica] text-base placeholder:opacity-[0.57] placeholder:text-black placeholder:tracking-[0.96px]"
								placeholder="Re-enter Password"
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
							className="absolute w-[422px] top-[calc(30vh+290px)] left-[61px] h-[59px] rounded-[5px] [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90 font-['Nunito',Helvetica] font-normal text-white text-[17px] tracking-[1.02px]"
							onClick={handleBackToLogin}
						>
							Set Password
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

export default CreateNewPasswordPage;
