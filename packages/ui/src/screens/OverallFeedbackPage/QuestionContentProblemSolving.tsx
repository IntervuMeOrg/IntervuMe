import { ProblemSolvingQuestion } from "../../types/questions";

type QuestionContentProblemSolvingProps = {
	questions: ProblemSolvingQuestion[];
	userAnswers: Record<string, string>;
	currentQuestionIndex: number;
	isQuestionAnswered: (questionId: number) => boolean;
};

export const QuestionContentProblemSolving = ({
	questions,
	userAnswers,
	currentQuestionIndex,
	isQuestionAnswered,
}: QuestionContentProblemSolvingProps) => {
	return (
		<div>
			<div className="mb-4">
				<div className="flex justify-between items-center mb-2">
					<h3 className="text-lg font-semibold">
						Problem {currentQuestionIndex + 1}:{" "}
						{(questions[currentQuestionIndex] as ProblemSolvingQuestion).name}
					</h3>
					<span
						className={`px-2 py-1 rounded text-xs font-medium ${
							(questions[currentQuestionIndex] as ProblemSolvingQuestion)
								.difficulty === "Easy"
								? "bg-green-100 text-green-700"
								: (questions[currentQuestionIndex] as ProblemSolvingQuestion)
										.difficulty === "Medium"
								? "bg-yellow-100 text-yellow-700"
								: "bg-red-100 text-red-700"
						}`}
					>
						{
							(questions[currentQuestionIndex] as ProblemSolvingQuestion)
								.difficulty
						}
					</span>
				</div>
				<p className="text-gray-700">
					{(questions[currentQuestionIndex] as ProblemSolvingQuestion).text}
				</p>
			</div>

			<div className="mb-6">
				<h4 className="font-medium text-gray-700 mb-2">Examples:</h4>
				<div className="space-y-3">
					{(
						questions[currentQuestionIndex] as ProblemSolvingQuestion
					).examples.map((example, idx) => (
						<div
							key={idx}
							className="bg-gray-50 p-3 rounded-md border border-gray-200"
						>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-xs text-gray-500 mb-1">Input:</p>
									<pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
										{example.input}
									</pre>
								</div>
								<div>
									<p className="text-xs text-gray-500 mb-1">Output:</p>
									<pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
										{example.output}
									</pre>
								</div>
							</div>
							{example.explanation && (
								<p className="mt-2 text-xs text-gray-600">
									<span className="font-medium">Explanation:</span>{" "}
									{example.explanation}
								</p>
							)}
						</div>
					))}
				</div>
			</div>

			<div className="mb-6">
				<h4 className="font-medium text-gray-700 mb-2">Your Solution:</h4>
				<pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
					{userAnswers[questions[currentQuestionIndex].id] ||
						"No solution submitted"}
				</pre>
			</div>

			<div className="mb-6">
				<h4 className="font-medium text-gray-700 mb-2">Optimal Solution:</h4>
				<pre className="bg-blue-50 p-4 rounded-md overflow-x-auto text-sm border border-blue-100">
					{(questions[currentQuestionIndex] as ProblemSolvingQuestion).solution}
				</pre>
			</div>

			<div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
				<h4 className="font-medium text-blue-700 mb-2">Explanation:</h4>
				<p className="text-gray-700">
					{
						(questions[currentQuestionIndex] as ProblemSolvingQuestion)
							.explanation
					}
				</p>
			</div>

			<div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
				<div className="flex justify-between items-center">
					<h4 className="font-medium text-gray-700">Your Performance:</h4>
					<div
						className={`px-3 py-1 rounded-full text-sm font-medium ${
							isQuestionAnswered(questions[currentQuestionIndex].id)
								? "bg-green-100 text-green-700"
								: "bg-red-100 text-red-700"
						}`}
					>
						{isQuestionAnswered(questions[currentQuestionIndex].id)
							? "Attempted"
							: "Not Attempted"}
					</div>
				</div>
				<p className="text-sm text-gray-500 mt-2">
					{isQuestionAnswered(questions[currentQuestionIndex].id)
						? "You submitted a solution for this problem. Compare your approach with the optimal solution."
						: "You didn't submit a solution for this problem. Review the optimal solution to learn the approach."}
				</p>
			</div>
		</div>
	);
};
