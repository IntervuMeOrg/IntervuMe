import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import {
  BellIcon,
  SunIcon,
  GlobeIcon,
  ShieldIcon,
  SaveIcon,
} from "lucide-react";
import { SettingsNotificationsTab } from "./SettingsNotificationsTab";
import { SettingsAppearanceTab } from "./SettingsAppearanceTab";
import { SettingsLanguageTab } from "./SettingsLanguageTab";
import { SettingsPrivacyTab } from "./SettingsPrivacyTab";

type SettingsState = {
  notifications: {
    emailNotifications: boolean;
    setEmailNotifications: (value: boolean) => void;
    pushNotifications: boolean;
    setPushNotifications: (value: boolean) => void;
    marketingEmails: boolean;
    setMarketingEmails: (value: boolean) => void;
    interviewReminders: boolean;
    setInterviewReminders: (value: boolean) => void;
    weeklyReports: boolean;
    setWeeklyReports: (value: boolean) => void;
  };
  appearance: {
    theme: string;
    setTheme: (value: string) => void;
    fontSize: string;
    setFontSize: (value: string) => void;
    compactMode: boolean;
    setCompactMode: (value: boolean) => void;
  };
  language: {
    language: string;
    setLanguage: (value: string) => void;
    region: string;
    setRegion: (value: string) => void;
    dateFormat: string;
    setDateFormat: (value: string) => void;
    timeFormat: string;
    setTimeFormat: (value: string) => void;
  };
  privacy: {
    profileVisibility: string;
    setProfileVisibility: (value: string) => void;
    dataSharing: boolean;
    setDataSharing: (value: boolean) => void;
    analyticsTracking: boolean;
    setAnalyticsTracking: (value: boolean) => void;
  };
};

type SettingsTabsProps = {
  settingsState: SettingsState;
  onSave: () => void;
};

export const SettingsTabs = ({ settingsState, onSave }: SettingsTabsProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 15,
        mass: 0.5,
        delay: 0.2,
      }}
      className="w-full"
    >
      <Tabs defaultValue="notifications" className="w-full">
        {/* Tab Navigation - Reduced height */}
        <div className="flex justify-center mb-6 sm:mb-8 md:mb-10 px-2 sm:px-4">
          <div className="w-full max-w-4xl">
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full bg-[#1d1d20]/10 backdrop-blur-sm border border-[#1d1d20]/20 rounded-lg p-1 h-auto">
              <TabsTrigger
                value="notifications"
                className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-[#1d1d20] data-[state=active]:bg-white data-[state=active]:text-[#1d1d20] data-[state=active]:shadow-sm rounded-md transition-all duration-200 py-1.5 sm:py-2 px-1 sm:px-2 h-8 sm:h-9"
              >
                <BellIcon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="hidden sm:inline truncate">Notifications</span>
                <span className="sm:hidden truncate">Notify</span>
              </TabsTrigger>
              <TabsTrigger
                value="appearance"
                className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-[#1d1d20] data-[state=active]:bg-white data-[state=active]:text-[#1d1d20] data-[state=active]:shadow-sm rounded-md transition-all duration-200 py-1.5 sm:py-2 px-1 sm:px-2 h-8 sm:h-9"
              >
                <SunIcon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="hidden sm:inline truncate">Appearance</span>
                <span className="sm:hidden truncate">Theme</span>
              </TabsTrigger>
              <TabsTrigger
                value="language"
                className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-[#1d1d20] data-[state=active]:bg-white data-[state=active]:text-[#1d1d20] data-[state=active]:shadow-sm rounded-md transition-all duration-200 py-1.5 sm:py-2 px-1 sm:px-2 h-8 sm:h-9"
              >
                <GlobeIcon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="hidden sm:inline truncate">Language</span>
                <span className="sm:hidden truncate">Lang</span>
              </TabsTrigger>
              <TabsTrigger
                value="privacy"
                className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-[#1d1d20] data-[state=active]:bg-white data-[state=active]:text-[#1d1d20] data-[state=active]:shadow-sm rounded-md transition-all duration-200 py-1.5 sm:py-2 px-1 sm:px-2 h-8 sm:h-9"
              >
                <ShieldIcon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">Privacy</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tab Content - Responsive min height */}
        <div className="min-h-[20rem] sm:min-h-[24rem] md:min-h-[28rem] lg:min-h-[32rem]">
          <TabsContent value="notifications">
            <SettingsNotificationsTab {...settingsState.notifications} />
          </TabsContent>

          <TabsContent value="appearance">
            <SettingsAppearanceTab {...settingsState.appearance} />
          </TabsContent>

          <TabsContent value="language">
            <SettingsLanguageTab {...settingsState.language} />
          </TabsContent>

          <TabsContent value="privacy">
            <SettingsPrivacyTab {...settingsState.privacy} />
          </TabsContent>
        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-6 sm:mt-8 md:mt-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onSave}
              className="rounded-md h-10 sm:h-12 md:h-14 px-4 sm:px-6 md:px-8 lg:px-10 bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 sm:gap-3 border-0"
            >
              <SaveIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-['Nunito'] font-semibold text-white text-sm sm:text-base md:text-lg">
                Save Settings
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </Tabs>
    </motion.section>
  );
};