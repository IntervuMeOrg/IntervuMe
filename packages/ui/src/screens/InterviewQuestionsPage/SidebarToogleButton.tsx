import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";

type SidebarToogleButtonProps = {
	sidebarVisible: boolean;
	setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SidebarToogleButton = ({
	sidebarVisible,
	setSidebarVisible,
}: SidebarToogleButtonProps) => {
	return (
		<Button
			onClick={() => setSidebarVisible(!sidebarVisible)}
			className="absolute rounded-[50px] w-[100px] left-[0px] top-[94px] h-7 bg-[#1d1d20] text-[#1d1d20] shadow-sm pl-[100px]"
			size="sm"
			asChild
		>
			<motion.button
				initial={false}
				animate={{
					x: sidebarVisible ? 200 : -55,
					scale: sidebarVisible ? 0 : 1.0,
					// rotate: sidebarVisible ? 180 : 0,
					// scaleX: sidebarVisible? 0 : 1.0,
					// backgroundColor: sidebarVisible? "#E8EEF2" : "#1d1d20",
					// borderRadius: sidebarVisible? "50px" : "50px",
					// width: sidebarVisible ? "0px" : "100px",
					// height: sidebarVisible ? "0px" : "40px",
				}}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
				<motion.img
					src="/sidebar.png"
					alt="Sidebar"
					className="fixed h-5 w-5 mr-3"
					animate={{ rotate: sidebarVisible ? 0 : 180 }}
					transition={{
						duration: 0.3,
						type: "spring",
						stiffness: 200,
						damping: 25,
					}}
				/>
			</motion.button>
		</Button>
	);
};
