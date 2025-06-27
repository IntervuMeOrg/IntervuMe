import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

type LoadingOverlayProps = {
	preparationStep: string;
	progressPercentage: number;
};

export const LoadingOverlay = ({
	preparationStep,
	progressPercentage,
}: LoadingOverlayProps) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<motion.div
				initial={false}
				animate={{ scale: 1, opacity: 1 }}
				className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
			>
				<div className="flex flex-col items-center space-y-5">
					<Loader2 className="h-12 w-12 animate-spin text-blue-600" />

					<h3 className="font-['Nunito',Helvetica] font-black text-[#1d1d20] text-2xl mt-[-7px] tracking-[0] leading-tight">
						Preparing Your Interview
					</h3>

					{/* Text area with fixed height and fallback */}
					<div className="relative w-full min-h-[24px]">
						<p className="text-gray-700 text-base font-medium">
							{preparationStep}
						</p>
						<p className="invisible absolute text-base font-medium">
							Finalizing environment setup and loading questions...
						</p>
					</div>

					<div className="w-full bg-gray-200 rounded-full h-3">
						<motion.div
							initial={false}
							animate={{ width: `${progressPercentage}%` }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							className="bg-blue-600 h-3 rounded-full"
						/>
					</div>

					<p className="text-sm text-gray-500">
						{Math.round(progressPercentage)}% Complete
					</p>
				</div>
			</motion.div>
		</div>
	);
};
