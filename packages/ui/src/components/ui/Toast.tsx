
import {
	CheckCircleIcon,
	XCircleIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ToastProps {
	message: string;
	type: "success" | "error" | "info";
	onClose: () => void;
}

const Toast = ({ message, type}: ToastProps) => {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: -50, x: "-50%" }}
				animate={{ opacity: 1, y: 0, x: "-50%" }}
				exit={{ opacity: 0, y: -50, x: "-50%" }}
				className={`fixed top-16 3xl:top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 3xl:px-8 py-3 3xl:py-4 rounded-lg shadow-lg flex items-center gap-3 ${
					type === "success"
						? "[background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)]"
						: type === "error"
						? "bg-gradient-to-r from-red-600 to-red-700"
						: "bg-gradient-to-r from-gray-700 to-gray-800"
				}`}
			>
				<div className="bg-white bg-opacity-20 rounded-full p-1">
					{type === "success" && (
						<CheckCircleIcon className="h-5 w-5 3xl:w-6 3xl:h-6 text-white" />
					)}
					{type === "error" && <XCircleIcon className="h-5 w-5 3xl:w-6 3xl:h-6 text-white" />}
				</div>
				<span className="font-['Nunito',Helvetica] font-semibold text-white 3xl:text-lg">
					{message}
				</span>
			</motion.div>
		</AnimatePresence>
	);
};

export { Toast }