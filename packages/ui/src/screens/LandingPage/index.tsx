import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FooterLayout } from "../../components/layout/FooterLayout";
import { ContactSection } from "../../components/layout/ContactSection";
import { FeaturesSection } from "../../components/layout/FeaturesSection";
import { OurViewSection } from "./OurViewSection";
import { NavigationBar } from "./NavigationBar";
import { HeroSection } from "./HeroSection";

export const LandingPage = (): JSX.Element => {
  // Navigation hook for routing
  const navigate = useNavigate();
  // State for active navigation item tracking
  const [activeNavItem, setActiveNavItem] = useState("Home");
  // Reference to features section for scroll detection
  const featuresSectionRef = useRef<HTMLElement>(null);
  // Reference to contact section for scroll detection
  const contactSectionRef = useRef<HTMLElement>(null);
  // Reference to Home section for scroll detection
  const homeSectionRef = useRef<HTMLElement>(null);

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
            entry.target === featuresSectionRef.current &&
            entry.isIntersecting
          ) {
            setActiveNavItem("Features");
          } else if (
            !entry.isIntersecting &&
            entry.target === featuresSectionRef.current
          ) {
            setActiveNavItem("Home");
          }
        });
      },
      { rootMargin: "-50% 0px", threshold: 0 }
    );

    if (featuresSectionRef.current) {
      observer.observe(featuresSectionRef.current);
    }
    if (contactSectionRef.current) {
      observer.observe(contactSectionRef.current);
    }

    // Clean up observer on component unmount
    return () => observer.disconnect();
  }, []);

  // Navigation items with dynamic active state
  const navItems = [
    { name: "Home", active: activeNavItem === "Home" },
    { name: "Features", active: activeNavItem === "Features" },
    { name: "Contact Us", active: activeNavItem === "Contact Us" },
  ];

  // Process steps data for the main section
  const steps = [
    {
      id: 1,
      title: "Step 1: Upload Job Description",
      image: "/image-upload-bro-1.png",
      alt: "Image upload bro",
    },
    {
      id: 2,
      title: "Step 2: Customize Interview",
      image: "/interview-bro-2.png",
      alt: "Interview bro",
    },
    {
      id: 3,
      title: "Step 3: Get Real-Time Feedback",
      image: "/customer-feedback-bro-2.png",
      alt: "Customer feedback",
    },
  ];

  // Feature cards data with short and long descriptions
  const featureCards = [
    {
      id: 1,
      title: "Question Generation",
      shortDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem enim leo.",
      longDescription: `Resume Analysis: The AI will analyze the user's resume to extract key skills and experiences, generating relevant questions that reflect the candidate's background.\n\nQuestion Types: The system will support multiple question formats, including coding challenges, MCQs, and problem-solving tasks, with difficulty levels adjusted based on the user's qualifications.`,
      image: "/questions-bro-2.png",
    },
    {
      id: 2,
      title: "Interview Simulation",
      shortDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem enim leo.",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem enim leo.",
      image: "/interview-bro-3.png",
    },
    {
      id: 3,
      title: "Feedback and Explanation",
      shortDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem enim leo.",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem enim leo.",
      image: "/feedback-bro-2.png",
    },
    {
      id: 4,
      title: "Resource Integration",
      shortDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem enim leo.",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem enim leo.",
      image: "/asset-selection-bro-2.png",
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
  return (
		<FooterLayout
			navItems={navItems}
			contactInfo={contactInfo}
			sectionRefs={{
				home: homeSectionRef,
				contact: contactSectionRef,
				features: featuresSectionRef,
			}}
		>
			<main className="bg-white w-full relative">
				{/* Navigation bar */}
				<NavigationBar
					navigate={navigate}
					navItems={navItems}
					featuresSectionRef={featuresSectionRef}
					contactSectionRef={contactSectionRef}
				/>

				{/* Hero Section */}
				<HeroSection homeSectionRef={homeSectionRef} steps={steps} />

				{/* Our View section */}
				<OurViewSection />

				{/* Features Section */}
				<FeaturesSection
					featuresSectionRef={featuresSectionRef}
					featureCards={featureCards}
				/>

				{/* Contact Section */}
				<ContactSection
					contactSectionRef={contactSectionRef}
					contactInfo={contactInfo}
					subjectOptions={subjectOptions}
				/>
			</main>
		</FooterLayout>
	);
};

export default LandingPage;
