import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./screens/LandingPage";
import { LoginPage } from "./screens/LoginPage";
import { RegistrationPage } from "./screens/RegistrationPage";
import { ForgetPasswordPage } from "./screens/ForgetPasswordPage";
import { CreateNewPasswordPage } from "./screens/CreateNewPasswordPage";
import { AppPage } from "./screens/AppPage";
import { HistoryPage } from "./screens/HistoryPage";
import { ProfilePage } from "./screens/ProfilePage";
import { StartInterviewPage } from "./screens/StartInterviewPage";
import { SettingsPage } from "./screens/SettingsPage";
import { InterviewQuestionsPage } from "./screens/InterviewQuestionsPage";
import { OverallFeedbackPage } from "./screens/OverallFeedbackPage";
import { OTPVerificationPage } from "./screens/OTPVerificationPage";
import { NotFoundPage } from "./screens/NotFoundPage"; // Add this import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthentication } from "./lib/authentication/authentication-hooks";
import { Navigate, Outlet } from "react-router-dom";

const queryClient = new QueryClient();
export const RequireAuth = () => {
	const { isAuthenticated } = useAuthentication();

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

createRoot(document.getElementById("app") as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					{/* Public Routes */}
					<Route path="/" element={<LandingPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegistrationPage />} />
					<Route path="/forget-password" element={<ForgetPasswordPage />} />
					<Route path="/otp-verification" element={<OTPVerificationPage />} />
					<Route
						path="/create-new-password"
						element={<CreateNewPasswordPage />}
					/>

					{/* Protected Routes 
          NOTE: REMOVE this line element={<RequireAuth />} if you don't
          want to login. */}
					<Route element={<RequireAuth />}>
						<Route path="/app" element={<AppPage />} />
						<Route path="/history" element={<HistoryPage />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/settings" element={<SettingsPage />} />


						{/* Interview Routes */}
						<Route path="/interview" element={<StartInterviewPage />} />
						<Route
							path="/interview/:id"
							element={<InterviewQuestionsPage />}
						/>
						<Route path="/interview/:id/results" element={<OverallFeedbackPage />} />
					</Route>

					{/* Catch-all route for 404 - must be last */}
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>
);