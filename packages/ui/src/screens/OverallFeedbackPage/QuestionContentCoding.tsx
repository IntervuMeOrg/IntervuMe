import { CodingQuestion } from "../../types/questions";

type QuestionContentCodingProps = {
	question: CodingQuestion;
	userAnswer: string | null;
};

export const QuestionContentCoding = ({
	question,
	userAnswer,
}: QuestionContentCodingProps) => {
	return (
		<div className="mb-6 space-y-4">
			{/* Examples */}
			<div>
				<h4 className="font-semibold text-white text-base mb-2">Examples:</h4>
				{question.examples.map((example, idx) => (
					<div
						key={idx}
						className="bg-white/10 p-3 rounded-lg border border-white/20"
					>
						<div className="text-[#e8eef2] text-sm space-y-1">
							<div>
								<strong>Input:</strong> {example.input}
							</div>
							<div>
								<strong>Output:</strong> {example.output}
							</div>
							<div>
								<strong>Explanation:</strong> {example.explanation}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* User's Solution */}
			<div>
				<h4 className="font-semibold text-white text-base mb-2">
					Your Solution:
				</h4>
				<div className="bg-gray-900 p-4 rounded-lg border border-white/20">
					<pre className="text-green-400 text-sm overflow-x-auto">
						<code>{userAnswer || "No solution provided"}</code>
					</pre>
				</div>
			</div>

			{/* Optimal Solution */}
			<div>
				<h4 className="font-semibold text-white text-base mb-2">
					Optimal Solution:
				</h4>
				<div className="bg-gray-900 p-4 rounded-lg border border-white/20">
					<pre className="text-blue-400 text-sm overflow-x-auto">
						<code>{question.solution}</code>
					</pre>
				</div>
			</div>
		</div>
	);
};
