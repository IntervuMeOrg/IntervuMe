import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { TemplateSelection } from "./TemplateSelection";
import { CustomJobDescription } from "./CustomJobDescription";
import { FileTextIcon, ClipboardIcon } from "lucide-react";

type StartInverviewFormPanelProps = {
	inputMethod: "custom" | "template";
	setInputMethod: (method: "custom" | "template") => void;
};

export const StartInverviewFormPanel = ({
	inputMethod,
	setInputMethod,
}: StartInverviewFormPanelProps) => {
	// global counter
	const [count, setCount] = useState(0);
	// Navigation hook for routing
	const navigate = useNavigate();
	// State for custom job description
	const [jobDescription, setJobDescription] = useState("");
	// State for selected template
	const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
	// State for selected template category
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	// Template categories and items
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
				"Develop user interfaces using React, Angular, or Vue. Implement responsive designs and optimize web performance.",
				"Build server-side applications using Node.js, Python, or Java. Design and implement APIs and database schemas.",
				"Create end-to-end applications handling both frontend and backend development. Coordinate between different system layers.",
				"Develop native or cross-platform mobile applications for iOS and Android using React Native, Flutter, or native technologies.",
			],
		},
		{
			category: "Dev Ops",
			items: ["DevOps Engineer", "Site Reliability Engineer", "Cloud Engineer"],
			descriptions: [
				"Implement CI/CD pipelines and automate deployment processes. Manage infrastructure as code using tools like Terraform or Ansible.",
				"Ensure system reliability, availability, and performance. Implement monitoring and alerting systems.",
				"Design and implement cloud infrastructure on AWS, Azure, or GCP. Optimize cloud resources and implement security best practices.",
			],
		},
		{
			category: "Back End",
			items: [
				"Java Developer",
				"Python Developer",
				"Node.js Developer",
				".NET Developer",
			],
			descriptions: [
				"Develop enterprise applications using Java and related frameworks like Spring. Design and implement RESTful APIs.",
				"Build backend services using Python and frameworks like Django or Flask. Implement data processing pipelines.",
				"Create scalable server-side applications using Node.js and Express. Implement real-time features using WebSockets.",
				"Develop enterprise applications using .NET Core or Framework. Implement microservices architecture.",
			],
		},
		{
			category: "Google SW-1",
			items: ["Software Engineer L3", "Software Engineer L4"],
			descriptions: [
				"Entry-level software engineer position at Google. Focus on implementing features and fixing bugs under supervision.",
				"Mid-level software engineer position at Google. Design and implement medium-sized features independently.",
			],
		},
		{
			category: "Amazon SW-2",
			items: ["SDE I", "SDE II"],
			descriptions: [
				"Entry-level software development engineer at Amazon. Implement well-defined features and participate in code reviews.",
				"Mid-level software development engineer at Amazon. Design and implement complex features and mentor junior engineers.",
			],
		},
	];
	// Handle template selection
	const handleTemplateSelect = (template: string, categoryIndex: number) => {
		setSelectedTemplate(template);
		const templateIndex = templates[categoryIndex].items.findIndex(
			(item) => item === template
		);
		const description = templates[categoryIndex].descriptions[templateIndex];
		setJobDescription(description);
	};

	// Handle starting the interview
	const handleStartInterview = () => {
		// Log interview details
		console.log(
			"Starting interview with:",
			selectedTemplate || "Custom Job Description"
		);
		console.log("Job Description:", jobDescription);
		window.scrollTo(0, 0);
		// Navigate to interview questions page with the interview data
		navigate("/interview-questions", {
			state: {
				title: selectedTemplate || "Custom Job Interview",
				jobDescription: jobDescription,
				totalTime: 45 * 60, // 45 minutes in seconds
				// You can add more data here as needed
			},
		});
	};
    
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className="max-w-[1000px] mx-auto mb-[2vh]"
		>
			<Card className="bg-[#E8EEF2] shadow-lg border-0 overflow-hidden">
				<CardContent className="p-6">
					{/* Input Method Selection Buttons - Now Inside Card */}
					<div className="flex justify-center gap-6 mb-5">
						<Button
							id="card-job-section"
							className={`rounded-[5px] h-[6vh] w-[19vw] min-w-60 ${
								inputMethod === "custom"
									? "[background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] text-white"
									: "bg-white text-[#1d1d20] border border-[#1d1d20]"
							} hover:opacity-90 transition-all duration-300`}
							onClick={() => setInputMethod("custom")}
						>
							<FileTextIcon className="mr-2 h-5 w-5" />
							<span className="font-['Nunito',Helvetica] font-semibold text-[1.1rem]">
								Custom Description
							</span>
						</Button>
						<Button
							className={`rounded-[5px] h-[6vh] w-[19vw] min-w-60  ${
								inputMethod === "template"
									? "[background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] text-white"
									: "bg-white text-[#1d1d20] border border-[#1d1d20]"
							} hover:opacity-90 transition-all duration-100`}
							onClick={() => {
								setTimeout(() => {
									document.getElementById("card-job-section")?.scrollIntoView({
										behavior: "smooth",
										block: "start",
									});
								});
								setInputMethod("template");
							}}
						>
							<ClipboardIcon className="mr-2 h-5 w-5" />
							<span className="font-['Nunito',Helvetica] font-semibold text-[1.1rem]">
								Use Template
							</span>
						</Button>
					</div>

					{/* Divider */}
					<div className="border-t border-gray-300 mb-4"></div>

					{/* Custom Job Description Input */}
					{inputMethod === "custom" && (
						<CustomJobDescription
							jobDescription={jobDescription}
							setJobDescription={setJobDescription}
							handleStartInterview={handleStartInterview}
						/>
					)}

					{/* Template Selection */}
					{inputMethod === "template" && (
						<TemplateSelection
							jobDescription={jobDescription}
							templates={templates}
							selectedTemplate={selectedTemplate}
							handleTemplateSelect={handleTemplateSelect}
							setSelectedCategory={setSelectedCategory}
							selectedCategory={selectedCategory}
							count={count}
							setCount={setCount}
							handleStartInterview={handleStartInterview}
						/>
					)}
				</CardContent>
			</Card>
		</motion.div>
	);
};
