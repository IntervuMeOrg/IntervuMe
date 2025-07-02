import { motion } from "framer-motion";

export const DashboardStats = () => {
  const stats = [
    {
      title: "Interviews Completed",
      value: "5",
      subtitle: "+3 this month",
      delay: 0.1,
    },
    {
      title: "Average Score",
      value: "85%",
      subtitle: "+5% from last month",
      delay: 0.2,
    },
    {
      title: "Skills Improved",
      value: "8",
      subtitle: "Technical & Soft Skills",
      delay: 0.3,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 3xl:gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: stat.delay, duration: 0.5 }}
          className="bg-white/10 rounded-lg p-4 sm:p-5 md:p-6 3xl:p-8 backdrop-blur-sm"
        >
          <h3 className="font-['Nunito'] font-bold text-[#e8eef2] text-base sm:text-lg md:text-xl 3xl:text-[1.7rem] mb-2 3xl:mb-4">
            {stat.title}
          </h3>
          <p className="font-['Nunito'] text-[#e8eef2] text-2xl sm:text-3xl 3xl:text-4xl font-bold">
            {stat.value}
          </p>
          <p className="font-['Nunito'] text-[#e8eef2] text-xs sm:text-sm 3xl:text-lg opacity-70 mt-2 3xl:mt-4">
            {stat.subtitle}
          </p>
        </motion.div>
      ))}
    </div>
  );
};