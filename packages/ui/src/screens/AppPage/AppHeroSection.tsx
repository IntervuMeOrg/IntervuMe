import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type AppHeroSectionProps = {
	userName: string;
	homeSectionRef: React.RefObject<HTMLElement>;
	navigate: ReturnType<typeof useNavigate>;
	steps: { id: number; title: string; image: string; alt: string }[];
};

export const AppHeroSection = ({
	userName,
	homeSectionRef,
	navigate,
	steps,
}: AppHeroSectionProps) => {
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
				id="main-section"
				ref={homeSectionRef}
				initial={{ opacity: 0, y: 20 }}
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
				{/* Headline - SVG Title */}
				<div className="text-center w-full flex flex-col items-center relative">
					<img
						src="/get-the-tech-career-you-deserve--faster.svg"
						alt="Get the tech career you deserve, faster"
						className="max-w-[80%] h-auto"
					/>
					{/* User greeting */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5, duration: 0.5 }}
						className="mt-4"
					>
						<h2 className="font-['Nunito',Helvetica] font-bold text-[#1d1d20] text-[28px]">
							Hello, {userName}
						</h2>
					</motion.div>
				</div>

				{/* Process steps cards */}
				<div className="flex justify-center gap-[9vw]">
					{steps.map((step) => (
						<motion.div
							key={step.id}
							className="flex flex-col items-center relative h-[41vh] cursor-pointer"
							whileHover={{
								scale: 1.05,
								transition: { duration: 0.3 },
							}}
							onClick={() => {
								// Navigate based on step id
								if (step.id === 1) {
									// Start Mock Interview
									window.scrollTo(0, 0); // Scroll to the top of the page
									navigate("/start-interview");
								} else if (step.id === 2) {
									// View History
									window.scrollTo(0, 0); // Scroll to the top of the page
									navigate("/history");
								} else if (step.id === 3) {
									// Interview Tips
									navigate("/app");
									setTimeout(() => {
										document.getElementById("tipsAndTricks")?.scrollIntoView({
											block: "start",
											behavior: "smooth",
										});
									}, 0);
								}
							}}
						>
							{/* Step image */}
							<motion.img
								className="w-full max-w-[90%] md:max-w-[55vw] h-[35vh] object-contain"
								alt={step.alt}
								src={step.image}
								whileHover={{ y: -5 }}
								transition={{ type: "spring", stiffness: 300 }}
							/>
							{/* Step title bar */}
							<div className="flex items-center justify-center w-full mt-2">
								<motion.div
									className="absolute bottom-[14px] w-[70vw] max-w-[340px] min-w-[180px] h-[9vw] max-h-[48px] min-h-[36px] bg-[#1d1d20] rounded-[5px] shadow-lg shadow-black/50 flex items-center justify-center"
									whileHover={{
										boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)",
										y: -2,
									}}
								>
									<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18] z-[1]" />
									<div className="relative flex items-center px-1 h-full w-full justify-center">
										<div
											className="
														font-['Nunito',Helvetica]
														font-semibold
														text-[#e8eef2]
														px-2
														text-[3.5vw]
														sm:text-[16px]
														md:text-[18px]
														lg:text-[20px]
														whitespace-nowrap
														text-center
													"
										>
											{step.title}
										</div>
									</div>
								</motion.div>
							</div>
						</motion.div>
					))}
				</div>
			</motion.section>
		</div>
	);
};
