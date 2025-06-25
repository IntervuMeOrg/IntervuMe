import { useState } from "react";
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

	const [consoleTab, setConsoleTab] = useState<
		"testcases" | "output" | "submissions"
	>("testcases");
	// State for code execution output
	const [codeOutput, setCodeOutput] = useState<string>("");
	// State for submission status
	const [submissionStatus, setSubmissionStatus] = useState<{
		status: "success" | "error" | "pending" | "none";
		message: string;
		testCasesPassed?: number;
		totalTestCases?: number;
	}>({ status: "none", message: "" });

	// Handle problem solving answer
	const handleProblemSolvingAnswer = (questionId: number, answer: string) => {
		setUserAnswers((prev) => ({
			...prev,
			[questionId]: answer,
		}));
	};

	return (
		<div className="mt-[-40px] flex h-auto min-h-[calc(100vh-150px)] gap-4">
			{/* Problem description - Left side */}
			<div className="w-[55%] rounded-md p-4 overflow-y-auto max-h-[calc(100vh-150px)]">
				<Card className="shadow-md border border-gray-200 overflow-visible h-auto">
					<CardContent className="p-6">
						<div className="mb-3">
							<h3 className="font-bold text-2xl mb-1 flex justify-between items-start">
								<span className="flex-1">
									{
										(questions[currentQuestionIndex] as ProblemSolvingQuestion)
											.name
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
							{(questions[currentQuestionIndex] as ProblemSolvingQuestion).text}
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
			</div>

			{/* Code editor - Right side */}
			{/* Using the reusable EditorLayout component */}
			<div className="w-[55%] h-auto min-h-[calc(100vh-150px)] max-h-[calc(10vh-150px)]">
				<EditorLayout
					initialValue={
						userAnswers[questions[currentQuestionIndex].id] ||
						"// Write your solution here\n"
					}
					language="javascript"
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
					onSubmit={() => {
						// Simulate submission with random results
						const isSuccess = Math.random() > 0.3; // 70% chance of success
						const testCasesPassed = isSuccess
							? 5
							: Math.floor(Math.random() * 4) + 1; // 1-4 if failed

						setSubmissionStatus({
							status: isSuccess ? "success" : "error",
							message: isSuccess
								? "Your solution passed all test cases. Great job!"
								: "Your solution failed on some test cases. Check the error details and try again.",
							testCasesPassed: testCasesPassed,
							totalTestCases: 5,
						});

						handleProblemSolvingAnswer(
							questions[currentQuestionIndex].id,
							userAnswers[questions[currentQuestionIndex].id] || ""
						);

						setConsoleVisible(true);
						setConsoleTab("submissions");
					}}
					availableLanguages={[
						{ value: "cpp", label: "C++" },
						{ value: "javascript", label: "JavaScript" },
						{ value: "python", label: "Python" },
						{ value: "java", label: "Java" },
					]}
				/>
			</div>
		</div>
	);
};
