import { motion } from "framer-motion";

export const DashboardRecentActivity = () => {
  const activities = [
    {
      title: "Frontend Developer Interview",
      time: "Just now",
    },
    {
      title: "React Technical Assessment",
      time: "5 days ago",
    },
    {
      title: "Behavioral Interview Practice",
      time: "1 week ago",
    },
  ];

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
      <div className="space-y-3 3xl:space-y-5 ">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 3xl:gap-3 pb-3 
              ${index < activities.length - 1 ? "border-b border-white/10" : ""}`}
          >
            <p className="font-['Nunito'] text-[#e8eef2] text-sm sm:text-base 3xl:text-xl">
              {activity.title}
            </p>
            <p className="font-['Nunito'] text-[#e8eef2] text-xs sm:text-sm  3xl:text-lg opacity-70">
              {activity.time}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};