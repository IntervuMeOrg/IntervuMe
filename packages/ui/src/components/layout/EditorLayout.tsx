/**
 * EditorLayout Component - A reusable code editor component with configurable settings
 * This component encapsulates the Monaco editor with toolbar options and console functionality
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
import { CheckCircleIcon, AlertCircleIcon, SendIcon } from "lucide-react";
import { ProblemSolvingQuestion } from "../../types/questions";

// Props type definition
type EditorLayoutProps = {
	// Editor content and language
	initialValue?: string;
	language?: string;
	height?: string;

	// Callbacks
	onChange?: (value: string | undefined) => void;
	onRun?: () => void;
	onSubmit?: () => void;

	// Console related props
	showConsole?: boolean;
	consoleOutput?: string;
	submissionStatus?: {
		status: "success" | "error" | "pending" | "none";
		message: string;
		testCasesPassed?: number;
		totalTestCases?: number;
	};
	onSubmissionsTabClick?: () => void; // Add this new prop

	// Test cases related props
	questions?: any[];
	currentQuestionIndex?: number;

	// UI customization
	showLanguageSelector?: boolean;
	availableLanguages?: { value: string; label: string }[];
	showRunButton?: boolean;
	showSubmitButton?: boolean;
	runButtonText?: string;
	submitButtonText?: string;
};

export const EditorLayout = ({
	// Default values for props
	initialValue = "// Write your code here\n",
	language = "cpp",
	height = "100%",
	onChange,
	onRun,
	onSubmit,
	showConsole = false,
	consoleOutput = "",
	submissionStatus = { status: "none", message: "" },
	questions = [],
	currentQuestionIndex = 0,
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
}: EditorLayoutProps): JSX.Element => {
	// State for editor settings
	const [theme, setTheme] = useState<"vs-light" | "vs-dark">("vs-dark");
	const [fontSize, setFontSize] = useState(14);
	const [wordWrap, setWordWrap] = useState<"on" | "off">("on");
	const [minimapEnabled, setMinimapEnabled] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState(language);
	const [code, setCode] = useState(initialValue);

	// State for console visibility and active tab
	const [consoleVisible, setConsoleVisible] = useState(showConsole);
	const [consoleTab, setConsoleTab] = useState<
		"testcases" | "output" | "submissions"
	>("output");

	// New state for test case functionality
	const [selectedTestCase, setSelectedTestCase] = useState<number | string>(0);
	const [customTestCases, setCustomTestCases] = useState<
		Array<{ input: string; output: string }>
	>([]);
	const [testResult, setTestResult] = useState<{
		status: "success" | "failed";
		actualOutput: string;
		expectedOutput: string;
		runtime?: string;
		error?: string;
	} | null>(null);
	const [isRunning, setIsRunning] = useState(false);

	// Get current question
	const currentQuestion = questions[currentQuestionIndex];
	const sampleTestCases =
		currentQuestion?.testCases?.filter(
			(testCase: any) => testCase.isHidden === false
		) || [];

		   // Function to get the complete starter code for a given language
    const getStarterCodeForLanguage = (question: ProblemSolvingQuestion, lang: string): string => {
        // Map language values to the keys used in starterCodes
        const languageMap: { [key: string]: keyof typeof question.starterCodes.codeHeader } = {
            'cpp': 'cpp',
            'java': 'java',
            'python': 'python',
        };

        const mappedLang = languageMap[lang];
        
        // If language is not supported in starter codes, return empty string or default
        if (!mappedLang) {
            return initialValue;
        }
        
        const header = question.starterCodes.codeHeader[mappedLang] || '';
        const starter = question.starterCodes.codeStarter[mappedLang] || '';
        const footer = question.starterCodes.codeFooter[mappedLang] || '';

        // Combine header, starter, and footer with appropriate spacing
        const parts = [header, starter, footer].filter(part => part.trim() !== '');
        return parts.join('\n\n');
    };

 // Effect to update editor value when question changes
    useEffect(() => {
        if (currentQuestion && currentQuestion.starterCodes) {
            const starterCode = getStarterCodeForLanguage(currentQuestion, selectedLanguage);
            if (starterCode && starterCode !== initialValue) {
                setCode(starterCode);
                // Don't call onChange here to avoid infinite loops
            }
        }
    }, [currentQuestionIndex, currentQuestion]);

    // Effect to update editor value when language changes
    useEffect(() => {
        if (currentQuestion && currentQuestion.starterCodes) {
            const starterCode = getStarterCodeForLanguage(currentQuestion, selectedLanguage);
            if (starterCode) {
                setCode(starterCode);
                // Call onChange to notify parent component
                if (onChange) {
                    onChange(starterCode);
                }
            }
        }
    }, [selectedLanguage]);

	// Update console visibility when prop changes
	useEffect(() => {
		setConsoleVisible(showConsole);
	}, [showConsole]);

	// Handle language change
	const handleLanguageChange = (newLanguage: string) => {
		setSelectedLanguage(newLanguage);
	};

	// Handle code change
	const handleCodeChange = (value: string | undefined) => {
		setCode(value || "");
		if (onChange) {
			onChange(value);
		}
	};

	    // Get the current editor value (use starter code if available, otherwise use code state)
    const getEditorValue = (): string => {
        if (currentQuestion && currentQuestion.starterCodes) {
            // If we have a current question with starter codes and code hasn't been modified from initial
            if (code === initialValue) {
                return getStarterCodeForLanguage(currentQuestion, selectedLanguage);
            }
        }
        return code;
    };

	// Test case management functions
	const addCustomTestCase = () => {
		const newCustomCase = {
			input: "",
			output: "",
		};
		setCustomTestCases((prev) => [...prev, newCustomCase]);
		setSelectedTestCase(`custom-${customTestCases.length}`);
	};

	const removeCustomTestCase = (index: number) => {
		setCustomTestCases((prev) => prev.filter((_, idx) => idx !== index));
		// Reset to first test case if current selected is being removed
		if (selectedTestCase === `custom-${index}`) {
			setSelectedTestCase(0);
		}
	};

	const updateCustomTestCase = (
		testCaseId: string,
		field: "input" | "output",
		value: string
	) => {
		const index = parseInt(testCaseId.split("-")[1]);
		setCustomTestCases((prev) =>
			prev.map((testCase, idx) =>
				idx === index ? { ...testCase, [field]: value } : testCase
			)
		);
	};

	const getCurrentTestCaseInput = () => {
		if (
			typeof selectedTestCase === "string" &&
			selectedTestCase.startsWith("custom")
		) {
			const index = parseInt(selectedTestCase.split("-")[1]);
			return customTestCases[index]?.input || "";
		}
		return sampleTestCases[selectedTestCase as number]?.input || "";
	};

	const getCurrentTestCaseOutput = () => {
		if (
			typeof selectedTestCase === "string" &&
			selectedTestCase.startsWith("custom")
		) {
			const index = parseInt(selectedTestCase.split("-")[1]);
			return customTestCases[index]?.output || "";
		}
		return sampleTestCases[selectedTestCase as number]?.expectedOutput || "";
	};

	// Replace runSingleTestCase with this function
	const runAllTestCases = async () => {
		setIsRunning(true);
		setTestResult(null);
		setAllTestResults([]);
		setTestSummary(null);

		try {
			const testCasesToRun = sampleTestCases;
			const results: Array<{
				passed: boolean;
				actualOutput: string;
				expectedOutput: string;
				error?: string;
			}> = [];

			// Simulate running each test case
			for (let i = 0; i < testCasesToRun.length; i++) {
				const testCase = testCasesToRun[i];
				const input = testCase.input;
				const expectedOutput = testCase.expectedOutput.trim();

				// Simulate code execution delay
				await new Promise((resolve) => setTimeout(resolve, 500));

				// Mock execution logic (replace with actual code execution)
				let actualOutput = "";
				let passed = false;

				try {
					// Enhanced mock execution for different problem types
					if (
						code.includes("return") ||
						code.includes("print") ||
						code.includes("console.log")
					) {
						// Simple pattern matching for common cases
						if (input.includes("duplicate") || input.includes("[1,2,3,3]")) {
							actualOutput = "true";
						} else if (input.includes("[1,2,3,4]")) {
							actualOutput = "false";
						} else if (input.includes("sum") && input.includes("target")) {
							actualOutput = "[0,1]";
						} else {
							// For other inputs, simulate based on expected output format
							if (
								expectedOutput.startsWith("[") &&
								expectedOutput.endsWith("]")
							) {
								actualOutput = "[0,1]"; // Mock array output
							} else if (
								expectedOutput === "true" ||
								expectedOutput === "false"
							) {
								actualOutput =
									Math.random() > 0.3
										? expectedOutput
										: expectedOutput === "true"
										? "false"
										: "true"; // Mock boolean with some failures
							} else if (!isNaN(Number(expectedOutput))) {
								actualOutput = expectedOutput; // Mock number output
							} else {
								actualOutput = expectedOutput || "undefined";
							}
						}

						passed = actualOutput.trim() === expectedOutput;
					} else {
						// OLD===No output (make sure your function returns a value)
						actualOutput = "[0,1]";
						passed = true;
					}

					results.push({
						passed,
						actualOutput,
						expectedOutput,
					});
				} catch (error) {
					results.push({
						passed: false,
						actualOutput: "Error: " + (error as Error).message,
						expectedOutput,
						error: (error as Error).message,
					});
				}
			}

			// Calculate summary
			const passedCount = results.filter((r) => r.passed).length;
			const totalCount = results.length;

			setAllTestResults(results);
			setTestSummary({ passed: passedCount, total: totalCount });

			// Set the current test result to the first test case for display
			if (results.length > 0) {
				setTestResult({
					status: results[0].passed ? "success" : "failed",
					actualOutput: results[0].actualOutput,
					expectedOutput: results[0].expectedOutput,
					runtime: `${Math.floor(Math.random() * 100) + 50}ms`,
				});
			}
		} catch (error) {
			setTestResult({
				status: "failed",
				actualOutput: "Error: " + (error as Error).message,
				expectedOutput: "",
				runtime: undefined,
				error: (error as Error).message,
			});
		} finally {
			setIsRunning(false);
		}
	};

	// Enhanced onRun to handle console visibility
	const handleRun = () => {
		setConsoleVisible(true);
		setConsoleTab("output");
		if (onRun) {
			onRun();
		}
	};

	// Add these to your existing state variables
	const [consoleHeight, setConsoleHeight] = useState(500);
	const [isResizing, setIsResizing] = useState(false);
	const consoleRef = useRef<HTMLDivElement>(null);
	const startY = useRef(0);
	const startHeight = useRef(0);

	// Fixed mouse event handlers
	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!isResizing) return;
			const deltaY = startY.current - e.clientY;
			const newHeight = Math.max(
				150,
				Math.min(600, startHeight.current + deltaY)
			);
			setConsoleHeight(newHeight);
		},
		[isResizing]
	);

	const handleMouseUp = useCallback(() => {
		setIsResizing(false);
	}, []);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			setIsResizing(true);
			startY.current = e.clientY;
			startHeight.current = consoleHeight;
			e.preventDefault();
		},
		[consoleHeight]
	);

	// Add these new state variables
	const [allTestResults, setAllTestResults] = useState<
		Array<{
			passed: boolean;
			actualOutput: string;
			expectedOutput: string;
			error?: string;
		}>
	>([]);
	const [testSummary, setTestSummary] = useState<{
		passed: number;
		total: number;
	} | null>(null);

	// Fixed useEffect for event listeners
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
			{/* Language selector and settings */}
			<div className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-1 border-b border-gray-700 text-white">
				{showLanguageSelector && (
					<div className="relative flex items-center">
						<div className="absolute left-3 pointer-events-none">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="text-gray-400"
							>
								<path d="m18 16-4-4 4-4" />
								<path d="m6 8 4 4-4 4" />
							</svg>
						</div>
						<select
							className="appearance-none bg-gray-700 text-gray-100 pl-10 pr-10 rounded-md border border-gray-600 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm font-medium transition-all duration-200"
							value={selectedLanguage}
							onChange={(e) => handleLanguageChange(e.target.value)}
						>
							{availableLanguages.map((lang) => (
								<option key={lang.value} value={lang.value}>
									{lang.label}
								</option>
							))}
						</select>
						<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
							<svg
								className="h-4 w-4 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</div>
				)}

				{/* Editor settings dropdown */}
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<button className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md transition-all duration-200">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
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
							<DropdownMenuItem
								className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
								onClick={() => setTheme("vs-light")}
							>
								<span className="flex-1">Light Theme</span>
								{theme === "vs-light" && (
									<span className="text-blue-500">✓</span>
								)}
							</DropdownMenuItem>
							<DropdownMenuItem
								className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
								onClick={() => setTheme("vs-dark")}
							>
								<span className="flex-1">Dark Theme</span>
								{theme === "vs-dark" && (
									<span className="text-blue-500">✓</span>
								)}
							</DropdownMenuItem>
						</div>
						<DropdownMenuSeparator className="my-0" />
						<div className="py-2">
							<div className="px-3 py-2 text-sm text-gray-500">
								Font Size: {fontSize}px
							</div>
							<div className="grid grid-cols-3 gap-1 px-2">
								{[14, 16, 18].map((size) => (
									<DropdownMenuItem
										key={size}
										className={`text-center py-1 px-[3px] rounded-md cursor-pointer transition-colors ${
											fontSize === size
												? "bg-blue-50 text-blue-600"
												: "hover:bg-gray-50"
										}`}
										onClick={() => setFontSize(size)}
									>
										{size}px
									</DropdownMenuItem>
								))}
							</div>
						</div>
						<DropdownMenuSeparator className="my-2" />
						<DropdownMenuItem
							className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
							onClick={() => setWordWrap(wordWrap === "on" ? "off" : "on")}
						>
							<span>Word Wrap</span>
							<div
								className={`px-2 py-1 rounded ${
									wordWrap === "on"
										? "bg-blue-100 text-blue-600"
										: "bg-gray-100 text-gray-600"
								}`}
							>
								{wordWrap === "on" ? "On" : "Off"}
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem
							className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
							onClick={() => setMinimapEnabled(!minimapEnabled)}
						>
							<span>Minimap</span>
							<div
								className={`px-2 py-1 rounded ${
									minimapEnabled
										? "bg-blue-100 text-blue-600"
										: "bg-gray-100 text-gray-600"
								}`}
							>
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
					defaultLanguage={selectedLanguage}
					language={selectedLanguage}
					theme={theme}
					value={getEditorValue()}
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
					className="flex-1 border-t border-gray-700"
				/>
			</div>

			{/* Console and buttons */}
			<div
				ref={consoleRef}
				className="border-t border-gray-200 relative"
				style={{ height: consoleVisible ? `${consoleHeight}px` : "auto" }}
			>
				{/* Resize Handle - at the very top */}
				<div
					className="absolute top-0 left-0 right-0 h-1 cursor-ns-resize bg-transparent hover:bg-blue-400 transition-colors"
					onMouseDown={handleMouseDown}
					style={{
						cursor: "ns-resize",
						zIndex: 10,
					}}
				/>

				{/* Console header with buttons */}
				<div className="flex justify-between items-center p-2 bg-gray-100 pt-1">
					<button
						className={`flex items-center gap-1 ${
							consoleVisible ? "text-blue-600 font-medium" : "text-gray-700"
						} hover:bg-gray-200 px-3 py-1.5 rounded-md text-sm transition-colors duration-200`}
						onClick={() => setConsoleVisible(!consoleVisible)}
					>
						<span>Console</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className={`transform transition-transform duration-200 ${
								consoleVisible ? "rotate-180" : ""
							}`}
						>
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</button>
					<div className="flex gap-2">
						{showRunButton && (
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="bg-gray-700 hover:bg-gray-800 text-white px-5 rounded-md text-sm shadow-sm flex items-center gap-1.5 disabled:opacity-50"
								onClick={() => {
									setConsoleVisible(true);
									setConsoleTab("output");
									runAllTestCases(); // Changed to runAllTestCases
								}}
								disabled={isRunning}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<polygon points="5 3 19 12 5 21 5 3"></polygon>
								</svg>
								{isRunning ? "Running..." : runButtonText}
							</motion.button>
						)}
						{showSubmitButton && (
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm shadow-sm flex items-center gap-1.5"
								onClick={() => {
									setConsoleVisible(true);
									setConsoleTab("submissions");
									if (onSubmissionsTabClick) {
										onSubmissionsTabClick();
									}
									onSubmit && onSubmit();
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="22" y1="2" x2="11" y2="13"></line>
									<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
								</svg>
								{submitButtonText}
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
								className={`px-4 py-2 text-sm font-medium ${
									consoleTab === "submissions"
										? "text-blue-600 border-b-2 border-blue-600 bg-white"
										: "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
								}`}
								onClick={() => {
									setConsoleTab("submissions");
								}}
							>
								Latest Submission
							</button>
						</div>

						{/* Console Content */}
						<div
							className="flex-1 overflow-hidden"
							style={{ height: `${consoleHeight - 100}px` }}
						>
							{consoleTab === "output" && (
								<div className="h-full flex flex-col">
									{/* Test Case Selection Row */}
									<div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200">
										{/* Test Case Tabs */}
										<div className="flex gap-1">
											{sampleTestCases.map(
												(
													testCase: {
														input: string;
														expectedOutput: string;
													},
													idx: number
												) => (
													<button
														key={idx}
														className={`px-2 py-1 text-xs rounded ${
															selectedTestCase === idx
																? "bg-blue-500 text-white"
																: "bg-gray-200 text-gray-600 hover:bg-gray-300"
														}`}
														onClick={() => setSelectedTestCase(idx)}
													>
														Case {idx + 1}
													</button>
												)
											)}

											{/* Custom test cases */}
											{customTestCases.map((_, idx) => (
												<button
													key={`custom-${idx}`}
													className={`px-2 py-1 text-xs rounded flex items-center gap-1 ${
														selectedTestCase === `custom-${idx}`
															? "bg-blue-500 text-white"
															: "bg-gray-200 text-gray-600 hover:bg-gray-300"
													}`}
													onClick={() => setSelectedTestCase(`custom-${idx}`)}
												>
													Custom {idx + 1}
													<button
														className="ml-1 text-red-500 hover:text-red-700 text-xs"
														onClick={(e) => {
															e.stopPropagation();
															removeCustomTestCase(idx);
														}}
													>
														×
													</button>
												</button>
											))}

											{/* Add button */}
											<button
												className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
												onClick={addCustomTestCase}
											>
												+ Add
											</button>
										</div>

										{/* Status and Run button */}
										<div className="ml-auto flex items-center gap-2">
											{testResult && (
												<span
													className={`text-xs px-2 py-1 rounded ${
														testResult.status === "success"
															? "bg-green-100 text-green-700"
															: "bg-red-100 text-red-700"
													}`}
												>
													{testResult.status === "success"
														? "Passed"
														: "Failed"}
												</span>
											)}
										</div>
									</div>

									{/* Test Case Content */}
									<div className="flex-1 p-4 mb-5 overflow-y-auto">
										{/* Input Section */}
										<div className="mb-4">
											<div className="text-sm font-medium text-gray-700 mb-2">
												Input:
											</div>
											{typeof selectedTestCase === "string" &&
											selectedTestCase.startsWith("custom") ? (
												<textarea
													className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-sm font-mono resize-none"
													rows={2}
													value={getCurrentTestCaseInput()}
													onChange={(e) =>
														updateCustomTestCase(
															selectedTestCase,
															"input",
															e.target.value
														)
													}
													placeholder="Enter your test case input..."
												/>
											) : (
												<div className="bg-gray-50 p-2 rounded text-sm font-mono border">
													{getCurrentTestCaseInput()}
												</div>
											)}
										</div>

										{/* Output Section - Vertical layout */}
										<div className="space-y-4">
											{/* Your Output */}
											<div>
												<div className="flex items-center justify-between mb-2">
													<span className="text-sm font-medium text-gray-700">
														Your Output:
													</span>
													{testResult?.runtime && (
														<span className="text-xs text-gray-500">
															Runtime: {testResult.runtime}
														</span>
													)}
												</div>
												<div className="bg-gray-50 p-2 rounded text-sm font-mono border min-h-[60px] overflow-x-auto">
													{testResult?.actualOutput ||
														"No output (make sure your function returns a value)"}
												</div>
											</div>

											{/* Expected Output */}
											<div>
												<span className="text-sm font-medium text-gray-700 block mb-2">
													Expected Output:
												</span>
												{typeof selectedTestCase === "string" &&
												selectedTestCase.startsWith("custom") ? (
													<textarea
														className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-sm font-mono resize-none min-h-[60px]"
														value={getCurrentTestCaseOutput()}
														onChange={(e) =>
															updateCustomTestCase(
																selectedTestCase,
																"output",
																e.target.value
															)
														}
														placeholder="Enter expected output..."
													/>
												) : (
													<div className="bg-gray-50 p-2 rounded text-sm font-mono border min-h-[60px] overflow-x-auto">
														{getCurrentTestCaseOutput()}
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							)}
							{consoleTab === "submissions" && (
								<div className="bg-white p-3 rounded-md shadow-sm border border-gray-200">
									<div className="flex justify-between items-center mb-2">
										<span className="font-medium text-gray-700">
											Submission Status
										</span>
										<span
											className={`text-xs px-2 py-1 rounded ${
												submissionStatus.status === "success"
													? "bg-green-100 text-green-600"
													: submissionStatus.status === "error"
													? "bg-red-100 text-red-600"
													: submissionStatus.status === "pending"
													? "bg-yellow-100 text-yellow-600"
													: "bg-gray-100 text-gray-600"
											}`}
										>
											{submissionStatus.status === "success"
												? "Passed"
												: submissionStatus.status === "error"
												? "Failed"
												: submissionStatus.status === "pending"
												? "Running"
												: "Not Submitted"}
										</span>
									</div>

									{submissionStatus.status !== "none" && (
										<div className="mt-3">
											{submissionStatus.status === "success" && (
												<div className="flex items-center gap-2 text-green-600 mb-2">
													<CheckCircleIcon className="h-5 w-5" />
													<span>All test cases passed!</span>
												</div>
											)}

											{submissionStatus.status === "error" && (
												<div className="flex items-center gap-2 text-red-600 mb-2">
													<AlertCircleIcon className="h-5 w-5" />
													<span>Some test cases failed</span>
												</div>
											)}

											{submissionStatus.testCasesPassed !== undefined && (
												<div className="bg-gray-50 p-3 rounded-md mb-3">
													<div className="flex justify-between mb-1">
														<span className="text-sm text-gray-700">
															Test Cases:
														</span>
														<span className="text-sm font-medium">
															{submissionStatus.testCasesPassed}/
															{submissionStatus.totalTestCases || 0}
														</span>
													</div>
													<div className="w-full bg-gray-200 rounded-full h-2.5">
														<div
															className={`h-2.5 rounded-full ${
																submissionStatus.status === "success"
																	? "bg-green-500"
																	: "bg-red-500"
															}`}
															style={{
																width: `${
																	submissionStatus.totalTestCases
																		? (submissionStatus.testCasesPassed /
																				submissionStatus.totalTestCases) *
																		  100
																		: 0
																}%`,
															}}
														></div>
													</div>
												</div>
											)}

											<div className="bg-gray-50 p-3 rounded-md">
												<p className="text-xs text-gray-500 mb-1">Details:</p>
												<pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap">
													{submissionStatus.message}
												</pre>
											</div>
										</div>
									)}

									{submissionStatus.status === "none" && (
										<div className="flex flex-col items-center justify-center py-6 text-gray-500">
											<SendIcon className="h-10 w-10 mb-2 opacity-30" />
											<p>Submit your solution to see results</p>
										</div>
									)}
								</div>
							)}
							{consoleTab === "testcases" && (
								<div className="p-4 overflow-y-auto h-full pb-10">
									<div className="space-y-4">
										{sampleTestCases.map(
											(
												testCase: {
													input: string;
													expectedOutput: string;
												},
												idx: number
											) => (
												<div
													key={idx}
													className="bg-gray-50 p-3 rounded border"
												>
													<div className="flex justify-between items-center mb-2">
														<span className="font-medium text-gray-700">
															Test Case {idx + 1}
														</span>
													</div>
													<div className="space-y-2">
														<div>
															<p className="text-xs text-gray-600 mb-1">
																Input:
															</p>
															<pre className="bg-white p-2 rounded text-xs font-mono border overflow-x-auto">
																{testCase.input}
															</pre>
														</div>
														<div>
															<p className="text-xs text-gray-600 mb-1">
																Expected Output:
															</p>
															<pre className="bg-white p-2 rounded text-xs font-mono border overflow-x-auto">
																{testCase.expectedOutput}
															</pre>
														</div>
													</div>
												</div>
											)
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
