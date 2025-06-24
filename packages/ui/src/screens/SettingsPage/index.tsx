import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
	BellIcon,
	SunIcon,
	GlobeIcon,
	ShieldIcon,
	SaveIcon,
	CheckIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { NotificationTab } from "./NotificationsTab";
import { AppearanceTab } from "./AppearanceTab";
import { LanguageTab } from "./LanguageTab";
import { PrivacyTab } from "./PrivacyTab";


export const SettingsPage = (): JSX.Element => {
	// State for active navigation item tracking
	const activeNavItem = "";
	// State for logged in user (simulated)
	const [userName, setUserName] = useState("Mohamed Essam");

	// State for notification settings
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [pushNotifications, setPushNotifications] = useState(true);
	const [marketingEmails, setMarketingEmails] = useState(false);
	// State for appearance settings
	const [theme, setTheme] = useState("light");
	// State for language settings
	const [language, setLanguage] = useState("english");
	// State for privacy settings
	const [profileVisibility, setProfileVisibility] = useState("public");
	// State for form submission feedback
	const [showSaveSuccess, setShowSaveSuccess] = useState(false);


	// Handle save settings
	const handleSaveSettings = () => {
		// In a real app, this would save settings to a backend
		console.log("Saving settings...");
		console.log({
			emailNotifications,
			pushNotifications,
			marketingEmails,
			theme,
			language,
			profileVisibility,
		});

		// Show success message
		setShowSaveSuccess(true);
		// Hide success message after 3 seconds
		setTimeout(() => {
			setShowSaveSuccess(false);
		}, 3000);
	};


	// Animation variants for success message
	const successVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring" as const,
				stiffness: 300,
				damping: 20,
			},
		},
		exit: {
			opacity: 0,
			y: -20,
			transition: {
				duration: 0.3,
			},
		},
	};

	return (
		<NavbarLayout activeNavItem={activeNavItem} userName={userName}>
			<main className="bg-white w-full relative min-h-screen">
				{/* Background image */}
				<img
					className="fixed w-full h-full object-cover"
					alt="Rectangle"
					src="/rectangle.png"
				/>
				{/* Main Content */}
				<div className="relative z-10 px-[8vw] py-[5vh]">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-center mb-[3.5vh]"
					>
						<h1 className="font-['Nunito',Helvetica] font-black text-[#1d1d20] text-[1.8rem] mt-[-7px] tracking-[0] leading-tight [text-shadow:0_4px_4px_rgba(0,0,0,0.2)]">
							Settings
						</h1>
						<p className="font-['Nunito',Helvetica] text-[0.9rem] text-[#1d1d20] mt-1 max-w-[800px] mx-auto">
							Manage your account settings and preferences
						</p>
					</motion.div>

					{/* Success Message */}
					{showSaveSuccess && (
						<motion.div
							className="fixed top-[100px] left-1/2 transform -translate-x-1/2 z-50"
							initial="hidden"
							animate="visible"
							exit="exit"
							variants={successVariants}
						>
							<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center shadow-lg">
								<CheckIcon className="h-5 w-5 mr-2" />
								<span>Settings saved successfully!</span>
							</div>
						</motion.div>
					)}

					{/* Settings Tabs */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="max-w-[1000px] mx-auto mb-[2vh]"
					>
						<Tabs defaultValue="notifications" className="w-full">
							<TabsList className="grid w-full grid-cols-4 mb-8">
								<TabsTrigger
									value="notifications"
									className="flex items-center gap-2"
								>
									<BellIcon className="h-4 w-4" />
									<span>Notifications</span>
								</TabsTrigger>
								<TabsTrigger
									value="appearance"
									className="flex items-center gap-2"
								>
									<SunIcon className="h-4 w-4" />
									<span>Appearance</span>
								</TabsTrigger>
								<TabsTrigger
									value="language"
									className="flex items-center gap-2"
								>
									<GlobeIcon className="h-4 w-4" />
									<span>Language</span>
								</TabsTrigger>
								<TabsTrigger
									value="privacy"
									className="flex items-center gap-2"
								>
									<ShieldIcon className="h-4 w-4" />
									<span>Privacy</span>
								</TabsTrigger>
							</TabsList>

							{/* Notifications Tab */}
							<NotificationTab
								emailNotifications={emailNotifications}
								setEmailNotifications={setEmailNotifications}
								pushNotifications={pushNotifications}
								setPushNotifications={setPushNotifications}
								marketingEmails={marketingEmails}
								setMarketingEmails={setMarketingEmails}
							/>

							{/* Appearance Tab */}
							<AppearanceTab theme={theme} setTheme={setTheme} />

							{/* Language Tab */}
							<LanguageTab language={language} setLanguage={setLanguage} />

							{/* Privacy Tab */}
							<PrivacyTab
								profileVisibility={profileVisibility}
								setProfileVisibility={setProfileVisibility}
							/>
						</Tabs>

						{/* Save Button */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="mt-8 flex justify-end"
						>
							<Button
								onClick={handleSaveSettings}
								className="h-[50px] px-8 [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90 transition-all duration-300 flex items-center gap-2"
							>
								<SaveIcon className="h-5 w-5" />
								<span className="font-['Nunito',Helvetica] font-semibold text-white text-[1.1rem]">
									Save Settings
								</span>
							</Button>
						</motion.div>
					</motion.div>
				</div>
			</main>
		</NavbarLayout>
	);
};

export default SettingsPage;