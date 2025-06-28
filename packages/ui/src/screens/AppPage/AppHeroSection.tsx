import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type Step = {
  id: number;
  title: string;
  image: string;
  alt: string;
};

type AppHeroSectionProps = {
  userName: string;
  homeSectionRef: React.RefObject<HTMLElement>;
  navigate: ReturnType<typeof useNavigate>;
  steps: Step[];
};

export const AppHeroSection = ({
  userName,
  homeSectionRef,
  navigate,
  steps,
}: AppHeroSectionProps) => {
  const handleStepClick = (stepId: number) => {
    window.scrollTo(0, 0);
    
    switch (stepId) {
      case 1:
        navigate("/start-interview");
        break;
      case 2:
        navigate("/history");
        break;
      case 3:
        navigate("/app");
        setTimeout(() => {
          document.getElementById("tipsAndTricks")?.scrollIntoView({
            block: "start",
            behavior: "smooth",
          });
        }, 0);
        break;
    }
  };

  return (
    <section 
      ref={homeSectionRef}
      className="relative min-h-screen w-full bg-white overflow-hidden flex items-center"
    >
      {/* Background image */}
      <img
        className="absolute inset-0 h-full w-full object-cover"
        alt="Background"
        src="/rectangle.png"
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full py-16 sm:py-20"
      >
        {/* Container wrapper */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col items-center">
            {/* Headline and greeting */}
            <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 -mt-1 sm:-mt-2 md:-mt-4 lg:-mt-8">
              <img
                src="/get-the-tech-career-you-deserve--faster.svg"
                alt="Get the tech career you deserve, faster"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
              />
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="font-['Nunito'] font-bold text-[#1d1d20] text-base sm:text-lg md:text-xl mt-3"
              >
                Hello, {userName}
              </motion.h2>
            </div>

            {/* Process steps cards */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 w-full">
              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  className="relative flex flex-col items-center cursor-pointer w-full sm:w-auto max-w-[200px] sm:max-w-none"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  onClick={() => handleStepClick(step.id)}
                >
                  {/* Step image - Progressive sizing */}
                  <motion.img
                    className="w-32 sm:w-44 md:w-52 lg:w-60 xl:w-72 
                              h-20 sm:h-28 md:h-32 lg:h-40 xl:h-48 
                              object-contain mb-6 sm:mb-8 md:mb-10 lg:mb-12"
                    alt={step.alt}
                    src={step.image}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  
                  {/* Step title bar - Progressive sizing */}
                  <motion.div
                    className="absolute bottom-0
                              w-32 sm:w-44 md:w-52 lg:w-60 xl:w-72 
                              h-7 sm:h-8 md:h-9 lg:h-10 
                              bg-[#1d1d20] rounded-md shadow-lg shadow-black/50
                              overflow-hidden"
                    whileHover={{
                      boxShadow: "0 2.5rem 3rem -1.5rem rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-md" />
                    <div className="relative h-full flex items-center justify-center px-2">
                      <h3 className="font-['Nunito'] font-semibold text-[#e8eef2] 
                                     text-xs sm:text-xs md:text-sm lg:text-sm 
                                     text-center leading-tight">
                        {step.title}
                      </h3>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};