import { motion } from "framer-motion";
import { useCurrentUser } from "../../lib/authentication/authentication-hooks";
import { useCompletedInterviews } from "../../lib/History/interview-history-hooks";

export const DashboardRecentActivity = () => {
  const user = useCurrentUser();
  
  const {
    data: completedInterviews,
    isLoading: isPendingCompleteInterview,
    error: errorCompleteInterview,
  } = useCompletedInterviews(user.data?.id as string);

  // Helper function to format time ago
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
    return date.toLocaleDateString();
  };

  // Helper function to get interview title
  const getInterviewTitle = (interview: any) => {
    if (interview.jobTitle) {
      return `${interview.jobTitle} Interview`;
    }
    // Fallback to using tags if available
    if (interview.uniqueTags && interview.uniqueTags.length > 0) {
      return `${interview.uniqueTags[0]} Assessment`;
    }
    return "Technical Interview";
  };

  // Process completed interviews for display
  const activities = completedInterviews?.slice(0, 5) // Show only the 5 most recent
    .map(interview => ({
      title: getInterviewTitle(interview),
      time: formatTimeAgo(interview.endTime || interview.startTime),
      score: interview.totalScore && interview.maxScore 
        ? `${Math.round((interview.totalScore / interview.maxScore) * 100)}%`
        : null,
      passed: interview.isPassed,
    })) || [];

  // Loading state
  if (isPendingCompleteInterview) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/5 rounded-lg p-4 sm:p-5 md:p-6 3xl:p-8"
      >
        <h3 className="font-['Nunito'] font-bold text-[#e8eef2] text-lg sm:text-xl md:text-2xl 3xl:text-3xl mb-4 sm:mb-5 3xl:mb-8">
          Recent Activity
        </h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white/50"></div>
        </div>
      </motion.div>
    );
  }

  // Error state
  if (errorCompleteInterview) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/5 rounded-lg p-4 sm:p-5 md:p-6 3xl:p-8"
      >
        <h3 className="font-['Nunito'] font-bold text-[#e8eef2] text-lg sm:text-xl md:text-2xl 3xl:text-3xl mb-4 sm:mb-5 3xl:mb-8">
          Recent Activity
        </h3>
        <p className="text-red-400 text-sm">Failed to load recent activity</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-white/5 rounded-lg p-4 sm:p-5 md:p-6 3xl:p-8"
    >
      <h3 className="font-['Nunito'] font-bold text-[#e8eef2] text-lg sm:text-xl md:text-2xl 3xl:text-3xl mb-4 sm:mb-5 3xl:mb-8">
        Recent Activity
      </h3>
      <div className="space-y-3 3xl:space-y-5">
        {activities.length === 0 ? (
          <p className="font-['Nunito'] text-[#e8eef2] text-sm sm:text-base 3xl:text-xl opacity-70">
            No recent activity yet. Start your first interview!
          </p>
        ) : (
          activities.map((activity, index) => (
            <div
              key={index}
              className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 3xl:gap-3 pb-3 
                ${index < activities.length - 1 ? "border-b border-white/10" : ""}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <p className="font-['Nunito'] text-[#e8eef2] text-sm sm:text-base 3xl:text-xl">
                  {activity.title}
                </p>
                {activity.score && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.passed 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {activity.score}
                  </span>
                )}
              </div>
              <p className="font-['Nunito'] text-[#e8eef2] text-xs sm:text-sm 3xl:text-lg opacity-70">
                {activity.time}
              </p>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};