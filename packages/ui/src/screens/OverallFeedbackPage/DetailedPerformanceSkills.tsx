import { TrendingUpIcon, AlertTriangleIcon } from "lucide-react";

type DetailedPerformanceSkillsProps = {
	overallPercentage: number;
	mcqPercentage: number;
	problemSolvingPercentage: number;
};

export const DetailedPerformanceSkills = ({
	overallPercentage,
	mcqPercentage,
	problemSolvingPercentage,
}: DetailedPerformanceSkillsProps) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			{/* Strengths */}
			<div className="bg-green-400/10 rounded-lg p-4 border border-green-400/30">
				<h3 className="font-semibold text-green-400 text-lg mb-3 flex items-center gap-2">
					<TrendingUpIcon className="h-5 w-5" />
					Strengths
				</h3>
				<ul className="text-[#e8eef2] text-sm space-y-2">
					{overallPercentage >= 80 && <li>• Strong technical foundation</li>}
					{mcqPercentage >= 70 && <li>• Good conceptual understanding</li>}
					{problemSolvingPercentage >= 60 && (
						<li>• Effective problem-solving approach</li>
					)}
					<li>• Clear code structure and logic</li>
					<li>• Good attention to detail</li>
				</ul>
			</div>

			{/* Areas for Improvement */}
			<div className="bg-orange-400/10 rounded-lg p-4 border border-orange-400/30">
				<h3 className="font-semibold text-orange-400 text-lg mb-3 flex items-center gap-2">
					<AlertTriangleIcon className="h-5 w-5" />
					Areas for Improvement
				</h3>
				<ul className="text-[#e8eef2] text-sm space-y-2">
					{overallPercentage < 70 && (
						<li>• Review core programming concepts</li>
					)}
					{mcqPercentage < 60 && <li>• Study theoretical foundations</li>}
					{problemSolvingPercentage < 50 && (
						<li>• Practice algorithmic thinking</li>
					)}
					<li>• Consider edge cases in solutions</li>
					<li>• Optimize for time and space complexity</li>
				</ul>
			</div>
		</div>
	);
};
