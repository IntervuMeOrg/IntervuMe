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
		<>
			{/* Background with gradient overlay */}
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
				className="absolute w-full h-full top-0 left-0 bg-[#1d1d20] overflow-hidden"
			>
				<div className="h-full [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
			</motion.div>
			{/* Logo/Brand name */}
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
				className="absolute w-[324px] h-[76px] top-[5vh] left-0 [text-shadow:0px_4px_4px_#00000040] font-['Nunito',Helvetica] font-extrabold text-white text-[32px] text-center tracking-[1.92px] leading-[normal] cursor-pointer"
			>
				INTERVU&nbsp;&nbsp;ME
			</motion.div>
			{/* Section title */}
			<div className="absolute w-44 h-6 top-[18vh] left-[226px] font-['Nunito',Helvetica] font-extrabold text-white text-xs text-center tracking-[0.96px] leading-[normal]">
				User Details
			</div>
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
		</>
	);
};