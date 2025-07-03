import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useSignUp } from "../../lib/authentication/authentication-hooks"; // Adjust path as needed
import { SignUpRequest } from "../../lib/authentication/authentication-api"; // Update this path
import { Toast } from "../../components/ui/Toast";
import { CircleAlert } from "lucide-react";

const registrationSchema = z
	.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		email: z.string().email("Please enter a valid email address"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string(),
		phone: z
			.string()
			.regex(/^\d+$/, "Phone number should contain only numbers"),
		countryCode: z.string().min(1, "Country code is required"),
		gender: z.string().min(1, "Please select your gender"),
		month: z.string().min(1, "Month is required"),
		day: z
			.string()
			.min(1, "Day is required")
			.refine((val) => {
				const day = parseInt(val);
				return day >= 1 && day <= 31;
			}, "Day must be between 1 and 31"),
		year: z
			.string()
			.min(1, "Year is required")
			.refine((val) => {
				const year = parseInt(val);
				const currentYear = new Date().getFullYear();
				return year >= 1900 && year <= currentYear;
			}, `Year must be between 1900 and ${new Date().getFullYear()}`),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type RegistrationFormData = z.infer<typeof registrationSchema>;

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
	const signUpMutation = useSignUp();
	// Toast notification state
	const [toast, setToast] = useState<{
		visible: boolean;
		message: string;
		type: "success" | "error" | "info";
	}>({
		visible: false,
		message: "",
		type: "success",
	});

	// Function to show toast
	const showToast = (
		message: string,
		type: "success" | "error" | "info" = "success"
	) => {
		setToast({ visible: true, message, type });
		setTimeout(() => setToast({ ...toast, visible: false }), 4000);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		trigger,
	} = useForm<RegistrationFormData>({
		resolver: zodResolver(registrationSchema),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			phone: "",
			countryCode: "+20",
			gender: "",
			month: "",
			day: "",
			year: "",
		},
	});

	const onSubmit = async (data: RegistrationFormData) => {
		const monthIndex = months.indexOf(data.month) + 1;
		const formattedMonth = monthIndex.toString().padStart(2, "0");
		const formattedDay = data.day.padStart(2, "0");
		const dob = `${data.year}-${formattedMonth}-${formattedDay}`;

		const signUpRequest: SignUpRequest = {
			email: data.email,
			password: data.password,
			provider: "EMAIL",
			profile: {
				firstName: data.firstName,
				lastName: data.lastName,
				phone: `${data.countryCode}${data.phone}`,
				gender: data.gender,
				dob: dob,
			},
		};

		try {
			await signUpMutation.mutateAsync(signUpRequest);
		} catch (error: any) {
			const errorMessage =
				error?.response?.data?.message ||
				error.message ||
				"Unknown error occurred";
			showToast(`${errorMessage}`, "error");
			console.error("Registration failed:", error);
		}
	};
	return (
		<div className="flex-1 p-6 sm:p-8 lg:p-8 2xl:p-8 2xl:pt-0">
			{/* Toast notification */}
			{toast.visible && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast({ ...toast, visible: false })}
				/>
			)}
			{/* User Details title */}
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4, duration: 0.5 }}
				className="max-w-4xl mx-auto mb-5 3xl:max-w-7xl"
			>
				<h2 className="font-['Nunito'] font-bold text-[#e8eef2] text-sm sm:text-base lg:text-lg 3xl:text-2xl tracking-wide">
					User Details
				</h2>
				<p className="text-sm 3xl:text-lg text-[#c7d3dd] font-['Nunito'] opacity-80 mt-0.5">
					Please fill in your basic information to continue
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.6 }}
				className="max-w-4xl mx-auto 3xl:max-w-7xl"
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-6 sm:space-y-8"
				>
					{/* Name fields - responsive grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 3xl:gap-8">
						<div>
							<Input
								{...register("firstName")}
								className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm"
								placeholder="First Name"
								type="text"
							/>
							{errors.firstName && (
								<motion.p
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									className="text-red-500 text-xs mt-1 flex items-center gap-1"
								>
									<CircleAlert className="w-4 h-4 shrink-0" />
									{errors.firstName.message}
								</motion.p>
							)}
						</div>
						<div>
							<Input
								{...register("lastName")}
								className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm"
								placeholder="Last Name"
								type="text"
							/>
							{errors.lastName && (
								<motion.p
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									className="text-red-500 text-xs mt-1 flex items-center gap-1"
								>
									<CircleAlert className="w-4 h-4 shrink-0" />
									{errors.lastName.message}
								</motion.p>
							)}
						</div>
					</div>

					{/* Email field - full width */}
					<div>
						<Input
							{...register("email")}
							className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm w-full"
							placeholder="Email"
							type="email"
						/>
						{errors.email && (
							<motion.p
								initial={{ opacity: 0, y: -2 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -2 }}
								className="text-red-500 text-xs mt-1 flex items-center gap-1"
							>
								<CircleAlert className="w-4 h-4 shrink-0" />
								{errors.email.message}
							</motion.p>
						)}
					</div>

					{/* Password fields - responsive grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 3xl:gap-8">
						<div>
							<Input
								{...register("password", {
									onChange: () => trigger("confirmPassword"), // Trigger confirmPassword validation when password changes
								})}
								type="password"
								className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm"
								placeholder="Password"
							/>
							{errors.password && (
								<motion.p
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									className="text-red-500 text-xs mt-1 flex items-center gap-1"
								>
									<CircleAlert className="w-4 h-4 shrink-0" />
									{errors.password.message}
								</motion.p>
							)}
						</div>
						<div>
							<Input
								{...register("confirmPassword")}
								type="password"
								className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm"
								placeholder="Confirm Password"
							/>
							{errors.confirmPassword && (
								<motion.p
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									className="text-red-500 text-xs mt-1 flex items-center gap-1"
								>
									<CircleAlert className="w-4 h-4 shrink-0" />
									{errors.confirmPassword.message}
								</motion.p>
							)}
						</div>
					</div>

					{/* Phone and Gender - responsive layout */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 3xl:gap-8">
						<div className="flex flex-col">
							{/* Phone Number with country code */}
							<div className="flex gap-2 sm:gap-3 3xl:gap-4">
								<Controller
									name="countryCode"
									control={control}
									render={({ field }) => (
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger className="w-20 sm:w-24 3xl:w-32 h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md font-['Nunito'] text-xs sm:text-sm 3xl:text-lg">
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
									)}
								/>
								<Input
									{...register("phone")}
									className="flex-1 h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm"
									placeholder="Phone Number"
									type="tel"
								/>
							</div>
							{errors.phone && (
								<motion.p
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									className="text-red-500 text-xs mt-1 flex items-center gap-1"
								>
									<CircleAlert className="w-4 h-4 shrink-0" />
									{errors.phone.message}
								</motion.p>
							)}
						</div>

						{/* Gender field */}
						<div>
							<Controller
								name="gender"
								control={control}
								render={({ field }) => (
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm">
											<SelectValue placeholder="Gender" />
										</SelectTrigger>
										<SelectContent>
											{genders.map((gender) => (
												<SelectItem key={gender} value={gender}>
													{gender}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>

							{errors.gender && (
								<motion.p
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									className="text-red-500 text-xs mt-1 flex items-center gap-1"
								>
									<CircleAlert className="w-4 h-4 shrink-0" />
									{errors.gender.message}
								</motion.p>
							)}
						</div>
					</div>

					{/* Date of Birth fields - responsive layout */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 3xl:gap-8">
						{/* Month */}
						<div>
							<Controller
								name="month"
								control={control}
								render={({ field }) => (
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm">
											<SelectValue placeholder="Month" />
										</SelectTrigger>
										<SelectContent>
											{months.map((month, index) => (
												<SelectItem key={index} value={month}>
													{month}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>
						</div>

						{/* Day */}
						<div>
							<Input
								{...register("day")}
								className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm"
								placeholder="Day"
								type="number"
							/>
							{errors.day && (
								<motion.p
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									className="text-red-500 text-xs mt-1 flex items-center gap-1"
								>
									<CircleAlert className="w-4 h-4 shrink-0" />
									{errors.day.message}
								</motion.p>
							)}
						</div>

						{/* Year */}
						<div>
							<Input
								{...register("year")}
								className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm"
								placeholder="Year"
								type="number"
							/>
							{errors.year && (
								<motion.p
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									className="text-red-500 text-xs mt-1 flex items-center gap-1"
								>
									<CircleAlert className="w-4 h-4 shrink-0" />
									{errors.year.message}
								</motion.p>
							)}
						</div>
					</div>

					{/* Sign Up button */}
					<div className="flex justify-center sm:justify-end pt-6 sm:pt-6 3xl:pt-7">
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ delay: 0.4, duration: 0.5 }}
						>
							<Button
								type="submit"
								disabled={signUpMutation.isPending}
								className="w-full sm:w-64 3xl:w-72 h-10 sm:h-12 3xl:h-14 bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] 
								hover:opacity-90 disabled:opacity-50 rounded-md font-['Nunito'] font-bold text-sm sm:text-base lg:text-lg 3xl:text-xl 
								tracking-wide shadow-lg"
							>
								{signUpMutation.isPending ? "Signing Up..." : "Sign Up"}
							</Button>
						</motion.div>
					</div>

					{/* Display any general error from the API */}
					{signUpMutation.error && (
						<div className="text-red-500 text-sm text-center mt-4">
							{signUpMutation.error?.response?.data?.message ||
								"Registration failed. Please try again."}
						</div>
					)}
				</form>
			</motion.div>
		</div>
	);
};
