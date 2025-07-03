import axios from 'axios';

// Base API configuration  process.env.REACT_APP_API_BASE_URL || 
const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

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