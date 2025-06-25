import { useState } from "react";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { motion } from "framer-motion";
import { StartInverviewFormPanel } from "./StartInterviewFormPanel";
export const StartInterviewPage = (): JSX.Element => {
	// State for active navigation item tracking
	const activeNavItem = "";
	// State for logged in user (simulated)
	const [userName, setUserName] = useState("Mohamed Essam");
	// State for input method (custom or template)
	const [inputMethod, setInputMethod] = useState<"custom" | "template">(
		"custom"
	);

	return (
		<NavbarLayout activeNavItem={activeNavItem} userName={userName}>
			<main className="bg-white w-full relative min-h-screen">
				{/* Background image */}
				<img
					className="fixed w-full h-full object-cover"
					alt="Rectangle"
					src="/rectangle.png"
				/>

				{/* Main Content */}
				<div className="relative z-10 px-[8vw] py-[5vh]">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-center mb-[3.5vh]"
					>
						<h1 className="font-['Nunito',Helvetica] font-black text-[#1d1d20] text-[1.8rem] mt-[-7px] tracking-[0] leading-tight [text-shadow:0_4px_4px_rgba(0,0,0,0.2)]">
							Start Your Interview
						</h1>
						<p className="font-['Nunito',Helvetica] text-[0.9rem] text-[#1d1d20] mt-1 max-w-[800px] mx-auto">
							Enter your job description or select from our templates to get
							started with a personalized interview experience.
						</p>
					</motion.div>

					{/* Input Method Selection */}
					{/* Combined Card with Input Method Selection and Content */}
					<StartInverviewFormPanel
						inputMethod={inputMethod}
						setInputMethod={setInputMethod}
					/>
				</div>
			</main>
		</NavbarLayout>
	);
};

export default StartInterviewPage;
