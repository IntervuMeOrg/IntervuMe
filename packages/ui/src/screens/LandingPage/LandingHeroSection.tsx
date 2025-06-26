import { motion } from "framer-motion";

type HeroSectionProps = {
  homeSectionRef: React.RefObject<HTMLElement>;
  steps: { id: number; title: string; image: string; alt: string }[];
};
export const HeroSection = ({ homeSectionRef, steps }: HeroSectionProps) => {
  return (
    <div className="w-full h-screen relative z-0 overflow-hidden">
      {/* Background image */}
      <img
        className="h-full w-full object-cover absolute top-0 left-0"
        alt="Rectangle"
        src="/rectangle.png"
      />

      {/* Main content */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        ref={homeSectionRef}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 15,
          mass: 0.5,
          delay: 0.3,
        }}
        className="relative z-10 pt-24 md:pt-32 lg:pt-40 xl:pt-48 flex flex-col items-center pb-8 md:pb-12 lg:pb-16 h-full"
      >
        {/* Headline */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16 xl:mb-20 px-4">
          <h1 className="font-['Nunito',Helvetica] font-black text-[#1d1d20] text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-center tracking-[0] leading-tight [text-shadow:0_4px_4px_rgba(0,0,0,0.3)]">
            Mock Interview Assistant
            <br />
            powered by AI
          </h1>
        </div>

        {/* Process steps cards */}
        <div className="flex flex-col lg:flex-row justify-center items-end gap-8 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 px-4 md:px-6 lg:px-8 w-full max-w-7xl mx-auto pt-8 md:pt-12 lg:pt-16">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center relative w-full max-w-sm lg:max-w-none lg:w-1/3 h-80 md:h-96 lg:h-[400px] xl:h-[450px]"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              {/* Step image */}
              <motion.img
                className="w-64 md:w-72 lg:w-80 xl:w-96 h-48 md:h-56 lg:h-64 xl:h-72 object-contain mb-4"
                alt={step.alt}
                src={step.image}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              {/* Step title bar */}
              <motion.div
                className="relative w-72 md:w-80 lg:w-84 xl:w-96 h-10 md:h-12 lg:h-14 bg-[#1d1d20] rounded-[5px] shadow-lg shadow-black/50 overflow-hidden"
                whileHover={{
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)",
                  y: -2,
                }}
              >
                <div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
                <div className="relative flex items-center px-2 md:px-3 lg:px-4 h-full z-10">
                  <div className="font-['Nunito',Helvetica] font-semibold text-[#e8eef2] text-sm md:text-base lg:text-lg xl:text-xl px-1 md:px-2">
                    {step.title}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};
