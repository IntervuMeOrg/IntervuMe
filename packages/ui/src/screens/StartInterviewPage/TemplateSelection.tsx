import { useState } from "react";
import { motion } from "framer-motion";
import { BookTemplateIcon as TemplateIcon, CheckIcon } from "lucide-react";

interface TemplateSelectionProps {
	selectedTemplate: string;
	setSelectedTemplate: (value: string) => void;
}

export const TemplateSelection = ({
	selectedTemplate,
	setSelectedTemplate,
}: TemplateSelectionProps) => {
	// Template categories and items (restored from your original structure)
	const templates = [
		{
			category: "Software Engineering",
			items: [
				"Frontend Developer",
				"Backend Developer",
				"Full Stack Developer",
				"Mobile Developer",
			],
			descriptions: [
				"Develop user interfaces using React, Angular, or Vue. Implement responsive designs and optimize web performance for modern web applications.",
				"Build server-side applications using Node.js, Python, or Java. Design and implement APIs and database schemas for scalable systems.",
				"Create end-to-end applications handling both frontend and backend development. Coordinate between different system layers and technologies.",
				"Develop native or cross-platform mobile applications for iOS and Android using React Native, Flutter, or native technologies.",
			],
		},
		{
			category: "DevOps",
			items: ["DevOps Engineer", "Site Reliability Engineer", "Cloud Engineer"],
			descriptions: [
				"Implement CI/CD pipelines and automate deployment processes. Manage infrastructure as code using tools like Terraform or Ansible.",
				"Ensure system reliability, availability, and performance. Implement monitoring and alerting systems for large-scale applications.",
				"Design and implement cloud infrastructure on AWS, Azure, or GCP. Optimize cloud resources and implement security best practices.",
			],
		},
		{
			category: "Backend",
			items: [
				"Java Developer",
				"Python Developer",
				"Node.js Developer",
				".NET Developer",
			],
			descriptions: [
				"Develop enterprise applications using Java and related frameworks like Spring. Design and implement RESTful APIs and microservices.",
				"Build backend services using Python and frameworks like Django or Flask. Implement data processing pipelines and machine learning integrations.",
				"Create scalable server-side applications using Node.js and Express. Implement real-time features using WebSockets and event-driven architecture.",
				"Develop enterprise applications using .NET Core or Framework. Implement microservices architecture and cloud-native solutions.",
			],
		},
		{
			category: "Google SW-1",
			items: ["Software Engineer L3", "Software Engineer L4"],
			descriptions: [
				"Entry-level software engineer position at Google. Focus on implementing features and fixing bugs under supervision while learning Google's engineering practices.",
				"Mid-level software engineer position at Google. Design and implement medium-sized features independently and contribute to system architecture decisions.",
			],
		},
		{
			category: "Amazon SW-2",
			items: ["SDE I", "SDE II"],
			descriptions: [
				"Entry-level software development engineer at Amazon. Implement well-defined features and participate in code reviews while following Amazon's leadership principles.",
				"Mid-level software development engineer at Amazon. Design and implement complex features and mentor junior engineers while driving technical excellence.",
			],
		},
	];

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [count, setCount] = useState(0);

	// Handle template selection
	const handleTemplateSelect = (template: string, categoryIndex: number) => {
		setSelectedTemplate(template);
	};

	// Animation variants for cards
	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.1,
				duration: 0.5,
				type: "spring" as const,
				stiffness: 100,
				damping: 15,
			},
		}),
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 3xl:mb-8">
				<TemplateIcon className="h-4 w-4 sm:h-5 sm:w-5 3xl:h-6 3xl:w-6 text-[#e8eef2] flex-shrink-0" />
				<h3 className="font-['Nunito'] font-bold text-white text-base sm:text-lg md:text-xl 3xl:text-2xl">
					Select Interview Template
				</h3>
			</div>

			<p className="text-[#e8eef2] text-xs sm:text-sm 3xl:text-lg opacity-80 mb-4 sm:mb-6 3xl:mb-8">
				Choose from our pre-defined job templates to quickly start an interview
				tailored to specific roles and companies.
			</p>

			{/* Template Categories */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 3xl:mb-8">
				{templates.map((templateCategory, categoryIndex) => (
					<motion.div
						key={templateCategory.category}
						custom={categoryIndex}
						variants={cardVariants}
						initial="hidden"
						animate="visible"
						whileHover={{ scale: 1.03 }}
						className={`cursor-pointer p-3 sm:p-4 3xl:p-5 rounded-lg border-2 transition-all duration-200 ${
							selectedCategory === templateCategory.category
								? "border-[#0667D0] bg-[#0667D0]/20"
								: "border-white/20 bg-white/10 hover:border-white/40"
						}`}
						onClick={() => {
							if (count === 0) {
								setTimeout(() => {
									document.getElementById("template-header")?.scrollIntoView({
										behavior: "smooth",
										block: "start",
									});
								});
								setCount(1);
							}
							setSelectedCategory(templateCategory.category);
						}}
					>
						<h4
							id="template-header"
							className="font-['Nunito'] font-bold text-white text-sm sm:text-base 3xl:text-xl mb-1 sm:mb-2"
						>
							{templateCategory.category}
						</h4>
						<p className="text-[#e8eef2] text-xs sm:text-sm 3xl:text-lg opacity-70">
							{templateCategory.items.length} templates
						</p>
					</motion.div>
				))}
			</div>

			{/* Template Items */}
			{selectedCategory && (
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="border-t border-white/20 pt-4 sm:pt-6 3xl:pt-8"
				>
					<h4 className="font-['Nunito'] font-bold text-white text-base sm:text-lg 3xl:text-2xl mb-3 sm:mb-4 3xl:mb-6">
						{selectedCategory} Templates
					</h4>
					<div className="space-y-2 sm:space-y-3 3xl:space-y-4">
						{templates
							.find((t) => t.category === selectedCategory)
							?.items.map((template, index) => {
								const categoryIndex = templates.findIndex(
									(t) => t.category === selectedCategory
								);
								const isSelected = selectedTemplate === template;
								return (
									<motion.div
										key={template}
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.1 }}
										className={`flex items-center p-3 sm:p-4 3xl:p-5 rounded-lg cursor-pointer transition-all duration-200 ${
											isSelected
												? "bg-[#0667D0]/20 border-2 border-[#0667D0]"
												: "hover:bg-white/10 border border-white/20"
										}`}
										onClick={() => {
											if (count === 1) {
												setTimeout(() => {
													document
														.getElementById("template-description-header")
														?.scrollIntoView({
															behavior: "smooth",
															block: "start",
														});
												});
												setCount(2);
											}
											handleTemplateSelect(template, categoryIndex);
										}}
									>
										<div className="flex-1">
											<h5
												id="template-description-header"
												className="font-['Nunito'] font-bold text-white text-sm sm:text-base 3xl:text-xl"
											>
												{template}
											</h5>
											<p className="text-[#e8eef2] text-xs sm:text-sm 3xl:text-lg opacity-80 mt-1 leading-relaxed">
												{templates[categoryIndex].descriptions[index].substring(
													0,
													100
												)}
												{templates[categoryIndex].descriptions[index].length >
													100 && "..."}
											</p>
										</div>
										{isSelected && (
											<CheckIcon className="h-5 w-5 sm:h-6 sm:w-6 3xl:h-7 3xl:w-7 text-[#0667D0] ml-2 flex-shrink-0" />
										)}
									</motion.div>
								);
							})}
					</div>
				</motion.div>
			)}

			{/* Preview of selected template */}
			{selectedTemplate && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="mt-4 sm:mt-6 3xl:mt-8 border-t border-white/20 pt-4 sm:pt-6 3xl:pt-8"
				>
					<h4 className="font-['Nunito'] font-bold text-white text-base sm:text-lg mb-3 sm:mb-4">
						Template Preview
					</h4>
					<div className="bg-white/10 p-3 sm:p-4 3xl:p-5 rounded-lg border border-white/20">
						<h5 className="font-['Nunito'] font-bold text-white text-sm sm:text-base 3xl:text-xl mb-2">
							Selected Role: {selectedTemplate}
						</h5>
						<p className="text-[#e8eef2] text-xs sm:text-sm 3xl:text-lg opacity-80 leading-relaxed">
							{
								templates.find((t) => t.category === selectedCategory)
									?.descriptions[
									templates
										.find((t) => t.category === selectedCategory)
										?.items.findIndex((item) => item === selectedTemplate) || 0
								]
							}
						</p>
					</div>
				</motion.div>
			)}

			{selectedTemplate && (
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					className="mt-4 sm:mt-6 3xl:mt-8 p-3 sm:p-4 3xl:p-5 bg-[#0667D0]/10 border border-[#0667D0]/30 rounded-lg"
				>
					<p className="text-[#e8eef2] text-xs sm:text-sm 3xl:text-lg">
						<span className="font-semibold text-[#0667D0]">Selected:</span>{" "}
						{selectedTemplate} - This template will generate questions tailored
						to the role requirements.
					</p>
				</motion.div>
			)}
		</motion.div>
	);
};
