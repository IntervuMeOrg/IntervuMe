import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { motion } from "framer-motion";

// FAQ item type definition
type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

// Props type definition
type FAQSectionProps = {
  faqSectionRef: React.RefObject<HTMLElement>;
  faqItems: FAQItem[];
  title?: string;
  subtitle?: string;
};

export const FAQSection = ({
  faqSectionRef,
  faqItems,
  title = "Frequently Asked Questions",
  subtitle = "Can't find answer here?",
}: FAQSectionProps): JSX.Element => {
  return (
    <motion.section
      id="faq-section"
      ref={faqSectionRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative py-16 sm:py-20 md:py-24 lg:py-30 3xl:py-36 w-full bg-gray-300"
    >
      {/* FAQ background image */}
      <img
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
        alt="FAQ background"
        src="/rectangle.png"
      />
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 3xl:px-10">
          {/* Page Title */}
          <div className="max-w-3xl 3xl:max-w-7xl mx-auto text-center mb-8 sm:mb-12 md:mb-16 3xl:mb-20">
            <h1 className="font-['Nunito'] font-bold text-black text-2xl sm:text-3xl md:text-4xl 3xl:text-5xl tracking-normal leading-normal">
              {title}
            </h1>
            <p className="mt-4 3xl:mt-7 opacity-70 font-['Nunito'] font-medium text-[#1d1d20] text-base sm:text-lg 3xl:text-2xl text-center tracking-normal leading-normal">
              {subtitle}
            </p>
          </div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-4xl 3xl:max-w-6xl mx-auto"
          >
            <div className="w-full">
              {faqItems.map((item, index) => (
                <div key={item.id} className="mb-0">
                  {/* Gradient divider line before each FAQ item */}
                  <div className="h-[3px] 3xl:h-[0.2rem] w-full bg-[#03346A]" />

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem
                      value={`item-${index}`}
                      className="border-none"
                    >
                      <AccordionTrigger className="py-3 sm:py-4 3xl:py-6 hover:no-underline flex justify-between text-left">
                        <span className="font-['Nunito'] font-bold text-base sm:text-lg 3xl:text-[1.6rem] text-[#1d1d20] pr-4">
                          {item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="py-1 sm:py-2 3xl:py-3 overflow-hidden">
                        <p className="font-['Nunito'] text-sm sm:text-base 3xl:text-[1.3rem] text-[#3c3c43] leading-relaxed">
                          {item.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
              {/* Final gradient divider line after the last FAQ item */}
              <div className="h-[3px] 3xl:h-[0.2rem] w-full bg-[#03346A]" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};