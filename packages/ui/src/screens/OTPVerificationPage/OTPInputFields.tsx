import { Input } from "../../components/ui/input";

type OTPInputFieldsProps = {
	otp: string[];
	inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
	handleInputChange: (index: number, value: string) => void;
	handleKeyDown: (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>
	) => void;
	handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
};

export const OTPInputFields = ({
	otp,
	inputRefs,
	handleInputChange,
	handleKeyDown,
	handlePaste,
}: OTPInputFieldsProps) => {
	return (
		<div className="flex justify-between gap-2 mb-4">
			{otp.map((digit, index) => (
				<Input
					key={index}
					ref={(el) => (inputRefs.current[index] = el)}
					type="text"
					value={digit}
					onChange={(e) => handleInputChange(index, e.target.value)}
					onKeyDown={(e) => handleKeyDown(index, e)}
					onPaste={index === 0 ? handlePaste : undefined}
					maxLength={1}
					className={`w-10 h-10 sm:w-12 sm:h-12 text-center font-['Nunito'] font-bold text-base sm:text-lg
						${digit 
							? "bg-[#1D1D20] text-[#e8eef2] border-2 border-[#2B8EDE]" 
							: "bg-[#e8eef2] text-black"
						} 
						rounded-md focus:ring-2 focus:ring-[#0667D0] focus:ring-opacity-50 shadow-md transition-all duration-200`}
					inputMode="numeric"
					autoComplete="one-time-code"
				/>
			))}
		</div>
	);
};