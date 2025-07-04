import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, Check } from "lucide-react";

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
	const [isPaused, setIsPaused] = React.useState(false);

	const preparationSteps = [
		"Analyzing job requirements",
		"Extracting technical skills",
		"Generating MCQ questions",
		"Creating coding challenges",
		"Calibrating difficulty levels",
		"Validating question quality",
		"Finalizing interview structure",
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
			targetStep = 5; // Steps 0-5 during creation
		} else if (isStarting) {
			// Interview starting phase - instant API call (95-98% progress)
			targetProgress = 98;
			targetStep = 6; // Just the final step
		} else if (isComplete) {
			// Complete phase
			targetProgress = 100;
			targetStep = preparationSteps.length - 1;
		}

		// Calculate progress per step
		const progressPerStep = targetProgress / (targetStep + 1);
		
		// Smooth step animation during creation, faster during starting
		const stepInterval = setInterval(() => {
			setAnimatedStep((prev) => {
				if (prev < targetStep) {
					return prev + 1;
				}
				return prev;
			});
		}, isCreating ? 1200 : 300); // Slower during creation, faster during starting

		// Dynamic progress animation based on steps
		const progressInterval = setInterval(() => {
			setProgress((prev) => {
				const currentTargetProgress = Math.min(
					(animatedStep + 1) * progressPerStep,
					targetProgress
				);
				
				if (prev < currentTargetProgress) {
					// Add occasional pauses for realism (10% chance)
					if (!isPaused && Math.random() < 0.1) {
						setIsPaused(true);
						setTimeout(() => setIsPaused(false), Math.random() * 800 + 200);
						return prev;
					}
					
					// Dynamic increment: faster at start, slower near end
					const remaining = currentTargetProgress - prev;
					const baseIncrement = Math.max(
						Math.min(remaining * 0.15, 8), // 15% of remaining, max 8%
						0.5 // minimum 0.5%
					);
					
					// Add variance to increment (±30%)
					const variance = 0.7 + Math.random() * 0.6;
					const increment = baseIncrement * variance;
					
					return Math.min(prev + increment, currentTargetProgress);
				}
				return prev;
			});
		}, 50); // Faster updates for smoother animation

		return () => {
			clearInterval(progressInterval);
			clearInterval(stepInterval);
		};
	}, [isVisible, isCreating, isStarting, isComplete, animatedStep, isPaused]);

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
					transition={{ duration: 0.3 }}
					className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 3xl:p-12 max-w-md sm:max-w-lg 3xl:max-w-xl w-full mx-4"
					>
						<div className="text-center">
							{/* Icon */}
							<div className="mb-6 3xl:mb-8">
								{isComplete ? (
									<CheckCircle className="w-16 h-16 3xl:w-20 3xl:h-20 text-green-500 mx-auto" />
								) : (
									<Loader2 className="w-16 h-16 3xl:w-20 3xl:h-20 text-blue-500 animate-spin mx-auto" />
								)}
							</div>

							{/* Title */}
							<h3 className="text-xl sm:text-2xl 3xl:text-3xl font-bold text-gray-900 mb-6">
								{isComplete ? "Interview Ready!" : "Preparing Your Interview"}
							</h3>

							{/* Steps */}
							<div className="space-y-2 mb-6 text-left max-h-64 overflow-y-auto">
								{preparationSteps.map((step, index) => (
									<div
										key={index}
										className={`flex items-center space-x-3 transition-all duration-300 ${
											index <= animatedStep
												? "opacity-100"
												: "opacity-40"
										}`}
									>
										<div
											className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
												index < animatedStep
													? "bg-green-500"
													: index === animatedStep
													? "bg-blue-500 animate-pulse"
													: "bg-gray-300"
											}`}
										>
											{index < animatedStep ? (
												<Check className="w-3 h-3 text-white" />
											) : index === animatedStep ? (
												<div className="w-2 h-2 bg-white rounded-full animate-ping" />
											) : (
												<div className="w-2 h-2 bg-gray-400 rounded-full" />
											)}
										</div>
										<span
											className={`text-sm ${
												index === animatedStep
													? "text-gray-900 font-medium"
													: index < animatedStep
													? "text-gray-700"
													: "text-gray-500"
											}`}
										>
											{step}
											{index === animatedStep && (
												<span className="ml-1 text-blue-500 animate-pulse">
													...
												</span>
											)}
										</span>
									</div>
								))}
							</div>

							{/* Progress Bar */}
							<div className="relative w-full h-3 3xl:h-4 bg-gray-200 rounded-full overflow-hidden">
								<div
									style={{
										width: `${progress}%`,
										transition: "width 0.3s ease-out",
									}}
									className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
								/>
							</div>

							{/* Progress info */}
							<div className="flex justify-between text-xs 3xl:text-sm text-gray-600 mt-2">
								<span>{Math.round(progress)}% Complete</span>
								<span>
									Step {Math.min(animatedStep + 1, preparationSteps.length)} of{" "}
									{preparationSteps.length}
								</span>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
