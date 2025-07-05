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
            <ul className="text-[#e8eef2] text-sm space-y-1">
              {studyRecommendations.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <div className="space-y-1">
                    {recommendation.actions.map((action, actionIndex) => (
                      <div key={actionIndex}>{action}</div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
      </div>
    );
  };