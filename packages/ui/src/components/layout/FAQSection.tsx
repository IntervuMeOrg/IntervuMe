/**
 * FAQSection Component - Reusable FAQ section with accordion items
 */
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
	title = "Frequently Asked Question",
	subtitle = "Can't find answer here?",
}: FAQSectionProps): JSX.Element => {
	return (
		<motion.section
			id="faq-section"
			ref={faqSectionRef}
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-20% 0px" }}
			transition={{
				type: "spring",
				stiffness: 80,
				damping: 18,
				mass: 0.7,
			}}
			className="relative py-[10vh] w-full bg-gray-300"
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
				transition={{ duration: 0.8 }}
				className="flex flex-col items-center relative z-10 px-[8vw] pt-[6vh] pb-[5vh]"
			>
				{/* Page Title */}
				<div className="w-full max-w-[800px] text-center mb-[5vh]">
					<h1 className="[font-family:'Nunito',Helvetica] font-bold text-black text-[41px] tracking-[0] leading-[normal]">
						{title}
					</h1>
					<p className="mt-4 opacity-[0.71] [font-family:'Nunito',Helvetica] font-medium text-[#1d1d20] text-lg text-center tracking-[0] leading-[normal]">
						{subtitle}
					</p>
				</div>

				{/* FAQ Accordion */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="w-full max-w-3xl mx-auto"
				>
					<div className="w-full">
						{faqItems.map((item, index) => (
							<div key={index} className="mb-0">
								{/* Gradient divider line before each FAQ item */}
								<div className="h-[3px] w-full bg-[#03346A]" />

								<Accordion type="single" collapsible className="w-full">
									<AccordionItem
										value={`item-${index}`}
										className="border-none"
									>
										<AccordionTrigger className="py-3 hover:no-underline flex justify-between">
											<span className="text-left font-['Nunito',Helvetica] font-bold text-lg text-[#1d1d20]">
												{item.question}
											</span>
										</AccordionTrigger>
										<AccordionContent className="py-1 overflow-hidden">
											<p className="font-['Nunito',Helvetica] text-base text-[#3c3c43] leading-relaxed">
												{item.answer}
											</p>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>
						))}
						{/* Final gradient divider line after the last FAQ item */}
						<div className="h-[3px] w-full bg-[#03346A]" />
					</div>
				</motion.div>
			</motion.div>
		</motion.section>
	);
};