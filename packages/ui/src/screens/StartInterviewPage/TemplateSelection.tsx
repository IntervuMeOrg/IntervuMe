import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { CheckCircleIcon } from "lucide-react";

type Templates = {
	category: string;
	items: string[];
	descriptions: string[];
}[];

type TemplateSelectionProps = {
	jobDescription: string;
	handleStartInterview: () => void;
	templates: Templates;
	selectedTemplate: string | null;
	selectedCategory: string | null;
	setSelectedCategory: (category: string | null) => void;
	count: number;
	setCount: (value: number) => void;
	handleTemplateSelect: (template: string, categoryIndex: number) => void;
};

export const TemplateSelection = ({
	jobDescription,
	handleStartInterview,
	templates,
	selectedTemplate,
	selectedCategory,
	setSelectedCategory,
	count,
	setCount,
	handleTemplateSelect,
}: TemplateSelectionProps) => {
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
		<div className="overflow-visible">
			<h2 className="font-['Nunito',Helvetica] font-bold text-[1.5rem] mb-4 text-[#1d1d20]">
				Select a Template
			</h2>
			<p className="text-[#666] mb-6">
				Choose from our pre-defined job templates to quickly start an interview
				tailored to specific roles and companies.
			</p>

			{/* Template Categories */}
			<div className="grid grid-cols-3 gap-4 mb-8">
				{templates.map((templateCategory, categoryIndex) => (
					<motion.div
						key={templateCategory.category}
						custom={categoryIndex}
						variants={cardVariants}
						initial="hidden"
						animate="visible"
						whileHover={{ scale: 1.03 }}
						className={`cursor-pointer p-4 rounded-lg border-2 ${
							selectedCategory === templateCategory.category
								? "border-[#0667D0]  bg-blue-50"
								: "border-gray-300 hover:border-[#0667D0] hover:bg-blue-50"
						} transition-all duration-200`}
						onClick={() => {
							// check if counter == 0
							if (count == 0) {
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
						<h3
							id="template-header"
							className="font-['Nunito',Helvetica] font-bold text-[1.1rem] text-[#1d1d20]"
						>
							{templateCategory.category}
						</h3>
						<p className="text-[#666] text-sm mt-1">
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
					className="border-t border-gray-300 pt-6 overflow-visible"
				>
					<h3 className="font-['Nunito',Helvetica] font-bold text-[1.2rem] mb-4 text-[#1d1d20]">
						{selectedCategory} Templates
					</h3>
					<div className="space-y-3">
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
										className={`flex items-center p-3 rounded-lg cursor-pointer ${
											isSelected
												? "bg-blue-100 border-2 border-[#0667D0]"
												: "hover:bg-gray-300 border border-gray-300"
										} transition-all duration-200`}
										onClick={() => {
											if (count == 1) {
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
											<h4
												id="template-description-header"
												className="font-['Nunito',Helvetica] font-bold text-[1rem] text-[#1d1d20]"
											>
												{template}
											</h4>
											<p className="text-[#666] text-sm mt-1">
												{templates[categoryIndex].descriptions[index].substring(
													0,
													80
												)}
												...
											</p>
										</div>
										{isSelected && (
											<CheckCircleIcon className="h-6 w-6 text-[#0667D0] ml-2" />
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
					className="mt-6 border-t border-gray-300 pt-6"
				>
					<h3 className="font-['Nunito',Helvetica] font-bold text-[1.2rem] mb-4 text-[#1d1d20]">
						Template Preview
					</h3>
					<div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
						<h4 className="font-['Nunito',Helvetica] font-bold text-[1rem] text-[#1d1d20] mb-2">
							Job Description
						</h4>
						<p className="text-[#444] whitespace-pre-line">{jobDescription}</p>
					</div>
				</motion.div>
			)}

			<Button
				onClick={handleStartInterview}
				className="w-full h-[50px] mt-8 [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90 transition-all duration-300"
				disabled={!selectedTemplate}
			>
				<span className="font-['Nunito',Helvetica] font-semibold text-white text-[1.1rem]">
					Start Interview
				</span>
			</Button>
		</div>
	);
};
