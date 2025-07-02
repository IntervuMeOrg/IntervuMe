import { useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";

type FeatureCard = {
	id: number;
	title: string;
	shortDescription: string;
	longDescription: string;
	image: string;
};

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
	const [expandedCard, setExpandedCard] = useState<number | null>(null);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	const handleCardToggle = (cardId: number) => {
		const isExpanding = expandedCard !== cardId;
		setExpandedCard((prev) => (prev === cardId ? null : cardId));

		if (isExpanding) {
			setTimeout(() => {
				cardRefs.current[cardId - 1]?.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}, 100);
		}
	};

	return (
		<motion.section
			ref={featuresSectionRef}
			id="features"
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className="relative bg-[#1d1d20] overflow-hidden"
		>
			{/* Background layers */}
			<img
				className="absolute inset-0 w-full h-full object-cover z-0"
				alt="Features background"
				src="/rectangle.png"
			/>
			<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-20 z-10" />

			{/* Content */}
			<div className="relative z-20 py-16 sm:py-20 md:py-24 lg:py-32 3xl:py-">
				<div className="max-w-screen-lg container mx-auto px-4 sm:px-6 lg:px-8 3xl:px-72">
					{/* Section header */}
					<div className="mb-8 sm:mb-12">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2, duration: 0.5 }}
							className="font-['Nunito'] font-bold text-black text-2xl sm:text-3xl md:text-4xl 3xl:text-5xl mb-3"
						>
							{headingTitle}
						</motion.h2>
						<p className="font-['Nunito'] text-black text-sm sm:text-base 3xl:text-xl max-w-4xl 3xl:max-w-7xl">
							{headingDescription}
						</p>
					</div>

					{/* Feature cards grid */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={{
							visible: {
								transition: { staggerChildren: 0.1 },
							},
						}}
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 auto-rows-fr"
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
										transition: { duration: 0.5, delay: index * 0.1 },
									},
								}}
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 400, damping: 10 }}
								className="flex"
							>
								<Card
									className={`
                    relative overflow-hidden bg-[#1d1d20] border-0 rounded-xl shadow-lg
                    transition-all duration-300 ease-in-out w-full flex flex-col
                    ${
											expandedCard === card.id ? "h-80 sm:h-96 3xl:h-[33rem]" : "h-72 sm:h-96 3xl:h-[33rem]"
										}
                  `}
								>
									{/* Original gradient overlay */}
									<div className="absolute inset-0 h-full rounded-[3px] [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />

									<CardContent className="relative p-4 sm:p-5 3xl:p-6 flex flex-col h-full">
										{expandedCard === card.id ? (
											// Expanded state - no image, text at top
											<>
												<motion.h3
													initial={{ y: 100 }}
													animate={{ y: 0 }}
													transition={{ duration: 0.3 }}
													className="font-['Nunito'] font-bold text-[#e8eef2] text-lg sm:text-xl 3xl:text-3xl mb-3 3xl:mb-6 flex-shrink-0"
												>
													{card.title}
												</motion.h3>
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ delay: 0.2 }}
													className="flex-grow overflow-hidden mb-3 3xl:mb-6"
												>
													<div
														className="h-full max-h-40 sm:max-h-60 3xl:max-h-96 overflow-y-auto pr-2
                                        scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 
                                        hover:scrollbar-thumb-gray-500"
													>
														<p className="font-['Nunito'] text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg leading-relaxed">
															{card.longDescription}
														</p>
													</div>
												</motion.div>
												<button
													onClick={() => handleCardToggle(card.id)}
													className="self-start font-['Nunito'] font-medium text-[#e8eef2] 
                                   text-xs sm:text-sm 3xl:text-lg border-b border-[#e8eef2] pb-0.5
                                   hover:border-opacity-50 transition-colors flex-shrink-0"
												>
													Show less
												</button>
											</>
										) : (
											// Collapsed state - with image
											<>
												<motion.div
													animate={{ opacity: 1, scale: 1 }}
													initial={{ opacity: 0, scale: 0.8 }}
													transition={{ duration: 0.3 }}
													className="w-20 h-20 sm:w-24 3xl:w-40 sm:h-24 lg:w-28 lg:h-28 3xl:h-40 mb-3 sm:mb-4 3xl:mb-6 flex-shrink-0"
												>
													<img
														className="w-full h-full object-cover rounded-lg"
														alt={card.title}
														src={card.image}
													/>
												</motion.div>

												<h3 className="font-['Nunito'] font-bold text-[#e8eef2] text-lg sm:text-xl 3xl:text-3xl mb-2 sm:mb-3 3xl:mb-6">
													{card.title}
												</h3>

												<div className="flex-grow flex flex-col justify-between">
													<p className="font-['Nunito'] text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg leading-relaxed">
														{card.shortDescription}
													</p>
													<button
														onClick={() => handleCardToggle(card.id)}
														className="self-start mt-2 sm:mt-3 font-['Nunito'] font-medium text-[#e8eef2] 
                                     text-xs sm:text-sm 3xl:text-lg border-b border-[#e8eef2] pb-0.5
                                     hover:border-opacity-50 transition-colors"
													>
														Read more
													</button>
												</div>
											</>
										)}
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</motion.section>
	);
};
