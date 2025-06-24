/**
 * FeaturesSection Component - Reusable features section with expandable cards
 */
import { useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";

// Feature card type definition
type FeatureCard = {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
};

// Props type definition
type FeaturesSectionProps = {
  featuresSectionRef: React.RefObject<HTMLElement>;
  featureCards: FeatureCard[];
  headingTitle?: string;
  headingDescription?: string;
};

export const FeaturesSection = ({
  featuresSectionRef,
  featureCards,
  headingTitle = "Get the tech career you deserve, Faster.",
  headingDescription = "The goal of this project is to create a personalized mock interview assistant that generates tailored questions, adapts difficulty, provides feedback, and simulates realistic interviews with helpful resources.",
}: FeaturesSectionProps): JSX.Element => {
  // State for tracking which feature card is expanded
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  // Refs for scrolling to expanded cards
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * Handles toggling the expanded state of feature cards
   * @param cardId - ID of the card being toggled
   */
  const handleCardToggle = (cardId: number) => {
    const isExpanding = expandedCard !== cardId;
    setExpandedCard((prev) => (prev === cardId ? null : cardId));

    // If expanding a card, scroll to it after a short delay
    if (isExpanding) {
      setTimeout(() => {
        cardRefs.current[cardId - 1]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 170);
    }
  };

  return (
    <motion.section
      ref={featuresSectionRef}
      id="features"
      className="relative z-10 py-[10vh] bg-[#1d1d20] w-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.7 }}
    >
      {/* Features background image */}
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        alt="Features background"
        src="/rectangle.png"
      />
      <div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18] z-[1]" />
      <div className="max-w-[1500px] mx-auto px-[8vw] pt-[5vh] relative z-10">
        {/* Features heading */}
        <section className="flex flex-col items-start w-full">
          <div className="flex flex-col items-start gap-4 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
              className="font-['Nunito',Helvetica] font-bold text-black text-[40px] leading-normal"
            >
              {headingTitle}
            </motion.h1>
            <p className="font-['Nunito',Helvetica] font-normal text-black-light text-lg leading-[29px]">
              {headingDescription}
            </p>
          </div>
        </section>

        {/* Feature cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20% 0px" }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
          className="grid grid-cols-4 gap-[2vw] py-[1vh] w-full"
        >
          {featureCards.map((card, index) => (
            <motion.div
              key={card.id}
              ref={(el) => (cardRefs.current[card.id - 1] = el)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 90,
                    damping: 15,
                    mass: 0.5,
                    delay: index * 0.1,
                  },
                },
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Feature card with expandable content */}
              <Card
                className={`w-[100%] top-[40px] ${
                  expandedCard === card.id
                    ? "h-[80vh] min-h-[641px]"
                    : "h-[65vh] min-h-[521px]"
                } bg-[#1d1d20] rounded-2xl overflow-hidden shadow-[0px_2px_4px_#0000001a] relative transition-all duration-300`}
              >
                <div className="h-full rounded-[3px] [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
                <CardContent className="p-0">
                  {/* Card image - fades out when expanded */}
                  <motion.div
                    layoutId={`image-${card.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: expandedCard === card.id ? 0 : 1,
                      scale: expandedCard === card.id ? 0.8 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      duration: 0.3,
                      opacity: { duration: 0.2 },
                    }}
                  >
                    <img
                      className="w-[168px] h-[168px] absolute top-8 left-8 object-cover"
                      alt={card.title}
                      src={card.image}
                    />
                  </motion.div>
                  <motion.h2
                    layout
                    className="absolute w-[212px] left-8 font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-[32px] leading-normal"
                    style={{
                      top: expandedCard === card.id ? "40px" : "214px",
                    }}
                  >
                    {card.title}
                  </motion.h2>
                  <motion.p
                    layout
                    className={`absolute ${
                      expandedCard === card.id
                        ? "w-[80%] max-h-[calc(80vh-200px)] overflow-y-scroll pr-4 overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        : "w-[212px]"
                    } left-8 font-['Nunito',Helvetica] font-normal text-[#c7d3dd] text-[16px] leading-6`}
                    style={{
                      top: expandedCard === card.id ? "120px" : "317px",
                      whiteSpace:
                        expandedCard === card.id ? "pre-line" : "normal",
                      height: expandedCard === card.id ? "auto" : "auto",
                      paddingTop: expandedCard === card.id ? "20px" : "0",
                    }}
                  >
                    {expandedCard === card.id
                      ? card.longDescription
                      : card.shortDescription}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-8"
                    style={{
                      bottom: "30px",
                      top: "auto",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCardToggle(card.id);
                      }}
                      className="inline-flex items-start border-b border-[#e8eef2] hover:border-opacity-50 transition-colors"
                    >
                      <span className="font-['Nunito',Helvetica] font-medium text-[#e8eef2] text-[16px] leading-6 whitespace-nowrap">
                        {expandedCard === card.id ? "Show less" : "Read more"}
                      </span>
                    </a>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
