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
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const genders = ["Male", "Female", "Prefer not to say"];
	const countryCodes = ["+20", "+1", "+44", "+91"];

	return (
		<div className="bg-white w-full h-screen">
			<div className="bg-white w-full h-screen relative overflow-hidden">
				<div className="relative h-full w-full">
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
		</div>
	);
};

export default RegistrationPage;
