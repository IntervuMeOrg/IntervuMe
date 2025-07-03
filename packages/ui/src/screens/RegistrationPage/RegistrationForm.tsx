import { useState } from "react";
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
		setTimeout(() => setToast({ ...toast, visible: false }), 3000);
	};

	// Form state
	const [formData, setFormData] = useState({
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
	});

	// Form errors
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Real-time validation function
	const validateField = (field: string, value: string): string => {
		switch (field) {
			case "firstName":
				return !value.trim() ? "First name is required" : "";

			case "lastName":
				return !value.trim() ? "Last name is required" : "";

			case "email":
				if (!value.trim()) return "Email is required";
				if (!/\S+@\S+\.\S+/.test(value))
					return "Please enter a valid email address";
				return "";

			case "password":
				if (!value) return "Password is required";
				if (value.length < 6) return "Password must be at least 6 characters";
				return "";

			case "confirmPassword":
				if (!value) return "Please confirm your password";
				if (formData.password && value !== formData.password)
					return "Passwords do not match";
				return "";

			case "phone":
				if (!value.trim()) return "Phone number is required";
				if (!/^\d+$/.test(value))
					return "Phone number should contain only numbers";
				return "";

			case "gender":
				return !value ? "Please select your gender" : "";

			case "day":
				const day = parseInt(value);
				if (!value) return "Day is required";
				if (day < 1 || day > 31) return "Day must be between 1 and 31";
				return "";

			case "year":
				const year = parseInt(value);
				const currentYear = new Date().getFullYear();
				if (!value) return "Year is required";
				if (year < 1900 || year > currentYear)
					return `Year must be between 1900 and ${currentYear}`;
				return "";

			case "month":
				return !value ? "Month is required" : "";

			default:
				return "";
		}
	};

	// Handle input changes with real-time validation
	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));

		// Real-time validation
		const error = validateField(field, value);
		setErrors((prev) => ({
			...prev,
			[field]: error,
		}));

		// Special case: re-validate confirm password when password changes
		if (field === "password" && formData.confirmPassword) {
			const confirmPasswordError = validateField(
				"confirmPassword",
				formData.confirmPassword
			);
			setErrors((prev) => ({
				...prev,
				confirmPassword: confirmPasswordError,
			}));
		}
	};

	// Handle blur events for additional validation
	const handleBlur = (field: string, value: string) => {
		const error = validateField(field, value);
		setErrors((prev) => ({
			...prev,
			[field]: error,
		}));
	};

	// Validate form
	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.firstName.trim()) {
			newErrors.firstName = "First name is required";
		}

		if (!formData.lastName.trim()) {
			newErrors.lastName = "Last name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		if (!formData.confirmPassword) {
			newErrors.confirmPassword = "Please confirm your password";
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		if (!formData.phone.trim()) {
			newErrors.phone = "Phone number is required";
		}

		if (!formData.gender) {
			newErrors.gender = "Gender is required";
		}

		// Validate date of birth
		if (!formData.month || !formData.day || !formData.year) {
			newErrors.dob = "Complete date of birth is required";
		} else {
			const day = parseInt(formData.day);
			const year = parseInt(formData.year);
			const currentYear = new Date().getFullYear();

			if (day < 1 || day > 31) {
				newErrors.day = "Invalid day";
			}

			if (year < 1900 || year > currentYear) {
				newErrors.year = "Invalid year";
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			showToast("Registration failed. Please try again.", "error");
			return;
		}

		// Format date of birth
		const monthIndex = months.indexOf(formData.month) + 1;
		const formattedMonth = monthIndex.toString().padStart(2, "0");
		const formattedDay = formData.day.padStart(2, "0");
		const dob = `${formData.year}-${formattedMonth}-${formattedDay}`;

		// Prepare signup request
		const signUpRequest: SignUpRequest = {
			email: formData.email,
			password: formData.password,
			provider: "EMAIL",
			profile: {
				firstName: formData.firstName,
				lastName: formData.lastName,
				phone: `${formData.countryCode}${formData.phone}`,
				gender: formData.gender,
				dob: dob,
			},
		};
		
		try {
			await signUpMutation.mutateAsync(signUpRequest);
			//showToast("Succussfully Registered", "success")
			// Success is handled by the hook's onSuccess callback
		} catch (error) {
			// Error is handled by the hook's onError callback
			showToast("Registration failed, error", "error");
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
				<form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
					{/* Name fields - responsive grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 3xl:gap-8">
						<div>
							<Input
								className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm"
								placeholder="First Name"
								type="text"
								value={formData.firstName}
								onChange={(e) => handleInputChange("firstName", e.target.value)}
								onBlur={(e) => handleBlur("firstName", e.target.value)}
							/>
							{errors.firstName && (
								<motion.p
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									className="text-red-500 text-xs mt-1 flex items-center gap-1"
								>
									<CircleAlert className="w-4 h-4 shrink-0" />
									{errors.firstName}
								</motion.p>
							)}
						</div>
						<div>
							<Input
								className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm"
								placeholder="Last Name"
								type="text"
								value={formData.lastName}
								onChange={(e) => handleInputChange("lastName", e.target.value)}
								onBlur={(e) => handleBlur("lastName", e.target.value)}
							/>
							{errors.lastName && (
								<motion.p
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									className="text-red-500 text-xs mt-1 flex items-center gap-1"
								>
									<CircleAlert className="w-4 h-4 shrink-0" />
									{errors.lastName}
								</motion.p>
							)}
						</div>
					</div>

					{/* Email field - full width */}
					<div>
						<Input
							className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm w-full"
							placeholder="Email"
							type="email"
							value={formData.email}
							onChange={(e) => handleInputChange("email", e.target.value)}
							onBlur={(e) => handleBlur("email", e.target.value)}
						/>
						{errors.email && (
							<motion.p
								initial={{ opacity: 0, y: -2 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -2 }}
								className="text-red-500 text-xs mt-1 flex items-center gap-1"
							>
								<CircleAlert className="w-4 h-4 shrink-0" />
								{errors.email}
							</motion.p>
						)}
					</div>

					{/* Password fields - responsive grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 3xl:gap-8">
						<div>
							<Input
								type="password"
								className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm"
								placeholder="Password"
								value={formData.password}
								onChange={(e) => handleInputChange("password", e.target.value)}
								onBlur={(e) => handleBlur("password", e.target.value)}
							/>
							{errors.password && (
								<motion.p
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									className="text-red-500 text-xs mt-1 flex items-center gap-1"
								>
									<CircleAlert className="w-4 h-4 shrink-0" />
									{errors.password}
								</motion.p>
							)}
						</div>
						<div>
							<Input
								type="password"
								className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm"
								placeholder="Confirm Password"
								value={formData.confirmPassword}
								onChange={(e) =>
									handleInputChange("confirmPassword", e.target.value)
								}
								onBlur={(e) => handleBlur("confirmPassword", e.target.value)}
							/>
							{errors.confirmPassword && (
								<motion.p
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									className="text-red-500 text-xs mt-1 flex items-center gap-1"
								>
									<CircleAlert className="w-4 h-4 shrink-0" />
									{errors.confirmPassword}
								</motion.p>
							)}
						</div>
					</div>

					{/* Phone and Gender - responsive layout */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 3xl:gap-8">
						<div className="flex flex-col">
							{/* Phone Number with country code */}
							<div className="flex gap-2 sm:gap-3 3xl:gap-4">
								<Select
									value={formData.countryCode}
									onValueChange={(value) =>
										handleInputChange("countryCode", value)
									}
								>
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
								<Input
									className="flex-1 h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm"
									placeholder="Phone Number"
									type="tel"
									value={formData.phone}
									onChange={(e) => handleInputChange("phone", e.target.value)}
									onBlur={(e) => handleBlur("phone", e.target.value)}
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
									{errors.phone}
								</motion.p>
							)}
						</div>

						{/* Gender field */}
						<div>
							<Select
								value={formData.gender}
								onValueChange={(value) => handleInputChange("gender", value)}
							>
								<SelectTrigger className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm">
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
							{errors.gender && (
								<motion.p
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									className="text-red-500 text-xs mt-1 flex items-center gap-1"
								>
									<CircleAlert className="w-4 h-4 shrink-0" />
									{errors.gender}
								</motion.p>
							)}
						</div>
					</div>

					{/* Date of Birth fields - responsive layout */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 3xl:gap-8">
						{/* Month */}
						<div>
							<Select
								value={formData.month}
								onValueChange={(value) => handleInputChange("month", value)}
							>
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
							{errors.dob && (
								<motion.p
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									className="text-red-500 text-xs mt-1 flex items-center gap-1"
								>
									<CircleAlert className="w-4 h-4 shrink-0" />
									{errors.dob}
								</motion.p>
							)}
						</div>

						{/* Day */}
						<div>
							<Input
								className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm"
								placeholder="Day"
								type="number"
								min="1"
								max="31"
								value={formData.day}
								onChange={(e) => handleInputChange("day", e.target.value)}
								onBlur={(e) => handleBlur("day", e.target.value)}
							/>
							{errors.day && (
								<motion.p
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									className="text-red-500 text-xs mt-1 flex items-center gap-1"
								>
									<CircleAlert className="w-4 h-4 shrink-0" />
									{errors.day}
								</motion.p>
							)}
						</div>

						{/* Year */}
						<div>
							<Input
								className="h-10 sm:h-12 3xl:h-14 bg-[#e8eef2] rounded-md px-4 3xl:px-6 font-['Nunito'] text-sm sm:text-base 3xl:text-lg shadow-sm"
								placeholder="Year"
								type="number"
								min="1900"
								max="2024"
								value={formData.year}
								onChange={(e) => handleInputChange("year", e.target.value)}
								onBlur={(e) => handleBlur("year", e.target.value)}
							/>
							{errors.year && (
								<motion.p
									initial={{ opacity: 0, y: -2 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -2 }}
									className="text-red-500 text-xs mt-1 flex items-center gap-1"
								>
									<CircleAlert className="w-4 h-4 shrink-0" />
									{errors.year}
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
