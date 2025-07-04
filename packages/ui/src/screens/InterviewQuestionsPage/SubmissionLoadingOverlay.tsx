import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";

interface SubmissionLoadingOverlayProps {
	isVisible: boolean;
	onComplete?: () => void;
	isSubmitting?: boolean;
	isComplete?: boolean;
}

export const SubmissionLoadingOverlay: React.FC<SubmissionLoadingOverlayProps> = ({
	isVisible,
	onComplete,
	isSubmitting = false,
	isComplete = false,
}) => {
	const [animatedStep, setAnimatedStep] = React.useState(0);
	const [progress, setProgress] = React.useState(0);

	const submissionSteps = [
		"Analyzing your answers...",
		"Evaluating MCQ responses...",
		"Reviewing coding submissions...",
		"Calculating performance metrics...",
		"Generating personalized feedback...",
		"Preparing detailed report...",
		"Finalizing your results...",
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

		if (isSubmitting) {
			// Submission processing phase - this is where all the work happens (95% progress)
			targetProgress = 95;
			targetStep = 5; // Steps 0-5 during submission
		} else if (isComplete) {
			// Complete phase
			targetProgress = 100;
			targetStep = submissionSteps.length - 1;
		}

		// Smooth progress animation
		const progressInterval = setInterval(() => {
			setProgress((prev) => {
				if (prev < targetProgress) {
					return Math.min(prev + 1, targetProgress);
				}
				return prev;
			});
		}, 300);

		// Smooth step animation during submission
		const stepInterval = setInterval(() => {
			setAnimatedStep((prev) => {
				if (prev < targetStep) {
					return prev + 1;
				}
				return prev;
			});
		}, 1000);

		return () => {
			clearInterval(progressInterval);
			clearInterval(stepInterval);
		};
	}, [isVisible, isSubmitting, isComplete]);

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
							{/* Loading Icon */}
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
								{isComplete ? "Results Ready!" : "Processing Your Interview"}
							</h3>

							{/* Current Step */}
							<div className="w-full min-h-[3rem] 3xl:min-h-[4rem] flex items-center justify-center">
								<motion.p
									key={animatedStep}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.2 }}
									className="text-[#e8eef2] text-sm sm:text-base 3xl:text-lg text-center"
								>
									{isComplete
										? "Your detailed results and feedback are ready!"
										: submissionSteps[animatedStep]}
								</motion.p>
							</div>

							{/* Progress Bar */}
							<div className="w-full space-y-3 3xl:space-y-4">
								<div className="w-full bg-white/20 rounded-full h-3 3xl:h-4 overflow-hidden">
									<div
										style={{
											width: `${progress}%`,
											transform: "translateZ(0)",
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
											? "Complete!"
											: isSubmitting
											? "Generating feedback..."
											: "Processing..."}
									</span>
								</div>
							</div>

							{/* Step Indicators */}
							<div className="flex justify-center space-x-2 3xl:space-x-3">
								{submissionSteps.map((_, index) => (
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

							{/* Loading message */}
							<p className="text-xs 3xl:text-sm text-[#e8eef2] opacity-60 text-center">
								{isComplete 
									? "Redirecting you to your results..."
									: "Please wait while we analyze your performance and generate personalized feedback"}
							</p>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}; 