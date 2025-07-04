import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { CodingQuestion } from "../../types/questions";
import { EditorLayout } from "../../components/layout/EditorLayout";
import { CodingExampleSection } from "./CodingExampleSection";
import { CodingConstraintsSection } from "./CodingConstraintsSection";
import { CodeSubmissionWithResults } from "../../lib/interview/interview-api";

type QuestionContentCodingProps = {
	question: CodingQuestion;
	userAnswers: Record<string, string>;
	selectedLanguage: string;
	setUserAnswers: (questionId: string, code: string) => void;
	onLanguageChange: (language: string) => void;
	onSubmitCode: (questionId: string, code: string, language: string) => Promise<any>;
	getSubmissionHistory: (questionId: string) => any[];
	getSubmissionCount: (questionId: string) => number;
	hasAcceptedSubmission: (questionId: string) => boolean;
};

export const QuestionContentCoding = ({
	question,
	userAnswers,
	selectedLanguage,
	setUserAnswers,
	onLanguageChange,
	onSubmitCode,
	getSubmissionHistory,
	getSubmissionCount,
	hasAcceptedSubmission,
}: QuestionContentCodingProps) => {
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

	const currentCode = userAnswers[question.id] || "";

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
			onLanguageChange(availableLanguages[0].value);
		}
	}, [question]);

	// Handle problem solving answer (code changes)
	const handleCodingAnswer = (questionId: string, answer: string) => {
		setUserAnswers(questionId, answer);
	};

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
							{getSubmissionHistory(question.id).length === 0 ? (
								<p className="text-gray-500 text-center py-8">
									No submissions yet
								</p>
							) : (
								<div className="space-y-4">
									{getSubmissionHistory(question.id).map((submission: CodeSubmissionWithResults, index: number) => (
										<div
											key={index}
											className="border border-gray-400 rounded-lg p-4 hover:bg-gray-50 transition-colors"
										>
											<div className="flex justify-between items-start mb-2">
												<div className="flex items-center gap-3">
													<span
														className={`px-2 py-1 rounded text-sm font-medium ${
															submission.testCaseResults?.every((result: any) => result.passed === true)
																? "bg-green-100 text-green-700"
																: "bg-red-100 text-red-700"
														}`}
													>
														{submission.testCaseResults?.every((result: any) => result.passed === true)
															? "Accepted"
															: "Wrong Answer"}
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
												{submission.testCaseResults?.every((result: any) => result.passed === true)
													? "Your solution passed all test cases. Great job!"
													: "Your solution failed on some test cases. Check the error details and try again."}
											</div>
											<div className="text-sm">
												<span className="font-medium">Test Cases: </span>
												<span
													className={`${
														submission.testCaseResults?.every((result: any) => result.passed === true)
															? "text-green-600"
															: "text-red-600"
													}`}
												>
													{submission.testCaseResults?.filter((result: any) => result.passed === true).length || 0}/
													{submission.testCaseResults?.length || 0} passed
												</span>
											</div>
											{submission.testCaseResults && !submission.testCaseResults.every((result: any) => result.passed === true) && (
												<div className="mt-3 p-3 bg-gray-100 rounded text-sm">
													<div className="font-medium text-gray-700 mb-1">
														First failed test case:
													</div>
													{submission.testCaseResults.find((result: any) => !result.passed) && (
														<div className="text-gray-600">
															<div><strong>Input:</strong> {submission.testCaseResults.find((result: any) => !result.passed)?.input || "N/A"}</div>
															<div><strong>Your Output:</strong> {submission.testCaseResults.find((result: any) => !result.passed)?.actualOutput || "N/A"}</div>
															<div><strong>Expected:</strong> {submission.testCaseResults.find((result: any) => !result.passed)?.expectedOutput || "N/A"}</div>
														</div>
													)}
												</div>
											)}
										</div>
									))}
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
					initialValue={
						currentCode ||
						question.starterCode?.codeStarter?.[selectedLanguage as keyof typeof question.starterCode.codeStarter] ||
						"// Write your solution here\n"
					}
					language={selectedLanguage}
					height="100%"
					onChange={(value) =>
						handleCodingAnswer(
							question.id,
							value || ""
						)
					}
					onLanguageChange={(language) => onLanguageChange(language)}
					showConsole={consoleVisible}
					consoleOutput={codeOutput}
					question={question}
					submissionStatus={submissionStatus}
					onRun={() => {
						// Simulate code execution
						setCodeOutput(
							"// Output would appear here\n// This is a simulated output\nconsole.log('Hello, world!');"
						);
						setConsoleVisible(true);
						setConsoleTab("output");
					}}
					onSubmissionsTabClick={() => setActiveTab("submissions")}
					onSubmit={async () => {
						try {
							// Call the actual submission function from parent with selected language
							await onSubmitCode(question.id, currentCode, selectedLanguage);
							
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
