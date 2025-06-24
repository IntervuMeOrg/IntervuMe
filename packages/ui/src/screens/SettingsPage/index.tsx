import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
	BellIcon,
	SettingsIcon,
	MoonIcon,
	SunIcon,
	GlobeIcon,
	ShieldIcon,
	LockIcon,
	SaveIcon,
	CheckIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { NavbarLayout } from "../../components/layout/NavbarLayout";

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
		<NavbarLayout
			activeNavItem={activeNavItem}
			userName={userName}
		>
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
							<TabsTrigger value="language" className="flex items-center gap-2">
								<GlobeIcon className="h-4 w-4" />
								<span>Language</span>
							</TabsTrigger>
							<TabsTrigger value="privacy" className="flex items-center gap-2">
								<ShieldIcon className="h-4 w-4" />
								<span>Privacy</span>
							</TabsTrigger>
						</TabsList>

						{/* Notifications Tab */}
						<TabsContent value="notifications">
							<Card className="bg-[#E8EEF2] shadow-lg border-0 overflow-hidden">
								<CardContent className="p-6">
									<h2 className="font-['Nunito',Helvetica] font-bold text-[1.5rem] mb-6 text-[#1d1d20]">
										Notification Preferences
									</h2>

									<div className="space-y-6">
										<div className="flex items-center justify-between">
											<div className="space-y-1">
												<Label
													htmlFor="email-notifications"
													className="text-[1rem] font-semibold"
												>
													Email Notifications
												</Label>
												<p className="text-sm text-gray-500">
													Receive email notifications about your interviews and
													feedback
												</p>
											</div>
											<Switch
												id="email-notifications"
												checked={emailNotifications}
												onCheckedChange={setEmailNotifications}
											/>
										</div>

										<div className="flex items-center justify-between">
											<div className="space-y-1">
												<Label
													htmlFor="push-notifications"
													className="text-[1rem] font-semibold"
												>
													Push Notifications
												</Label>
												<p className="text-sm text-gray-500">
													Receive push notifications for interview reminders and
													updates
												</p>
											</div>
											<Switch
												id="push-notifications"
												checked={pushNotifications}
												onCheckedChange={setPushNotifications}
											/>
										</div>

										<div className="flex items-center justify-between">
											<div className="space-y-1">
												<Label
													htmlFor="marketing-emails"
													className="text-[1rem] font-semibold"
												>
													Marketing Emails
												</Label>
												<p className="text-sm text-gray-500">
													Receive emails about new features, tips, and
													promotions
												</p>
											</div>
											<Switch
												id="marketing-emails"
												checked={marketingEmails}
												onCheckedChange={setMarketingEmails}
											/>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						{/* Appearance Tab */}
						<TabsContent value="appearance">
							<Card className="bg-[#E8EEF2] shadow-lg border-0 overflow-hidden">
								<CardContent className="p-6">
									<h2 className="font-['Nunito',Helvetica] font-bold text-[1.5rem] mb-6 text-[#1d1d20]">
										Appearance Settings
									</h2>

									<div className="space-y-6">
										<div>
											<Label className="text-[1rem] font-semibold mb-4 block">
												Theme
											</Label>
											<RadioGroup
												value={theme}
												onValueChange={setTheme}
												className="flex flex-col space-y-3"
											>
												<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
													<RadioGroupItem value="light" id="theme-light" />
													<Label
														htmlFor="theme-light"
														className="flex items-center cursor-pointer"
													>
														<SunIcon className="h-5 w-5 mr-2 text-yellow-500" />
														<span>Light Mode</span>
													</Label>
												</div>
												<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
													<RadioGroupItem value="dark" id="theme-dark" />
													<Label
														htmlFor="theme-dark"
														className="flex items-center cursor-pointer"
													>
														<MoonIcon className="h-5 w-5 mr-2 text-blue-700" />
														<span>Dark Mode</span>
													</Label>
												</div>
												<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
													<RadioGroupItem value="system" id="theme-system" />
													<Label
														htmlFor="theme-system"
														className="flex items-center cursor-pointer"
													>
														<SettingsIcon className="h-5 w-5 mr-2 text-gray-500" />
														<span>System Default</span>
													</Label>
												</div>
											</RadioGroup>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						{/* Language Tab */}
						<TabsContent value="language">
							<Card className="bg-[#E8EEF2] shadow-lg border-0 overflow-hidden">
								<CardContent className="p-6">
									<h2 className="font-['Nunito',Helvetica] font-bold text-[1.5rem] mb-6 text-[#1d1d20]">
										Language Settings
									</h2>

									<div className="space-y-6">
										<div>
											<Label className="text-[1rem] font-semibold mb-4 block">
												Preferred Language
											</Label>
											<RadioGroup
												value={language}
												onValueChange={setLanguage}
												className="flex flex-col space-y-3"
											>
												<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
													<RadioGroupItem value="english" id="lang-english" />
													<Label
														htmlFor="lang-english"
														className="cursor-pointer"
													>
														English
													</Label>
												</div>
												<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
													<RadioGroupItem value="spanish" id="lang-spanish" />
													<Label
														htmlFor="lang-spanish"
														className="cursor-pointer"
													>
														Spanish
													</Label>
												</div>
												<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
													<RadioGroupItem value="french" id="lang-french" />
													<Label
														htmlFor="lang-french"
														className="cursor-pointer"
													>
														French
													</Label>
												</div>
												<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
													<RadioGroupItem value="arabic" id="lang-arabic" />
													<Label
														htmlFor="lang-arabic"
														className="cursor-pointer"
													>
														Arabic
													</Label>
												</div>
											</RadioGroup>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						{/* Privacy Tab */}
						<TabsContent value="privacy">
							<Card className="bg-[#E8EEF2] shadow-lg border-0 overflow-hidden">
								<CardContent className="p-6">
									<h2 className="font-['Nunito',Helvetica] font-bold text-[1.5rem] mb-6 text-[#1d1d20]">
										Privacy Settings
									</h2>

									<div className="space-y-6">
										<div>
											<Label className="text-[1rem] font-semibold mb-4 block">
												Profile Visibility
											</Label>
											<RadioGroup
												value={profileVisibility}
												onValueChange={setProfileVisibility}
												className="flex flex-col space-y-3"
											>
												<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
													<RadioGroupItem
														value="public"
														id="visibility-public"
													/>
													<Label
														htmlFor="visibility-public"
														className="flex items-center cursor-pointer"
													>
														<GlobeIcon className="h-5 w-5 mr-2 text-green-500" />
														<div>
															<span className="font-medium">Public</span>
															<p className="text-sm text-gray-500">
																Anyone can view your profile and interview
																history
															</p>
														</div>
													</Label>
												</div>
												<div className="flex items-center space-x-3 rounded-md border border-gray-300 p-3 hover:bg-gray-100 transition-colors cursor-pointer">
													<RadioGroupItem
														value="private"
														id="visibility-private"
													/>
													<Label
														htmlFor="visibility-private"
														className="flex items-center cursor-pointer"
													>
														<LockIcon className="h-5 w-5 mr-2 text-red-500" />
														<div>
															<span className="font-medium">Private</span>
															<p className="text-sm text-gray-500">
																Only you can view your profile and interview
																history
															</p>
														</div>
													</Label>
												</div>
											</RadioGroup>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
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