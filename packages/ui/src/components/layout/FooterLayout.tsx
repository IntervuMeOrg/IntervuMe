import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
	InstagramIcon,
	MailIcon,
	MapPinIcon,
	PhoneIcon,
	TwitterIcon,
	YoutubeIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type NavItem = {
	name: string;
	active: boolean;
	path?: string;
};

type ContactInfo = {
	phone: string;
	email: string;
	address: string;
};

type FooterLayoutProps = {
	children: ReactNode;
	navItems: NavItem[];
	contactInfo: ContactInfo;
	onNavItemClick?: (item: NavItem) => void;
	companyDescription?: string;
	sectionRefs?: {
		home?: React.RefObject<HTMLElement>;
		history?: React.RefObject<HTMLElement>;
		contact?: React.RefObject<HTMLElement>;
		faq?: React.RefObject<HTMLElement>;
		features?: React.RefObject<HTMLElement>;
	};
};

export const FooterLayout = ({
	children,
	navItems,
	contactInfo,
	onNavItemClick,
	companyDescription = "Personalized mock interview assistant powered by AI to help you prepare for your next tech interview.",
	sectionRefs,
}: FooterLayoutProps): JSX.Element => {
	// Default navigation handler if none provided
	const handleNavItemClick = (item: NavItem) => {
		if (onNavItemClick) {
			onNavItemClick(item);
			return;
		}

		// Default navigation behavior using section refs if available
		if (item.name === "History" && sectionRefs?.history) {
			sectionRefs.history.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		} else if (item.name === "Contact Us" && sectionRefs?.contact) {
			sectionRefs.contact.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		} else if (item.name === "FAQ" && sectionRefs?.faq) {
			sectionRefs.faq.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		} else if (item.name === "Home" && sectionRefs?.home) {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		} else if (item.name === "Features" && sectionRefs?.features) {
			sectionRefs.features.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	return (
		<div className="flex flex-col min-h-screen">
			{/* Main content */}
			<div className="flex-1">{children}</div>

			{/* Footer Section */}
			<motion.footer
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="w-full bg-[#1d1d20] relative"
			>
				{/* Gradient overlay */}
				<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18] rounded-[3px]" />

				{/* Footer Content */}
				<div className="relative z-10">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
							{/* Company Info */}
							<div>
								<h3 className="font-['Nunito'] font-bold text-white text-base sm:text-lg 3xl:text-2xl mb-2">
									INTERVU ME
								</h3>
								<p className="font-['Nunito'] text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg mb-4 leading-relaxed">
									{companyDescription}
								</p>
								<div className="flex gap-3">
									{[TwitterIcon, InstagramIcon, YoutubeIcon].map(
										(Icon, index) => (
											<motion.a
												key={index}
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.95 }}
												href="#"
												className="w-8 h-8 3xl:w-12 3xl:h-12 bg-black/50 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
											>
												<Icon className="w-3.5 h-3.5 3xl:w-5 3xl:h-5 text-white" />
											</motion.a>
										)
									)}
								</div>
							</div>

							{/* Quick Links */}
							<div>
								<h3 className="font-['Nunito'] font-bold text-white text-base sm:text-lg 3xl:text-2xl mb-2">
									Quick Links
								</h3>
								<ul className="space-y-2">
									{navItems.map((item) => (
										<li key={item.name}>
											<button
												className="font-['Nunito'] text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg hover:text-white transition-colors cursor-pointer text-left"
												onClick={() => handleNavItemClick(item)}
											>
												{item.name}
											</button>
										</li>
									))}
									<li>
										<a
											href="#"
											className="font-['Nunito'] text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg hover:text-white transition-colors"
										>
											Privacy Policy
										</a>
									</li>
									<li>
										<a
											href="#"
											className="font-['Nunito'] text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg hover:text-white transition-colors"
										>
											Terms of Service
										</a>
									</li>
								</ul>
							</div>

							{/* Contact Info */}
							<div>
								<h3 className="font-['Nunito'] font-bold text-white text-base sm:text-lg 3xl:text-2xl mb-2">
									Contact Us
								</h3>
								<div className="space-y-3.5">
									<div className="flex items-center gap-3">
										<PhoneIcon className="w-3.5 h-3.5 3xl:w-5 3xl:h-5   text-white flex-shrink-0" />
										<span className="font-['Nunito'] text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg">
											{contactInfo.phone}
										</span>
									</div>
									<div className="flex items-center gap-3">
										<MailIcon className="w-3.5 h-3.5 3xl:w-5 3xl:h-5 text-white flex-shrink-0" />
										<span className="font-['Nunito'] text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg break-all">
											{contactInfo.email}
										</span>
									</div>
									<div className="flex gap-3">
										<MapPinIcon className="w-3.5 h-3.5 3xl:w-5 3xl:h-5 text-white flex-shrink-0 mt-0.5" />
										<span className="font-['Nunito'] text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg">
											{contactInfo.address}
										</span>
									</div>
								</div>
							</div>

							{/* Newsletter */}
							<div>
								<h3 className="font-['Nunito'] font-bold text-white text-base sm:text-lg 3xl:text-2xl mb-1">
									Subscribe
								</h3>
								<p className="font-['Nunito'] text-[#c7d3dd] text-xs sm:text-sm 3xl:text-lg mb-4">
									Subscribe to our newsletter for the latest updates and
									features.
								</p>
								<div className="flex flex-col gap-3">
									<Input
										placeholder="Your email"
										className="bg-black/50 border-0 text-white h-9 3xl:h-11 text-sm 3xl:text-lg focus-visible:ring-1 focus-visible:ring-white/30 placeholder:text-gray-400"
									/>
									<Button className="h-9 3xl:h-11 px-4 text-xs sm:text-sm 3xl:text-lg bg-gradient-to-r from-[#0667D0] via-[#054E9D] to-[#033464] hover:opacity-90 transition-opacity">
										Subscribe
									</Button>
								</div>
							</div>
						</div>

						{/* Divider */}
						<div className="border-t border-white/10 my-8"></div>

						{/* Copyright */}
						<div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
							<p className="font-['Nunito'] text-[#c7d3dd] text-[10px] sm:text-xs 3xl:text-[1rem]">
								© {new Date().getFullYear()} INTERVU ME. All rights reserved.
							</p>
							<p className="font-['Nunito'] text-[#c7d3dd] text-[10px] sm:text-xs 3xl:text-[1rem]">
								Designed with ❤️ for tech interviews
							</p>
						</div>
					</div>
				</div>
			</motion.footer>
		</div>
	);
};
