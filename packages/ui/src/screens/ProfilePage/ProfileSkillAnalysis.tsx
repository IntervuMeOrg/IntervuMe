import { Card, CardContent } from "../../components/ui/card";
import { motion } from "framer-motion";
import { InterviewStats } from "../../types/interviewStats";

type ProfileSkillAnalysisProps = {
	interviewStats: InterviewStats;
};

export const ProfileSkillAnalysis = ({
	interviewStats,
}: ProfileSkillAnalysisProps) => {
	return (
		<div className="grid grid-cols-2 gap-6">
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
			>
				<Card className="shadow-md bg-[#1d1d20] relative overflow-hidden border-0 h-full">
					<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
					<CardContent className="p-6 relative z-10">
						<h3 className="font-['Nunito',Helvetica] font-bold text-[22px] text-white mb-4">
							Top Performing Skills
						</h3>
						<div className="space-y-4">
							{[
								{
									skill: interviewStats.topPerformingSkill,
									score: 92,
								},
								{ skill: "JavaScript", score: 88 },
								{ skill: "CSS", score: 85 },
							].map((item, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, width: 0 }}
									whileInView={{ opacity: 1, width: "auto" }}
									viewport={{ once: true }}
									transition={{ delay: 0.5 + idx * 0.1 }}
								>
									<div className="flex justify-between mb-1">
										<span className="text-white text-opacity-90 font-medium">
											{item.skill}
										</span>
										<span className="text-[#0667D0] font-bold">
											{item.score}%
										</span>
									</div>
									<div className="w-full bg-[#333] bg-opacity-50 rounded-full h-2">
										<motion.div
											initial={{ width: 0 }}
											whileInView={{ width: `${item.score}%` }}
											viewport={{ once: true }}
											transition={{
												delay: 0.6 + idx * 0.1,
												duration: 0.8,
											}}
											className="bg-[#0667D0] h-2 rounded-full"
										></motion.div>
									</div>
								</motion.div>
							))}
						</div>
					</CardContent>
				</Card>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, x: 20 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
			>
				<Card className="shadow-md bg-[#1d1d20] relative overflow-hidden border-0 h-full">
					<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
					<CardContent className="p-6 relative z-10">
						<h3 className="font-['Nunito',Helvetica] font-bold text-[22px] text-white mb-4">
							Areas for Improvement
						</h3>
						<div className="space-y-4">
							{[
								{
									skill: interviewStats.lowestPerformingSkill,
									score: 65,
								},
								{ skill: "Algorithms", score: 70 },
								{ skill: "Database Design", score: 72 },
							].map((item, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, width: 0 }}
									whileInView={{ opacity: 1, width: "auto" }}
									viewport={{ once: true }}
									transition={{ delay: 0.5 + idx * 0.1 }}
								>
									<div className="flex justify-between mb-1">
										<span className="text-white text-opacity-90 font-medium">
											{item.skill}
										</span>
										<span className="text-[#f97316] font-bold">
											{item.score}%
										</span>
									</div>
									<div className="w-full bg-[#333] bg-opacity-50 rounded-full h-2">
										<motion.div
											initial={{ width: 0 }}
											whileInView={{ width: `${item.score}%` }}
											viewport={{ once: true }}
											transition={{
												delay: 0.6 + idx * 0.1,
												duration: 0.8,
											}}
											className="bg-[#f97316] h-2 rounded-full"
										></motion.div>
									</div>
								</motion.div>
							))}
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
};
