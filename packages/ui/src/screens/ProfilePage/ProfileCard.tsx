import { Card, CardContent } from "../../components/ui/card";
import { Textarea } from "../../components/ui/textarea";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { motion } from "framer-motion";
import { UserProfile } from "../../types/userProfile";

type UserProfileProps = {
    userProfile: UserProfile;
    isEditing: boolean;
    setUserProfile: (profile: UserProfile) => void;
};

export const ProfileCard = ({
	userProfile,
	isEditing,
	setUserProfile,
}: UserProfileProps) => {
	return (
		<Card className="col-span-1 shadow-md overflow-hidden">
			<CardContent className="p-0">
				<div className="bg-[#1d1d20] h-[120px] relative z-[-1]">
					<div className="absolute inset-0  [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18] " />
				</div>
				<div className="flex flex-col items-center -mt-16 px-6 pb-6">
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						className="rounded-full h-[120px] w-[120px] [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] flex items-center justify-center mb-4 border-4 border-white"
					>
						<span className="font-['Nunito',Helvetica] font-black text-white text-[40px]">
							{userProfile.firstName.charAt(0)}
							{userProfile.lastName.charAt(0)}
						</span>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.4 }}
					>
						<h2 className="font-['Nunito',Helvetica] font-bold text-[24px] text-[#1d1d20] mb-1">
							{userProfile.firstName} {userProfile.lastName}
						</h2>
						<p className="text-[#666] mb-4">{userProfile.location}</p>
					</motion.div>

					<div className="w-full space-y-4 mt-4">
						<div className="flex items-center">
							<MailIcon className="h-5 w-5 text-[#0667D0] mr-3" />
							<span className="text-[#333]">{userProfile.email}</span>
						</div>
						<div className="flex items-center">
							<PhoneIcon className="h-5 w-5 text-[#0667D0] mr-3" />
							<span className="text-[#333]">{userProfile.phone}</span>
						</div>
						<div className="flex items-center">
							<MapPinIcon className="h-5 w-5 text-[#0667D0] mr-3" />
							<span className="text-[#333]">{userProfile.location}</span>
						</div>
					</div>

					<div className="w-full mt-6">
						<h3 className="font-['Nunito',Helvetica] font-bold text-[18px] text-[#1d1d20] mb-2">
							Bio
						</h3>
						{isEditing ? (
							<>
								<Textarea
									value={userProfile.bio}
									className="min-h-[320px]"
									onChange={(e) => {
										const maxWords = 30;
										const words = e.target.value.split(/\s+/).filter(Boolean);
										if (words.length <= maxWords) {
											setUserProfile({
												...userProfile,
												bio: e.target.value,
											});
										} else {
											setUserProfile({
												...userProfile,
												bio: words.slice(0, maxWords).join(" "),
											});
										}
									}}
								/>
								<div className="text-xs text-right text-[#666] mt-1">
									{30 - userProfile.bio.split(/\s+/).filter(Boolean).length}{" "}
									words remaining
								</div>
							</>
						) : (
							<p className="text-[#666] text-sm">{userProfile.bio}</p>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};