import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./screens/MainPage";
import { LoginPage } from "./screens/LoginPage";
import { RegistrationPage } from "./screens/RegistrationPage";
import { ForgetPasswordPage } from "./screens/ForgetPasswordPage";
import { CreateNewPasswordPage } from "./screens/CreateNewPassword";
import { MainPageAfterLogin } from "./screens/MainPageAfterLogin";
import { HistoryPage } from "./screens/HistoryPage";
import { ProfilePage } from "./screens/ProfilePage";
import { StartInterviewPage } from "./screens/StartInterviewPage";
import { SettingsPage } from "./screens/SettingsPage";
import { InterviewQuestionsPage } from "./screens/InterviewQuestionsPage";
import { OverallFeedbackPage } from "./screens/OverallFeedbackPage";
import { OTPVerificationPage } from "./screens/OTPVerificationPage";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/otp-verification" element={<OTPVerificationPage />} />
        <Route
          path="/create-new-password"
          element={<CreateNewPasswordPage />}
        />

        <Route path="/main-page-after-login" element={<MainPageAfterLogin />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />

        <Route path="/start-interview" element={<StartInterviewPage />} />
        <Route
          path="/interview-questions"
          element={<InterviewQuestionsPage />}
        />
        <Route path="/overall-feedback" element={<OverallFeedbackPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
