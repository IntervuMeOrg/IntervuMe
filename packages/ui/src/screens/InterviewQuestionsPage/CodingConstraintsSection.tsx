import { CodingQuestion } from "../../types/questions";

type CodingConstraintsSectionProps = {
	question: CodingQuestion;
};

export const CodingConstraintsSection = ({
	question,
}: CodingConstraintsSectionProps) => {
	return (
		<div className="mt-6">
			<p className="font-semibold text-m mb-2">Constraints:</p>
			<div className="p-3 bg-gray-100 rounded-md">
				<ul className="list-disc pl-4 space-y-1">
					{question.constraints?.map((constraint: string, idx: number) => (
						<li key={idx} className="text-m text-gray-700">
							{constraint}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
