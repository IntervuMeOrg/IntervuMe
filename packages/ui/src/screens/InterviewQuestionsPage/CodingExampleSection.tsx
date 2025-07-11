import { CodingQuestion } from "../../types/questions";

type CodingExampleSectionProps = {
	question: CodingQuestion;
};

export const CodingExampleSection = ({
	question,
}: CodingExampleSectionProps) => {
	return (
		<div className="mt-6 space-y-4">
			{question.examples.map(
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
