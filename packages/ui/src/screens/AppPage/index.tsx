import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { FooterLayout } from "../../components/layout/FooterLayout";
import { motion } from "framer-motion";
import {
  LightbulbIcon,
  TrendingUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { ContactSection } from "../../components/layout/ContactSection";
import { FAQSection } from "../../components/layout/FAQSection";

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
  // State for active tip in carousel
  const [activeTip, setActiveTip] = useState(0);
  // Reference for carousel container
  const carouselRef = useRef<HTMLDivElement>(null);

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

  // Tips and tricks data
  const tipsAndTricks = [
    {
      title: "Research the Company",
      description:
        "Before your interview, thoroughly research the company's mission, values, products, and recent news.",
      icon: <LightbulbIcon className="h-8 w-8 text-yellow-400" />,
    },
    {
      title: "Practice STAR Method",
      description:
        "When answering behavioral questions, use the Situation, Task, Action, Result format for clear, concise responses.",
      icon: <TrendingUpIcon className="h-8 w-8 text-green-400" />,
    },
    {
      title: "Prepare Questions",
      description:
        "Have 3-5 thoughtful questions ready to ask the interviewer about the role, team, or company culture.",
      icon: <LightbulbIcon className="h-8 w-8 text-yellow-400" />,
    },
    {
      title: "Body Language Matters",
      description:
        "Maintain good posture, make appropriate eye contact, and use hand gestures naturally to appear confident.",
      icon: <TrendingUpIcon className="h-8 w-8 text-green-400" />,
    },
  ];

  // Function to navigate through tips
  const navigateTip = (direction: "next" | "prev") => {
    if (direction === "next") {
      setActiveTip((prev) =>
        prev === tipsAndTricks.length - 1 ? 0 : prev + 1
      );
    } else {
      setActiveTip((prev) =>
        prev === 0 ? tipsAndTricks.length - 1 : prev - 1
      );
    }
  };

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
          <div className="bg-white w-full min-h-screen relative z-0">
            {/* Background image */}
            <img
              className="h-[100vh] object-cover w-full absolute top-0 left-0"
              alt="Rectangle"
              src="/rectangle.png"
            />

            {/* Main content */}
            <motion.section
              id="main-section"
              ref={homeSectionRef}
              initial={{ opacity: 0, y: 20 }}
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
              {/* Headline - SVG Title */}
              <div className="text-center w-full flex flex-col items-center relative">
                <img
                  src="/get-the-tech-career-you-deserve--faster.svg"
                  alt="Get the tech career you deserve, faster"
                  className="max-w-[80%] h-auto"
                />
                {/* User greeting */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-4"
                >
                  <h2 className="font-['Nunito',Helvetica] font-bold text-[#1d1d20] text-[28px]">
                    Hello, {userName}
                  </h2>
                </motion.div>
              </div>

              {/* Process steps cards */}
              <div className="flex justify-center gap-[9vw]">
                {steps.map((step) => (
                  <motion.div
                    key={step.id}
                    className="flex flex-col items-center relative h-[41vh] cursor-pointer"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                    onClick={() => {
                      // Navigate based on step id
                      if (step.id === 1) {
                        // Start Mock Interview
                        window.scrollTo(0, 0); // Scroll to the top of the page
                        navigate("/start-interview");
                      } else if (step.id === 2) {
                        // View History
                        window.scrollTo(0, 0); // Scroll to the top of the page
                        navigate("/history");
                      } else if (step.id === 3) {
                        // Interview Tips
                        navigate("/main-page-after-login");
                        setTimeout(() => {
                          document
                            .getElementById("tipsAndTricks")
                            ?.scrollIntoView({
                              block: "start",
                              behavior: "smooth",
                            });
                        }, 0);
                      }
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
                    <div className="flex items-center justify-center w-full mt-2">
                      <motion.div
                        className="absolute bottom-[14px] w-[70vw] max-w-[340px] min-w-[180px] h-[9vw] max-h-[48px] min-h-[36px] bg-[#1d1d20] rounded-[5px] shadow-lg shadow-black/50 flex items-center justify-center"
                        whileHover={{
                          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)",
                          y: -2,
                        }}
                      >
                        <div className="absolute inset-0 [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] opacity-[0.18] z-[1]" />
                        <div className="relative flex items-center px-1 h-full w-full justify-center">
                          <div
                            className="
														font-['Nunito',Helvetica]
														font-semibold
														text-[#e8eef2]
														px-2
														text-[3.5vw]
														sm:text-[16px]
														md:text-[18px]
														lg:text-[20px]
														whitespace-nowrap
														text-center
													"
                          >
                            {step.title}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Your Dashboard section */}
          <motion.section
            ref={historySectionRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 18,
              mass: 0.7,
            }}
            className="relative py-[10vh] bg-[#1d1d20] w-full"
          >
            <div className="max-w-[1000px] mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                }}
                className="font-['Nunito',Helvetica] font-black text-[40px] text-[#e8eef2] mb-8 text-center"
              >
                Your Dashboard
              </motion.h2>

              {/* Dashboard Stats */}
              <div className="grid grid-cols-3 gap-6 mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/10 rounded-lg p-6 backdrop-blur-sm"
                >
                  <h3 className="font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-xl mb-2">
                    Interviews Completed
                  </h3>
                  <p className="font-['Nunito',Helvetica] text-[#e8eef2] text-3xl font-bold">
                    12
                  </p>
                  <p className="font-['Nunito',Helvetica] text-[#e8eef2] text-sm opacity-70 mt-2">
                    +3 this month
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/10 rounded-lg p-6 backdrop-blur-sm"
                >
                  <h3 className="font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-xl mb-2">
                    Average Score
                  </h3>
                  <p className="font-['Nunito',Helvetica] text-[#e8eef2] text-3xl font-bold">
                    85%
                  </p>
                  <p className="font-['Nunito',Helvetica] text-[#e8eef2] text-sm opacity-70 mt-2">
                    +5% from last month
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white/10 rounded-lg p-6 backdrop-blur-sm"
                >
                  <h3 className="font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-xl mb-2">
                    Skills Improved
                  </h3>
                  <p className="font-['Nunito',Helvetica] text-[#e8eef2] text-3xl font-bold">
                    8
                  </p>
                  <p className="font-['Nunito',Helvetica] text-[#e8eef2] text-sm opacity-70 mt-2">
                    Technical & Soft Skills
                  </p>
                </motion.div>
              </div>

              {/* Tips and Tricks Carousel Section */}
              <motion.div
                id="tipsAndTricks"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="w-full mb-8"
              >
                <h3 className="font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-xl mb-4">
                  Interview Tips & Tricks
                </h3>
                <div className="relative">
                  <div
                    ref={carouselRef}
                    className="bg-gradient-to-r from-[#0667D0] to-[#033464] rounded-lg p-6 shadow-lg relative overflow-hidden"
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 left-2 z-10">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/20 hover:bg-white/30 rounded-full h-8 w-8"
                        onClick={() => navigateTip("prev")}
                      >
                        <ChevronLeftIcon className="h-5 w-5 text-white" />
                      </Button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-2 z-10">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/20 hover:bg-white/30 rounded-full h-8 w-8"
                        onClick={() => navigateTip("next")}
                      >
                        <ChevronRightIcon className="h-5 w-5 text-white" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 bg-white/10 p-4 rounded-full">
                        {tipsAndTricks[activeTip].icon}
                      </div>
                      <div>
                        <h3 className="font-['Nunito',Helvetica] font-bold text-white text-xl mb-2">
                          {tipsAndTricks[activeTip].title}
                        </h3>
                        <p className="font-['Nunito',Helvetica] text-white text-sm opacity-90">
                          {tipsAndTricks[activeTip].description}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4 gap-1">
                      {tipsAndTricks.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1.5 rounded-full transition-all ${
                            index === activeTip
                              ? "w-6 bg-white"
                              : "w-1.5 bg-white/40"
                          }`}
                          onClick={() => setActiveTip(index)}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white/5 rounded-lg p-6 mb-8"
              >
                <h3 className="font-['Nunito',Helvetica] font-bold text-[#e8eef2] text-xl mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <p className="font-['Nunito',Helvetica] text-[#e8eef2]">
                      Frontend Developer Interview
                    </p>
                    <p className="font-['Nunito',Helvetica] text-[#e8eef2] opacity-70">
                      2 days ago
                    </p>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <p className="font-['Nunito',Helvetica] text-[#e8eef2]">
                      React Technical Assessment
                    </p>
                    <p className="font-['Nunito',Helvetica] text-[#e8eef2] opacity-70">
                      5 days ago
                    </p>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <p className="font-['Nunito',Helvetica] text-[#e8eef2]">
                      Behavioral Interview Practice
                    </p>
                    <p className="font-['Nunito',Helvetica] text-[#e8eef2] opacity-70">
                      1 week ago
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex justify-center gap-4"
              >
                <Button
                  className="rounded-[5px] h-[52px] px-6 [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90"
                  onClick={() => {
                    window.scrollTo(0, 0); // Reset scroll position to top
                    navigate("/start-interview");
                  }}
                >
                  <span className="font-['Nunito',Helvetica] font-semibold text-white text-[18px]">
                    Start New Interview
                  </span>
                </Button>
                <Button
                  className="rounded-[5px] h-[52px] px-6 bg-white/10 hover:bg-white/20"
                  onClick={() => {
                    window.scrollTo(0, 0); // Reset scroll position to top
                    navigate("/history");
                  }}
                >
                  <span className="font-['Nunito',Helvetica] font-semibold text-white text-[18px]">
                    View Full History
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.section>

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
