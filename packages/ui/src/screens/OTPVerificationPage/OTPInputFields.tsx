import { Card, CardContent } from "../../components/ui/card";
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
		<div className="absolute w-[422px] top-[calc(30vh+100px)] left-[61px] flex justify-between gap-2">
			{otp.map((digit, index) => (
				<Card
					key={index}
					className="mt-2 w-[60px] h-[60px] shadow-[0px_4px_4px_#00000040] border-0"
				>
					<CardContent className="p-0 flex items-center justify-center">
						<Input
							ref={(el) => (inputRefs.current[index] = el)}
							type="text"
							value={digit}
							onChange={(e) => handleInputChange(index, e.target.value)}
							onKeyDown={(e) => handleKeyDown(index, e)}
							onPaste={index === 0 ? handlePaste : undefined}
							maxLength={1}
							className={`text-[#e8eef2] rounded-[15px] text-center font-['Nunito',Helvetica]
										 text-xl font-extrabold focus:ring-2 focus:ring-[#0667D0] focus:ring-opacity-50
										  shadow-[0px_4px_4px_#00000040] w-[60px] h-[60px] ${
												digit ? "border-4 border-[#2B8EDE] bg-[#1D1D20] " : ""
											}`}
							inputMode="numeric"
							autoComplete="one-time-code"
						/>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
