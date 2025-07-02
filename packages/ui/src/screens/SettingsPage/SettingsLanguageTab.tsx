import React from 'react';
import { motion } from 'framer-motion';
import { TabsContent } from '../../components/ui/tabs';
import { GlobeIcon, CheckIcon } from 'lucide-react';

interface SettingsLanguageTabProps {
  language: string;
  setLanguage: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
  dateFormat: string;
  setDateFormat: (value: string) => void;
}

export const SettingsLanguageTab: React.FC<SettingsLanguageTabProps> = ({
  language,
  setLanguage,
  region,
  setRegion,
  dateFormat,
  setDateFormat,
}) => {
  const languageOptions = [
    { value: "english", label: "English", nativeName: "English" },
    { value: "spanish", label: "Spanish", nativeName: "Español" },
    { value: "french", label: "French", nativeName: "Français" },
    { value: "german", label: "German", nativeName: "Deutsch" },
    { value: "italian", label: "Italian", nativeName: "Italiano" },
    { value: "portuguese", label: "Portuguese", nativeName: "Português" },
    { value: "chinese", label: "Chinese", nativeName: "中文" },
    { value: "japanese", label: "Japanese", nativeName: "日本語" },
    { value: "arabic", label: "Arabic", nativeName: "العربية" },
  ];

  const regionOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "es", label: "Spain" },
    { value: "it", label: "Italy" },
  ];

  const dateFormatOptions = [
    { value: "mdy", label: "MM/DD/YYYY", example: "12/31/2024" },
    { value: "dmy", label: "DD/MM/YYYY", example: "31/12/2024" },
    { value: "ymd", label: "YYYY-MM-DD", example: "2024-12-31" },
  ];

  return (
    <TabsContent value="language" className="space-y-3 sm:space-y-4 md:space-y-6">
      {/* Language Selection */}
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
            <GlobeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />
            <h3 className="font-['Nunito'] font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl">
              Language
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {languageOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLanguage(option.value)}
                className={`p-2 sm:p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                  language === option.value
                    ? 'border-[#0667D0] bg-[#0667D0]/20'
                    : 'border-white/20 bg-white/10 hover:border-white/40'
                }`}
              >
                <div className="text-left">
                  <div className="text-white font-medium text-xs sm:text-sm">{option.label}</div>
                  <div className="text-[#e8eef2] text-xs opacity-70">{option.nativeName}</div>
                </div>
                {language === option.value && (
                  <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4 text-[#0667D0]" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Region Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
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
          <h3 className="font-['Nunito'] font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 md:mb-6">
            Region
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {regionOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setRegion(option.value)}
                className={`p-2 sm:p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                  region === option.value
                    ? 'border-[#0667D0] bg-[#0667D0]/20'
                    : 'border-white/20 bg-white/10 hover:border-white/40'
                }`}
              >
                <div className="text-white font-medium text-xs sm:text-sm">{option.label}</div>
                {region === option.value && (
                  <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4 text-[#0667D0]" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Date Format */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
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
          <h3 className="font-['Nunito'] font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 md:mb-6">
            Date Format
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            {dateFormatOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setDateFormat(option.value)}
                className={`p-2 sm:p-3 rounded-lg border-2 transition-all ${
                  dateFormat === option.value
                    ? 'border-[#0667D0] bg-[#0667D0]/20'
                    : 'border-white/20 bg-white/10 hover:border-white/40'
                }`}
              >
                <div className="text-center">
                  <div className="text-white font-medium text-xs sm:text-sm mb-1">{option.label}</div>
                  <div className="text-[#e8eef2] text-xs opacity-70">{option.example}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </TabsContent>
  );
};