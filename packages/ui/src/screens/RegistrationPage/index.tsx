// RegistrationPage.tsx (Parent Component)
import { useNavigate } from "react-router-dom";
import { RegistrationHeader } from "./RegistrationHeader";
import { RegistrationForm } from "./RegistrationForm";

export const RegistrationPage = (): JSX.Element => {
	const navigate = useNavigate();

	const handleBackToLogin = () => {
		navigate("/login");
	};

	// Form field data for mapping
	const months = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December",
	];
	const genders = ["Male", "Female", "Prefer not to say"];
	const countryCodes = ["+20", "+1", "+44", "+91"];

	return (
		<div className="min-h-screen bg-[#1d1d20] relative overflow-hidden">
			{/* Gradient overlay for entire page */}
			<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
			
			<div className="relative z-10 flex flex-col">
				<RegistrationHeader
					navigate={navigate}
					handleBackToLogin={handleBackToLogin}
				/>
				<RegistrationForm
					countryCodes={countryCodes}
					genders={genders}
					months={months}
				/>
			</div>
		</div>
	);
};

export default RegistrationPage;