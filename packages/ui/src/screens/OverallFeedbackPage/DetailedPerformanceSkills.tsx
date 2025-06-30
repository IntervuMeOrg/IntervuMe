import { TrendingUpIcon, AlertTriangleIcon } from "lucide-react";
import { SkillAssessment } from "../../types/performance";

interface DetailedPerformanceSkillsProps {
  skillAssessment: SkillAssessment;
}

export const DetailedPerformanceSkills = ({
  skillAssessment,
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
          {skillAssessment.strengths.map((strength, index) => (
            <li key={index}>• {strength}</li>
          ))}
        </ul>
      </div>

      {/* Areas for Improvement */}
      <div className="bg-orange-400/10 rounded-lg p-4 border border-orange-400/30">
        <h3 className="font-semibold text-orange-400 text-lg mb-3 flex items-center gap-2">
          <AlertTriangleIcon className="h-5 w-5" />
          Areas for Improvement
        </h3>
        <ul className="text-[#e8eef2] text-sm space-y-2">
          {skillAssessment.improvements.map((improvement, index) => (
            <li key={index}>• {improvement}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};