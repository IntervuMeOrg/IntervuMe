import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Check, X } from "lucide-react";

type CreateNewPasswordFormPanelProps = {
	handleSetPassword: (password: string, confirmPassword: string) => void;
	handleBackToLogin?: () => void;
	navigate: ReturnType<typeof useNavigate>;
	isLoading?: boolean;
	errorMessage?: string;
	showError?: boolean;
	successMessage?: string;
};

interface PasswordFormData {
	password: string;
	confirmPassword: string;
}

const passwordRequirements = [
	{ id: 1, text: "At least 8 characters", regex: /.{8,}/ },
	{ id: 2, text: "An uppercase letter", regex: /[A-Z]/ },
	{ id: 3, text: "A lowercase letter", regex: /[a-z]/ },
	{ id: 4, text: "A number", regex: /[0-9]/ },
	{ id: 5, text: "A special character", regex: /[^A-Za-z0-9]/ },
];

const PasswordRequirements = ({ value }: { value: string }) => {
	return (
		<div className="mt-3 3xl:mt-6 space-y-1 3xl:space-y-3">
			<p className="font-['Nunito'] font-normal text-[#c7d3dd] text-xs 3xl:text-[1.1rem]">
				Password must:
			</p>
			<ul className="space-y-1 3xl:space-y-2 ml-2">
				{passwordRequirements.map((req) => {
					const isValid = req.regex.test(value);
					return (
						<li key={req.id} className="flex items-center gap-2">
							{isValid ? (
								<Check className="w-3 h-3 3xl:w-4 3xl:h-4 text-green-500" />
							) : (
								<X className="w-3 h-3 3xl:w-4 3xl:h-4 text-red-500" />
							)}
							<span className={`font-['Nunito'] font-normal text-xs 3xl:text-[1.1rem] ${
								isValid ? 'text-green-500' : 'text-[#c7d3dd]'
							}`}>
								{req.text}
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export const CreateNewPasswordFormPanel = ({
	handleSetPassword,
	handleBackToLogin,
	navigate,
	isLoading = false,
	errorMessage = "",
	showError = false,
	successMessage = "",
}: CreateNewPasswordFormPanelProps) => {
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);
	
	const {
		register,
		handleSubmit,
		watch,
		trigger,
		formState: { errors },
	} = useForm<PasswordFormData>();

	const passwordValue = watch("password") || "";

	const validatePassword = (value: string) => {
		const requirements = passwordRequirements.map(req => req.regex.test(value));
		if (!requirements.every(Boolean)) {
			return "Password must meet all requirements";
		}
		return true;
	};

	const onSubmit = (data: PasswordFormData) => {
		handleSetPassword(data.password, data.confirmPassword);
	};

	return (
		<>
			{/* Left panel with form */}
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="w-full lg:w-[32%] bg-[#1d1d20] relative flex flex-col min-h-screen overflow-hidden"
			>
				{/* Gradient overlay */}
				<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18] rounded-[3px]" />

				{/* Scrollable content container */}
				<div className="relative z-10 flex flex-col h-full">
					<div className="flex-1 p-6 sm:p-8 lg:p-10 xl:p-8 3xl:p-12">
						{/* Logo */}
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.2, duration: 0.5 }}
							onClick={() => {
								sessionStorage.removeItem("resetFlowStep");
								navigate("/")
							}}
							className="mb-6 sm:mb-8"
						>
							<h1 className="font-['Nunito'] font-extrabold text-white text-lg sm:text-xl lg:text-2xl 3xl:text-[2.1rem] tracking-wider cursor-pointer drop-shadow-lg">
								INTERVU ME
							</h1>
						</motion.div>

						{/* Back button */}
						<motion.div
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2 }}
							className="mb-4"
						>
							<Button
								variant="link"
								onClick={handleBackToLogin}
								className="font-['Nunito'] font-bold text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg p-0 h-auto flex items-center gap-1 hover:text-white"
							>
								<img
									src="/back.png"
									alt="Back"
									className="w-3 h-3 sm:w-4 sm:h-4 3xl:w-5 3xl:h-5"
								/>
								Back to Login
							</Button>
						</motion.div>

						{/* Form container */}
						<div className="flex flex-col justify-center min-h-[calc(100vh-12rem)] sm:min-h-[calc(100vh-15rem)]">
							<div className="w-full max-w-sm 3xl:max-w-lg mx-auto lg:mx-2 3xl:mx-3">
								{/* Header */}
								<div className="mb-6 sm:mb-8 3xl:mb-10">
									<h2 className="font-['Nunito'] font-bold text-[#e8eef2] text-md sm:text-lg lg:text-xl 3xl:text-[1.8rem] tracking-wide 3xl:mb-1">
										Create New Password
									</h2>
									<p className="font-['Nunito'] font-medium text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg">
										Your new password must be different from previous used
										passwords
									</p>
								</div>

								{/* Error Message */}
								{showError && errorMessage && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md"
									>
										<p className="font-['Nunito'] text-red-400 text-sm">
											{errorMessage}
										</p>
									</motion.div>
								)}

								{/* Success Message */}
								{successMessage && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-md"
									>
										<p className="font-['Nunito'] text-green-400 text-sm">
											{successMessage}
										</p>
									</motion.div>
								)}

								{/* Form fields */}
								<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 3xl:space-y-6">
									{/* Password input */}
									<div>
										<Input
											{...register("password", {
												required: "Password is required",
												validate: validatePassword,
												onChange: () => trigger("confirmPassword"), // Trigger confirmPassword validation when password changes
											})}
											className="h-8 sm:h-10 lg:h-10 3xl:h-14 bg-[#e8eef2] rounded-md px-3 sm:px-4 3xl:px-6 text-black font-['Nunito'] shadow-md w-full text-sm sm:text-base 3xl:text-lg placeholder:text-black/60"
											placeholder="Create Password"
											type="password"
											onFocus={() => setIsPasswordFocused(true)}
											onBlur={() => setIsPasswordFocused(false)}
										/>
										{errors.password && !isPasswordFocused && (
											<motion.div
												initial={{ opacity: 0, y: -5 }}
												animate={{ opacity: 1, y: 0 }}
												className="mt-2 p-2 bg-red-500/20 border border-red-500/50 rounded-md"
											>
												<p className="font-['Nunito'] text-red-400 text-xs">
													{errors.password.message}
												</p>
											</motion.div>
										)}
										{(isPasswordFocused || passwordValue) && (
											<PasswordRequirements value={passwordValue} />
										)}
									</div>

									{/* Confirm password input */}
									<div>
										<Input
											{...register("confirmPassword", {
												required: "Please confirm your password",
												validate: (value) =>
													value === passwordValue || "Passwords don't match",
											})}
											className="h-8 sm:h-10 lg:h-10 3xl:h-14 bg-[#e8eef2] rounded-md px-3 sm:px-4 3xl:px-6 text-black font-['Nunito'] shadow-md w-full text-sm sm:text-base 3xl:text-lg placeholder:text-black/60"
											placeholder="Re-enter Password"
											type="password"
										/>
										{errors.confirmPassword && (
											<motion.div
												initial={{ opacity: 0, y: -5 }}
												animate={{ opacity: 1, y: 0 }}
												className="mt-2 p-2 bg-red-500/20 border border-red-500/50 rounded-md"
											>
												<p className="font-['Nunito'] text-red-400 text-xs">
													{errors.confirmPassword.message}
												</p>
											</motion.div>
										)}
									</div>

									{/* Set password button */}
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.3, duration: 0.5 }}
									>
										<Button
											type="submit"
											disabled={isLoading}
											className="w-full h-8 sm:h-10 lg:h-10 3xl:h-14 bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] 
                               hover:opacity-90 disabled:opacity-50 rounded-md font-['Nunito'] text-sm sm:text-base 3xl:text-[1.3rem] tracking-wide mt-5"
										>
											{isLoading ? "Setting Password..." : "Set Password"}
										</Button>
									</motion.div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
};