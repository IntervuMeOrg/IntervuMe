import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";

interface LoadingOverlayProps {
	isVisible: boolean;
	onComplete?: () => void;
	currentStep?: number;
	isCreating?: boolean;
	isStarting?: boolean;
	isComplete?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
	isVisible,
	onComplete,
	currentStep = 0,
	isCreating = false,
	isStarting = false,
	isComplete = false,
}) => {
	const [animatedStep, setAnimatedStep] = React.useState(0);
	const [progress, setProgress] = React.useState(0);

	const preparationSteps = [
		"Analyzing job requirements...",
		"Extracting technical skills and keywords...",
		"Generating MCQ questions...",
		"Creating coding challenges...",
		"Calibrating difficulty levels...",
		"Validating question quality...",
		"Processing interview structure...",
		"Finalizing your personalized interview...",
	];

	// Reset state when overlay becomes visible
	React.useEffect(() => {
		if (!isVisible) {
			setAnimatedStep(0);
			setProgress(0);
			return;
		}
	}, [isVisible]);

	// Update progress based on actual backend state
	React.useEffect(() => {
		if (!isVisible) return;

		let targetProgress = 0;
		let targetStep = 0;

		if (isCreating) {
			// Interview creation phase - this is where all the work happens (95% progress)
			targetProgress = 95;
			targetStep = 6; // Steps 0-6 during creation
		} else if (isStarting) {
			// Interview starting phase - instant API call (95-98% progress)
			targetProgress = 98;
			targetStep = 7; // Just the final step
		} else if (isComplete) {
			// Complete phase
			targetProgress = 100;
			targetStep = preparationSteps.length - 1;
		}

		// Smooth progress animation
		const progressInterval = setInterval(() => {
			setProgress((prev) => {
				if (prev < targetProgress) {
					return Math.min(prev + 1, targetProgress);
				}
				return prev;
			});
		}, 600);

		// Smooth step animation during creation, faster during starting
		const stepInterval = setInterval(() => {
			setAnimatedStep((prev) => {
				if (prev < targetStep) {
					return prev + 1;
				}
				return prev;
			});
		}, isCreating ? 1200 : 300); // Slower during creation, faster during starting

		return () => {
			clearInterval(progressInterval);
			clearInterval(stepInterval);
		};
	}, [isVisible, isCreating, isStarting, isComplete]);

	// Call onComplete when actually complete
	React.useEffect(() => {
		if (isComplete && progress >= 100) {
			const timer = setTimeout(() => {
				onComplete?.();
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [isComplete, progress, onComplete]);

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
						className="bg-[#1d1d20] rounded-xl p-6 sm:p-8 3xl:p-10 max-w-lg 3xl:max-w-[42rem] w-full mx-4 text-center shadow-2xl relative overflow-hidden"
					>
						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />

						<div className="relative z-10 flex flex-col items-center space-y-6">
							{/* Loading Icon - Optimized animation */}
							<div className="relative">
								{!isComplete ? (
									<>
										<Loader2 className="h-16 w-16 3xl:h-20 3xl:w-20 text-[#0667D0] animate-spin" />
										<div className="absolute inset-0 rounded-full border-2 border-[#0667D0] animate-ping" />
									</>
								) : (
									<>
										<CheckCircle className="h-16 w-16 3xl:h-20 3xl:w-20 text-green-400" />
										<div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />
									</>
								)}
							</div>

							{/* Title */}
							<h3 className="font-['Nunito'] font-bold text-white text-xl sm:text-2xl 3xl:text-3xl">
								{isComplete ? "Interview Ready!" : "Preparing Your Interview"}
							</h3>

							{/* Current Step - Optimized transition */}
							<div className="w-full min-h-[3rem] 3xl:min-h-[4rem] flex items-center justify-center">
								<motion.p
									key={animatedStep}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.2 }}
									className="text-[#e8eef2] text-sm sm:text-base 3xl:text-lg text-center"
								>
									{isComplete
										? "Your personalized interview is ready to begin!"
										: preparationSteps[animatedStep]}
								</motion.p>
							</div>

							{/* Progress Bar - Hardware accelerated */}
							<div className="w-full space-y-3 3xl:space-y-4">
								<div className="w-full bg-white/20 rounded-full h-3 3xl:h-4 overflow-hidden">
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
								<div className="flex justify-between text-xs 3xl:text-sm text-[#e8eef2] opacity-80">
									<span>{Math.round(progress)}% Complete</span>
									<span>
										{isComplete
											? "Ready!"
											: isCreating
											? "Generating questions..."
											: isStarting
											? "Starting interview..."
											: "Processing..."}
									</span>
								</div>
							</div>

							{/* Step Indicators - Optimized */}
							<div className="flex justify-center space-x-2 3xl:space-x-3">
								{preparationSteps.map((_, index) => (
									<div
										key={index}
										style={{ transform: "translateZ(0)" }}
										className={`w-2 h-2 3xl:w-[0.7rem] 3xl:h-[0.7rem] rounded-full transition-all duration-200 ${
											index <= animatedStep
												? "bg-[#0667D0] scale-125"
												: "bg-white/30"
										}`}
									/>
								))}
							</div>

							{/* Simple loading message */}
							<p className="text-xs 3xl:text-sm text-[#e8eef2] opacity-60 text-center">
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
