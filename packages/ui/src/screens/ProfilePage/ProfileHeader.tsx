import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { SaveIcon, PencilIcon } from "lucide-react";

type ProfileHeaderProps = {
	isEditing: boolean;
	toggleEditMode: () => void;
	saveProfileChanges: () => void;
};

export const ProfileHeader = ({
	isEditing,
	toggleEditMode,
	saveProfileChanges,
}: ProfileHeaderProps) => {
	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-10% 0px" }}
			transition={{
				type: "spring",
				stiffness: 90,
				damping: 15,
				mass: 0.5,
			}}
			className="w-full flex flex-col items-center mb-8"
		>
			<div className="flex items-center justify-between w-full mb-6">
				<h1 className="font-['Nunito',Helvetica] font-black text-[40px] text-[#1d1d20]">
					My Profile
				</h1>
				<Button
					onClick={isEditing ? saveProfileChanges : toggleEditMode}
					className="rounded-[5px] h-[52px] px-6 [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90"
				>
					{isEditing ? (
						<>
							<SaveIcon className="mr-2 h-5 w-5" />
							<span className="font-['Nunito',Helvetica] font-semibold text-white text-[18px]">
								Save Changes
							</span>
						</>
					) : (
						<>
							<PencilIcon className="mr-2 h-5 w-5" />
							<span className="font-['Nunito',Helvetica] font-semibold text-white text-[18px]">
								Edit Profile
							</span>
						</>
					)}
				</Button>
			</div>
		</motion.section>
	);
};
