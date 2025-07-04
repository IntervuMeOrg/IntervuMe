import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import { useDeleteInterview } from "../../lib/interview/interview-hooks";

type CancelConfirmationModelProps = {
	navigate: (path: string) => void;
	setCancelConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
	interviewId: string;
};

export const CancelConfirmationModel = ({
	navigate,
	setCancelConfirmation,
	interviewId,
}: CancelConfirmationModelProps) => {
	const deleteInterview = useDeleteInterview();

	const handleCancel = () => {
		// Delete the interview on backend
		deleteInterview.mutate(interviewId, {
			onSuccess: () => {
				setCancelConfirmation(false);
				navigate("/app");
			},
			onError: (error) => {
				console.error("Failed to delete interview:", error);
				// Still navigate away even if delete fails
				setCancelConfirmation(false);
				navigate("/app");
			},
		});
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
						<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full">
							<AlertCircleIcon className="h-10 w-10 text-red-500" />
						</div>
						<h3 className="font-['Nunito',Helvetica] text-xl font-semibold text-center text-white mb-2">
							Cancel Interview?
						</h3>
						<p className="text-gray-300 text-center mb-6">
							Are you sure you want to cancel this interview? Your progress will
							not be saved and the interview will be terminated.
						</p>
						<div className="flex justify-center gap-4">
							<Button
								onClick={() => setCancelConfirmation(false)}
								className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full"
								disabled={deleteInterview.isPending}
							>
								Continue Interview
							</Button>
							<Button
								onClick={handleCancel}
								className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
								disabled={deleteInterview.isPending}
							>
								{deleteInterview.isPending ? "Cancelling..." : "Cancel Interview"}
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		</>
	);
};
