import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { FooterLayout } from "../../components/layout/FooterLayout";
import { ContactSection } from "../../components/layout/ContactSection";
import { FeaturesSection } from "../../components/layout/FeaturesSection";
import { motion } from "framer-motion";

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
        <motion.header className="sticky top-0 z-[999] w-full h-[8vh]">
          <nav className="w-full h-[8vh] bg-[#1d1d20] shadow-md">
            <div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18]" />
            <div className="relative h-full flex items-center justify-between px-[3vw]">
              {/* Logo */}
              <div
                className="[text-shadow:0px_4px_4px_#00000040] font-['Nunito',Helvetica] font-extrabold text-white text-[1.5vw] text-center tracking-[0.05em] cursor-pointer"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                INTERVU ME
              </div>

              {/* Navigation links */}
              <div className="flex space-x-12 gap-[5vw]">
                {navItems.map((item) => (
                  <div
                    key={item.name}
                    className={`font-['Nunito',Helvetica] font-semibold text-white text-[1.2vw] text-center tracking-[1.32px] ${
                      item.active ? "underline" : "opacity-70"
                    } cursor-pointer`}
                    onClick={() => {
                      if (item.name === "Features") {
                        featuresSectionRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      } else if (item.name === "Contact Us") {
                        contactSectionRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      } else if (item.name === "Home") {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>

              {/* Join us button */}
              <Button
                onClick={() => navigate("/login")}
                className="rounded-[5px] h-[5vh] w-[10vw] [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90"
              >
                <span className="font-['Nunito',Helvetica] font-semibold text-white text-[1.2vw] text-center tracking-[1.32px]">
                  Join us
                </span>
              </Button>
            </div>
          </nav>
        </motion.header>

        {/* Hero Section */}
        <div className="bg-white w-full min-h-screen relative z-0">
          {/* Background image */}
          <img
            className="h-[100vh] object-cover w-full absolute top-0 left-0"
            alt="Rectangle"
            src="/rectangle.png"
          />

          {/* Main content */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            ref={homeSectionRef}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 15,
              mass: 0.5,
              delay: 0.3,
            }}
            className="relative z-10 pt-[15vh] flex flex-col items-center pb-[2vh] h-[75vh]"
          >
            {/* Headline */}
            <div className="text-center mb-[5vh]">
              <h1 className="font-['Nunito',Helvetica] font-black text-[#1d1d20] text-[80px] text-center tracking-[0] leading-[73.2px] [text-shadow:0_4px_4px_rgba(0,0,0,0.3)]">
                Mock Interview Assistant
                <br />
                powered by AI
              </h1>
            </div>

            {/* Process steps cards */}
            <div className="flex justify-center gap-[9vw] px-[5%] w-full pt-[55px]">
              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  className="flex flex-col items-center relative h-[41vh]"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Step image */}
                  <motion.img
                    className="w-full max-w-[90%] md:max-w-[55vw] h-[35vh] object-contain"
                    alt={step.alt}
                    src={step.image}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  {/* Step title bar */}
                  <motion.div
                    className="absolute bottom-[14px] w-[340px] h-[48px] bg-[#1d1d20] rounded-[5px] shadow-lg shadow-black/50"
                    whileHover={{
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)",
                      y: -2,
                    }}
                  >
                    <div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18] z-[1]" />
                    <div className="relative flex items-center px-1 h-full">
                      <div className="font-['Nunito',Helvetica] font-semibold text-[#e8eef2] text-[16px] px-2">
                        {step.title}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Our View section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.7 }}
          className="relative py-[10vh] bg-[#1d1d20] w-full"
        >
          <div className="max-w-[800px] mx-auto text-center px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                type: "spring",
                stiffness: 100,
                damping: 12,
              }}
              className="font-['Nunito',Helvetica] font-black text-[40px] text-[#e8eef2] mb-8"
            >
              Our View
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 12,
              }}
              className="font-['Nunito',Helvetica] text-[18px] text-[#e8eef2] leading-[1.6] mb-12"
            >
              The goal of this project is to create a personalized mock
              interview assistant that generates tailored questions, adapts
              difficulty, provides feedback, and simulates realistic interviews
              with helpful resources.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 12,
              }}
            >
              <Button
                onClick={() => navigate("/login")}
                className="rounded-[5px] h-[52px] w-[200px] [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90"
              >
                <span className="font-['Nunito',Helvetica] font-semibold text-white text-[18px]">
                  Start now
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.section>

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
