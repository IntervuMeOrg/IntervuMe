/**
 * EditorLayout Component - A reusable code editor component with configurable settings
 * This component encapsulates the Monaco editor with toolbar options and console functionality
 */

import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import { CheckCircleIcon, AlertCircleIcon, SendIcon } from "lucide-react";


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
	language = "javascript",
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
		{ value: "javascript", label: "JavaScript" },
		{ value: "typescript", label: "TypeScript" },
		{ value: "python", label: "Python" },
		{ value: "java", label: "Java" },
		{ value: "cpp", label: "C++" },
	],
	showRunButton = true,
	showSubmitButton = true,
	runButtonText = "Run",
	submitButtonText = "Submit",
}: EditorLayoutProps): JSX.Element => {
	// State for editor settings
	const [theme, setTheme] = useState<"vs-light" | "vs-dark">("vs-dark");
	const [fontSize, setFontSize] = useState(14);
	const [wordWrap, setWordWrap] = useState<"on" | "off">("on");
	const [minimapEnabled, setMinimapEnabled] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState(language);

	// State for console visibility and active tab
	const [consoleVisible, setConsoleVisible] = useState(showConsole);
	const [consoleTab, setConsoleTab] = useState<
		"testcases" | "output" | "submissions"
	>("output");

	// Update console visibility when prop changes
	useEffect(() => {
		setConsoleVisible(showConsole);
	}, [showConsole]);

	// Handle language change
	const handleLanguageChange = (newLanguage: string) => {
		setSelectedLanguage(newLanguage);
		// Additional logic if needed when language changes
	};

	return (
		<div className="w-full h-full flex flex-col bg-[#1d1d20] rounded-md overflow-hidden border border-gray-200 shadow-lg">
			{/* Language selector and settings */}
			<div className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 border-b border-gray-700 text-white">
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
							className="appearance-none bg-gray-700 text-gray-100 pl-10 pr-10 py-2 rounded-md border border-gray-600 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm font-medium transition-all duration-200"
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
					value={initialValue}
					onChange={onChange}
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
			<div className="border-t border-gray-200">
				<div className="flex justify-between items-center p-2 bg-gray-100">
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
								className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-1.5 rounded-md text-sm shadow-sm flex items-center gap-1.5"
								onClick={() => {
									setConsoleVisible(true);
									setConsoleTab("output");
									onRun && onRun();
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
									<polygon points="5 3 19 12 5 21 5 3"></polygon>
								</svg>
								{runButtonText}
							</motion.button>
						)}
						{showSubmitButton && (
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm shadow-sm flex items-center gap-1.5"
								onClick={() => {
									setConsoleVisible(true);
									setConsoleTab("submissions");
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
					<div className="border-t border-gray-200 bg-gray-50 p-0">
						{/* Console Tabs */}
						<div className="flex border-b border-gray-200">
							<button
								className={`px-4 py-2 text-sm font-medium ${
									consoleTab === "testcases"
										? "text-blue-600 border-b-2 border-blue-600 bg-white"
										: "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
								}`}
								onClick={() => setConsoleTab("testcases")}
							>
								Test Cases
							</button>
							<button
								className={`px-4 py-2 text-sm font-medium ${
									consoleTab === "output"
										? "text-blue-600 border-b-2 border-blue-600 bg-white"
										: "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
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
								onClick={() => setConsoleTab("submissions")}
							>
								Submissions
							</button>
						</div>

						{/* Console Content */}
						<div className="p-3 max-h-[300px] overflow-y-auto font-mono text-sm">
							{consoleTab === "output" && (
								<div className="bg-white p-3 rounded-md shadow-sm border border-gray-200">
									<div className="flex justify-between items-center mb-2">
										<span className="font-medium text-gray-700">
											Execution Result
										</span>
										<span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
											Your Output
										</span>
									</div>
									<pre className="bg-gray-50 p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap">
										{consoleOutput || "// Run your code to see the output here"}
									</pre>
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
								<div className="space-y-3">
									{questions[currentQuestionIndex]?.examples?.map(
										(example:any, idx:number) => (
											<div
												key={idx}
												className="bg-white p-3 rounded-md shadow-sm border border-gray-200"
											>
												<div className="flex justify-between items-center mb-2">
													<span className="font-medium text-gray-700">
														Test Case {idx + 1}
													</span>
													<span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
														Expected
													</span>
												</div>
												<div className="grid grid-cols-2 gap-4">
													<div>
														<p className="text-xs text-gray-500 mb-1">Input:</p>
														<pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
															{example.input}
														</pre>
													</div>
													<div>
														<p className="text-xs text-gray-500 mb-1">
															Expected Output:
														</p>
														<pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
															{example.output}
														</pre>
													</div>
												</div>
											</div>
										)
									)}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
