import { ProblemSolvingQuestion } from "../../types/questions";

type ProblemSolvingExampleSectionProps = {
	questions: ProblemSolvingQuestion[];
	currentQuestionIndex: number;
};

export const ProblemSolvingExampleSection = ({
	questions,
	currentQuestionIndex,
}: ProblemSolvingExampleSectionProps) => {
	return (
		<div className="mt-6 space-y-4">
			{(questions[currentQuestionIndex] as ProblemSolvingQuestion).examples.map(
				(example, idx) => (
					<div key={idx}>
						<p className="font-semibold text-medium">Example {idx + 1}:</p>
						<div className="mt-2 p-3 bg-gray-100 rounded-md">
							<div className="space-y-2">
								<p>
									<span className="font-medium">Input:</span> {example.input}
								</p>
								<p>
									<span className="font-medium">Output:</span> {example.output}
								</p>
								{example.explanation && (
									<p>
										<span className="font-medium">Explanation:</span>{" "}
										{example.explanation}
									</p>
								)}
							</div>
						</div>
					</div>
				)
			)}
		</div>
	);
};
