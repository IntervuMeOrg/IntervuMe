import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { motion } from "framer-motion";
import { useState, FormEvent, useEffect, useRef } from "react";
import {
	useSignIn,
	useGoogleSignIn,
} from "../../lib/authentication/authentication-hooks";

const GOOGLE_CLIENT_ID =
	"196919409734-on1gg6kuvodl7iociab8j2cdn4comobt.apps.googleusercontent.com";

declare global {
	interface Window {
		google?: {
			accounts: {
				id: {
					initialize: (config: {
						client_id: string;
						callback: (response: { credential: string }) => void;
						auto_select?: boolean;
						cancel_on_tap_outside?: boolean;
					}) => void;
					renderButton: (
						element: HTMLElement,
						config: {
							type?: "standard" | "icon";
							theme?: "outline" | "filled_blue" | "filled_black";
							size?: "large" | "medium" | "small";
							text?: "signin_with" | "signup_with" | "continue_with";
							shape?: "rectangular" | "pill" | "circle" | "square";
							logo_alignment?: "left" | "center";
							width?: string | number;
						}
					) => void;
					prompt: (
						notificationCallback?: (notification: {
							isNotDisplayed: () => boolean;
							isSkippedMoment: () => boolean;
						}) => void
					) => void;
				};
			};
		};
	}
}

export const LoginPage = (): JSX.Element => {
	const navigate = useNavigate();
	const { mutate: signInMutation, isPending, error } = useSignIn();
	const [errorMessage, setErrorMessage] = useState("");
	const [showError, setShowError] = useState(false);
	const {
		mutate: googleSignIn,
		isPending: isGooglePending,
		error: googleError,
	} = useGoogleSignIn();
	const googleInitialized = useRef(false);
	const hiddenButtonRef = useRef<HTMLDivElement>(null);

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});

	const handleGoogleCallback = (response: { credential: string }) => {
		if (response.credential) {
			googleSignIn({ idToken: response.credential });
		} else {
			console.error("No credential received from Google");
			setErrorMessage("Failed to authenticate with Google");
			setShowError(true);
			setTimeout(() => setShowError(false), 3000);
		}
	};

	// Initialize Google Sign-In
	useEffect(() => {
		const initializeGoogleAuth = () => {
			if (!window.google || googleInitialized.current) return;

			try {
				window.google.accounts.id.initialize({
					client_id: GOOGLE_CLIENT_ID,
					callback: handleGoogleCallback,
					auto_select: false,
					cancel_on_tap_outside: true,
				});

				// Create a hidden Google button that we'll trigger programmatically
				if (hiddenButtonRef.current) {
					window.google.accounts.id.renderButton(hiddenButtonRef.current, {
						type: "standard",
						theme: "outline",
						size: "large",
						text: "continue_with",
						width: "100%",
					});
				}

				googleInitialized.current = true;
				console.log("Google auth initialized");
			} catch (error) {
				console.error("Google initialization error:", error);
				setErrorMessage("Failed to initialize Google authentication");
				setShowError(true);
			}
		};

		const loadGoogleScript = () => {
			if (
				document.querySelector(
					'script[src="https://accounts.google.com/gsi/client"]'
				)
			) {
				if (window.google) {
					initializeGoogleAuth();
				} else {
					const checkGoogleLoaded = setInterval(() => {
						if (window.google) {
							initializeGoogleAuth();
							clearInterval(checkGoogleLoaded);
						}
					}, 100);
					setTimeout(() => clearInterval(checkGoogleLoaded), 10000);
				}
				return;
			}

			const script = document.createElement("script");
			script.src = "https://accounts.google.com/gsi/client";
			script.async = true;
			script.defer = true;
			script.onload = () => {
				console.log("Google script loaded");
				initializeGoogleAuth();
			};
			script.onerror = () => {
				console.error("Failed to load Google script");
				setErrorMessage("Failed to load Google authentication");
				setShowError(true);
			};
			document.head.appendChild(script);
		};

		loadGoogleScript();

		return () => {
			// Cleanup if needed
		};
	}, []);

	const handleCustomGoogleLogin = () => {
		// Trigger the hidden Google button
		if (hiddenButtonRef.current) {
			const googleButton = hiddenButtonRef.current.querySelector(
				'div[role="button"]'
			) as HTMLElement;
			if (googleButton) {
				googleButton.click();
			} else {
				console.error("Google button not found");
				setErrorMessage("Google Sign-In not ready. Please refresh the page.");
				setShowError(true);
				setTimeout(() => setShowError(false), 3000);
			}
		}
	};

	// Error handling
	useEffect(() => {
		const currentError = error || googleError;
		if (currentError) {
			const msg =
				currentError?.response?.data?.message || currentError?.message;
			setErrorMessage(msg);
			setShowError(true);
			const timeout = setTimeout(() => setShowError(false), 3000);
			return () => clearTimeout(timeout);
		}
	}, [error, googleError]);

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		if (!formData.email || !formData.password) return;
		signInMutation({
			email: formData.email,
			password: formData.password,
		});
	};

	const isLoading = isPending || isGooglePending;

	const handleSignUpClick = () => {
		navigate("/register", { state: { fromLogin: true } });
	};

	const handleForgetPassword = () => {
		navigate("/forget-password");
	};

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<div className="min-h-screen bg-white flex">
			{/* Left panel with login form */}
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="w-full lg:w-[32%] bg-[#1d1d20] relative flex flex-col min-h-screen overflow-hidden"
			>
				{/* Gradient overlay */}
				<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18] rounded-[3px]" />

				{/* Hidden Google button - this is what actually handles the authentication */}
				<div
					ref={hiddenButtonRef}
					className="absolute -top-[1000px] -left-[1000px] opacity-0 pointer-events-none"
				/>

				{/* Scrollable content container */}
				<div className="relative z-10 flex flex-col h-full">
					<div className="flex-1 p-6 sm:p-8 lg:p-10 xl:p-8 3xl:p-12">
						{/* Logo */}
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.2, duration: 0.5 }}
							onClick={() => navigate("/")}
							className="mb-6 sm:mb-8 3xl:mb-10"
						>
							<h1 className="font-['Nunito'] font-extrabold text-white text-lg sm:text-xl lg:text-2xl 3xl:text-[2.1rem] tracking-wider cursor-pointer drop-shadow-lg">
								INTERVU ME
							</h1>
						</motion.div>

						{/* Login form container */}
						<div className="flex flex-col justify-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-15rem)]">
							<div className="w-full max-w-sm 3xl:max-w-lg mx-auto lg:mx-2 3xl:mx-3">
								{/* Login header */}
								<div className="mb-6 sm:mb-8">
									<h2 className="font-['Nunito'] font-bold text-[#e8eef2] text-md sm:text-lg lg:text-xl 3xl:text-2xl tracking-wide">
										Login
									</h2>
									<p className="font-['Nunito'] font-medium text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg">
										Login to access interviewing tech
									</p>
								</div>

								{/* Error message */}
								{showError && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md"
									>
										<p className="text-red-400 text-sm font-['Nunito']">
											{errorMessage}
										</p>
									</motion.div>
								)}

								{/* Form fields */}
								<form
									onSubmit={handleLogin}
									className="space-y-4 sm:space-y-5 3xl:space-y-8"
								>
									{/* Email input */}
									<div>
										<Input
											className="h-8 sm:h-10 lg:h-10 3xl:h-14 bg-[#e8eef2] rounded-md px-3 sm:px-4 3xl:px-6 text-black font-['Nunito'] shadow-md w-full text-sm sm:text-base 3xl:text-lg"
											placeholder="Email"
											type="email"
											value={formData.email}
											onChange={(e) =>
												handleInputChange("email", e.target.value)
											}
											required
											disabled={isPending}
										/>
									</div>

									{/* Password input */}
									<div>
										<Input
											className="h-8 sm:h-10 lg:h-10 3xl:h-14 bg-[#e8eef2] rounded-md px-3 sm:px-4 3xl:px-6 text-black font-['Nunito'] shadow-md w-full text-sm sm:text-base 3xl:text-lg"
											placeholder="Password"
											type="password"
											value={formData.password}
											onChange={(e) =>
												handleInputChange("password", e.target.value)
											}
											required
											disabled={isPending}
										/>
									</div>

									{/* Remember me and forgot password */}
									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
										<div className="flex items-center gap-2">
											<Checkbox
												id="remember-me"
												className="bg-[#e8eef2] rounded h-4 w-4 3xl:h-5 3xl:w-5"
												checked={formData.rememberMe}
												onCheckedChange={(checked) =>
													handleInputChange("rememberMe", checked as boolean)
												}
												disabled={isPending}
											/>
											<label
												htmlFor="remember-me"
												className="font-['Nunito'] font-normal text-white text-xs sm:text-sm 3xl:text-lg opacity-90"
											>
												Remember Me
											</label>
										</div>

										<Button
											type="button"
											variant="link"
											onClick={handleForgetPassword}
											className="font-['Nunito'] font-medium text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg p-0 h-auto hover:text-white"
											disabled={isPending}
										>
											Forgot password?
										</Button>
									</div>

									{/* Login button */}
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.3, duration: 0.5 }}
									>
										<Button
											type="submit"
											className="w-full h-8 sm:h-10 lg:h-10 3xl:h-14 bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] 
                         hover:opacity-90 rounded-md font-['Nunito'] text-sm sm:text-base 3xl:text-[1.3rem] tracking-wide mt-5 disabled:opacity-50"
											disabled={
												isLoading || !formData.email || !formData.password
											}
										>
											{isPending ? "Logging in..." : "Login"}
										</Button>
									</motion.div>

									{/* Custom Google login button */}
									<div className="space-y-4 mt-6">
										<Button
											type="button"
											variant="outline"
											onClick={handleCustomGoogleLogin}
											className="w-full h-8 sm:h-10 lg:h-10 3xl:h-14 bg-[#e8eef2] hover:bg-[#d8dee2] rounded-md flex items-center justify-center gap-2 sm:gap-3 3xl:gap-5 text-black overflow-hidden disabled:opacity-50"
											disabled={isPending || isGooglePending}
										>
											<img
												className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 3xl:w-10 3xl:h-10 object-cover"
												alt="Google"
												src="/google-1.png"
											/>
											<span className="font-['Nunito'] font-normal text-sm sm:text-base 3xl:text-[1.3rem]">
												{isGooglePending
													? "Signing in..."
													: "Continue With Google"}
											</span>
										</Button>
									</div>

									{/* Sign up link */}
									<div className="text-center pt-2 sm:pt-4 mt-6 sm:mt-8 3xl:mt-10">
										<div className="inline-flex items-center gap-x-1 sm:gap-x-2 3xl:gap-x-4">
											<span className="font-['Nunito'] font-medium text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg">
												Don't have an account?
											</span>
											<Button
												type="button"
												variant="link"
												onClick={handleSignUpClick}
												className="font-['Nunito'] font-bold text-white text-xs sm:text-xs 3xl:text-sm underline p-0 h-auto hover:opacity-80 tracking-[1px] disabled:opacity-50"
												disabled={isLoading}
											>
												Sign Up for free
											</Button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Right panel with illustration */}
			<div
				className="hidden lg:flex lg:w-[68%] relative bg-cover bg-center overflow-hidden"
				style={{ backgroundImage: "url(/rectangle.png)" }}
			>
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
					className="flex items-center justify-center w-full p-12"
				>
					<img
						className="max-w-full max-h-[80vh] object-contain"
						alt="Login illustration"
						src="/login-bro-1.png"
					/>
				</motion.div>
			</div>
		</div>
	);
};

export default LoginPage;
