import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { CodingQuestion } from "../../types/questions";
import { EditorLayout } from "../../components/layout/EditorLayout";
import { CodingExampleSection } from "./CodingExampleSection";
import { CodingConstraintsSection } from "./CodingConstraintsSection";
import { CodeSubmissionWithResults } from "../../lib/interview/interview-api";
import { useRunCode, useSubmitCode, useInterviewSession } from "../../lib/interview/interview-hooks";

type QuestionContentCodingProps = {
	question: CodingQuestion;
	interviewId: string;
	initialSubmissions?: CodeSubmissionWithResults[];
	onSubmissionUpdate?: (questionId: string, hasSubmissions: boolean, hasAccepted: boolean) => void;
};

// Helper function to calculate submission status
const getSubmissionStatus = (submission: CodeSubmissionWithResults) => {
	const passedCount = submission.passedTestCases ?? 
		(submission.testCaseResults?.filter((result) => result.passed === true).length || 0);
	const totalCount = submission.totalTestCases ?? 
		(submission.testCaseResults?.length || 0);
	const allPassed = passedCount === totalCount && totalCount > 0;

	return {
		passedCount,
		totalCount,
		allPassed,
		statusText: allPassed ? "Accepted" : "Wrong Answer",
		statusColor: allPassed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
		countColor: allPassed ? "text-green-600" : "text-red-600",
		message: allPassed 
			? "Your solution passed all test cases. Great job!"
			: "Your solution failed on some test cases. Check the error details and try again."
	};
};

export const QuestionContentCoding = ({
	question,
	interviewId,
	initialSubmissions = [],
	onSubmissionUpdate,
}: QuestionContentCodingProps) => {
	// Hooks for coding functionality
	const submitCode = useSubmitCode();
	const runCodeMutation = useRunCode();

	// Internal state for coding
	const [currentCode, setCurrentCode] = useState<string>("");
	const [selectedLanguage, setSelectedLanguage] = useState<string>("cpp");
	const [allSubmissions, setAllSubmissions] = useState<CodeSubmissionWithResults[]>(initialSubmissions);

	// Notify parent about initial submission state when submissions load
	useEffect(() => {
		if (onSubmissionUpdate && allSubmissions.length >= 0) {
			const hasAccepted = allSubmissions.some(sub => getSubmissionStatus(sub).allPassed);
			onSubmissionUpdate(question.id, allSubmissions.length > 0, hasAccepted);
		}
	}, [allSubmissions, onSubmissionUpdate, question.id]);

	// State for console visibility and active tab
	const [consoleVisible, setConsoleVisible] = useState(false);

	// State for left panel tabs
	const [activeTab, setActiveTab] = useState("question"); // 'question', 'solution', 'submissions', 'notes'

	// State for console tabs (right panel)
	const [consoleTab, setConsoleTab] = useState<
		"testcases" | "output" | "submissions"
	>("testcases");

	// State for code execution output
	const [codeOutput, setCodeOutput] = useState<string>("");

	// Updated submission status interface to match submission history structure
	const [submissionStatus, setSubmissionStatus] = useState<{
		status: "success" | "error" | "pending" | "none";
		message: string;
		testCasesPassed?: number;
		totalTestCases?: number;
		timestamp?: string;
		language?: string;
		lastFailedTest?: {
			input: string;
			output: string;
			expected: string;
		};
	}>({ status: "none", message: "" });

	// Initialize code from localStorage or submissions when component mounts
	useEffect(() => {
		// Try localStorage first with language-specific key
		const key = `interview_${interviewId}_question_${question.id}_${selectedLanguage}_code`;
		let localCode = "";
		try {
			localCode = localStorage.getItem(key) || "";
		} catch (error) {
			console.warn("Failed to get code from localStorage:", error);
		}
		
		if (localCode && localCode.trim() && localCode !== interviewId && localCode !== question.id) {
			setCurrentCode(localCode);
		} else {
			// Fall back to most recent submission
			if (allSubmissions.length > 0) {
				const mostRecent = allSubmissions.sort((a, b) => 
					new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
				)[0];
				setCurrentCode(mostRecent.code || "");
			} else {
				// Fall back to starter code
				const starterCode = question.starterCode?.codeStarter?.[selectedLanguage as keyof typeof question.starterCode.codeStarter] || "";
				setCurrentCode(starterCode);
			}
		}
	}, [interviewId, question.id, allSubmissions, selectedLanguage]);

	// State for panel resizing
	const [leftPanelWidth, setLeftPanelWidth] = useState(50); // percentage
	const [isResizing, setIsResizing] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const startX = useRef(0);
	const startWidth = useRef(0);

	// Mouse event handlers for panel resizing
	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!isResizing || !containerRef.current) return;

			const containerRect = containerRef.current.getBoundingClientRect();
			const deltaX = e.clientX - startX.current;
			const containerWidth = containerRect.width;
			const deltaPercentage = (deltaX / containerWidth) * 100;
			const newWidth = Math.max(
				25,
				Math.min(75, startWidth.current + deltaPercentage)
			);

			setLeftPanelWidth(newWidth);
		},
		[isResizing]
	);

	const handleMouseUp = useCallback(() => {
		setIsResizing(false);
	}, []);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			setIsResizing(true);
			startX.current = e.clientX;
			startWidth.current = leftPanelWidth;
			e.preventDefault();
		},
		[leftPanelWidth]
	);

	// Effect to handle mouse events
	useEffect(() => {
		if (isResizing) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isResizing, handleMouseMove, handleMouseUp]);

	// Handler functions for coding functionality
	const handleCodeChange = (code: string) => {
		setCurrentCode(code);
		// Save code to localStorage automatically with language-specific key
		const key = `interview_${interviewId}_question_${question.id}_${selectedLanguage}_code`;
		try {
			localStorage.setItem(key, code);
		} catch (error) {
			console.warn("Failed to save code to localStorage:", error);
		}
	};

	const handleLanguageChange = (language: string) => {
		setSelectedLanguage(language);
		
		// Check if user has saved code for this language
		const key = `interview_${interviewId}_question_${question.id}_${language}_code`;
		let savedCode = "";
		try {
			savedCode = localStorage.getItem(key) || "";
		} catch (error) {
			console.warn("Failed to get code from localStorage:", error);
		}
		
		if (savedCode && savedCode.trim()) {
			// Use saved code if it exists
			setCurrentCode(savedCode);
		} else {
			// Load starter code for the new language if no saved code
			const starterCode = question.starterCode?.codeStarter?.[language as keyof typeof question.starterCode.codeStarter] || "";
			setCurrentCode(starterCode);
			
			// Save the starter code to localStorage for this language
			try {
				localStorage.setItem(key, starterCode);
			} catch (error) {
				console.warn("Failed to save code to localStorage:", error);
			}
		}
	};

	const handleCodeSubmission = async (code: string, language: string) => {
		if (!code.trim()) return;

		try {
			const submission = await submitCode.mutateAsync({
				interviewId,
				questionId: question.id,
				code,
				language
			});

			// Update submission history
			setAllSubmissions(prev => {
				const newSubmissions = [submission, ...prev];
				// Notify parent about submission update
				if (onSubmissionUpdate) {
					const hasAccepted = newSubmissions.some(sub => getSubmissionStatus(sub).allPassed);
					onSubmissionUpdate(question.id, newSubmissions.length > 0, hasAccepted);
				}
				return newSubmissions;
			});

			return submission;
		} catch (error) {
			console.error("Code submission failed:", error);
			throw error;
		}
	};

	// Submission history functions
	const getSubmissionHistory = () => {
		return allSubmissions;
	};

	const getSubmissionCount = () => {
		return allSubmissions.length;
	};

	const hasAcceptedSubmission = () => {
		return allSubmissions.some(sub => getSubmissionStatus(sub).allPassed);
	};

	// console.log("QuestionContentCoding Debug:", {
	// 	questionId: question.id,
	// 	currentCode,
	// 	selectedLanguage
	// });

	// Get available languages from the question's starter code
	const getAvailableLanguages = () => {
		const availableLanguages = [];
		if (question.starterCode?.codeStarter) {
			if (question.starterCode.codeStarter.cpp) {
				availableLanguages.push({ value: "cpp", label: "C++" });
			}
			if (question.starterCode.codeStarter.java) {
				availableLanguages.push({ value: "java", label: "Java" });
			}
			if (question.starterCode.codeStarter.python) {
				availableLanguages.push({ value: "python", label: "Python" });
			}
		}
		
		// Default languages if no starter code available
		if (availableLanguages.length === 0) {
			return [
				{ value: "cpp", label: "C++" },
				{ value: "java", label: "Java" },
				{ value: "python", label: "Python" },
			];
		}
		
		return availableLanguages;
	};

	// Set initial language based on available languages
	useEffect(() => {
		const availableLanguages = getAvailableLanguages();
		if (availableLanguages.length > 0 && !availableLanguages.find(lang => lang.value === selectedLanguage)) {
			handleLanguageChange(availableLanguages[0].value);
		}
	}, [question, selectedLanguage]);



	return (
		<div className="font-['Nunito'] mt-4 sm:mt-2 md:mt-0 lg:-mt-2 xl:-mt-4 flex relative" ref={containerRef}>
			{/* Left Panel with Tabs */}
			<div
				className="rounded-md overflow-y-auto min-h-[calc(100vh-150px)] max-h-[calc(100vh-150px)]"
				style={{ width: `${leftPanelWidth}%` }}
			>
				{/* Tab Navigation */}
				<div className="flex border-b border-gray-200 mb-2">
					<button
						onClick={() => setActiveTab("question")}
						className={`font-['Nunito'] px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
							activeTab === "question"
								? "border-blue-500 text-blue-600"
								: "border-transparent text-gray-500 hover:text-gray-700"
						}`}
					>
						Question
					</button>
					{/* <button
						onClick={() => setActiveTab("solution")}
						className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
							activeTab === "solution"
								? "border-blue-500 text-blue-600"
								: "border-transparent text-gray-500 hover:text-gray-700"
						}`}
					>
						Solution
					</button> */}
					<button
						onClick={() => setActiveTab("submissions")}
						className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
							activeTab === "submissions"
								? "border-blue-500 text-blue-600"
								: "border-transparent text-gray-500 hover:text-gray-700"
						}`}
					>
						Submission History
					</button>
					{/* <button
						onClick={() => setActiveTab("notes")}
						className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
							activeTab === "notes"
								? "border-blue-500 text-blue-600"
								: "border-transparent text-gray-500 hover:text-gray-700"
						}`}
					>
						Notes
					</button> */}
				</div>

				{/* Tab Content */}
				{activeTab === "question" && (
					<Card className="shadow-md border border-gray-200 overflow-visible h-auto">
						<CardContent className="p-6">
							<div className="mb-3">
								<h3 className="font-bold text-2xl mb-1 flex justify-between items-start">
									<span className="flex-1">
										{question.title}
									</span>
									<span className="bg-[#0667D0] text-white px-3 py-1 rounded-full text-sm font-semibold ml-4">
										{question.points} points
									</span>
								</h3>
								<span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">
									{question.difficulty}
								</span>
							</div>
							<div className="text-gray-700 whitespace-pre-line">
								{question.problemStatement}
							</div>

							{/* Examples Section */}
							<CodingExampleSection
								question={question}
							/>

							{/* Constraints Section */}
							<CodingConstraintsSection
								question={question}
							/>
						</CardContent>
					</Card>
				)}

				{activeTab === "solution" && (
					<Card className="shadow-md border border-gray-200 overflow-visible h-auto">
						<CardContent className="p-6">
							<h3 className="font-bold text-xl mb-4">Solution</h3>
							<p className="text-gray-600">
								Solution content will be displayed here...
							</p>
						</CardContent>
					</Card>
				)}

				{activeTab === "submissions" && (
					<Card className="shadow-md border border-gray-200 overflow-visible h-auto">
						<CardContent className="p-6">
							<h3 className="font-bold text-xl mb-4">Submissions</h3>
							{getSubmissionHistory().length === 0 ? (
								<p className="text-gray-500 text-center py-8">
									No submissions yet
								</p>
							) : (
								<div className="space-y-4">
									{getSubmissionHistory().map((submission: CodeSubmissionWithResults, index: number) => {
										const status = getSubmissionStatus(submission);
										
										return (
											<div
												key={index}
												className="border border-gray-400 rounded-lg p-4 hover:bg-gray-50 transition-colors"
											>
												<div className="flex justify-between items-start mb-2">
													<div className="flex items-center gap-3">
														<span className={`px-2 py-1 rounded text-sm font-medium ${status.statusColor}`}>
															{status.statusText}
														</span>
														<span className="text-gray-600 text-sm">
															{submission.language}
														</span>
													</div>
													<span className="text-gray-500 text-sm">
														{new Date(submission.submittedAt).toLocaleString()}
													</span>
												</div>
												<div className="text-sm text-gray-600 mb-2">
													{status.message}
												</div>
												<div className="text-sm">
													<span className="font-medium">Test Cases: </span>
													<span className={status.countColor}>
														{status.passedCount}/{status.totalCount} passed
													</span>
												</div>
											</div>
										);
									})}
								</div>
							)}
						</CardContent>
					</Card>
				)}

				{/* {activeTab === "notes" && (
					<Card className="shadow-md border border-gray-200 overflow-visible h-auto">
						<CardContent className="p-6">
							<h3 className="font-bold text-xl mb-4">Notes</h3>
							<textarea
								placeholder="Write your notes here..."
								className="w-full h-64 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</CardContent>
					</Card>
				)} */}
			</div>

			{/* Resize Handle */}
			<div
				className="w-1 cursor-col-resize bg-gray-300 hover:bg-blue-400 transition-colors flex-shrink-0 relative group border-l border-r border-gray-300"
				onMouseDown={handleMouseDown}
				style={{
					cursor: isResizing ? "col-resize" : "col-resize",
				}}
			>
				{/* Visual indicator */}
				<div className="absolute inset-0 bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
				{isResizing && <div className="absolute inset-0 bg-blue-400"></div>}
			</div>

			{/* Code editor - Right side */}
			<div
				className="w-[50%] h-auto min-h-[calc(100vh-150px)] max-h-[calc(100vh-150px)]"
				style={{ width: `${100 - leftPanelWidth}%` }}
			>
				<EditorLayout
					value={currentCode}
					language={selectedLanguage}
					height="100%"
					onChange={handleCodeChange}
					onLanguageChange={handleLanguageChange}
					showConsole={consoleVisible}
					consoleOutput={codeOutput}
					question={question}
					submissionStatus={submissionStatus}
					onSubmissionsTabClick={() => setActiveTab("submissions")}
					isRunning={runCodeMutation.isPending}
					allSubmissions={allSubmissions}
					isSubmitting={submitCode.isPending}
					onRun={async (testCaseIndex = 0) => {
						try {
							// Show console when running
							setConsoleVisible(true);
							
							// Get the selected test case or default to first
							const testCase = question.testCases?.[testCaseIndex] || question.testCases?.[0];
							
							// Call the run code function with selected test case
							const result = await runCodeMutation.mutateAsync({
								questionId: question.id,
								language: selectedLanguage as 'python' | 'cpp' | 'java',
								userCode: currentCode,
								stdin: testCase?.input || "",
								expected: testCase?.expectedOutput || "",
								timeLimit: question.timeLimit || 2000,
							});
							
							// Update console output
							setCodeOutput(result.stdout || "No output");
							
						} catch (error) {
							console.error("Run failed:", error);
							setCodeOutput("Error: " + (error as Error).message);
						}
					}}
					onSubmit={async () => {
						try {
							// Call the actual submission function with selected language
							await handleCodeSubmission(currentCode, selectedLanguage);
							
							// Switch to submissions tab to show results
							setActiveTab("submissions");
							
						} catch (error) {
							console.error("Submission failed:", error);
						}
					}}
					availableLanguages={getAvailableLanguages()}
				/>
			</div>
		</div>
	);
};
