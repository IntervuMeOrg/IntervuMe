import { StudyRecommendations } from "../../types/performance";

interface DetailedPerformanceRecommendationsProps {
  studyRecommendations: StudyRecommendations;
}

export const DetailedPerformanceRecommendations = ({
  studyRecommendations,
}: DetailedPerformanceRecommendationsProps) => {
  return (
    <div className="mt-6 bg-blue-400/10 rounded-lg p-4 border border-blue-400/30">
      <h3 className="font-semibold text-blue-400 text-lg mb-3">
        Next Steps
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-white text-base mb-2">
            Study Resources:
          </h4>
          <ul className="text-[#e8eef2] text-sm space-y-1">
            {studyRecommendations.studyResources.map((resource, index) => (
              <li key={index}>• {resource}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-white text-base mb-2">
            Practice Areas:
          </h4>
          <ul className="text-[#e8eef2] text-sm space-y-1">
            {studyRecommendations.practiceAreas.map((area, index) => (
              <li key={index}>• {area}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};