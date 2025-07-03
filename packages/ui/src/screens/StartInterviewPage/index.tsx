import { useState, useEffect } from "react";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { motion } from "framer-motion";
import { StartInterviewFormPanel } from "./StartInterviewFormPanel";
import { useCurrentUser } from "../../lib/authentication/authentication-hooks";

export const StartInterviewPage = (): JSX.Element => {
	const user = useCurrentUser();
	// State for active navigation item tracking
	const activeNavItem = "";
	// State for logged in user (simulated)
	const [userName, setUserName] = useState(`${user.data?.firstName} ${user.data?.lastName}`);
	// State for input method (custom or template)
	const [inputMethod, setInputMethod] = useState<"custom" | "template">(
		"custom"
	);

	return (
		<NavbarLayout activeNavItem={activeNavItem} userName={userName}>
			<main className="relative min-h-screen w-full bg-white">
				{/* Background container with proper responsive handling */}
				<div className="absolute inset-0 z-0">
					<img
						className="h-full w-full object-cover"
						alt="Background"
						src="/rectangle.png"
					/>
				</div>

				{/* Main content with proper responsive container */}
				<div className="relative z-10 min-h-screen w-full">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 3xl:px-10 max-w-5xl 3xl:max-w-7xl">
						<div className="py-8 sm:py-12 md:py-16 lg:py-20 3xl:py-22">
							{/* Header Section */}
							<motion.section
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-10% 0px" }}
								transition={{
									type: "spring",
									stiffness: 90,
									damping: 15,
									mass: 0.5,
									delay: 0.1,
								}}
								className="w-full mb-8 sm:mb-10 md:mb-12 3xl:mb-14"
							>
								{/* Page Title and Description */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
									className="text-center"
								>
									<h1 className="font-['Nunito'] font-black text-[#1d1d20] text-2xl sm:text-3xl md:text-4xl lg:text-5xl 3xl:text-[3.9rem] mb-4 sm:mb-6 leading-tight [text-shadow:0_4px_4px_rgba(0,0,0,0.2)]">
										Start Your Interview
									</h1>
									<p className="font-['Nunito'] text-[#1d1d20] text-sm sm:text-base md:text-lg 3xl:text-2xl opacity-80 max-w-3xl 3xl:max-w-5xl mx-auto leading-relaxed">
										Enter your job description or select from our templates to
										get started with a personalized interview experience.
									</p>
								</motion.div>
							</motion.section>

							{/* Form Panel Section */}
							<motion.section
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-10% 0px" }}
								transition={{
									type: "spring",
									stiffness: 90,
									damping: 15,
									mass: 0.5,
									delay: 0.2,
								}}
								className="w-full"
							>
								<StartInterviewFormPanel
									inputMethod={inputMethod}
									setInputMethod={setInputMethod}
								/>
							</motion.section>
						</div>
					</div>
				</div>
			</main>
		</NavbarLayout>
	);
};

export default StartInterviewPage;
