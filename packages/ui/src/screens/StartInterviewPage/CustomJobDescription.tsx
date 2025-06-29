import { motion } from "framer-motion";
import { FileTextIcon, CastleIcon as PasteIcon } from "lucide-react";

interface CustomJobDescriptionProps {
	jobDescription: string;
	setJobDescription: (value: string) => void;
}

export const CustomJobDescription = ({
	jobDescription,
	setJobDescription,
}: CustomJobDescriptionProps) => {
	const handlePaste = async () => {
		try {
			const text = await navigator.clipboard.readText();
			setJobDescription(text);
		} catch (err) {
			console.error("Failed to read clipboard contents: ", err);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
				<FileTextIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />
				<h3 className="font-['Nunito'] font-bold text-white text-base sm:text-lg md:text-xl">
					Job Description
				</h3>
			</div>

			<div className="relative">
				<textarea
					value={jobDescription}
					onChange={(e) => setJobDescription(e.target.value)}
					placeholder="Paste your job description here. Include role requirements, responsibilities, and any specific skills you'd like to be interviewed on..."
					className="w-full h-32 sm:h-40 md:h-48 p-4 sm:p-5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-[#0667D0] focus:border-transparent transition-all duration-200"
					style={{ fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}
				/>

				{/* Paste Button */}
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handlePaste}
					className="absolute top-3 right-3 p-2 bg-[#0667D0]/20 hover:bg-[#0667D0]/30 border border-[#0667D0]/40 rounded-md transition-all duration-200"
					title="Paste from clipboard"
				>
					<PasteIcon className="h-4 w-4 text-[#0667D0]" />
				</motion.button>
			</div>

			{/* Character count */}
			<div className="flex justify-between items-center mt-2 sm:mt-3">
				<p className="text-[#e8eef2] text-xs sm:text-sm opacity-70">
					Provide as much detail as possible for better interview questions
				</p>
				<span className="text-[#e8eef2] text-xs opacity-60">
					{jobDescription.length} characters
				</span>
			</div>
		</motion.div>
	);
};
