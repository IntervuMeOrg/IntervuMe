import { motion } from "framer-motion";

export const DashboardStats = () => {
	return (
		<div className="grid grid-cols-3 gap-6 mb-10">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}
				className="bg-white/10 rounded-lg p-6 backdrop-blur-sm"
			>
				<h3 className="font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-xl mb-2">
					Interviews Completed
				</h3>
				<p className="font-['Nunito',Helvetica] text-[#e8eef2] text-3xl font-bold">
					12
				</p>
				<p className="font-['Nunito',Helvetica] text-[#e8eef2] text-sm opacity-70 mt-2">
					+3 this month
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className="bg-white/10 rounded-lg p-6 backdrop-blur-sm"
			>
				<h3 className="font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-xl mb-2">
					Average Score
				</h3>
				<p className="font-['Nunito',Helvetica] text-[#e8eef2] text-3xl font-bold">
					85%
				</p>
				<p className="font-['Nunito',Helvetica] text-[#e8eef2] text-sm opacity-70 mt-2">
					+5% from last month
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.7 }}
				className="bg-white/10 rounded-lg p-6 backdrop-blur-sm"
			>
				<h3 className="font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-xl mb-2">
					Skills Improved
				</h3>
				<p className="font-['Nunito',Helvetica] text-[#e8eef2] text-3xl font-bold">
					8
				</p>
				<p className="font-['Nunito',Helvetica] text-[#e8eef2] text-sm opacity-70 mt-2">
					Technical & Soft Skills
				</p>
			</motion.div>
		</div>
	);
};
