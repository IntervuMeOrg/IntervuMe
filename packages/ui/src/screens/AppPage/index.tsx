import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { FooterLayout } from "../../components/layout/FooterLayout";
import { ContactSection } from "../../components/layout/ContactSection";
import { FAQSection } from "../../components/layout/FAQSection";
import { AppHeroSection } from "./AppHeroSection";
import { AppDashboardSection } from "./AppDashboardSection";

export const AppPage = (): JSX.Element => {
	// State for active navigation item tracking
	const [activeNavItem, setActiveNavItem] = useState("Home");
	// Reference to features section for scroll detection
	const historySectionRef = useRef<HTMLElement>(null);
	// Reference to contact section for scroll detection
	const contactSectionRef = useRef<HTMLElement>(null);
	// Reference to FAQ section for scroll detection
	const faqSectionRef = useRef<HTMLElement>(null);
	// Reference to Home section for scroll detection
	const homeSectionRef = useRef<HTMLElement>(null);
	// State for logged in user (simulated)
	const [userName, setUserName] = useState("Mohamed Essam");
	// Navigation hook for routing
	const navigate = useNavigate();

	// Set up intersection observer to update active nav item based on scroll position
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (
						entry.target === contactSectionRef.current &&
						entry.isIntersecting
					) {
						setActiveNavItem("Contact Us");
					} else if (
						entry.target === historySectionRef.current &&
						entry.isIntersecting
					) {
						setActiveNavItem("History");
					} else if (
						entry.target === faqSectionRef.current &&
						entry.isIntersecting
					) {
						setActiveNavItem("FAQ");
					} else if (
						entry.target === homeSectionRef.current &&
						entry.isIntersecting
					) {
						setActiveNavItem("Home");
					}
				});
			},
			{ rootMargin: "-50% 0px", threshold: 0 }
		);

		if (historySectionRef.current) {
			observer.observe(historySectionRef.current);
		}
		if (contactSectionRef.current) {
			observer.observe(contactSectionRef.current);
		}
		if (faqSectionRef.current) {
			observer.observe(faqSectionRef.current);
		}
		if (homeSectionRef.current) {
			observer.observe(homeSectionRef.current);
		}

		// Clean up observer on component unmount
		return () => observer.disconnect();
	}, []);

	// Navigation items with dynamic active state
	const navItems = [
		{ name: "Home", active: activeNavItem === "Home" },
		{ name: "History", active: activeNavItem === "History" },
		{ name: "Contact Us", active: activeNavItem === "Contact Us" },
		{ name: "FAQ", active: activeNavItem === "FAQ" },
	];
	// Process steps data for the main section
	const steps = [
		{
			id: 1,
			title: "Start Mock Interview",
			image: "/resume-amico-2.png",
			alt: "Resume amico",
		},
		{
			id: 2,
			title: "View Full History",
			image: "/customer-feedback-bro-3.png",
			alt: "Customer feedback",
		},
		{
			id: 3,
			title: "Interview Tips",
			image: "/helpful-sign-bro-1.png",
			alt: "Helpful sign bro",
		},
	];

	// Add contact information constants
	const contactInfo = {
		phone: "+1012 3456 789",
		email: "demo@gmail.com",
		address: "132 Dartmouth Street Boston, Massachusetts 02156 United States",
	};
	const subjectOptions = [
		{ id: "general1", label: "General Inquiry", checked: true },
		{ id: "general2", label: "General Inquiry", checked: false },
		{ id: "general3", label: "General Inquiry", checked: false },
	];

	const faqItems = [
		{
			id: "prep1",
			question: "How should I prepare for a technical interview?",
			answer:
				"Review core concepts, practice coding challenges on platforms like LeetCode, and mock interviews using our simulator. Focus on problem-solving approaches and communication skills.",
		},
		{
			id: "retake1",
			question: "Can I retake failed interviews?",
			answer:
				"Yes! You can retake any interview 3 times. Review your previous attempts' recordings and feedback to improve.",
		},
		{
			id: "feedback1",
			question: "How long does feedback take?",
			answer:
				"AI feedback is instant. For expert reviews, allow 24-48 hours. Check your history page for updates.",
		},
		{
			id: "types1",
			question: "What types of interviews do you support?",
			answer:
				"We offer technical interviews (coding challenges, system design), behavioral interviews, and role-specific scenarios (Frontend, Backend, DevOps). New types added regularly!",
		},
	];

	// Custom navigation handler for scrolling to sections
	const handleNavItemClick = (item: { name: string; active: boolean }) => {
		if (item.name === "History") {
			historySectionRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		} else if (item.name === "Contact Us") {
			contactSectionRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		} else if (item.name === "FAQ") {
			faqSectionRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		} else if (item.name === "Home") {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	};

	return (
		<NavbarLayout
			activeNavItem={activeNavItem}
			userName={userName}
			navItems={navItems}
			onNavItemClick={handleNavItemClick}
		>
			<FooterLayout
				navItems={navItems}
				contactInfo={contactInfo}
				sectionRefs={{
					home: homeSectionRef,
					history: historySectionRef,
					contact: contactSectionRef,
					faq: faqSectionRef,
				}}
			>
				<main className="bg-white w-full relative">
					{/* Hero Section */}
					<AppHeroSection
						userName={userName}
						navigate={navigate}
						homeSectionRef={homeSectionRef}
						steps={steps}
					/>

					{/* Your Dashboard section */}
					<AppDashboardSection historySectionRef={historySectionRef} />

					{/* Contact Section */}
					<ContactSection
						contactSectionRef={contactSectionRef}
						contactInfo={contactInfo}
						subjectOptions={subjectOptions}
					/>

					{/* FAQ Section */}
					<FAQSection faqSectionRef={faqSectionRef} faqItems={faqItems} />
				</main>
			</FooterLayout>
		</NavbarLayout>
	);
};

export default AppPage;
