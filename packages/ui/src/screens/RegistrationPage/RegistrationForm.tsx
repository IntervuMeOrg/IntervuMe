import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
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
	const navigate = useNavigate();

	return (
		<div className="flex-1 p-6 sm:p-8 lg:p-8 2xl:p-8 2xl:pt-0">
			{/* User Details title */}
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4, duration: 0.5 }}
				className="max-w-4xl mx-auto mb-5"
			>
				<h2 className="font-['Nunito'] font-bold text-[#e8eef2] text-sm sm:text-base lg:text-lg tracking-wide">
					User Details
				</h2>
				<p className="text-sm text-[#c7d3dd] font-['Nunito'] opacity-80 mt-0.5">
					Please fill in your basic information to continue
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.6 }}
				className="max-w-4xl mx-auto"
			>
				<form className="space-y-6 sm:space-y-8">
					{/* Name fields - responsive grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
						<div>
							<Input
								className="h-10 sm:h-12 bg-[#e8eef2] rounded-md px-4 font-['Nunito'] text-sm sm:text-base shadow-sm"
								placeholder="First Name"
								type="text"
							/>
						</div>
						<div>
							<Input
								className="h-10 sm:h-12 bg-[#e8eef2] rounded-md px-4 font-['Nunito'] text-sm sm:text-base shadow-sm"
								placeholder="Last Name"
								type="text"
							/>
						</div>
					</div>

					{/* Email field - full width */}
					<div>
						<Input
							className="h-10 sm:h-12 bg-[#e8eef2] rounded-md px-4 font-['Nunito'] text-sm sm:text-base shadow-sm w-full"
							placeholder="Email"
							type="email"
						/>
					</div>

					{/* Password fields - responsive grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
						<div>
							<Input
								type="password"
								className="h-10 sm:h-12 bg-[#e8eef2] rounded-md px-4 font-['Nunito'] text-sm sm:text-base shadow-sm"
								placeholder="Password"
							/>
						</div>
						<div>
							<Input
								type="password"
								className="h-10 sm:h-12 bg-[#e8eef2] rounded-md px-4 font-['Nunito'] text-sm sm:text-base shadow-sm"
								placeholder="Confirm Password"
							/>
						</div>
					</div>

					{/* Phone and Gender - responsive layout */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
						{/* Phone Number with country code */}
						<div className="flex gap-2 sm:gap-3">
							<Select defaultValue="+20">
								<SelectTrigger className="w-20 sm:w-24 h-10 sm:h-12 bg-[#e8eef2] rounded-md font-['Nunito'] text-xs sm:text-sm">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{countryCodes.map((code) => (
										<SelectItem key={code} value={code}>
											{code}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Input
								className="flex-1 h-10 sm:h-12 bg-[#e8eef2] rounded-md px-4 font-['Nunito'] text-sm sm:text-base shadow-sm"
								placeholder="Phone Number"
								type="tel"
							/>
						</div>

						{/* Gender field */}
						<div>
							<Select>
								<SelectTrigger className="h-10 sm:h-12 bg-[#e8eef2] rounded-md font-['Nunito'] text-sm sm:text-base">
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

					{/* Date of Birth fields - responsive layout */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
						{/* Month */}
						<div>
							<Select>
								<SelectTrigger className="h-10 sm:h-12 bg-[#e8eef2] rounded-md font-['Nunito'] text-sm sm:text-base">
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
						</div>

						{/* Day */}
						<div>
							<Input
								className="h-10 sm:h-12 bg-[#e8eef2] rounded-md px-4 font-['Nunito'] text-sm sm:text-base shadow-sm"
								placeholder="Day"
								type="number"
								min="1"
								max="31"
							/>
						</div>

						{/* Year */}
						<div>
							<Input
								className="h-10 sm:h-12 bg-[#e8eef2] rounded-md px-4 font-['Nunito'] text-sm sm:text-base shadow-sm"
								placeholder="Year"
								type="number"
								min="1900"
								max="2024"
							/>
						</div>
					</div>

					{/* Sign Up button */}
					<div className="flex justify-center sm:justify-end pt-6 sm:pt-6">
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ delay: 0.4, duration: 0.5 }}
						>
							<Button
								className="w-full sm:w-64 h-10 sm:h-12 bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] 
								hover:opacity-90 rounded-md font-['Nunito'] font-bold text-sm sm:text-base lg:text-lg 
								tracking-wide shadow-lg"
								onClick={() => navigate("/login")}
							>
								Sign Up
							</Button>
						</motion.div>
					</div>
				</form>
			</motion.div>
		</div>
	);
};
