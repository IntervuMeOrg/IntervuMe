import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

type CustomJobDescriptionProps = {
	jobDescription: string;
	setJobDescription: (value: string) => void;
	handleStartInterview: () => void;
};

export const CustomJobDescription = ({
	jobDescription,
	setJobDescription,
	handleStartInterview,
}: CustomJobDescriptionProps) => {
	return (
		<div>
			<h2 className="font-['Nunito',Helvetica] font-bold text-[1.5rem] mb-4 text-[#1d1d20]">
				Enter Job Description
			</h2>
			<p className="text-[#666] mb-6">
				Provide details about the position you're preparing for. Include key
				responsibilities, required skills, and any specific areas you want to
				focus on during the interview.
			</p>
			<Textarea
				value={jobDescription}
				onChange={(e) => setJobDescription(e.target.value)}
				placeholder="Enter the job description here..."
				className="bg-gray-50 min-h-[200px] resize-y border-[#ccc] focus-visible:ring-[#0667D0] mb-6"
			/>
			<Button
				onClick={handleStartInterview}
				className="w-full h-[50px] [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90 transition-all duration-300"
				disabled={!jobDescription.trim()}
			>
				<span className="font-['Nunito',Helvetica] font-semibold text-white text-[1.1rem]">
					Start Interview
				</span>
			</Button>
		</div>
	);
};
