import { motion } from "framer-motion"

export const HistoyHeader = () => {
	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-10% 0px" }}
			transition={{
				type: "spring",
				stiffness: 90,
				damping: 15,
				mass: 0.5,
				delay: 0.1,
			}}
			className="w-full mb-8"
		>
			{/* Back button */}
			{/* <div className="self-start mb-6">
							<Button
								className="bg-transparent hover:bg-white/10 text-[#1d1d20] flex items-center gap-2"
								onClick={() => navigate("/main-page-after-login")}
							>
								<ArrowLeftIcon className="h-4 w-4" />
								<span className="font-['Nunito',Helvetica] font-medium">
									Back to Dashboard
								</span>
							</Button>
						</div> */}

			{/* Page Title */}
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="font-['Nunito',Helvetica] font-black text-[#1d1d20] text-[40px] mb-8 text-center"
			>
				Your Interview History
			</motion.h1>
		</motion.section>
	);
};
