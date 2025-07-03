import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import {
	authenticationApi,
	SignInRequest,
	GoogleSignInRequestBody,
	SignUpRequest,
	ForgotPasswordRequest,
	ResetPasswordRequest,
	AuthResponse,
	VerifyOtpRequest,
} from "./authentication-api";

// Authentication session helper
export const authenticationSession = {
	getToken: () => localStorage.getItem("authToken"),
	getUser: (): AuthResponse | null => {
		const userData = localStorage.getItem("user");
		return userData ? JSON.parse(userData) : null;
	},
	setSession: (user: AuthResponse) => {
		localStorage.setItem("authToken", user.token);
		localStorage.setItem("user", JSON.stringify(user));
	},
	clearSession: () => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("user");
	},
	isAuthenticated: () => {
		return (
			!!localStorage.getItem("authToken") && !!localStorage.getItem("user")
		);
	},
};

// Sign in hook
export const useSignIn = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (request: SignInRequest) => {
			const response = await authenticationApi.signIn(request);
			return response.data;
		},
		onSuccess: (data: AuthResponse) => {
			authenticationSession.setSession(data);
			queryClient.invalidateQueries({ queryKey: ["current-user"] }); // ← Force refetch
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

export const useGoogleSignIn = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (request: GoogleSignInRequestBody) => {
			const response = await authenticationApi.googleSignIn(request);
			return response.data;
		},
		onSuccess: (data: AuthResponse) => {
			authenticationSession.setSession(data);
			queryClient.invalidateQueries({ queryKey: ["current-user"] }); // ← Force refetch
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
		mutationFn: async (request: SignUpRequest) => {
			const response = await authenticationApi.signUp(request);
			return response.data;
		},
		onSuccess: (data: AuthResponse) => {
			authenticationSession.setSession(data);
			queryClient.invalidateQueries({ queryKey: ["current-user"] }); // ← Force refetch
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
		mutationFn: async (request: {email: string, otp: string}) =>{
			const response = await authenticationApi.verifyOTP(request);
			return response.data;
		},
		onError: (error: any) => {
			console.error(
				"OTP verification failed:",
				error.response?.data?.message || error.message
			);
		},
	})
}

// Reset password hook
export const useResetPassword = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async (request: ResetPasswordRequest) => {
			const response = await authenticationApi.resetPassword(request);
			return response.data;
		},
		onSuccess: () => {
			// Redirect to login after successful reset
			setTimeout(() => navigate("/login"), 2000);
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
