import React from 'react';
import { motion } from 'framer-motion';
import { TabsContent } from '../../components/ui/tabs';
import { ShieldIcon, EyeIcon, EyeOffIcon, LockIcon, UserIcon } from 'lucide-react';

interface SettingsPrivacyTabProps {
  profileVisibility: string;
  setProfileVisibility: (value: string) => void;
  dataSharing: boolean;
  setDataSharing: (value: boolean) => void;
  analyticsTracking: boolean;
  setAnalyticsTracking: (value: boolean) => void;
}

export const SettingsPrivacyTab: React.FC<SettingsPrivacyTabProps> = ({
  profileVisibility,
  setProfileVisibility,
  dataSharing,
  setDataSharing,
  analyticsTracking,
  setAnalyticsTracking,
}) => {
  const visibilityOptions = [
    {
      value: "public",
      label: "Public",
      icon: <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
      description: "Anyone can view your profile",
    },
    {
      value: "private",
      label: "Private",
      icon: <EyeOffIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
      description: "Only you can view your profile",
    },
    {
      value: "friends",
      label: "Friends Only",
      icon: <UserIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
      description: "Only your connections can view",
    },
  ];

  const privacySettings = [
    {
      icon: <ShieldIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />,
      title: "Data Sharing",
      description: "Allow sharing anonymized data for research purposes",
      checked: dataSharing,
      onChange: setDataSharing,
      delay: 0.2,
    },
    {
      icon: <LockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />,
      title: "Analytics Tracking",
      description: "Allow usage analytics and tracking for improvements",
      checked: analyticsTracking,
      onChange: setAnalyticsTracking,
      delay: 0.3,
    },
  ];

  return (
    <TabsContent value="privacy" className="space-y-3 sm:space-y-4 md:space-y-6">
      {/* Profile Visibility */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="bg-[#1d1d20] rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg relative overflow-hidden group"
        whileHover={{ 
          scale: 1.02, 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transition: { duration: 0.2 } 
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
            <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />
            <h3 className="font-['Nunito'] font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl">
              Profile Visibility
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {visibilityOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setProfileVisibility(option.value)}
                className={`p-2 sm:p-3 md:p-4 rounded-lg border-2 transition-all ${
                  profileVisibility === option.value
                    ? 'border-[#0667D0] bg-[#0667D0]/20'
                    : 'border-white/20 bg-white/10 hover:border-white/40'
                }`}
              >
                <div className="flex flex-col items-center gap-1 sm:gap-2 text-center">
                  <div className="text-[#e8eef2]">{option.icon}</div>
                  <div className="text-white font-medium text-xs sm:text-sm">{option.label}</div>
                  <div className="text-[#e8eef2] text-xs opacity-70">{option.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Privacy Settings */}
      <div className="space-y-3 sm:space-y-4">
        {privacySettings.map((setting, index) => (
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

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="bg-[#1d1d20] rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg relative overflow-hidden"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <ShieldIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#0667D0] flex-shrink-0" />
            <h3 className="font-['Nunito'] font-bold text-white text-sm sm:text-base">
              Privacy Commitment
            </h3>
          </div>
          <p className="text-[#e8eef2] text-xs sm:text-sm opacity-80 leading-relaxed">
            We are committed to protecting your privacy. Your personal data is encrypted and never shared 
            with third parties without your explicit consent. You have full control over your data and can 
            request deletion at any time.
          </p>
        </div>
      </motion.div>
    </TabsContent>
  );
};