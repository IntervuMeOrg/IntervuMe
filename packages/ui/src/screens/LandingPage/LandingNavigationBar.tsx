import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

type NavigationBarProps = {
	navigate: ReturnType<typeof useNavigate>;
	navItems: {
		name: string;
		active: boolean;
	}[];
	featuresSectionRef: React.RefObject<HTMLElement>;
	contactSectionRef: React.RefObject<HTMLElement>;
};

export const NavigationBar = ({
	navigate,
	navItems,
	featuresSectionRef,
	contactSectionRef,
}: NavigationBarProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleNavClick = (itemName: string) => {
		setIsOpen(false);

		switch (itemName) {
			case "Features":
				featuresSectionRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
				break;
			case "Contact Us":
				contactSectionRef.current?.scrollIntoView({
					behavior: "smooth",
					block:  "start",
				});
				break;
			case "Home":
				window.scrollTo({ top: 0, behavior: "smooth" });
				break;
		}
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		setIsOpen(false);
	};

	return (
		<motion.header className="sticky top-0 z-50 w-full">
			<nav className="bg-[#1d1d20] shadow-lg">
				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

				<div className="relative">
					<div className="max-w-7xl 2xl:max-w-full mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
						<div className="flex items-center justify-between h-12">
							{/* Logo */}
							<div
								onClick={scrollToTop}
								className="flex-shrink-0 cursor-pointer"
							>
								<h1 className="font-['Nunito'] font-extrabold text-white text-sm sm:text-base lg:text-lg tracking-wider drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
									INTERVU ME
								</h1>
							</div>

							{/* Desktop Navigation */}
							<div className="hidden md:flex items-center space-x-8 lg:space-x-12 2xl:space-x-32">
								{navItems.map((item) => (
									<button
										key={item.name}
										onClick={() => handleNavClick(item.name)}
										className={`font-['Nunito'] font-semibold text-xs lg:text-sm xl:text-base tracking-wide transition-all duration-200
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

							{/* Desktop CTA Button */}
							<div className="hidden md:block flex-shrink-0">
								<Button
									onClick={() => navigate("/login")}
									className="px-3 lg:px-4 xl:px-5 py-1 h-8 rounded-md bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464]

                           hover:opacity-90 transition-opacity duration-200 border-0"
								>
									<span className="font-['Nunito'] font-semibold text-white text-sm lg:text-base tracking-wide whitespace-nowrap">
										Join us
									</span>
								</Button>
							</div>

							{/* Mobile menu button */}
							<div className="md:hidden">
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
							{navItems.map((item) => (
								<button
									key={item.name}
									onClick={() => handleNavClick(item.name)}
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

							{/* Mobile CTA Button */}
							<Button
								onClick={() => {
									navigate("/login");
									setIsOpen(false);
								}}
								className="w-full mt-4 h-12 rounded-md bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] 
                         hover:opacity-90 transition-opacity duration-200 border-0"
							>
								<span className="font-['Nunito'] font-semibold text-white text-base tracking-wide">
									Join us
								</span>
							</Button>
						</div>
					</motion.div>
				</div>
			</nav>
		</motion.header>
	);
};
