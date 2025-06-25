import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { UserProfile } from "../../types/userProfile";
import {
	AwardIcon,
	GraduationCapIcon,
	BriefcaseIcon,
	PlusIcon,
	XCircleIcon,
} from "lucide-react";



type ProfileSkillsExperienceProps = {
	userProfile: UserProfile;
	isEditing: boolean;
	setUserProfile: (profile: UserProfile) => void;
	setSkillDialogOpen: (open: boolean) => void;
	showToast: (message: string, type: "info" | "success" | "error") => void;
};

export const ProfileSkillsExperience = ({
	userProfile,
	isEditing,
	setUserProfile,
	setSkillDialogOpen,
	showToast,
}: ProfileSkillsExperienceProps) => {
	return (
		<Card className="col-span-2 shadow-md">
			<CardContent className="p-6">
				{/* Skills Section */}
				<div className="mb-8">
					<h3 className="font-['Nunito',Helvetica] font-bold text-[22px] text-[#1d1d20] mb-4 flex items-center">
						<AwardIcon className="mr-2 h-5 w-5 text-[#0667D0]" />
						Skills
					</h3>
					<div className="flex flex-wrap gap-2">
						{userProfile.skills.map((skill, index) => (
							<div
								key={index}
								className="bg-[#e8eef2] text-[#0667D0] px-3 py-1 rounded-full text-sm font-medium flex items-center"
							>
								{skill}
								{isEditing && (
									<XCircleIcon
										className="h-4 w-4 ml-2 text-red-500 cursor-pointer hover:text-red-700"
										onClick={() => {
											const updatedSkills = [...userProfile.skills];
											updatedSkills.splice(index, 1);
											setUserProfile({
												...userProfile,
												skills: updatedSkills,
											});
											showToast(`Skill "${skill}" removed`, "info");
										}}
									/>
								)}
							</div>
						))}
						{isEditing && (
							<div
								className="bg-[#f0f7ff] text-[#0667D0] px-3 py-1 rounded-full text-sm font-medium flex items-center cursor-pointer"
								onClick={() => setSkillDialogOpen(true)}
							>
								<PlusIcon className="h-4 w-4 mr-1" />
								Add Skill
							</div>
						)}
						{/*Skill removal in edit mode place here !*/}
					</div>
				</div>

				{/* Education Section */}
				<div className="mb-8">
					<h3 className="font-['Nunito',Helvetica] font-bold text-[22px] text-[#1d1d20] mb-4 flex items-center">
						<GraduationCapIcon className="mr-2 h-5 w-5 text-[#0667D0]" />
						Education
					</h3>
					{userProfile.education.map((edu, index) => (
						<div key={index} className="mb-4 last:mb-0">
							<div className="flex justify-between items-start">
								<div>
									<h4 className="font-['Nunito',Helvetica] font-bold text-[18px] text-[#1d1d20]">
										{isEditing ? (
											<Input
												value={edu.degree}
												className="mb-2"
												onChange={(e) => {
													const newEducation = [...userProfile.education];
													newEducation[index] = {
														...newEducation[index],
														degree: e.target.value,
													};
													setUserProfile({
														...userProfile,
														education: newEducation,
													});
												}}
											/>
										) : (
											edu.degree
										)}
									</h4>
									<p className="text-[#666]">
										{isEditing ? (
											<Input
												value={edu.institution}
												className="mb-2"
												onChange={(e) => {
													const newEducation = [...userProfile.education];
													newEducation[index] = {
														...newEducation[index],
														institution: e.target.value,
													};
													setUserProfile({
														...userProfile,
														education: newEducation,
													});
												}}
											/>
										) : (
											edu.institution
										)}
									</p>
								</div>
								<div className="text-[#666] text-sm">
									{isEditing ? (
										<Input
											value={edu.year}
											className="w-32"
											onChange={(e) => {
												const newEducation = [...userProfile.education];
												newEducation[index] = {
													...newEducation[index],
													year: e.target.value,
												};
												setUserProfile({
													...userProfile,
													education: newEducation,
												});
											}}
										/>
									) : (
										edu.year
									)}
								</div>
							</div>
						</div>
					))}
					{isEditing && (
						<Button
							variant="outline"
							className="mt-2 text-[#0667D0] border-[#0667D0] hover:bg-[#f0f7ff] w-full"
							onClick={() => {
								setUserProfile({
									...userProfile,
									education: [
										...userProfile.education,
										{ degree: "", institution: "", year: "" },
									],
								});
							}}
						>
							<PlusIcon className="h-4 w-4 mr-2" />
							Add Education
						</Button>
					)}
				</div>

				{/* Experience Section */}
				<div>
					<h3 className="font-['Nunito',Helvetica] font-bold text-[22px] text-[#1d1d20] mb-4 flex items-center">
						<BriefcaseIcon className="mr-2 h-5 w-5 text-[#0667D0]" />
						Experience
					</h3>
					{userProfile.experience.map((exp, index) => (
						<div key={index} className="mb-4 last:mb-0">
							<div className="flex justify-between items-start">
								<div>
									<h4 className="font-['Nunito',Helvetica] font-bold text-[18px] text-[#1d1d20]">
										{isEditing ? (
											<Input
												value={exp.position}
												className="mb-2"
												onChange={(e) => {
													const newExperience = [...userProfile.experience];
													newExperience[index] = {
														...newExperience[index],
														position: e.target.value,
													};
													setUserProfile({
														...userProfile,
														experience: newExperience,
													});
												}}
											/>
										) : (
											exp.position
										)}
									</h4>
									<p className="text-[#666]">
										{isEditing ? (
											<Input
												value={exp.company}
												className="mb-2"
												onChange={(e) => {
													const newExperience = [...userProfile.experience];
													newExperience[index] = {
														...newExperience[index],
														company: e.target.value,
													};
													setUserProfile({
														...userProfile,
														experience: newExperience,
													});
												}}
											/>
										) : (
											exp.company
										)}
									</p>
								</div>
								<div className="text-[#666] text-sm">
									{isEditing ? (
										<Input
											value={exp.duration}
											className="w-32"
											onChange={(e) => {
												const newExperience = [...userProfile.experience];
												newExperience[index] = {
													...newExperience[index],
													duration: e.target.value,
												};
												setUserProfile({
													...userProfile,
													experience: newExperience,
												});
											}}
										/>
									) : (
										exp.duration
									)}
								</div>
							</div>
						</div>
					))}
					{isEditing && (
						<Button
							variant="outline"
							className="mt-2 text-[#0667D0] border-[#0667D0] hover:bg-[#f0f7ff] w-full"
							onClick={() => {
								setUserProfile({
									...userProfile,
									experience: [
										...userProfile.experience,
										{ position: "", company: "", duration: "" },
									],
								});
							}}
						>
							<PlusIcon className="h-4 w-4 mr-2" />
							Add Experience
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
};