import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

type OurViewSectionProps = {
    navigate: ReturnType<typeof useNavigate>;
};

export const OurViewSection = ({ navigate }: OurViewSectionProps) => {
	return (
		<motion.section
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-20% 0px" }}
			transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.7 }}
			className="relative py-[10vh] bg-[#1d1d20] w-full"
		>
			<div className="max-w-[800px] mx-auto text-center px-4">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						delay: 0.4,
						type: "spring",
						stiffness: 100,
						damping: 12,
					}}
					className="font-['Nunito',Helvetica] font-black text-[40px] text-[#e8eef2] mb-8"
				>
					Our View
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						delay: 0.6,
						type: "spring",
						stiffness: 100,
						damping: 12,
					}}
					className="font-['Nunito',Helvetica] text-[18px] text-[#e8eef2] leading-[1.6] mb-12"
				>
					The goal of this project is to create a personalized mock interview
					assistant that generates tailored questions, adapts difficulty,
					provides feedback, and simulates realistic interviews with helpful
					resources.
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						delay: 0.8,
						type: "spring",
						stiffness: 100,
						damping: 12,
					}}
				>
					<Button
						onClick={() => navigate("/login")}
						className="rounded-[5px] h-[52px] w-[200px] [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90"
					>
						<span className="font-['Nunito',Helvetica] font-semibold text-white text-[18px]">
							Start now
						</span>
					</Button>
				</motion.div>
			</div>
		</motion.section>
	);
};
