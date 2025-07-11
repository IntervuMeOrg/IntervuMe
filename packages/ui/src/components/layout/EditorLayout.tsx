/**
 * EditorLayout Component - A clean, simple Monaco Editor wrapper
 */

import { useState, useEffect, useRef, useCallback } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import { CodingQuestion } from "../../types/questions";
import { CodeSubmissionWithResults, RunCodeResult } from "../../lib/interview/interview-api";
import { isNil } from "../../lib/utils";

// Props type definition
type EditorLayoutProps = {
	// Editor content and language
	value: string;
	language: string;
	height?: string;

	// Callbacks
	onChange: (value: string) => void;
	onRun?: (testCaseIndex?: number) => void;
	onSubmit?: () => void;
	onLanguageChange: (language: string) => void;

	// Loading states
	isRunning?: boolean;

	// Console related props
	showConsole?: boolean;
	consoleOutput?: string;
	testCaseOutputs?: Record<number, RunCodeResult>;
	submissionStatus?: {
		status: "success" | "error" | "pending" | "none";
		message: string;
		testCasesPassed?: number;
		totalTestCases?: number;
	};
	onSubmissionsTabClick?: () => void;

	// Submission data
	allSubmissions?: CodeSubmissionWithResults[];
	isSubmitting?: boolean;

	// Test cases related props
	question: CodingQuestion;

	// UI customization
	showLanguageSelector?: boolean;
	availableLanguages?: { value: string; label: string }[];
	showRunButton?: boolean;
	showSubmitButton?: boolean;
	runButtonText?: string;
	submitButtonText?: string;
};

export const EditorLayout = ({
	value,
	language,
	height = "100%",
	onChange,
	onRun,
	onSubmit,
	onLanguageChange,
	showConsole = false,
	consoleOutput = "",
	testCaseOutputs = {},
	submissionStatus = { status: "none", message: "" },
	question,	
	showLanguageSelector = true,
	availableLanguages = [
		{ value: "python", label: "Python" },
		{ value: "java", label: "Java" },
		{ value: "cpp", label: "C++" },
	],
	showRunButton = true,
	showSubmitButton = true,
	runButtonText = "Run",
	submitButtonText = "Submit",
	onSubmissionsTabClick,
	isRunning = false,
	allSubmissions = [],
	isSubmitting = false,
}: EditorLayoutProps): JSX.Element => {
	// Simple UI state only
	const [theme, setTheme] = useState<"vs-light" | "vs-dark">("vs-dark");
	const [fontSize, setFontSize] = useState(14);
	const [wordWrap, setWordWrap] = useState<"on" | "off">("on");
	const [minimapEnabled, setMinimapEnabled] = useState(false);

	// Console state
	const [consoleVisible, setConsoleVisible] = useState(showConsole);
	const [consoleTab, setConsoleTab] = useState<"testcases" | "output" | "submissions">("testcases");

	// Test case selection state
	const [selectedTestCase, setSelectedTestCase] = useState<number>(0);

	// Console resizing
	const [consoleHeight, setConsoleHeight] = useState(400);
	const [isResizing, setIsResizing] = useState(false);
	const consoleRef = useRef<HTMLDivElement>(null);
	const startY = useRef(0);
	const startHeight = useRef(0);


	// Get sample test cases
	const sampleTestCases = question?.testCases?.filter(
		(testCase: any) => testCase.isHidden === false
	) || [];

	// Update console visibility when prop changes
	useEffect(() => {
		setConsoleVisible(showConsole);
	}, [showConsole]);

	// Simple change handler - just pass value to parent
	const handleCodeChange = (newValue: string | undefined) => {
		onChange(newValue || "");
	};

	// Simple language change handler
	const handleLanguageChange = (newLanguage: string) => {
		onLanguageChange(newLanguage);
	};

	// Simple run handler - just pass to parent with selected test case
	const handleRun = () => {
		setConsoleVisible(true);
		setConsoleTab("output");
		if (onRun) {
			onRun(selectedTestCase);
		}
	};

	// Simple submit handler - just pass to parent
	const handleSubmit = () => {
		if (onSubmit) {
			onSubmit();
		}
	};

	// Console resizing handlers
	const handleMouseMove = useCallback((e: MouseEvent) => {
		if (!isResizing) return;
		const deltaY = startY.current - e.clientY;
		const newHeight = Math.max(150, Math.min(600, startHeight.current + deltaY));
		setConsoleHeight(newHeight);
	}, [isResizing]);

	const handleMouseUp = useCallback(() => {
		setIsResizing(false);
	}, []);

	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		setIsResizing(true);
		startY.current = e.clientY;
		startHeight.current = consoleHeight;
		e.preventDefault();
	}, [consoleHeight]);

	// Console resize event listeners
	useEffect(() => {
		if (isResizing) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		} else {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isResizing, handleMouseMove, handleMouseUp]);

	return (
		<div className="w-full h-full flex flex-col bg-[#1d1d20] rounded-md overflow-hidden border border-gray-200 shadow-lg">
			{/* Header */}
			<div className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-1 border-b border-gray-700 text-white">
				{showLanguageSelector && (
					<div className="relative flex items-center">
						<div className="absolute left-3 pointer-events-none">
							<svg xmlns="http://w...content-available-to-author-only...3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
								<path d="m18 16-4-4 4-4" />
								<path d="m6 8 4 4-4 4" />
							</svg>
						</div>
						<select
							className="appearance-none bg-gray-700 text-gray-100 pl-10 pr-10 py-2 rounded-md border border-gray-600 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm font-medium transition-all duration-200"
							value={language}
							onChange={(e) => handleLanguageChange(e.target.value)}
						>
							{availableLanguages.map((lang) => (
								<option key={lang.value} value={lang.value} className="bg-gray-700 text-gray-100">
									{lang.label}
								</option>
							))}
						</select>
						<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
							<svg className="h-4 w-4 text-gray-400" xmlns="http://w...content-available-to-author-only...3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
							</svg>
						</div>
					</div>
				)}

				{/* Editor settings dropdown */}
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<button className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md transition-all duration-200">
							<svg xmlns="http://w...content-available-to-author-only...3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M12 5v14" />
								<path d="m5 12 7 7 7-7" />
							</svg>
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-[220px] bg-white shadow-lg rounded-lg border border-gray-200 p-2">
						<div className="px-3 py-2 text-sm font-semibold text-gray-500 border-b border-gray-100">
							Editor Settings
						</div>
						<div className="py-2">
							<DropdownMenuItem className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors" onClick={() => setTheme("vs-light")}>
								<span className="flex-1">Light Theme</span>
								{theme === "vs-light" && <span className="text-blue-500">✓</span>}
							</DropdownMenuItem>
							<DropdownMenuItem className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors" onClick={() => setTheme("vs-dark")}>
								<span className="flex-1">Dark Theme</span>
								{theme === "vs-dark" && <span className="text-blue-500">✓</span>}
							</DropdownMenuItem>
						</div>
						<DropdownMenuSeparator className="my-2" />
						<div>
							<div className="px-3 py-2 text-sm text-gray-500">Font Size: {fontSize}px</div>
							<div className="grid grid-cols-3 gap-1 px-2">
								{[14, 16, 18].map((size) => (
									<DropdownMenuItem key={size} className={`text-center py-1 px-[3px] rounded-md cursor-pointer transition-colors ${fontSize === size ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`} onClick={() => setFontSize(size)}>
										{size}px
									</DropdownMenuItem>
								))}
							</div>
						</div>
						<DropdownMenuSeparator className="my-2" />
						<DropdownMenuItem className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors" onClick={() => setWordWrap(wordWrap === "on" ? "off" : "on")}>
							<span>Word Wrap</span>
							<div className={`px-2 py-1 rounded ${wordWrap === "on" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>
								{wordWrap === "on" ? "On" : "Off"}
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors" onClick={() => setMinimapEnabled(!minimapEnabled)}>
							<span>Minimap</span>
							<div className={`px-2 py-1 rounded ${minimapEnabled ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>
								{minimapEnabled ? "On" : "Off"}
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Code editor area */}
			<div className="flex-grow overflow-hidden bg-gray-50 font-mono text-sm shadow-inner">
				<Editor
					height={height}
					language={language}
					theme={theme}
					value={value}
					onChange={handleCodeChange}
					options={{
						fontSize: fontSize,
						wordWrap: wordWrap,
						minimap: { enabled: minimapEnabled },
						scrollBeyondLastLine: false,
						lineNumbers: "on",
						glyphMargin: true,
						folding: true,
						lineDecorationsWidth: 10,
						bracketPairColorization: { enabled: true },
						renderLineHighlight: "all",
						cursorBlinking: "smooth",
						cursorSmoothCaretAnimation: "on",
						roundedSelection: true,
						automaticLayout: true,
						padding: { top: 15 },
					}}
					className="border-t border-gray-700"
				/>
			</div>

			{/* Console */}
			<div ref={consoleRef} className="border-t border-gray-200 relative" style={{ height: consoleVisible ? `${consoleHeight}px` : "auto" }}>
				{/* Resize Handle */}
				{consoleVisible && (
					<div
						className="absolute top-0 left-0 right-0 h-1 cursor-ns-resize bg-transparent hover:bg-blue-400 transition-colors"
						onMouseDown={handleMouseDown}
						style={{ cursor: "ns-resize", zIndex: 10 }}
					/>
				)}

				{/* Console Header */}
				<div className="flex justify-between items-center p-2 bg-gray-100 pt-1">
					<button
						className={`flex items-center gap-1 ${consoleVisible ? "text-blue-600 font-medium" : "text-gray-700"} hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm transition-colors duration-200`}
						onClick={() => setConsoleVisible(!consoleVisible)}
					>
						<span>Console</span>
						<svg xmlns="http://w...content-available-to-author-only...3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform duration-200 ${consoleVisible ? "rotate-180" : ""}`}>
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</button>
					
					<div className="flex gap-2">
						{showRunButton && (
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="bg-gray-700 hover:bg-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-5 py-1 rounded-md text-sm shadow-sm flex items-center gap-1.5"
								onClick={handleRun}
								disabled={isRunning}
							>
								{isRunning ? (
									<>
										<svg className="animate-spin h-4 w-4" xmlns="http://w...content-available-to-author-only...3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										Running...
									</>
								) : (
									<>
										<svg xmlns="http://w...content-available-to-author-only...3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<polygon points="5 3 19 12 5 21 5 3"></polygon>
										</svg>
										{runButtonText}
									</>
								)}
							</motion.button>
						)}
						{showSubmitButton && (
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-4 py-1 rounded-md text-sm shadow-sm flex items-center gap-1.5"
								onClick={handleSubmit}
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										<svg className="animate-spin h-4 w-4" xmlns="http://w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										Submitting...
									</>
								) : (
									<>
										<svg xmlns="http://w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<line x1="22" y1="2" x2="11" y2="13"></line>
											<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
										</svg>
										{submitButtonText}
									</>
								)}
							</motion.button>
						)}
					</div>
				</div>

				{/* Console Panel */}
				{consoleVisible && (
					<div className="border-t border-gray-300 bg-white">
						{/* Console Tabs */}
						<div className="flex border-b border-gray-200 bg-white">
							<button
								className={`px-4 py-2 text-sm font-medium border-b-2 ${
									consoleTab === "testcases"
										? "text-gray-700 border-gray-700"
										: "text-gray-500 border-transparent hover:text-gray-700"
								}`}
								onClick={() => setConsoleTab("testcases")}
							>
								Test Cases
							</button>
							<button
								className={`px-4 py-2 text-sm font-medium border-b-2 ${
									consoleTab === "output"
										? "text-gray-700 border-gray-700"
										: "text-gray-500 border-transparent hover:text-gray-700"
								}`}
								onClick={() => setConsoleTab("output")}
							>
								Output
							</button>
							<button
								className={`px-4 py-2 text-sm font-medium border-b-2 ${consoleTab === "submissions" ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-700"}`}
								onClick={() => setConsoleTab("submissions")}
							>
								Latest Submission
							</button>
						</div>

						{/* Console Content */}
						<div className="flex-1 overflow-hidden" style={{ height: `${consoleHeight - 100}px` }}>
							{consoleTab === "testcases" && (
								<div className="h-full overflow-y-auto">
									<div className="p-4 space-y-4">
										{sampleTestCases.length > 0 ? (
											sampleTestCases.map((testCase: any, idx: number) => (
												<div key={idx} className="bg-gray-50 p-3 rounded border">
													<div className="flex justify-between items-center mb-2">
														<span className="font-medium text-gray-700">Test Case {idx + 1}</span>
														<span className="text-xs text-gray-500">
															{testCase.isHidden ? "Hidden" : "Sample"}
														</span>
													</div>
													<div className="space-y-2">
														<div>
															<p className="text-xs text-gray-600 mb-1">Input:</p>
															<pre className="bg-white p-2 rounded text-xs font-mono border overflow-x-auto">
																{testCase.input || "No input"}
															</pre>
														</div>
														<div>
															<p className="text-xs text-gray-600 mb-1">Expected Output:</p>
															<pre className="bg-white p-2 rounded text-xs font-mono border overflow-x-auto">
																{testCase.expectedOutput || "No expected output"}
															</pre>
														</div>
													</div>
												</div>
											))
										) : (
											<div className="text-gray-500 text-sm text-center py-8">
												No test cases available for this problem.
											</div>
										)}
									</div>
								</div>
							)}

							{consoleTab === "output" && (
								<div className="h-full bg-white overflow-y-auto">
									{/* Status Header */}
									<div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div className="flex items-center gap-1">
												{(
													<>
														<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
														<span className="text-sm text-gray-600">Test Result</span>
													</>
												)}
											</div>
											{!isRunning && Object.keys(testCaseOutputs).length > 0 && sampleTestCases.length > 0 && (
												<div className="flex items-center gap-2">
													{(() => {
														const testCaseResult = testCaseOutputs[selectedTestCase];
														if (!testCaseResult) return null;
														
														const isPassed = testCaseResult.status === "Correct";
														const statusText = testCaseResult.status
														
														return (
															<>
																<div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
																	isPassed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
																}`}>
																	{isPassed ? (
																		<svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
																		</svg>
																	) : (
																		<svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
																		</svg>
																	)}
																	<span className={`text-sm font-medium ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
																		{statusText}
																	</span>
																</div>
																{statusText !== "Compilation Error" && (
																	<span className="text-sm text-gray-500">Runtime: {testCaseResult.time * 1000} ms</span>
																)}
															</>
														);
													})()}
												</div>
											)}
										</div>
									</div>

									{/* Test Case Selection */}
									{sampleTestCases.length > 0 && (
										<div className="px-4 py-3 border-b border-gray-200">
											<div className="flex items-center gap-2">
												{sampleTestCases.map((testCase: any, idx: number) => {
													const testCaseResult = testCaseOutputs[idx];
													const isPassed = testCaseResult?.status === "Correct" || false;
													const hasOutput = !isNil(testCaseResult);
													
													return (
														<button
															key={idx}
															className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
																selectedTestCase === idx 
																	? "bg-blue-500 text-white border border-blue-500" 
																	: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
															}`}
															onClick={() => setSelectedTestCase(idx)}
														>
															{hasOutput && (
																<div className={`w-2 h-2 rounded-full ${isPassed ? 'bg-green-500' : 'bg-red-500'}`}></div>
															)}
															<span>Case {idx + 1}</span>
														</button>
													);
												})}
											</div>
										</div>
									)}

									{/* Test Case Content */}
									<div className="p-4 space-y-4">
										{sampleTestCases.length > 0 && sampleTestCases[selectedTestCase] && (
											<>
												{/* Input Section */}
												<div>
													<div className="text-sm font-medium text-gray-700 mb-2">Input</div>
													<div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
														<pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap overflow-x-auto">
															{sampleTestCases[selectedTestCase].input || "No input"}
														</pre>
													</div>
												</div>

												{/* Output Section */}
												<div>
													<div className="text-sm font-medium text-gray-700 mb-2">Output</div>
													<div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
														<pre className={`text-sm font-mono whitespace-pre-wrap overflow-x-auto ${
															isRunning ? 'text-blue-600' : 
															testCaseOutputs[selectedTestCase] && (testCaseOutputs[selectedTestCase].status !== "Correct") ? 
															'text-red-600' : 'text-gray-800'	
														}`}>
															{isRunning ? (
																<div className="flex items-center gap-2">
																	<div className="w-4 h-4 border-2 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
																</div>
															) : (
																testCaseOutputs[selectedTestCase]?.stdout || consoleOutput
															)}
														</pre>
													</div>
												</div>

												{/* Expected Section */}
												<div>
													<div className="text-sm font-medium text-gray-700 mb-2">Expected</div>
													<div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
														<pre className={`text-sm font-mono whitespace-pre-wrap overflow-x-auto ${
															testCaseOutputs[selectedTestCase] && testCaseOutputs[selectedTestCase].status !== "Correct" ? 
															'text-green-600' : 'text-gray-800'
														}`}>
															{sampleTestCases[selectedTestCase].expectedOutput || "No expected output"}
														</pre>
													</div>
												</div>
											</>
										)}

										{sampleTestCases.length === 0 && (
											<div className="text-center py-8">
												<div className="text-gray-500 text-sm">No test cases available for this problem.</div>
											</div>
										)}
									</div>
								</div>
							)}

							{consoleTab === "submissions" && (
								<div className="h-full overflow-y-auto bg-white">
									<div className="p-4">
										{allSubmissions.length === 0 ? (
											<div className="text-center py-8">
												<div className="text-center">
													<svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
													</svg>
													<h3 className="text-lg font-medium text-gray-900 mb-2">No Submissions Yet</h3>
													<p className="text-gray-500 text-sm">Click "Submit" to submit your solution and see the results here.</p>
												</div>
											</div>
										) : (
											<div className="space-y-4">
												{/* Latest Submission Header */}
												<div className="border-b border-gray-200 pb-3">
													<h3 className="text-lg font-semibold text-gray-900">Latest Submission</h3>
													<p className="text-sm text-gray-600">Most recent submission result</p>
												</div>

																				{/* Latest Submission Details */}
								{(() => {
									const latestSubmission = allSubmissions.sort((a, b) => 
										new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
									)[0];

									// Use real backend data for test case counts, with fallback to testCaseResults
									const passedCount = latestSubmission.passedTestCases ?? 
										(latestSubmission.testCaseResults?.filter((result: any) => result.passed === true).length || 0);
									const totalCount = latestSubmission.totalTestCases ?? 
										(latestSubmission.testCaseResults?.length || 0);
									const allPassed = passedCount === totalCount && totalCount > 0;

									return (
										<div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
											{/* Status Header */}
											<div className="flex items-center justify-between mb-4">
												<div className="flex items-center gap-3">
													<div className={`w-3 h-3 rounded-full ${allPassed ? 'bg-green-500' : 'bg-red-500'}`}></div>
													<div>
														<span className={`text-lg font-semibold ${allPassed ? 'text-green-600' : 'text-red-600'}`}>
															{allPassed ? 'Accepted' : 'Wrong Answer'}
														</span>
														<div className="text-sm text-gray-500">
															{new Date(latestSubmission.submittedAt).toLocaleString()}
														</div>
													</div>
												</div>
												<div className="text-right">
													<div className="text-sm text-gray-600">Language</div>
													<div className="font-medium text-gray-900 capitalize">{latestSubmission.language}</div>
												</div>
											</div>

											{/* Test Cases Summary */}
											<div className="mb-4">
												<div className="flex items-center justify-between mb-2">
													<span className="text-sm font-medium text-gray-700">Test Cases</span>
													<span className={`text-sm font-medium ${allPassed ? 'text-green-600' : 'text-red-600'}`}>
														{passedCount}/{totalCount} passed
													</span>
												</div>
												<div className="w-full bg-gray-200 rounded-full h-2">
													<div 
														className={`h-2 rounded-full transition-all duration-300 ${allPassed ? 'bg-green-500' : 'bg-red-500'}`}
														style={{ width: `${totalCount > 0 ? (passedCount / totalCount) * 100 : 0}%` }}
													></div>
												</div>
											</div>

											{/* Success Message */}
											{allPassed && (
												<div className="bg-green-50 border border-green-200 rounded-lg p-3">
													<div className="flex items-center gap-2">
														<svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
														</svg>
														<span className="text-sm font-medium text-green-800">Perfect! Your solution passed all test cases.</span>
													</div>
												</div>
											)}
										</div>
									);
								})()}
											</div>
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
