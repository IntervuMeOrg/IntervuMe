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
				transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.7 }}
				className="w-full bg-[#1d1d20] relative z-10"
			>
				<div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18] z-[1]" />

				{/* Footer Content */}
				<div className="container mx-auto px-[3vw] py-[5vh] relative z-10">
					<div className="grid grid-cols-4 gap-8 mb-8">
						{/* Company Info */}
						<div className="col-span-1">
							<h3 className="font-['Nunito',Helvetica] font-bold text-white text-[1.3vw] mb-4">
								INTERVU ME
							</h3>
							<p className="font-['Nunito',Helvetica] text-[#c7d3dd] text-[0.9vw] mb-4">
								{companyDescription}
							</p>
							<div className="flex space-x-3 mt-4">
								<motion.a
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
									href="#"
									className="w-[35px] h-[35px] bg-[#1a1a1a] rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
								>
									<TwitterIcon className="w-4 h-4 text-white" />
								</motion.a>
								<motion.a
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
									href="#"
									className="w-[35px] h-[35px] bg-[#1a1a1a] rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
								>
									<InstagramIcon className="w-4 h-4 text-white" />
								</motion.a>
								<motion.a
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
									href="#"
									className="w-[35px] h-[35px] bg-[#1a1a1a] rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
								>
									<YoutubeIcon className="w-4 h-4 text-white" />
								</motion.a>
							</div>
						</div>

						{/* Quick Links */}
						<div className="col-span-1">
							<h3 className="font-['Nunito',Helvetica] font-bold text-white text-[1.3vw] mb-4">
								Quick Links
							</h3>
							<ul className="space-y-2">
								{navItems.map((item) => (
									<li key={item.name}>
										<a
											className="font-['Nunito',Helvetica] text-[#c7d3dd] text-[0.9vw] hover:text-white transition-colors cursor-pointer select-none"
											onClick={() => handleNavItemClick(item)}
										>
											{item.name}
										</a>
									</li>
								))}
								<li>
									<a
										href="#"
										className="font-['Nunito',Helvetica] text-[#c7d3dd] text-[0.9vw] hover:text-white transition-colors"
									>
										Privacy Policy
									</a>
								</li>
								<li>
									<a
										href="#"
										className="font-['Nunito',Helvetica] text-[#c7d3dd] text-[0.9vw] hover:text-white transition-colors"
									>
										Terms of Service
									</a>
								</li>
							</ul>
						</div>

						{/* Contact Info */}
						<div className="col-span-1">
							<h3 className="font-['Nunito',Helvetica] font-bold text-white text-[1.3vw] mb-4">
								Contact Us
							</h3>
							<div className="space-y-3">
								<div className="flex items-center gap-2">
									<PhoneIcon className="w-4 h-4 text-white" />
									<span className="font-['Nunito',Helvetica] text-[#c7d3dd] text-[0.9vw]">
										{contactInfo.phone}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<MailIcon className="w-4 h-4 text-white" />
									<span className="font-['Nunito',Helvetica] text-[#c7d3dd] text-[0.9vw]">
										{contactInfo.email}
									</span>
								</div>
								<div className="flex gap-2">
									<MapPinIcon className="w-4 h-4 text-white flex-shrink-0 mt-1" />
									<span className="font-['Nunito',Helvetica] text-[#c7d3dd] text-[0.9vw]">
										{contactInfo.address}
									</span>
								</div>
							</div>
						</div>

						{/* Newsletter */}
						<div className="col-span-1 ">
							<h3 className="font-['Nunito',Helvetica] font-bold text-white text-[1.3vw] mb-4">
								Subscribe
							</h3>
							<p className="font-['Nunito',Helvetica] text-[#c7d3dd] text-[0.9vw] mb-4">
								Subscribe to our newsletter for the latest updates and features.
							</p>
							<div className="flex flex-col gap-3">
								<Input
									placeholder="Your email"
									className="bg-[#1a1a1a] border-0 text-white h-[40px] focus-visible:ring-1 focus-visible:ring-white/30"
								/>
								<Button className="h-[40px] px-3 text-sm [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90">
									Subscribe
								</Button>
							</div>
						</div>
					</div>

					{/* Divider */}
					<div className="border-t border-white/10 my-6"></div>

					{/* Copyright */}
					<div className="flex justify-between items-center">
						<p className="font-['Nunito',Helvetica] text-[#c7d3dd] text-[0.8vw]">
							© {new Date().getFullYear()} INTERVU ME. All rights reserved.
						</p>
						<p className="font-['Nunito',Helvetica] text-[#c7d3dd] text-[0.8vw]">
							Designed with ❤️ for tech interviews
						</p>
					</div>
				</div>
			</motion.footer>
		</div>
	);
};
