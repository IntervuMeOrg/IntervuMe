import { useState } from "react";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { motion } from "framer-motion";
import { Toast } from "../../components/ui/Toast";
import { SettingsHeader } from "./SettingsHeader";
import { SettingsTabs } from "./SettingsTabs";

export const SettingsPage = (): JSX.Element => {
  // State for active navigation item tracking
  const activeNavItem = "";
  // State for logged in user (simulated)
  const [userName, setUserName] = useState("Mohamed Essam");

  // State for notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [interviewReminders, setInterviewReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);

  // State for appearance settings
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");
  const [compactMode, setCompactMode] = useState(false);

  // State for language settings
  const [language, setLanguage] = useState("english");
  const [region, setRegion] = useState("us");
  const [dateFormat, setDateFormat] = useState("mdy");
  const [timeFormat, setTimeFormat] = useState("12h");

  // State for privacy settings
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [dataSharing, setDataSharing] = useState(false);
  const [analyticsTracking, setAnalyticsTracking] = useState(true);

  // Toast notification state
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({
    visible: false,
    message: "",
    type: "success",
  });

  // Function to show toast
  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };

  // Handle save settings
  const handleSaveSettings = () => {
    // In a real app, this would save settings to a backend
    console.log("Saving settings...", {
      notifications: {
        emailNotifications,
        pushNotifications,
        marketingEmails,
        interviewReminders,
        weeklyReports,
      },
      appearance: {
        theme,
        fontSize,
        compactMode,
      },
      language: {
        language,
        region,
        dateFormat,
        timeFormat,
      },
      privacy: {
        profileVisibility,
        dataSharing,
        analyticsTracking,
      },
    });

    // Show success message using consistent toast
    showToast("Settings saved successfully!", "success");
  };

  // Settings state object for easy passing to components
  const settingsState = {
    notifications: {
      emailNotifications,
      setEmailNotifications,
      pushNotifications,
      setPushNotifications,
      marketingEmails,
      setMarketingEmails,
      interviewReminders,
      setInterviewReminders,
      weeklyReports,
      setWeeklyReports,
    },
    appearance: {
      theme,
      setTheme,
      fontSize,
      setFontSize,
      compactMode,
      setCompactMode,
    },
    language: {
      language,
      setLanguage,
      region,
      setRegion,
      dateFormat,
      setDateFormat,
      timeFormat,
      setTimeFormat,
    },
    privacy: {
      profileVisibility,
      setProfileVisibility,
      dataSharing,
      setDataSharing,
      analyticsTracking,
      setAnalyticsTracking,
    },
  };

  return (
    <NavbarLayout activeNavItem={activeNavItem} userName={userName}>
      {/* Toast notification */}
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}

      <main className="relative min-h-screen w-full bg-white">
        {/* Background container with proper responsive handling */}
        <div className="absolute inset-0 z-0">
          <img
            className="h-full w-full object-cover"
            alt="Background"
            src="/rectangle.png"
          />
        </div>

        {/* Main content with proper responsive container */}
        <div className="relative z-10 min-h-screen w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="py-8 sm:py-12 md:py-16 lg:py-20">
              
              {/* Header Section */}
              <SettingsHeader />

              {/* Settings Tabs Section */}
              <SettingsTabs 
                settingsState={settingsState}
                onSave={handleSaveSettings}
              />
            </div>
          </div>
        </div>
      </main>
    </NavbarLayout>
  );
};

export default SettingsPage;