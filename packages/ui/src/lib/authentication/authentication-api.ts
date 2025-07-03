import api from '../api';

// Types
export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  provider: 'EMAIL';
  profile: {
    firstName: string;
    lastName: string;
    phone?: string;
    gender?: string;
    dob?: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  password: string;
}

export interface GoogleSignInRequestBody{
  idToken: string
}

export interface AuthResponse {
  id: string;
  email: string;
  role: string;
  provider: string;
  tokenVersion: string;
  createdAt: string;
  updatedAt: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: string;
  dob?: string;
  token: string;
}

// API functions following your preferred style
export const authenticationApi = {
  signIn(request: SignInRequest) {
    return api.post<AuthResponse>('/api/auth/sign-in', request);
  },

  googleSignIn(request: GoogleSignInRequestBody) {
    return api.post<AuthResponse>('/api/auth/google-sign-in',request);
  },

  signUp(request: SignUpRequest) {
    return api.post<AuthResponse>('/api/auth/sign-up', request);
  },

  forgotPassword(request: ForgotPasswordRequest) {
    return api.post<{ message: string }>('/api/auth/forgot-password', request);
  },

  resetPassword(request: ResetPasswordRequest) {
    return api.post<{ message: string }>('/api/auth/reset-password', request);
  },

};

export default api;