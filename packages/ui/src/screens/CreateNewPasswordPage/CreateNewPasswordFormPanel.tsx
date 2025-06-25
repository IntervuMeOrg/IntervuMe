import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";

type CreateNewPasswordFormPanelProps = {
	handleBackToForgetPassword: () => void;
};

export const CreateNewPasswordFormPanel = ({
	handleBackToForgetPassword,
}: CreateNewPasswordFormPanelProps) => {
	return (
		<>
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
				className="absolute w-[324px] h-[76px] top-[5vh] left-0 [text-shadow:0px_4px_4px_#00000040] font-['Nunito',Helvetica] font-extrabold text-white text-[32px] text-center tracking-[1.92px] leading-normal"
			>
				INTERVU&nbsp;&nbsp;ME
			</motion.div>
			{/* Back to Forget Password button */}
			<motion.div
				initial={{ opacity: 0, x: -10 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.2 }}
				className="absolute top-[12vh] left-[46px] z-10"
			>
				<Button
					variant="link"
					onClick={handleBackToForgetPassword}
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
					Back to Email
				</Button>
			</motion.div>

			{/* Heading */}
			<div className="absolute w-[378px] top-[32vh] left-[65px] font-['Nunito',Helvetica] font-extrabold text-[#e8eef2] text-[31px] tracking-[1.80px]">
				Set a Password
			</div>

			{/* Description */}
			<div className="absolute w-[311px] h-10 top-[calc(30vh+50px)] left-[68px] font-['Nunito',Helvetica] font-bold text-[#c7d3dd] text-[12px] tracking-[0.78px] leading-normal mt-2">
				Your previous password has been reseted. Please set a new password for
				your account.
			</div>
		</>
	);
};
