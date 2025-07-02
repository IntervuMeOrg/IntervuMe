import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

type DashboardTipsTricksProps = {
  carouselRef: React.RefObject<HTMLDivElement>;
  tipsAndTricks: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  activeTip: number;
  setActiveTip: (index: number) => void;
  navigateTip: (direction: "next" | "prev") => void;
};

export const DashboardTipsTricks = ({
  carouselRef,
  tipsAndTricks,
  activeTip,
  setActiveTip,
  navigateTip,
}: DashboardTipsTricksProps) => {
  return (
    <motion.div
      id="tipsAndTricks"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full"
    >
      <h3 className="font-['Nunito'] font-bold text-[#e8eef2] text-lg sm:text-xl md:text-2xl 3xl:text-3xl mb-4 sm:mb-6 3xl:mb-8">
        Interview Tips & Tricks
      </h3>
      
      <div className="relative">
        <div
          ref={carouselRef}
          className="bg-gradient-to-r from-[#0667D0] to-[#033464] rounded-lg p-4 sm:p-6 md:p-8 3xl:p-10 shadow-lg relative overflow-hidden"
        >
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 3xl:left-6 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 hover:bg-white/30 rounded-full h-8 w-8 sm:h-10 sm:w-10 3xl:h-14 3xl:w-14"
              onClick={() => navigateTip("prev")}
            >
              <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 3xl:h-7 3xl:w-7 text-white" />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 3xl:right-6 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 hover:bg-white/30 rounded-full h-8 w-8 sm:h-10 sm:w-10 3xl:h-14 3xl:w-14"
              onClick={() => navigateTip("next")}
            >
              <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5 3xl:h-7 3xl:w-7 text-white" />
            </Button>
          </div>

          {/* Content */}
          <div className="mx-8 sm:mx-12 md:mx-16 3xl:mx-24">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 3xl:gap-8">
              <div className="flex-shrink-0 bg-white/10 p-3 sm:p-4 3xl:p-6 rounded-full">
                {tipsAndTricks[activeTip].icon}
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-['Nunito'] font-bold text-white text-base sm:text-lg md:text-xl 3xl:text-[1.6rem] mb-2 3xl:mb-3">
                  {tipsAndTricks[activeTip].title}
                </h3>
                <p className="font-['Nunito'] text-white text-xs sm:text-sm md:text-base 3xl:text-[1.3rem] opacity-90 leading-relaxed">
                  {tipsAndTricks[activeTip].description}
                </p>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 sm:mt-6 3xl:mt-8 gap-1.5 ">
            {tipsAndTricks.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 sm:h-2 3xl:h-3 rounded-full transition-all cursor-pointer ${
                  index === activeTip 
                    ? "w-6 sm:w-8 3xl:w-10 bg-white" 
                    : "w-1.5 sm:w-2 3xl:w-3 bg-white/40 hover:bg-white/60"
                }`}
                onClick={() => setActiveTip(index)}
                aria-label={`Go to tip ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};