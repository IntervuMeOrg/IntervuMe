import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { ProblemSolvingQuestion } from "../../types/questions";
import { EditorLayout } from "../../components/layout/EditorLayout";
import { ProblemSolvingExampleSection } from "./ProblemSolvingExampleSection";
import { ProblemSolvingConstraintsSection } from "./ProblemSolvingConstraintsSection";

type QuestionContentProblemSolvingProps = {
	questions: ProblemSolvingQuestion[];
	userAnswers: Record<string, string>;
	setUserAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
	currentQuestionIndex: number;
};

export const QuestionContentProblemSolving = ({
	questions,
	userAnswers,
	setUserAnswers,
	currentQuestionIndex,
}: QuestionContentProblemSolvingProps) => {
	// State for console visibility and active tab
	const [consoleVisible, setConsoleVisible] = useState(false);

	// State for left panel tabs
	const [activeTab, setActiveTab] = useState("question"); // 'question', 'solution', 'submissions', 'notes'

	// State for submission history - stores all submission attempts
	const [submissionHistory, setSubmissionHistory] = useState<
		Array<{
			status: "success" | "error";
			message: string;
			testCasesPassed: number;
			totalTestCases: number;
			timestamp: string;
			language: string;
			lastFailedTest?: {
				input: string;
				output: string;
				expected: string;
			} | null;
		}>
	>([]);

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

	// Handle problem solving answer
	const handleProblemSolvingAnswer = (questionId: number, answer: string) => {
		setUserAnswers((prev) => ({
			...prev,
			[questionId]: answer,
		}));
	};
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

	return (
		<div
			className="font-['Nunito'] -mt-16 sm:-mt-14 md:-mt-12 lg:-mt-10 xl:-mt-8 flex relative"
			ref={containerRef}
		>
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
										{
											(
												questions[
													currentQuestionIndex
												] as ProblemSolvingQuestion
											).title
										}
									</span>
									<span className="bg-[#0667D0] text-white px-3 py-1 rounded-full text-sm font-semibold ml-4">
										{questions[currentQuestionIndex].points} points
									</span>
								</h3>
								<span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">
									{
										(questions[currentQuestionIndex] as ProblemSolvingQuestion)
											.difficulty
									}
								</span>
							</div>
							<div className="text-gray-700 whitespace-pre-line">
								{
									(questions[currentQuestionIndex] as ProblemSolvingQuestion)
										.problemStatement
								}
							</div>

							{/* Examples Section */}
							<ProblemSolvingExampleSection
								questions={questions as ProblemSolvingQuestion[]}
								currentQuestionIndex={currentQuestionIndex}
							/>

							{/* Constraints Section */}
							<ProblemSolvingConstraintsSection
								questions={questions as ProblemSolvingQuestion[]}
								currentQuestionIndex={currentQuestionIndex}
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
							{submissionHistory.length === 0 ? (
								<p className="text-gray-500 text-center py-8">
									No submissions yet
								</p>
							) : (
								<div className="space-y-4">
									{submissionHistory.map((submission, index) => (
										<div
											key={index}
											className="border border-gray-400 rounded-lg p-4 hover:bg-gray-50 transition-colors"
										>
											<div className="flex justify-between items-start mb-2">
												<div className="flex items-center gap-3">
													<span
														className={`px-2 py-1 rounded text-sm font-medium ${
															submission.status === "success"
																? "bg-green-100 text-green-700"
																: "bg-red-100 text-red-700"
														}`}
													>
														{submission.status === "success"
															? "Accepted"
															: "Wrong Answer"}
													</span>
													<span className="text-gray-600 text-sm">
														{submission.language}
													</span>
												</div>
												<span className="text-gray-500 text-sm">
													{submission.timestamp}
												</span>
											</div>
											<div className="text-sm text-gray-600 mb-2">
												{submission.message}
											</div>
											<div className="text-sm">
												<span className="font-medium">Test Cases: </span>
												<span
													className={`${
														submission.testCasesPassed ===
														submission.totalTestCases
															? "text-green-600"
															: "text-red-600"
													}`}
												>
													{submission.testCasesPassed}/
													{submission.totalTestCases} passed
												</span>
											</div>
											{submission.status === "error" &&
												submission.lastFailedTest && (
													<div className="mt-3 p-3 bg-gray-100 rounded text-sm">
														<div className="font-medium text-gray-700 mb-1">
															Last executed test case:
														</div>
														<div className="text-gray-600">
															<strong>Input:</strong>{" "}
															{submission.lastFailedTest.input}
														</div>
														<div className="text-gray-600">
															<strong>Your Output:</strong>{" "}
															{submission.lastFailedTest.output}
														</div>
														<div className="text-gray-600">
															<strong>Expected:</strong>{" "}
															{submission.lastFailedTest.expected}
														</div>
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
						userAnswers[questions[currentQuestionIndex].id] ||
						"// Write your solution here\n"
					}
					language="cpp"
					height="100%"
					onChange={(value) =>
						handleProblemSolvingAnswer(
							questions[currentQuestionIndex].id,
							value || ""
						)
					}
					showConsole={consoleVisible}
					consoleOutput={codeOutput}
					questions={questions}
					currentQuestionIndex={currentQuestionIndex}
					submissionStatus={submissionStatus}
					onRun={() => {
						// Simulate code execution
						setCodeOutput(
							"// Output would appear here\n// This is a simulated output\nconsole.log('Hello, world!');"
						);
						setConsoleVisible(true);
						setConsoleTab("output");
					}}
					onSubmissionsTabClick={() => setActiveTab("submissions")} // Add this prop
					onSubmit={() => {
						// Simulate submission with random results
						// Make submissions alternate: fail, pass, fail, pass...
						// OLD===== const isSuccess = Math.random() > 0.3; // 70% chance of success
						const submissionCount = submissionHistory.length;
						const isSuccess = submissionCount % 2 === 1;
						const testCasesPassed = isSuccess ? 5 : 0; // 1-4 if failed OLD==== Math.floor(Math.random() * 4) + 1;

						const newSubmission = {
							status: isSuccess ? ("success" as const) : ("error" as const),
							message: isSuccess
								? "Your solution passed all test cases. Great job!"
								: "Your solution failed on all test cases. Check the error details and try again.",
							testCasesPassed: testCasesPassed,
							totalTestCases: 5,
							timestamp: new Date().toLocaleString(),
							language: "C++", // You can make this dynamic based on selected language
							...(isSuccess
								? {}
								: {
										lastFailedTest: {
											input: "nums=[1,2,3,4], target=9",
											output: "true",
											expected: "-1",
										},
								  }),
						};

						// Add to submission history
						setSubmissionHistory((prev) => [newSubmission, ...prev]);

						setSubmissionStatus(newSubmission);

						handleProblemSolvingAnswer(
							questions[currentQuestionIndex].id,
							userAnswers[questions[currentQuestionIndex].id] || ""
						);

						setConsoleVisible(true);
						setConsoleTab("submissions");

						// Add this line to switch left panel to submissions tab
						setActiveTab("submissions");
					}}
					availableLanguages={[
						{ value: "cpp", label: "C++" },
						{ value: "python", label: "Python" },
						{ value: "java", label: "Java" },
					]}
				/>
			</div>
		</div>
	);
};
