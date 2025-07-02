import React from 'react';
import { motion } from 'framer-motion';
import { TabsContent } from '../../components/ui/tabs';
import { BellIcon, MailIcon, SmartphoneIcon, MegaphoneIcon } from 'lucide-react';

interface SettingsNotificationsTabProps {
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
}

export const SettingsNotificationsTab: React.FC<SettingsNotificationsTabProps> = ({
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
}) => {
  const notificationSettings = [
    {
      icon: <MailIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />,
      title: "Email Notifications",
      description: "Receive notifications via email",
      checked: emailNotifications,
      onChange: setEmailNotifications,
      delay: 0.1,
    },
    {
      icon: <SmartphoneIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />,
      title: "Push Notifications",
      description: "Receive push notifications on your device",
      checked: pushNotifications,
      onChange: setPushNotifications,
      delay: 0.2,
    },
    {
      icon: <BellIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />,
      title: "Interview Reminders",
      description: "Get reminded about upcoming interviews",
      checked: interviewReminders,
      onChange: setInterviewReminders,
      delay: 0.3,
    },
    {
      icon: <MegaphoneIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />,
      title: "Marketing Emails",
      description: "Receive promotional emails and updates",
      checked: marketingEmails,
      onChange: setMarketingEmails,
      delay: 0.4,
    },
    {
      icon: <MailIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />,
      title: "Weekly Reports",
      description: "Get weekly performance summaries",
      checked: weeklyReports,
      onChange: setWeeklyReports,
      delay: 0.5,
    },
  ];

  return (
    <TabsContent value="notifications" className="space-y-3 sm:space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
        {notificationSettings.map((setting, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: setting.delay }}
            className="bg-[#1d1d20] rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg relative overflow-hidden group"
            whileHover={{ 
              scale: 1.02, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2 } 
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1">
                {setting.icon}
                <div className="flex-1">
                  <h3 className="font-['Nunito'] font-bold text-white text-sm sm:text-base md:text-lg">
                    {setting.title}
                  </h3>
                  <p className="font-['Nunito'] text-[#e8eef2] text-xs sm:text-sm opacity-70 mt-1">
                    {setting.description}
                  </p>
                </div>
              </div>
              
              {/* Toggle Switch - Responsive sizing */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={setting.checked}
                  onChange={(e) => setting.onChange(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 sm:w-11 sm:h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#0667D0] peer-checked:to-[#033464]"></div>
              </label>
            </div>
          </motion.div>
        ))}
      </div>
    </TabsContent>
  );
};