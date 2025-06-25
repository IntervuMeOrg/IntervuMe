import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { AlertCircleIcon } from "lucide-react";

type ExitConfirmationModelProps = {
	navigate: ReturnType<typeof useNavigate>;
	setExitConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ExitConfirmationModel = ({
	navigate,
	setExitConfirmation,
}: ExitConfirmationModelProps) => {
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
							Exit Interview?
						</h3>
						<p className="text-gray-300 text-center mb-6">
							Are you sure you want to exit this interview? Your progress will
							not be saved.
						</p>
						<div className="flex justify-center gap-4">
							<Button
								onClick={() => setExitConfirmation(false)}
								className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full"
							>
								Cancel
							</Button>
							<Button
								onClick={() => {
									setExitConfirmation(false);
									navigate("/");
								}}
								className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
							>
								Exit Interview
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		</>
	);
};
