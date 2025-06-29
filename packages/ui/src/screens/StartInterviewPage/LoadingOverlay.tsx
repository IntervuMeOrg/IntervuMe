import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";

interface LoadingOverlayProps {
	isVisible: boolean;
	onComplete?: () => void;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
	isVisible,
	onComplete,
}) => {
	const [currentStep, setCurrentStep] = React.useState(0);
	const [progress, setProgress] = React.useState(0);
	const [isComplete, setIsComplete] = React.useState(false);

	const preparationSteps = [
		"Analyzing job requirements...",
		"Processing technical skills...",
		"Generating interview questions...",
		"Calibrating difficulty levels...",
		"Setting up environment...",
		"Preparing scenarios...",
		"Finalizing sequences...",
		"Almost ready!",
	];

	React.useEffect(() => {
		if (!isVisible) {
			setCurrentStep(0);
			setProgress(0);
			setIsComplete(false);
			return;
		}

		// Simplified timing - 90 seconds total
		const totalDuration = 5000;
		const stepDuration = totalDuration / preparationSteps.length; // ~11.25 seconds per step
		const progressUpdateInterval = 500; // Update every 500ms for better performance
		const progressIncrement = 100 / (totalDuration / progressUpdateInterval);

		let progressTimer: NodeJS.Timeout;
		let stepTimers: NodeJS.Timeout[] = [];

		// Smooth progress updates
		progressTimer = setInterval(() => {
			setProgress((prev) => {
				const newProgress = prev + progressIncrement;
				if (newProgress >= 100) {
					clearInterval(progressTimer);
					setIsComplete(true);
					// Call onComplete after a brief delay to show completion state
					setTimeout(() => {
						onComplete?.();
					}, 1500);
					return 100;
				}
				return newProgress;
			});
		}, progressUpdateInterval);

		// Schedule all step updates at once
		preparationSteps.forEach((_, index) => {
			if (index > 0) {
				const timer = setTimeout(() => {
					setCurrentStep(index);
				}, stepDuration * index);
				stepTimers.push(timer);
			}
		});

		// Cleanup
		return () => {
			if (progressTimer) clearInterval(progressTimer);
			stepTimers.forEach((timer) => clearTimeout(timer));
		};
	}, [isVisible, onComplete]);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
					className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
					style={{
						WebkitBackdropFilter: "blur(8px)",
					}}
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="bg-[#1d1d20] rounded-xl p-6 sm:p-8 max-w-lg w-full mx-4 text-center shadow-2xl relative overflow-hidden"
					>
						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />

						<div className="relative z-10 flex flex-col items-center space-y-6">
							{/* Loading Icon - Optimized animation */}
							<div className="relative">
								{!isComplete ? (
									<>
										<Loader2 className="h-16 w-16 text-[#0667D0] animate-spin" />
										<div className="absolute inset-0 rounded-full border-2 border-[#0667D0] animate-ping" />
									</>
								) : (
									<>
										<CheckCircle className="h-16 w-16 text-green-400" />
										<div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />
									</>
								)}
							</div>

							{/* Title */}
							<h3 className="font-['Nunito'] font-bold text-white text-xl sm:text-2xl">
								{isComplete ? "Interview Ready!" : "Preparing Your Interview"}
							</h3>

							{/* Current Step - Optimized transition */}
							<div className="w-full min-h-[3rem] flex items-center justify-center">
								<motion.p
									key={currentStep}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.2 }}
									className="text-[#e8eef2] text-sm sm:text-base text-center"
								>
									{isComplete
										? "Your personalized interview is ready to begin!"
										: preparationSteps[currentStep]}
								</motion.p>
							</div>

							{/* Progress Bar - Hardware accelerated */}
							<div className="w-full space-y-3">
								<div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
									<div
										style={{
											width: `${progress}%`,
											transform: "translateZ(0)", // Force hardware acceleration
											willChange: "width",
										}}
										className="bg-gradient-to-r from-[#0667D0] to-[#033464] h-full rounded-full transition-all duration-300 ease-out"
									/>
								</div>

								{/* Progress info */}
								<div className="flex justify-between text-xs text-[#e8eef2] opacity-80">
									<span>{Math.round(progress)}% Complete</span>
									<span>
										{isComplete
											? "Ready!"
											: `${Math.max(
													1,
													Math.round(((100 - progress) * 5) / 100)
											  )}s remaining`}
									</span>
								</div>
							</div>

							{/* Step Indicators - Optimized */}
							<div className="flex justify-center space-x-2">
								{preparationSteps.map((_, index) => (
									<div
										key={index}
										style={{ transform: "translateZ(0)" }}
										className={`w-2 h-2 rounded-full transition-all duration-200 ${
											index <= currentStep
												? "bg-[#0667D0] scale-125"
												: "bg-white/30"
										}`}
									/>
								))}
							</div>

							{/* Simple loading message */}
							<p className="text-xs text-[#e8eef2] opacity-60 text-center">
								Please wait while we create your personalized interview
								experience
							</p>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
