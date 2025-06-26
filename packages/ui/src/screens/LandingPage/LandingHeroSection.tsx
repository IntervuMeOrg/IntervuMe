import { motion } from "framer-motion";

type HeroSectionProps = {
	homeSectionRef: React.RefObject<HTMLElement>;
	steps: { id: number; title: string; image: string; alt: string }[];
};
export const HeroSection = ({ homeSectionRef, steps }: HeroSectionProps) => {
	return (
		<div className="bg-white w-full min-h-screen relative z-0">
			{/* Background image */}
			<img
				className="h-[100vh] object-cover w-full absolute top-0 left-0"
				alt="Rectangle"
				src="/rectangle.png"
			/>

			{/* Main content */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				ref={homeSectionRef}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-20% 0px" }}
				transition={{
					type: "spring",
					stiffness: 90,
					damping: 15,
					mass: 0.5,
					delay: 0.3,
				}}
				className="relative z-10 pt-[15vh] flex flex-col items-center pb-[2vh] h-[75vh]"
			>
				{/* Headline */}
				<div className="text-center mb-[5vh]">
					<h1 className="font-['Nunito',Helvetica] font-black text-[#1d1d20] text-[80px] text-center tracking-[0] leading-[73.2px] [text-shadow:0_4px_4px_rgba(0,0,0,0.3)]">
						Mock Interview Assistant
						<br />
						powered by AI
					</h1>
				</div>

				{/* Process steps cards */}
				<div className="flex justify-center gap-9 px-[5%] w-full pt-[55px]">
					{steps.map((step) => (
						<motion.div
							key={step.id}
							className="flex flex-col items-center relative h-[41vh]"
							whileHover={{
								scale: 1.05,
								transition: { duration: 0.3 },
							}}
						>
							{/* Step image */}
							<motion.img
								className="w-[clamp(150px,55vw,380px)] h-[clamp(180px,35vh,3200px)] object-contain"
								alt={step.alt}
								src={step.image}
								whileHover={{ y: -5 }}
								transition={{ type: "spring", stiffness: 300 }}
							/>
							{/* Step title bar */}
							<motion.div
								className="absolute bottom-[14px] w-[340px] h-[48px] bg-[#1d1d20] rounded-[5px] shadow-lg shadow-black/50"
								whileHover={{
									boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)",
									y: -2,
								}}
							>
								<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18] z-[1]" />
								<div className="relative flex items-center px-1 h-full">
									<div className="font-['Nunito',Helvetica] font-semibold text-[#e8eef2] text-[16px] px-2">
										{step.title}
									</div>
								</div>
							</motion.div>
						</motion.div>
					))}
				</div>
			</motion.section>
		</div>
	);
};
