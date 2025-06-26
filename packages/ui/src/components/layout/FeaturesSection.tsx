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
      className="relative z-10 py-16 md:py-20 lg:py-24 bg-[#1d1d20] w-full"
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
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-12 relative z-10">
        {/* Features heading */}
        <section className="flex flex-col items-start w-full mb-12 md:mb-16">
          <div className="flex flex-col items-start gap-4 md:gap-6 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
              className="font-['Nunito',Helvetica] font-bold text-black text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-normal"
            >
              {headingTitle}
            </motion.h1>
            <p className="font-['Nunito',Helvetica] font-normal text-black-light text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8 w-full"
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
                className={`w-full ${
                  expandedCard === card.id
                    ? "h-auto min-h-[600px]"
                    : "h-[450px]"
                } bg-[#1d1d20] rounded-2xl overflow-hidden shadow-[0px_2px_4px_#0000001a] relative transition-all duration-300`}
              >
                <div className="h-full rounded-[3px] [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
                <CardContent className="p-6 h-full flex flex-col">
                  {/* Card image - simple show/hide */}
                  {expandedCard !== card.id && (
                    <img
                      className="w-[168px] h-[168px] absolute top-8 left-8 object-cover"
                      alt={card.title}
                      src={card.image}
                    />
                  )}

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
                      paddingTop: expandedCard === card.id ? "20px" : "0",
                      overflow: expandedCard === card.id ? "auto" : "hidden",
                      textOverflow:
                        expandedCard === card.id ? "unset" : "ellipsis",
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
                      <span className="font-['Nunito',Helvetica] font-medium text-[#e8eef2] text-[14px] leading-6 whitespace-nowrap">
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
