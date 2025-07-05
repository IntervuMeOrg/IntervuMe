import { CodingQuestion } from "../../types/questions";

type QuestionContentCodingProps = {
	question: CodingQuestion;
	userAnswer: string;
};

export const QuestionContentCoding = ({
	question,
	userAnswer,
}: QuestionContentCodingProps) => {
	return (
		<div className="mb-6 space-y-4">
			{/* Question Section */}
			<div className="font-['Nunito'] bg-white/5 rounded-lg p-4 sm:p-5 border-l-4 border-[#0667D0]">
				<div className="flex items-start gap-2 mb-2">
					<span className="font-['Nunito'] text-xs sm:text-sm font-semibold text-[#0667D0] uppercase tracking-wider">
						Question
					</span>
				</div>
				<p className="font-['Nunito'] text-sm sm:text-base lg:text-lg text-white leading-relaxed whitespace-pre-line">
					{question.problemStatement}
				</p>
			</div>
			{/* Examples */}
			<div>
				<h4 className="font-semibold text-white text-base mb-2">Examples:</h4>
				{question.examples.map((example, idx) => (
					<div
						key={idx}
						className="bg-white/10 p-3 rounded-lg border border-white/20 mb-2"
					>
						<div className="text-[#e8eef2] text-sm space-y-1">
							<div>
								<strong>Input:</strong> {example.input}
							</div>
							<div>
								<strong>Output:</strong> {example.output}
							</div>
							{example.explanation && (
								<div>
									<strong>Explanation:</strong> {example.explanation}
								</div>
							)}
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
						<code>{userAnswer || "No solution submitted"}</code>
					</pre>
				</div>
			</div>

			{/* Optimal Solution */}
			{question.solutionCode && (
				<div>
					<h4 className="font-semibold text-white text-base mb-2">
						Optimal Solution:
					</h4>
					<div className="bg-gray-900 p-4 rounded-lg border border-white/20">
						<pre className="text-blue-400 text-sm overflow-x-auto">
							<code>{question.solutionCode}</code>
						</pre>
					</div>
				</div>
			)}
		</div>
	);
};
