import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";

type RegistrationFormProps = {
	countryCodes: string[];
	genders: string[];
	months: string[];
};

export const RegistrationForm = ({
	countryCodes,
	genders,
	months,
}: RegistrationFormProps) => {
	return (
		<>
			<div className="absolute w-[90%] max-w-[1200px] left-[300px] top-[22vh]">
				<div className="flex flex-wrap gap-4 mb-4">
					{/* First Name field */}
					<Card className="w-[calc(35%-6px)] h-[45px] border-0 pt-[20px]">
						<CardContent className="p-0">
							<Input
								className="h-[45px] bg-[#e8eef2] rounded-[5px] px-4 font-['Nunito',Helvetica] text-sm"
								placeholder="First Name"
							/>
						</CardContent>
					</Card>

					{/* Last Name field */}
					<Card className="w-[calc(35%-6px)] h-[45px] border-0 pt-[20px]">
						<CardContent className="p-0">
							<Input
								className="h-[45px] bg-[#e8eef2] rounded-[5px] px-4 font-['Nunito',Helvetica] text-sm"
								placeholder="Last Name"
							/>
						</CardContent>
					</Card>

					{/* Email field */}
					<Card className="w-[calc(71%)] h-[45px] mt-2 border-0 pt-[20px]">
						<CardContent className="p-0">
							<Input
								className="h-[45px] bg-[#e8eef2] rounded-[5px] px-4 font-['Nunito',Helvetica] text-sm"
								placeholder="Email"
							/>
						</CardContent>
					</Card>

					{/* Password field */}
					<Card className="w-[calc(50%)] h-[45px] mt-2 border-0 pt-[20px]">
						<CardContent className="p-0 relative">
							<Input
								type="password"
								className="h-[45px] bg-[#e8eef2] rounded-[5px] px-4 pr-12 font-['Nunito',Helvetica] text-sm"
								placeholder="Password"
							/>
						</CardContent>
					</Card>

					{/* Confirm Password field */}
					<Card className="w-[calc(50%)] h-[45px] mt-2 border-0 pt-[20px]">
						<CardContent className="p-0 relative">
							<Input
								type="password"
								className="h-[45px] bg-[#e8eef2] rounded-[5px] px-4 pr-12 font-['Nunito',Helvetica] text-sm"
								placeholder="Confirm Password"
							/>
						</CardContent>
					</Card>

					{/* Two-column layout for Phone and Gender */}
					<div className="w-full flex gap-3 mt-2 pt-[20px]">
						{/* Phone Number with country code */}
						<div className="w-1/2 flex">
							<Select defaultValue="+20">
								<SelectTrigger className="w-[110px] h-[45px] bg-[#e8eef2] rounded-[5px] font-['Nunito',Helvetica] text-xs opacity-[0.67]">
									<SelectValue placeholder="+20" />
								</SelectTrigger>
								<SelectContent>
									{countryCodes.map((code) => (
										<SelectItem key={code} value={code}>
											{code}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Card className="w-[500px] h-[45px] ml-[10px] border-0">
								<CardContent className="p-0">
									<Input
										className="h-[45px] bg-[#e8eef2] rounded-[5px] px-4 font-['Nunito',Helvetica] text-sm"
										placeholder="Phone Number"
									/>
								</CardContent>
							</Card>
						</div>

						{/* Gender field */}
						<div className="w-1/2 h-[45px]">
							<Select>
								<SelectTrigger className="w-[150px] h-[45px] bg-[#e8eef2] rounded-[5px] font-['Nunito',Helvetica] text-sm">
									<SelectValue placeholder="Gender" />
								</SelectTrigger>
								<SelectContent>
									{genders.map((gender) => (
										<SelectItem key={gender} value={gender.toLowerCase()}>
											{gender}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Date of Birth fields */}
					<div className="w-full flex gap-3 mt-2">
						{/* Month */}
						<Select>
							<SelectTrigger className="w-[170px] h-[45px] bg-[#e8eef2] rounded-[5px] font-['Nunito',Helvetica] text-sm">
								<SelectValue placeholder="Month" />
							</SelectTrigger>
							<SelectContent>
								{months.map((month, index) => (
									<SelectItem key={index} value={month.toLowerCase()}>
										{month}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						{/* Day */}
						<Card className="w-[130px] h-[45px] border-0">
							<CardContent className="p-0">
								<Input
									className="h-[45px] bg-[#e8eef2] rounded-[5px] px-4 font-['Nunito',Helvetica] text-sm"
									placeholder="Day"
								/>
							</CardContent>
						</Card>

						{/* Year */}
						<Card className="w-[130px] h-[45px] border-0">
							<CardContent className="p-0">
								<Input
									className="h-[45px] bg-[#e8eef2] rounded-[5px] px-4 font-['Nunito',Helvetica] text-sm"
									placeholder="Year"
								/>
							</CardContent>
						</Card>
					</div>

					{/* Sign Up button */}
					<div className="w-full flex justify-end mt-4">
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.6,
								type: "spring",
								stiffness: 100,
								damping: 15,
							}}
						>
							<Button className="w-[250px] h-[45px] [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90 rounded-[5px]">
								<span className="font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-[19px] tracking-[1.14px]">
									Sign Up
								</span>
							</Button>
						</motion.div>
					</div>
				</div>
			</div>
		</>
	);
};