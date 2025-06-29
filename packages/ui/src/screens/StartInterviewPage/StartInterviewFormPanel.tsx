import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import {
	FileTextIcon,
	BookTemplateIcon as TemplateIcon,
	PlayIcon,
	CheckIcon,
} from "lucide-react";
import { CustomJobDescription } from "./CustomJobDescription";
import { TemplateSelection } from "./TemplateSelection";
import { LoadingOverlay } from "./LoadingOverlay";

type InputMethod = "custom" | "template";

interface StartInterviewFormPanelProps {
	inputMethod: InputMethod;
	setInputMethod: (method: InputMethod) => void;
}

export const StartInterviewFormPanel = ({
	inputMethod,
	setInputMethod,
}: StartInterviewFormPanelProps) => {
	const navigate = useNavigate();

	// State for form data
	const [jobDescription, setJobDescription] = useState("");
	const [selectedTemplate, setSelectedTemplate] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// Handle loading completion and navigation
	const handleLoadingComplete = () => {
		setIsLoading(false);
		// Navigate to interview-questions page
		navigate("/interview-questions", {
			state: {
				inputMethod,
				jobDescription,
				selectedTemplate,
			},
		});
	};

	// Handle form submission
	const handleStartInterview = async () => {
		if (inputMethod === "custom" && !jobDescription.trim()) {
			return; // Don't proceed if no job description
		}
		if (inputMethod === "template" && !selectedTemplate) {
			return; // Don't proceed if no template selected
		}

		setIsLoading(true);
		// Loading overlay will handle the timing and call handleLoadingComplete when done
	};

	// Check if form is valid
	const isFormValid =
		inputMethod === "custom"
			? jobDescription.trim().length > 0
			: selectedTemplate.length > 0;

	return (
		<>
			{/* Loading Overlay */}
			<LoadingOverlay
				isVisible={isLoading}
				onComplete={handleLoadingComplete}
			/>

			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{
					type: "spring",
					stiffness: 80,
					damping: 12,
					delay: 0.1,
				}}
				className="bg-[#1d1d20] rounded-lg shadow-xl relative overflow-hidden"
				whileHover={{
					boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
					transition: { duration: 0.3 },
				}}
			>
				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

				<div className="relative z-10 p-6 sm:p-8 md:p-10">
					{/* Input Method Selection */}
					<div className="mb-6 sm:mb-8">
						<h2 className="font-['Nunito'] font-bold text-white text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">
							Choose Your Approach
						</h2>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
							{/* Custom Job Description Option */}
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => setInputMethod("custom")}
								disabled={isLoading}
								className={`p-4 sm:p-5 md:p-6 rounded-lg border-2 transition-all duration-200 ${
									inputMethod === "custom"
										? "border-[#0667D0] bg-[#0667D0]/20"
										: "border-white/20 bg-white/10 hover:border-white/40"
								} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
							>
								<div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
									<div className="relative">
										<FileTextIcon className="h-6 w-6 sm:h-8 sm:w-8 text-[#e8eef2]" />
										{inputMethod === "custom" && (
											<motion.div
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												className="absolute -top-1 -right-1 bg-[#0667D0] rounded-full p-1"
											>
												<CheckIcon className="h-3 w-3 text-white" />
											</motion.div>
										)}
									</div>
									<div className="text-white font-semibold text-sm sm:text-base">
										Custom Job Description
									</div>
									<div className="text-[#e8eef2] text-xs sm:text-sm opacity-70">
										Paste your specific job posting
									</div>
								</div>
							</motion.button>

							{/* Template Selection Option */}
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => setInputMethod("template")}
								disabled={isLoading}
								className={`p-4 sm:p-5 md:p-6 rounded-lg border-2 transition-all duration-200 ${
									inputMethod === "template"
										? "border-[#0667D0] bg-[#0667D0]/20"
										: "border-white/20 bg-white/10 hover:border-white/40"
								} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
							>
								<div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
									<div className="relative">
										<TemplateIcon className="h-6 w-6 sm:h-8 sm:w-8 text-[#e8eef2]" />
										{inputMethod === "template" && (
											<motion.div
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												className="absolute -top-1 -right-1 bg-[#0667D0] rounded-full p-1"
											>
												<CheckIcon className="h-3 w-3 text-white" />
											</motion.div>
										)}
									</div>
									<div className="text-white font-semibold text-sm sm:text-base">
										Use Template
									</div>
									<div className="text-[#e8eef2] text-xs sm:text-sm opacity-70">
										Choose from predefined roles
									</div>
								</div>
							</motion.button>
						</div>
					</div>

					{/* Content Area */}
					<motion.div
						key={inputMethod}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3 }}
						className="mb-6 sm:mb-8"
					>
						{inputMethod === "custom" ? (
							<CustomJobDescription
								jobDescription={jobDescription}
								setJobDescription={setJobDescription}
							/>
						) : (
							<TemplateSelection
								selectedTemplate={selectedTemplate}
								setSelectedTemplate={setSelectedTemplate}
							/>
						)}
					</motion.div>

					{/* Start Interview Button */}
					<div className="flex justify-center">
						<motion.div
							whileHover={{ scale: isFormValid && !isLoading ? 1.05 : 1 }}
							whileTap={{ scale: isFormValid && !isLoading ? 0.95 : 1 }}
						>
							<Button
								onClick={handleStartInterview}
								disabled={!isFormValid || isLoading}
								className={`rounded-md h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 transition-all duration-200 flex items-center gap-2 sm:gap-3 border-0 ${
									isFormValid && !isLoading
										? "bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] hover:opacity-90 cursor-pointer"
										: "bg-gray-500 opacity-50 cursor-not-allowed"
								}`}
							>
								<PlayIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
								<span className="font-['Nunito'] font-semibold text-white text-sm sm:text-base md:text-lg">
									{isLoading ? "Preparing..." : "Start Interview"}
								</span>
							</Button>
						</motion.div>
					</div>

					{/* Form validation message */}
					{!isFormValid && !isLoading && (
						<motion.p
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-center text-[#e8eef2] text-xs sm:text-sm opacity-70 mt-3"
						>
							{inputMethod === "custom"
								? "Please enter a job description to continue"
								: "Please select a template to continue"}
						</motion.p>
					)}
				</div>
			</motion.div>
		</>
	);
};
