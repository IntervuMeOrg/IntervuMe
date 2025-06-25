import { motion } from "framer-motion";

export const DashboardRecentActivity = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.8 }}
			className="bg-white/5 rounded-lg p-6 mb-8"
		>
			<h3 className="font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-xl mb-4">
				Recent Activity
			</h3>
			<div className="space-y-3">
				<div className="flex justify-between items-center border-b border-white/10 pb-2">
					<p className="font-['Nunito',Helvetica] text-[#e8eef2]">
						Frontend Developer Interview
					</p>
					<p className="font-['Nunito',Helvetica] text-[#e8eef2] opacity-70">
						2 days ago
					</p>
				</div>
				<div className="flex justify-between items-center border-b border-white/10 pb-2">
					<p className="font-['Nunito',Helvetica] text-[#e8eef2]">
						React Technical Assessment
					</p>
					<p className="font-['Nunito',Helvetica] text-[#e8eef2] opacity-70">
						5 days ago
					</p>
				</div>
				<div className="flex justify-between items-center pb-2">
					<p className="font-['Nunito',Helvetica] text-[#e8eef2]">
						Behavioral Interview Practice
					</p>
					<p className="font-['Nunito',Helvetica] text-[#e8eef2] opacity-70">
						1 week ago
					</p>
				</div>
			</div>
		</motion.div>
	);
};
