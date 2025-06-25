import { ProblemSolvingQuestion } from "../../types/questions";

type ProblemSolvingConstraintsSectionProps = {
	questions: ProblemSolvingQuestion[];
	currentQuestionIndex: number;
};

export const ProblemSolvingConstraintsSection = ({
	questions,
	currentQuestionIndex,
}: ProblemSolvingConstraintsSectionProps) => {
	return (
		<div className="mt-6">
			<p className="font-semibold text-m mb-2">Constraints:</p>
			<div className="p-3 bg-gray-100 rounded-md">
				<ul className="list-disc pl-4 space-y-1">
					{(
						questions[currentQuestionIndex] as ProblemSolvingQuestion
					).constraints.map((constraint, idx) => (
						<li key={idx} className="text-m text-gray-700">
							{constraint}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
