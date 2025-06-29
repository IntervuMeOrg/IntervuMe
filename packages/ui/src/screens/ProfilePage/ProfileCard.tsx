import { motion } from "framer-motion";
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon, EditIcon } from "lucide-react";

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  skills: string[];
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  experience: Array<{
    position: string;
    company: string;
    duration: string;
  }>;
};

type ProfileCardProps = {
  userProfile: UserProfile;
  isEditing: boolean;
  setUserProfile: (profile: UserProfile) => void;
};

export const ProfileCard = ({
  userProfile,
  isEditing,
  setUserProfile,
}: ProfileCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="bg-[#1d1d20] rounded-xl p-5 sm:p-6 md:p-7 shadow-lg relative overflow-hidden group h-fit"
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 } 
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {/* Profile Avatar with improved styling */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-[#0667D0] via-[#054E9D] to-[#033464] rounded-full flex items-center justify-center shadow-lg">
              <UserIcon className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-white" />
            </div>
          </motion.div>
        </div>

        {/* Name Section with improved editing */}
        <div className="text-center mb-5 sm:mb-6">
          {isEditing ? (
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={userProfile.firstName}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, firstName: e.target.value })
                  }
                  className="w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-lg px-4 py-2.5 text-sm sm:text-base font-bold text-center focus:outline-none focus:ring-2 focus:ring-[#0667D0] focus:border-transparent transition-all"
                  placeholder="First Name"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={userProfile.lastName}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, lastName: e.target.value })
                  }
                  className="w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-lg px-4 py-2.5 text-sm sm:text-base font-bold text-center focus:outline-none focus:ring-2 focus:ring-[#0667D0] focus:border-transparent transition-all"
                  placeholder="Last Name"
                />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="font-['Nunito'] font-bold text-white text-lg sm:text-xl md:text-2xl mb-1">
                {userProfile.firstName} {userProfile.lastName}
              </h2>
              <p className="text-[#e8eef2]/70 text-sm">Frontend Developer</p>
            </div>
          )}
        </div>

        {/* Contact Information with improved styling */}
        <div className="space-y-4 mb-6">
          {/* Email */}
          <div className="flex items-center gap-3 group/contact">
            <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover/contact:bg-white/20 transition-colors">
              <MailIcon className="h-4 w-4 text-[#e8eef2]" />
            </div>
            {isEditing ? (
              <input
                type="email"
                value={userProfile.email}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, email: e.target.value })
                }
                className="flex-1 bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0667D0] focus:border-transparent transition-all"
                placeholder="Email"
              />
            ) : (
              <span className="text-[#e8eef2] text-xs sm:text-sm break-all flex-1">
                {userProfile.email}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 group/contact">
            <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover/contact:bg-white/20 transition-colors">
              <PhoneIcon className="h-4 w-4 text-[#e8eef2]" />
            </div>
            {isEditing ? (
              <input
                type="tel"
                value={userProfile.phone}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, phone: e.target.value })
                }
                className="flex-1 bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0667D0] focus:border-transparent transition-all"
                placeholder="Phone"
              />
            ) : (
              <span className="text-[#e8eef2] text-xs sm:text-sm flex-1">
                {userProfile.phone}
              </span>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 group/contact">
            <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover/contact:bg-white/20 transition-colors">
              <MapPinIcon className="h-4 w-4 text-[#e8eef2]" />
            </div>
            {isEditing ? (
              <input
                type="text"
                value={userProfile.location}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, location: e.target.value })
                }
                className="flex-1 bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0667D0] focus:border-transparent transition-all"
                placeholder="Location"
              />
            ) : (
              <span className="text-[#e8eef2] text-xs sm:text-sm flex-1">
                {userProfile.location}
              </span>
            )}
          </div>
        </div>

        {/* Bio Section with improved styling */}
        <div className="border-t border-white/10 pt-5">
          <div className="flex items-center gap-2 mb-3">
            <EditIcon className="h-4 w-4 text-[#e8eef2]" />
            <h3 className="font-['Nunito'] font-semibold text-white text-sm sm:text-base">
              About Me
            </h3>
          </div>
          {isEditing ? (
            <textarea
              value={userProfile.bio}
              onChange={(e) =>
                setUserProfile({ ...userProfile, bio: e.target.value })
              }
              className="w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-lg px-4 py-3 text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0667D0] focus:border-transparent transition-all"
              rows={4}
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-[#e8eef2] text-xs sm:text-sm leading-relaxed">
              {userProfile.bio}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};