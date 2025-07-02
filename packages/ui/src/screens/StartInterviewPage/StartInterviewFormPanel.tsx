import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import {
	FileTextIcon,
	BookTemplateIcon as TemplateIcon,
	PlayIcon,
	CheckIcon,
} from "lucide-react";
import { CustomJobDescription } from "./CustomJobDescription";
import { TemplateSelection } from "./TemplateSelection";
import { LoadingOverlay } from "./LoadingOverlay";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";
import { mapBackendToProblemSolving } from "../../utils/questionMappers";

type InputMethod = "custom" | "template";
type Question = MCQQuestion | ProblemSolvingQuestion;
interface StartInterviewFormPanelProps {
	inputMethod: InputMethod;
	setInputMethod: (method: InputMethod) => void;
}

export const StartInterviewFormPanel = ({
	inputMethod,
	setInputMethod,
}: StartInterviewFormPanelProps) => {
	const navigate = useNavigate();

	// State for form data
	const [jobDescription, setJobDescription] = useState("");
	const [selectedTemplate, setSelectedTemplate] = useState("");
	const [questions, setQuestions] = useState<Question[]>([
		{
			id: 1,
			type: "mcq",
			text: "Which of the following is NOT a React Hook?",
			options: [
				{ id: "a", text: "useState" },
				{ id: "b", text: "useEffect" },
				{ id: "c", text: "useHistory" },
				{ id: "d", text: "useReactState" },
			],
			points: 10,
			correctOptionId: "c",
			explanation: "useHistory is from react-router v5, not a core React hook",
		},
		{
			id: 2,
			type: "mcq",
			text: "What is the correct way to pass a prop called 'name' to a component?",
			options: [
				{ id: "a", text: "<Component {name='John'} />" },
				{ id: "b", text: "<Component name='John' />" },
				{ id: "c", text: '<Component name="John" />' },
				{ id: "d", text: "<Component props={name: 'John'} />" },
			],
			points: 10,
			correctOptionId: "c",
			explanation:
				"Props should be passed as JSX attributes with double quotes for strings",
		},
		{
			id: 3,
			type: "problem_solving",
			title: "Two Sum",
			category: "Arrays & Hashing",
			difficulty: "Easy",
			points: 20,
			timeLimit: 30,
			problemStatement:
				"You are given an array of integers nums and an integer target. Your task is to return the indices of any two distinct elements in the array whose sum is equal to the target. If no such pair exists, print -1. Note that there may be multiple correct answers — returning any one valid pair is acceptable.",
			examples: [
				{
					input: "nums = [2,7,11,15], target = 9",
					output: "[0,1]",
					explanation: "nums[0] + nums[1] = 2 + 7 = 9",
				},
				{
					input: "nums = [3,2,4], target = 6",
					output: "[1,2]",
					explanation: "nums[1] + nums[2] = 2 + 4 = 6",
				},
			],
			starterCodes: {
				codeHeader: {
					cpp: "#include <vector>\n#include <unordered_map>\nusing namespace std;",
					java: "import java.util.*;",
					python: "from typing import List",
				},
				codeStarter: {
					cpp: "vector<int> twoSum(vector<int>& nums, int target) {\n",
					java: "public int[] twoSum(int[] nums, int target) {\n",
					python: "def twoSum(nums: List[int], target: int) -> List[int]:\n",
				},
				codeFooter: {
					cpp: "}",
					java: "}",
					python: "",
				},
			},
			constraints: [
				"2 <= nums.length <= 10^4",
				"-10^3 <= nums[i] <= 10^3",
				"-10^4 <= target <= 10^4",
			],
			followUp: [
				"How would you optimize if the input array is sorted?",
				"Can you solve it in O(n log n) time?",
			],
			tags: ["Arrays", "Hash Table", "Sorting"],
			testCases: [
				{
					input: "[2,7,11,15]\n9",
					expectedOutput: "[0,1]",
					isHidden: false,
				},
				{
					input: "[3,2,4]\n6",
					expectedOutput: "[1,2]",
					isHidden: false,
				},
				{
					input: "[3,3]\n6",
					expectedOutput: "[0,1]",
					isHidden: true,
				},
			],
			solution: "Use a hash map to store visited elements",
			explanation:
				"Store each element's index as you iterate. For each number, check if its complement exists in the map",
		},
	]);

	const [isLoading, setIsLoading] = useState(false);

	// Handle loading completion and navigation
	const handleLoadingComplete = () => {
		setIsLoading(false);
		// Navigate to interview-questions page
		navigate("/interview-questions", {
			state: {
				inputMethod,
				jobDescription,
				selectedTemplate,
			},
		});
	};

	// Handle form submission
	const handleStartInterview = async () => {
		if (inputMethod === "custom" && !jobDescription.trim()) return;
		if (inputMethod === "template" && !selectedTemplate) return;

		setIsLoading(true);

		try {
			// Toggle between mock data and real backend
			const useMockData = true; // Set to false when backend is ready

			let finalQuestions: Question[];

			if (useMockData) {
				// Use your existing mock data (already in correct format)
				// Simulate API delay for testing
				await new Promise((resolve) => setTimeout(resolve, 6000));
				finalQuestions = questions;
			} else {
				// Real backend API call
				const requestBody = {
					method: inputMethod,
					...(inputMethod === "custom"
						? { jobDescription }
						: { templateId: selectedTemplate }),
				};

				const response = await fetch("/api/questions", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(requestBody),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const backendQuestions = await response.json();

				// Separate MCQ and Problem Solving questions if backend returns mixed types
				const problemSolvingQuestions = backendQuestions
					.filter((q: any) => q.problemStatement) // Assuming this identifies problem solving
					.map(mapBackendToProblemSolving);

				const mcqQuestions = backendQuestions.filter((q: any) => q.options); // Assuming this identifies MCQ

				finalQuestions = [...mcqQuestions, ...problemSolvingQuestions];
			}

			navigate("/interview-questions", { state: { questions: finalQuestions } });
		} catch (error) {
			console.error("Error fetching questions:", error);
			// Handle error (e.g., show error toast/component)
			// You might want to show an error message to the user here
		} finally {
			setIsLoading(false);
		}
	};
	const [count, setCount] = useState(0);

	// Check if form is valid
	const isFormValid =
		inputMethod === "custom"
			? jobDescription.trim().length > 0
			: selectedTemplate.length > 0;

	return (
		<>
			{/* Loading Overlay */}
			<LoadingOverlay
				isVisible={isLoading}
				onComplete={handleLoadingComplete}
			/>

			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{
					type: "spring",
					stiffness: 80,
					damping: 12,
					delay: 0.1,
				}}
				className="bg-[#1d1d20] rounded-lg shadow-xl relative overflow-hidden"
				whileHover={{
					boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
					transition: { duration: 0.3 },
				}}
			>
				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

				<div className="relative z-10 p-6 sm:p-8 md:p-10 3xl:p-12">
					{/* Input Method Selection */}
					<div className="mb-6 sm:mb-8 3xl:mb-10">
						<h2 className="font-['Nunito'] font-bold text-white text-lg sm:text-xl md:text-2xl 3xl:text-3xl mb-4 sm:mb-6 3xl:mb-8">
							Choose Your Approach
						</h2>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 3xl:gap-6">
							{/* Custom Job Description Option */}
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => setInputMethod("custom")}
								disabled={isLoading}
								className={`p-4 sm:p-5 md:p-6 3xl:p-7 rounded-lg border-2 transition-all duration-200 ${
									inputMethod === "custom"
										? "border-[#0667D0] bg-[#0667D0]/20"
										: "border-white/20 bg-white/10 hover:border-white/40"
								} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
							>
								<div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
									<div className="relative">
										<FileTextIcon className="h-6 w-6 sm:h-8 sm:w-8 3xl:h-10 3xl:w-10 text-[#e8eef2]" />
										{inputMethod === "custom" && (
											<motion.div
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												className="absolute -top-1 -right-1 bg-[#0667D0] rounded-full p-1"
											>
												<CheckIcon className="h-3 w-3 3xl:h-4 3xl:w-4  text-white" />
											</motion.div>
										)}
									</div>
									<div className="text-white font-semibold text-sm sm:text-base 3xl:text-xl 3xl:mt-1">
										Custom Job Description
									</div>
									<div className="text-[#e8eef2] text-xs sm:text-sm 3xl:text-lg opacity-70">
										Paste your specific job posting
									</div>
								</div>
							</motion.button>

							{/* Template Selection Option */}
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => {
									if (count === 0) {
										setTimeout(() => {
											document
												.getElementById("template-header")
												?.scrollIntoView({
													behavior: "smooth",
													block: "start",
												});
										});
										setCount(1);
									}
									setInputMethod("template");
								}}
								disabled={isLoading}
								className={`p-4 sm:p-5 md:p-6 rounded-lg border-2 transition-all duration-200 ${
									inputMethod === "template"
										? "border-[#0667D0] bg-[#0667D0]/20"
										: "border-white/20 bg-white/10 hover:border-white/40"
								} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
							>
								<div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
									<div className="relative">
										<TemplateIcon className="h-6 w-6 sm:h-8 sm:w-8 3xl:h-10 3xl:w-10 text-[#e8eef2]" />
										{inputMethod === "template" && (
											<motion.div
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												className="absolute -top-1 -right-1 bg-[#0667D0] rounded-full p-1"
											>
												<CheckIcon className="h-3 w-3 text-white" />
											</motion.div>
										)}
									</div>
									<div className="text-white font-semibold text-sm sm:text-base 3xl:text-xl 3xl:mt-1">
										Use Template
									</div>
									<div className="text-[#e8eef2] text-xs sm:text-sm 3xl:text-lg opacity-70">
										Choose from predefined roles
									</div>
								</div>
							</motion.button>
						</div>
					</div>

					{/* Content Area */}
					<motion.div
						id={"template-header"}
						key={inputMethod}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3 }}
						className="mb-6 sm:mb-8"
					>
						{inputMethod === "custom" ? (
							<CustomJobDescription
								jobDescription={jobDescription}
								setJobDescription={setJobDescription}
							/>
						) : (
							<TemplateSelection
								selectedTemplate={selectedTemplate}
								setSelectedTemplate={setSelectedTemplate}
							/>
						)}
					</motion.div>

					{/* Start Interview Button */}
					<div className="flex justify-center">
						<motion.div
							whileHover={{ scale: isFormValid && !isLoading ? 1.05 : 1 }}
							whileTap={{ scale: isFormValid && !isLoading ? 0.95 : 1 }}
						>
							<Button
								onClick={handleStartInterview}
								disabled={!isFormValid || isLoading}
								className={`rounded-md h-12 sm:h-14 md:h-16 3xl:h-20 px-6 sm:px-8 md:px-10 3xl:px-14 transition-all duration-200 flex items-center gap-2 sm:gap-3 3xl:gap-4 border-0 ${
									isFormValid && !isLoading
										? "bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] hover:opacity-90 cursor-pointer"
										: "bg-gray-500 opacity-50 cursor-not-allowed"
								}`}
							>
								<PlayIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 3xl:h-8 3xl:w-8" />
								<span className="font-['Nunito'] font-semibold text-white text-sm sm:text-base md:text-lg 3xl:text-2xl">
									{isLoading ? "Preparing..." : "Start Interview"}
								</span>
							</Button>
						</motion.div>
					</div>

					{/* Form validation message */}
					{!isFormValid && !isLoading && (
						<motion.p
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-center text-[#e8eef2] text-xs sm:text-sm 3xl:text-lg opacity-70 mt-3"
						>
							{inputMethod === "custom"
								? "Please enter a job description to continue"
								: "Please select a template to continue"}
						</motion.p>
					)}
				</div>
			</motion.div>
		</>
	);
};
