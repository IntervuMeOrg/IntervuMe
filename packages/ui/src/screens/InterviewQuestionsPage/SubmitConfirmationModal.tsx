import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { CheckCircleIcon } from "lucide-react";

type Notification = {
	visible: boolean;
	message: string;
	type: "success" | "error" | "info";
};

type SubmitConfirmationModalProps = {
	setSubmitConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
	userAnswers: Record<number, string>;
	setNotification: React.Dispatch<React.SetStateAction<Notification>>;
	notification: Notification;
	navigate: ReturnType<typeof useNavigate>;
};

export const SubmitConfirmationModal = ({
	setSubmitConfirmation,
	userAnswers,
	setNotification,
	notification,
	navigate,
}: SubmitConfirmationModalProps) => {
	// Submit the interview
	const handleSubmitInterview = () => {
		// In a real app, this would submit answers to a backend
		console.log("Submitting interview answers:", userAnswers);
		setSubmitConfirmation(false);
		// Show success notification instead of alert
		setNotification({
			visible: true,
			message: "Interview submitted successfully!",
			type: "success",
		});

		// Hide notification after 2 seconds
		setTimeout(() => {
			setNotification({ ...notification, visible: false });
			window.scrollTo(0, 0);
			navigate("/overall-feedback");
		}, 2000);
	};

	return (
		<>
			{/* Backdrop blur overlay */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999]"
				style={{ backdropFilter: "blur(4px)" }}
			/>

			{/* Centered confirmation modal */}
			<div className="fixed inset-0 flex items-center justify-center z-[1000]">
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
				>
					<div className="bg-[#1d1d20] border border-gray-700 px-8 py-6 rounded-xl shadow-2xl max-w-md">
						<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full">
							<CheckCircleIcon className="h-10 w-10 text-green-500" />
						</div>
						<h3 className="font-['Nunito',Helvetica] text-xl font-semibold text-center text-white mb-2">
							Submit Interview?
						</h3>
						<p className="text-gray-300 text-center mb-6">
							Are you sure you want to submit this interview? Once submitted,
							you cannot make any changes.
						</p>
						<div className="flex justify-center gap-4">
							<Button
								onClick={() => setSubmitConfirmation(false)}
								className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full"
							>
								Cancel
							</Button>
							<Button
								onClick={handleSubmitInterview}
								className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
							>
								Submit Interview
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		</>
	);
};
