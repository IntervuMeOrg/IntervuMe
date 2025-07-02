import React from 'react';
import { motion } from 'framer-motion';
import { TabsContent } from '../../components/ui/tabs';
import { SunIcon, MoonIcon, MonitorIcon, TypeIcon, LayoutIcon } from 'lucide-react';

interface SettingsAppearanceTabProps {
  theme: string;
  setTheme: (value: string) => void;
  fontSize: string;
  setFontSize: (value: string) => void;
  compactMode: boolean;
  setCompactMode: (value: boolean) => void;
}

export const SettingsAppearanceTab: React.FC<SettingsAppearanceTabProps> = ({
  theme,
  setTheme,
  fontSize,
  setFontSize,
  compactMode,
  setCompactMode,
}) => {
  const themeOptions = [
    {
      value: "light",
      label: "Light",
      icon: <SunIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
      description: "Clean and bright interface",
    },
    {
      value: "dark",
      label: "Dark",
      icon: <MoonIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
      description: "Easy on the eyes",
    },
    {
      value: "system",
      label: "System",
      icon: <MonitorIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
      description: "Follows your device settings",
    },
  ];

  const fontSizeOptions = [
    { value: "small", label: "Small", description: "Compact text size" },
    { value: "medium", label: "Medium", description: "Standard text size" },
    { value: "large", label: "Large", description: "Larger text for better readability" },
  ];

  return (
    <TabsContent value="appearance" className="space-y-3 sm:space-y-4 md:space-y-6">
      {/* Theme Selection */}
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
            <SunIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />
            <h3 className="font-['Nunito'] font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl">
              Theme
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {themeOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTheme(option.value)}
                className={`p-2 sm:p-3 md:p-4 rounded-lg border-2 transition-all ${
                  theme === option.value
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

      {/* Font Size */}
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
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
            <TypeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />
            <h3 className="font-['Nunito'] font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl">
              Font Size
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {fontSizeOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFontSize(option.value)}
                className={`p-2 sm:p-3 md:p-4 rounded-lg border-2 transition-all ${
                  fontSize === option.value
                    ? 'border-[#0667D0] bg-[#0667D0]/20'
                    : 'border-white/20 bg-white/10 hover:border-white/40'
                }`}
              >
                <div className="text-center">
                  <div className="text-white font-medium text-xs sm:text-sm mb-1">{option.label}</div>
                  <div className="text-[#e8eef2] text-xs opacity-70">{option.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Compact Mode */}
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
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1">
            <LayoutIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e8eef2] flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-['Nunito'] font-bold text-white text-sm sm:text-base md:text-lg">
                Compact Mode
              </h3>
              <p className="font-['Nunito'] text-[#e8eef2] text-xs sm:text-sm opacity-70 mt-1">
                Reduce spacing for a more compact interface
              </p>
            </div>
          </div>
          
          {/* Toggle Switch - Responsive sizing */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={compactMode}
              onChange={(e) => setCompactMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 sm:w-11 sm:h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#0667D0] peer-checked:to-[#033464]"></div>
          </label>
        </div>
      </motion.div>
    </TabsContent>
  );
};