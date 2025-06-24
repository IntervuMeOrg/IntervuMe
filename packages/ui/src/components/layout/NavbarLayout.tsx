import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";

type NavItem = {
  name: string;
  active: boolean;
  path?: string;
  sectionId?: string;
};

type NavbarLayoutProps = {
  children: React.ReactNode;
  activeNavItem?: string;
  userName?: string;
  navItems?: NavItem[];
  onNavItemClick?: (item: NavItem) => void;
};

export const NavbarLayout = ({
  children,
  activeNavItem = "Home",
  userName = "User Name",
  navItems = [
    { name: "Home", active: true },
    { name: "History", active: false },
    { name: "Contact Us", active: false },
    { name: "FAQ", active: false },
  ],
  onNavItemClick,
}: NavbarLayoutProps): JSX.Element => {
  const navigate = useNavigate();

  // Update active state based on activeNavItem prop
  const updatedNavItems = navItems.map((item) => ({
    ...item,
    active: item.name === activeNavItem,
  }));

  // Default navigation handler if none provided
  const handleNavItemClick = (item: NavItem) => {
    if (onNavItemClick) {
      onNavItemClick(item);
      return;
    }

    // Default navigation behavior
    if (item.name === "History") {
      navigate("/history");
    } else if (item.name === "Contact Us") {
      navigate("/main-page-after-login");
      setTimeout(() => {
        document.getElementById("contact-section")?.scrollIntoView({
          block: "nearest",
        });
      }, 100);
    } else if (item.name === "FAQ") {
      navigate("/main-page-after-login");
      setTimeout(() => {
        document.getElementById("faq-section")?.scrollIntoView({
          block: "nearest",
        });
      }, 100);
    } else if (item.name === "Home") {
      window.scrollTo({
        top: 0,
      });
      navigate("/main-page-after-login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation bar */}
      <motion.header className="sticky top-0 z-[999] w-full h-[8vh]">
        <nav className="w-full h-[8vh] bg-[#1d1d20] shadow-md">
          <div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
          <div className="relative h-full flex items-center justify-between px-[3vw]">
            {/* Logo */}
            <div
              className="[text-shadow:0px_4px_4px_#00000040] font-['Nunito',Helvetica] font-extrabold text-white text-[1.5vw] text-center tracking-[0.05em] cursor-pointer"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/main-page-after-login");
              }}
            >
              INTERVU ME
            </div>

            {/* Navigation links */}
            <div className="flex space-x-12 gap-[4vw] mr-[80px]">
              {updatedNavItems.map((item) => (
                <div
                  key={item.name}
                  className={`font-['Nunito',Helvetica] font-semibold text-white text-[1.2vw] text-center tracking-[1.32px] ${
                    item.active ? "underline" : "opacity-70"
                  } cursor-pointer`}
                  onClick={() => handleNavItemClick(item)}
                >
                  {item.name}
                </div>
              ))}
            </div>

            {/* User profile button with dropdown menu */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full h-[6vh] w-[7vh] [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90 flex items-center justify-center relative overflow-hidden group"
                  title={userName}
                >
                  <span className="font-['Nunito',Helvetica] font-black text-white text-[1.2vw] text-center z-10">
                    {userName.split(" ").length > 1
                      ? `${userName.split(" ")[0].charAt(0)}${userName
                          .split(" ")[1]
                          .charAt(0)}`
                      : userName.charAt(0)}
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300"></div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[200px] bg-[#1d1d20] shadow-md border-[#333] text-[#e8eef2] mt-[10px]"
              >
                <div className="px-2 py-2 text-sm font-medium border-b border-[#333] mb-1">
                  {userName}
                </div>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-[#333] focus:bg-[#e8eef2]"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/profile");
                  }}
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-[#333] focus:bg-[#e8eef2]"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/settings");
                  }}
                >
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#333]" />
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-[#333] focus:bg-[#e8eef2]"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/");
                  }}
                >
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </motion.header>

      {/* Page content */}
      <div className="flex-1">{children}</div>
    </div>
  );
};
