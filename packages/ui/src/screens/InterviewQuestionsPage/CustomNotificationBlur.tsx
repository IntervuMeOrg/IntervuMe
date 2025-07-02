import { motion } from "framer-motion";
import { CheckCircleIcon, AlertCircleIcon } from "lucide-react";

type Notification = {
	visible: boolean;
	message: string;
	type: "success" | "error" | "info";
};

type CustomNotificationBlurProps = {
	notification: Notification;
};

export const CustomNotificationBlur = ({
	notification,
}: CustomNotificationBlurProps) => {
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

			{/* Centered notification */}
			<div className="fixed inset-0 flex items-center justify-center z-[1000]">
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
				>
					<div
						className={`px-8 py-6 rounded-xl shadow-2xl flex flex-col items-center gap-4 max-w-md ${
							notification.type === "success"
								? "bg-gradient-to-r from-[#0667D0] to-[#054E9D] text-white"
								: notification.type === "error"
								? "bg-gradient-to-r from-red-600 to-red-700 text-white"
								: "bg-gradient-to-r from-gray-700 to-gray-800 text-white"
						}`}
					>
						<div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full">
							{notification.type === "success" && (
								<CheckCircleIcon className="h-10 w-10" />
							)}
							{notification.type === "error" && (
								<AlertCircleIcon className="h-10 w-10" />
							)}
						</div>
						<span className="font-['Nunito',Helvetica] text-xl font-semibold text-center">
							{notification.message}
						</span>
						<p className="text-white/80 text-center text-sm">
							You will be redirected to the feedback page shortly.
						</p>
					</div>
				</motion.div>
			</div>
		</>
	);
};
