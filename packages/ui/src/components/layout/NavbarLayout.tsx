import React, { useState } from "react";
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
import { LogOutIcon, SettingsIcon, UserIcon, Menu, X } from "lucide-react";
import { useAuthentication } from "../../lib/authentication/authentication-hooks";

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
	const auth = useAuthentication();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	// Update active state based on activeNavItem prop
	const updatedNavItems = navItems.map((item) => ({
		...item,
		active: item.name === activeNavItem,
	}));

	// Get user initials
	const getUserInitials = () => {
		const names = userName.split(" ");
		return names.length > 1
			? `${names[0].charAt(0)}${names[1].charAt(0)}`
			: userName.charAt(0);
	};

	// Default navigation handler
	const handleNavItemClick = (item: NavItem) => {
		setIsOpen(false);

		if (onNavItemClick) {
			onNavItemClick(item);
			return;
		}

		// Default navigation behavior
		switch (item.name) {
			case "History":
				navigate("/history");
				break;
			case "Contact Us":
				navigate("/app");
				setTimeout(() => {
					document.getElementById("contact-section")?.scrollIntoView({
						block: "nearest",
					});
				}, 100);
				break;
			case "FAQ":
				navigate("/app");
				setTimeout(() => {
					document.getElementById("faq-section")?.scrollIntoView({
						block: "nearest",
					});
				}, 100);
				break;
			case "Home":
				window.scrollTo({ top: 0 });
				navigate("/app");
				break;
		}
	};

	const handleLogoClick = () => {
		window.scrollTo({ top: 0 });
		navigate("/app");
		setIsOpen(false);
	};

	const handleProfileAction = (action: string) => {
		window.scrollTo({ top: 0 });
		if (action === "logout") {
			auth.logout();
		} else {
			navigate(action);
		}
	};

	return (
		<div className="min-h-screen flex flex-col">
			{/* Navigation bar */}
			<motion.header className="sticky top-0 z-50 w-full">
				<nav className="bg-[#1d1d20] shadow-lg">
					{/* Gradient overlay */}
					<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

					<div className="relative">
						<div className="max-w-7xl 2xl:max-w-full mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
							<div className="flex items-center justify-between h-12 3xl:h-16">
								{/* Logo - flex-1 for equal space */}
								<div className="flex-1">
									<div
										onClick={handleLogoClick}
										className="inline-block cursor-pointer"
									>
										<h1 className="font-['Nunito'] font-extrabold text-white text-sm sm:text-base 3xl:text-2xl lg:text-lg tracking-wider drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
											INTERVU ME
										</h1>
									</div>
								</div>

								{/* Desktop Navigation - centered */}
								<div className="hidden md:flex items-center justify-center space-x-8 lg:space-x-12 2xl:space-x-32 3xl:space-x-48">
									{updatedNavItems.map((item) => (
										<button
											key={item.name}
											onClick={() => handleNavItemClick(item)}
											className={`font-['Nunito'] font-semibold text-xs lg:text-sm xl:text-base 3xl:text-xl tracking-wide transition-all duration-200
                        ${
													item.active
														? "text-white underline underline-offset-4"
														: "text-white/70 hover:text-white"
												}`}
										>
											{item.name}
										</button>
									))}
								</div>

								{/* Desktop User Profile - flex-1 and justify-end */}
								<div className="hidden md:flex flex-1 justify-end items-center">
									<DropdownMenu modal={false}>
										<DropdownMenuTrigger asChild>
											<Button
												className="rounded-full h-10 w-10 3xl:h-14 3xl:w-14 bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] 
                                 hover:opacity-90 flex items-center justify-center relative overflow-hidden group
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
												title={userName}
											>
												<span className="font-['Nunito'] font-black text-white text-sm 3xl:text-lg z-10">
													{getUserInitials()}
												</span>
												<div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											align="end"
											className="w-56 3xl:w-72 bg-[#1d1d20] shadow-md border-[#333] text-[#e8eef2] mt-2"
										>
											<div className="px-3 py-2 text-sm 3xl:text-lg font-medium border-b border-[#333] mb-1 3xl:mb-2">
												{userName}
											</div>
											<DropdownMenuItem
												className="cursor-pointer hover:bg-[#333] focus:bg-[#e8eef2] text-[#e8eef2]"
												onClick={() => handleProfileAction("/profile")}
											>
												<UserIcon className="mr-2 h-4 w-4 3xl:h-6 3xl:w-6" />
												<span className="3xl:text-lg">Profile</span>
											</DropdownMenuItem>
											<DropdownMenuItem
												className="cursor-pointer hover:bg-[#333] focus:bg-[#e8eef2] text-[#e8eef2]"
												onClick={() => handleProfileAction("/settings")}
											>
												<SettingsIcon className="mr-2 h-4 w-4 3xl:h-6 3xl:w-6" />
												<span className="3xl:text-lg">Settings</span>
											</DropdownMenuItem>
											<DropdownMenuSeparator className="bg-[#333]" />
											<DropdownMenuItem
												className="cursor-pointer hover:bg-[#333] focus:bg-[#e8eef2] text-[#e8eef2]"
												onClick={() => handleProfileAction("logout")}
											>
												<LogOutIcon className="mr-2 h-4 w-4 3xl:h-6 3xl:w-6" />
												<span className="3xl:text-lg">Logout</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>

								{/* Mobile menu button */}
								<div className="md:hidden flex items-center space-x-2">
									{/* Mobile User Profile */}
									<DropdownMenu modal={false}>
										<DropdownMenuTrigger asChild>
											<Button
												className="rounded-full h-9 w-9 bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] 
                                 hover:opacity-90 flex items-center justify-center relative overflow-hidden group"
												title={userName}
											>
												<span className="font-['Nunito'] font-black text-white text-xs z-10">
													{getUserInitials()}
												</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											align="end"
											className="w-48 bg-[#1d1d20] shadow-md border-[#333] text-[#e8eef2] mt-2"
										>
											<div className="px-3 py-2 text-xs font-medium border-b border-[#333] mb-1">
												{userName}
											</div>
											<DropdownMenuItem
												className="cursor-pointer hover:bg-[#333] focus:bg-[#e8eef2] text-[#e8eef2] text-sm"
												onClick={() => handleProfileAction("/profile")}
											>
												<UserIcon className="mr-2 h-3 w-3" />
												<span>Profile</span>
											</DropdownMenuItem>
											<DropdownMenuItem
												className="cursor-pointer hover:bg-[#333] focus:bg-[#e8eef2] text-[#e8eef2] text-sm"
												onClick={() => handleProfileAction("/settings")}
											>
												<SettingsIcon className="mr-2 h-3 w-3" />
												<span>Settings</span>
											</DropdownMenuItem>
											<DropdownMenuSeparator className="bg-[#333]" />
											<DropdownMenuItem
												className="cursor-pointer hover:bg-[#333] focus:bg-[#e8eef2] text-[#e8eef2] text-sm"
												onClick={() => handleProfileAction("logout")}
											>
												<LogOutIcon className="mr-2 h-3 w-3" />
												<span>Logout</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>

									{/* Hamburger Menu */}
									<button
										onClick={() => setIsOpen(!isOpen)}
										className="p-2 rounded-md text-white hover:bg-white/10 
                             focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
										aria-label="Toggle menu"
									>
										{isOpen ? (
											<X className="h-6 w-6" />
										) : (
											<Menu className="h-6 w-6" />
										)}
									</button>
								</div>
							</div>
						</div>

						{/* Mobile menu */}
						<motion.div
							initial={false}
							animate={{ height: isOpen ? "auto" : 0 }}
							transition={{ duration: 0.2 }}
							className="md:hidden overflow-hidden bg-[#1d1d20] border-t border-white/10"
						>
							<div className="px-4 py-4 space-y-2">
								{updatedNavItems.map((item) => (
									<button
										key={item.name}
										onClick={() => handleNavItemClick(item)}
										className={`block w-full text-left px-3 py-3 rounded-md font-['Nunito'] font-semibold text-base
                      ${
												item.active
													? "text-white bg-white/10"
													: "text-white/70 hover:text-white hover:bg-white/5"
											} transition-colors duration-200`}
									>
										{item.name}
									</button>
								))}
							</div>
						</motion.div>
					</div>
				</nav>
			</motion.header>

			{/* Page content */}
			<main className="flex-1">{children}</main>
		</div>
	);
};
