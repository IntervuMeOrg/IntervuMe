import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
	authenticationApi,
	SignInRequest,
	GoogleSignInRequestBody,
	SignUpRequest,
	ForgotPasswordRequest,
	ResetPasswordRequest,
	AuthResponse,
} from "./authentication-api";

// Extended SignInRequest to include rememberMe
interface ExtendedSignInRequest extends SignInRequest {
	rememberMe?: boolean;
}

interface ExtendedGoogleSignInRequestBody extends GoogleSignInRequestBody {
	rememberMe?: boolean;
}

// Authentication session helper
export const authenticationSession = {
	getToken: () => {
		// Check localStorage first (persistent), then sessionStorage
		return (
			localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
		);
	},

	getUser: (): AuthResponse | null => {
		// Check localStorage first (persistent), then sessionStorage
		const userData =
			localStorage.getItem("user") || sessionStorage.getItem("user");
		return userData ? JSON.parse(userData) : null;
	},

	setSession: (user: AuthResponse, rememberMe: boolean = false) => {
		if (rememberMe) {
			// Store in localStorage for persistent login
			localStorage.setItem("authToken", user.token);
			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("rememberMe", "true");

			// Clear sessionStorage to avoid conflicts
			sessionStorage.removeItem("authToken");
			sessionStorage.removeItem("user");
		} else {
			// Store in sessionStorage for session-only login
			sessionStorage.setItem("authToken", user.token);
			sessionStorage.setItem("user", JSON.stringify(user));

			// Clear localStorage to avoid conflicts and ensure fresh session
			localStorage.removeItem("authToken");
			localStorage.removeItem("user");
			localStorage.removeItem("rememberMe");
		}
	},

	clearSession: () => {
		// Clear both localStorage and sessionStorage
		localStorage.removeItem("authToken");
		localStorage.removeItem("user");
		localStorage.removeItem("rememberMe");

		sessionStorage.removeItem("authToken");
		sessionStorage.removeItem("user");
	},

	isAuthenticated: () => {
		const token =
			localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
		const user = localStorage.getItem("user") || sessionStorage.getItem("user");
		return !!token && !!user;
	},

	// New method to check if user has persistent login
	isPersistentLogin: () => {
		return localStorage.getItem("rememberMe") === "true";
	},

	// New method to get storage type being used
	getStorageType: () => {
		if (localStorage.getItem("authToken")) return "localStorage";
		if (sessionStorage.getItem("authToken")) return "sessionStorage";
		return null;
	},
};

// Sign in hook - updated to handle rememberMe
export const useSignIn = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (request: ExtendedSignInRequest) => {
			// Extract rememberMe from request before sending to API
			const { rememberMe, ...signInData } = request;
			const response = await authenticationApi.signIn(signInData);
			return { ...response.data, rememberMe };
		},
		onSuccess: (data: AuthResponse & { rememberMe?: boolean }) => {
			const { rememberMe = false, ...userData } = data;
			authenticationSession.setSession(userData, rememberMe);
			queryClient.invalidateQueries({ queryKey: ["current-user"] });
			navigate("/app");
		},
		onError: (error: any) => {
			console.error(
				"Sign in failed:",
				error.response?.data?.message || error.message
			);
		},
	});
};

// Google Sign In hook - for now treating as rememberMe = true, but you can modify
export const useGoogleSignIn = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (request: ExtendedGoogleSignInRequestBody) => {
			const { rememberMe, ...signInData } = request;
			const response = await authenticationApi.googleSignIn(signInData);
			return { ...response.data, rememberMe };
		},
		onSuccess: (data: AuthResponse & { rememberMe?: boolean }) => {
			const { rememberMe = true, ...userData } = data; // Default to true for Google sign-in
			authenticationSession.setSession(userData, rememberMe);
			queryClient.invalidateQueries({ queryKey: ["current-user"] });
			navigate("/app");
		},
		onError: (error: any) => {
			console.error(
				"Google sign in failed:",
				error.response?.data?.message || error.message
			);
		},
	});
};

// Sign up hook
export const useSignUp = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (request: SignUpRequest & { rememberMe?: boolean }) => {
			const { rememberMe, ...signUpData } = request;
			const response = await authenticationApi.signUp(signUpData);
			return { ...response.data, rememberMe };
		},
		onSuccess: (data: AuthResponse & { rememberMe?: boolean }) => {
			const { rememberMe = true, ...userData } = data; // Default to true for sign-up
			authenticationSession.setSession(userData, rememberMe);
			queryClient.invalidateQueries({ queryKey: ["current-user"] });
			navigate("/app");
		},
		onError: (error: any) => {
			console.error(
				"Sign up failed:",
				error.response?.data?.message || error.message
			);
		},
	});
};

// Forgot password hook
export const useForgotPassword = () => {
	return useMutation({
		mutationFn: async (request: ForgotPasswordRequest) => {
			const response = await authenticationApi.forgotPassword(request);
			return response.data;
		},
		onError: (error: any) => {
			console.error(
				"Forgot password failed:",
				error.response?.data?.message || error.message
			);
		},
	});
};

export const useVerifyOTP = () => {
	return useMutation({
		mutationFn: async (request: { email: string; otp: string }) => {
			const response = await authenticationApi.verifyOTP(request);
			return response.data;
		},
		onError: (error: any) => {
			console.error(
				"OTP verification failed:",
				error.response?.data?.message || error.message
			);
		},
	});
};

// Reset password hook
export const useResetPassword = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async (request: ResetPasswordRequest) => {
			const response = await authenticationApi.resetPassword(request);
			return response.data;
		},
		onError: (error: any) => {
			console.error(
				"Reset password failed:",
				error.response?.data?.message || error.message
			);
		},
	});
};

// Current user hook
export const useCurrentUser = () => {
	return useQuery({
		queryKey: ["current-user"],
		queryFn: () => {
			return authenticationSession.getUser();
		},
		enabled: authenticationSession.isAuthenticated(),
		staleTime: 1000 * 60 * 5, // 5 minutes
		initialData: () => authenticationSession.getUser(),
	});
};

// Authentication status hook
export const useAuthentication = () => {
	const user = authenticationSession.getUser();
	const isAuthenticated = authenticationSession.isAuthenticated();
	const isPersistent = authenticationSession.isPersistentLogin();
	const storageType = authenticationSession.getStorageType();
	const navigate = useNavigate();

	const logout = () => {
		authenticationSession.clearSession();
		navigate("/login");
	};

	const requireAuth = () => {
		if (!isAuthenticated) {
			navigate("/login");
			return false;
		}
		return true;
	};

	return {
		user,
		isAuthenticated,
		isPersistent,
		storageType,
		logout,
		requireAuth,
	};
};

// Role-based access hook
export const useAuthorization = () => {
	const { user } = useAuthentication();

	const hasRole = (role: string) => {
		return user?.role === role;
	};

	const checkAccess = (requiredRole?: string) => {
		if (!requiredRole) return true;
		return hasRole(requiredRole);
	};

	return {
		hasRole,
		checkAccess,
		userRole: user?.role,
	};
};

export const useSessionManagement = () => {
	const { isPersistent, storageType } = useAuthentication();

	const extendSession = (rememberMe: boolean) => {
		const user = authenticationSession.getUser();
		if (user) {
			authenticationSession.setSession(user, rememberMe);
		}
	};

	const getSessionInfo = () => {
		return {
			isPersistent,
			storageType,
			hasRememberMe: localStorage.getItem("rememberMe") === "true",
		};
	};

	return {
		extendSession,
		getSessionInfo,
	};
};
