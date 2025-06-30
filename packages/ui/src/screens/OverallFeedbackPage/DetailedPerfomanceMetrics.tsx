import {
  TrendingUpIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
} from "lucide-react";
import { PerformanceMetrics } from "../../types/performance";

interface DetailedPerfomanceMetricsProps {
  performanceMetrics: PerformanceMetrics;
}

export const DetailedPerfomanceMetrics = ({
  performanceMetrics,
}: DetailedPerfomanceMetricsProps) => {
  const {
    overallPercentage,
    mcqPercentage,
    mcqCorrect,
    mcqTotal,
    problemSolvingPercentage,
    problemSolvingCorrect,
    problemSolvingTotal,
  } = performanceMetrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
      {/* Overall Performance */}
      <div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center">
        <TrendingUpIcon className="h-8 w-8 text-blue-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-white mb-1">
          {overallPercentage}%
        </div>
        <div className="text-[#e8eef2] text-sm opacity-80">Overall Score</div>
        <div className="w-full bg-white/20 rounded-full h-2 mt-3">
          <div
            className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </div>

      {/* MCQ Performance */}
      {mcqTotal > 0 && (
        <div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center">
          <CheckCircleIcon className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-1">
            {mcqPercentage}%
          </div>
          <div className="text-[#e8eef2] text-sm opacity-80">
            Multiple Choice
          </div>
          <div className="text-[#e8eef2] text-xs opacity-60">
            {mcqCorrect}/{mcqTotal} correct
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-3">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${mcqPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Problem Solving Performance */}
      {problemSolvingTotal > 0 && (
        <div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center">
          <AlertTriangleIcon className="h-8 w-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white mb-1">
            {problemSolvingPercentage}%
          </div>
          <div className="text-[#e8eef2] text-sm opacity-80">
            Problem Solving
          </div>
          <div className="text-[#e8eef2] text-xs opacity-60">
            {problemSolvingCorrect}/{problemSolvingTotal} attempted
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-3">
            <div
              className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${problemSolvingPercentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};