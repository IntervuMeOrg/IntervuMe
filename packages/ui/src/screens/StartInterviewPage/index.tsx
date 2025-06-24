import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Textarea } from "../../components/ui/textarea";
import { NavbarLayout } from "../../components/layout/NavbarLayout";
import { motion } from "framer-motion";
import { FileTextIcon, ClipboardIcon, CheckCircleIcon } from "lucide-react";

export const StartInterviewPage = (): JSX.Element => {
  // global counter
  const [count, setCount] = useState(0);
  // State for active navigation item tracking
  const activeNavItem = "";
  // State for logged in user (simulated)
  const [userName, setUserName] = useState("Mohamed Essam");
  // Navigation hook for routing
  const navigate = useNavigate();
  // State for custom job description
  const [jobDescription, setJobDescription] = useState("");
  // State for selected template
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  // State for selected template category
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // State for input method (custom or template)
  const [inputMethod, setInputMethod] = useState<"custom" | "template">(
    "custom"
  );

  // Template categories and items
  const templates = [
    {
      category: "Software Engineering",
      items: [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Mobile Developer",
      ],
      descriptions: [
        "Develop user interfaces using React, Angular, or Vue. Implement responsive designs and optimize web performance.",
        "Build server-side applications using Node.js, Python, or Java. Design and implement APIs and database schemas.",
        "Create end-to-end applications handling both frontend and backend development. Coordinate between different system layers.",
        "Develop native or cross-platform mobile applications for iOS and Android using React Native, Flutter, or native technologies.",
      ],
    },
    {
      category: "Dev Ops",
      items: ["DevOps Engineer", "Site Reliability Engineer", "Cloud Engineer"],
      descriptions: [
        "Implement CI/CD pipelines and automate deployment processes. Manage infrastructure as code using tools like Terraform or Ansible.",
        "Ensure system reliability, availability, and performance. Implement monitoring and alerting systems.",
        "Design and implement cloud infrastructure on AWS, Azure, or GCP. Optimize cloud resources and implement security best practices.",
      ],
    },
    {
      category: "Back End",
      items: [
        "Java Developer",
        "Python Developer",
        "Node.js Developer",
        ".NET Developer",
      ],
      descriptions: [
        "Develop enterprise applications using Java and related frameworks like Spring. Design and implement RESTful APIs.",
        "Build backend services using Python and frameworks like Django or Flask. Implement data processing pipelines.",
        "Create scalable server-side applications using Node.js and Express. Implement real-time features using WebSockets.",
        "Develop enterprise applications using .NET Core or Framework. Implement microservices architecture.",
      ],
    },
    {
      category: "Google SW-1",
      items: ["Software Engineer L3", "Software Engineer L4"],
      descriptions: [
        "Entry-level software engineer position at Google. Focus on implementing features and fixing bugs under supervision.",
        "Mid-level software engineer position at Google. Design and implement medium-sized features independently.",
      ],
    },
    {
      category: "Amazon SW-2",
      items: ["SDE I", "SDE II"],
      descriptions: [
        "Entry-level software development engineer at Amazon. Implement well-defined features and participate in code reviews.",
        "Mid-level software development engineer at Amazon. Design and implement complex features and mentor junior engineers.",
      ],
    },
  ];

  // Handle template selection
  const handleTemplateSelect = (template: string, categoryIndex: number) => {
    setSelectedTemplate(template);
    const templateIndex = templates[categoryIndex].items.findIndex(
      (item) => item === template
    );
    const description = templates[categoryIndex].descriptions[templateIndex];
    setJobDescription(description);
  };

  // Handle starting the interview
  const handleStartInterview = () => {
    // Log interview details
    console.log(
      "Starting interview with:",
      selectedTemplate || "Custom Job Description"
    );
    console.log("Job Description:", jobDescription);
    window.scrollTo(0, 0);
    // Navigate to interview questions page with the interview data
    navigate("/interview-questions", {
      state: {
        title: selectedTemplate || "Custom Job Interview",
        jobDescription: jobDescription,
        totalTime: 45 * 60, // 45 minutes in seconds
        // You can add more data here as needed
      },
    });
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    }),
  };

  return (
    <NavbarLayout activeNavItem={activeNavItem} userName={userName}>
      <main className="bg-white w-full relative min-h-screen">
        {/* Background image */}
        <img
          className="fixed w-full h-full object-cover"
          alt="Rectangle"
          src="/rectangle.png"
        />

        {/* Main Content */}
        <div className="relative z-10 px-[8vw] py-[5vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-[3.5vh]"
          >
            <h1 className="font-['Nunito',Helvetica] font-black text-[#1d1d20] text-[1.8rem] mt-[-7px] tracking-[0] leading-tight [text-shadow:0_4px_4px_rgba(0,0,0,0.2)]">
              Start Your Interview
            </h1>
            <p className="font-['Nunito',Helvetica] text-[0.9rem] text-[#1d1d20] mt-1 max-w-[800px] mx-auto">
              Enter your job description or select from our templates to get
              started with a personalized interview experience.
            </p>
          </motion.div>

          {/* Input Method Selection */}
          {/* Combined Card with Input Method Selection and Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[1000px] mx-auto mb-[2vh]"
          >
            <Card className="bg-[#E8EEF2] shadow-lg border-0 overflow-hidden">
              <CardContent className="p-6">
                {/* Input Method Selection Buttons - Now Inside Card */}
                <div className="flex justify-center gap-6 mb-5">
                  <Button
                    id="card-job-section"
                    className={`rounded-[5px] h-[6vh] w-[19vw] min-w-60 ${
                      inputMethod === "custom"
                        ? "[background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] text-white"
                        : "bg-white text-[#1d1d20] border border-[#1d1d20]"
                    } hover:opacity-90 transition-all duration-300`}
                    onClick={() => setInputMethod("custom")}
                  >
                    <FileTextIcon className="mr-2 h-5 w-5" />
                    <span className="font-['Nunito',Helvetica] font-semibold text-[1.1rem]">
                      Custom Description
                    </span>
                  </Button>
                  <Button
                    className={`rounded-[5px] h-[6vh] w-[19vw] min-w-60  ${
                      inputMethod === "template"
                        ? "[background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] text-white"
                        : "bg-white text-[#1d1d20] border border-[#1d1d20]"
                    } hover:opacity-90 transition-all duration-100`}
                    onClick={() => {
                      setTimeout(() => {
                        document
                          .getElementById("card-job-section")
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      });
                      setInputMethod("template");
                    }}
                  >
                    <ClipboardIcon className="mr-2 h-5 w-5" />
                    <span className="font-['Nunito',Helvetica] font-semibold text-[1.1rem]">
                      Use Template
                    </span>
                  </Button>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-300 mb-4"></div>

                {/* Custom Job Description Input */}
                {inputMethod === "custom" && (
                  <div>
                    <h2 className="font-['Nunito',Helvetica] font-bold text-[1.5rem] mb-4 text-[#1d1d20]">
                      Enter Job Description
                    </h2>
                    <p className="text-[#666] mb-6">
                      Provide details about the position you're preparing for.
                      Include key responsibilities, required skills, and any
                      specific areas you want to focus on during the interview.
                    </p>
                    <Textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Enter the job description here..."
                      className="bg-gray-50 min-h-[200px] resize-y border-[#ccc] focus-visible:ring-[#0667D0] mb-6"
                    />
                    <Button
                      onClick={handleStartInterview}
                      className="w-full h-[50px] [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90 transition-all duration-300"
                      disabled={!jobDescription.trim()}
                    >
                      <span className="font-['Nunito',Helvetica] font-semibold text-white text-[1.1rem]">
                        Start Interview
                      </span>
                    </Button>
                  </div>
                )}

                {/* Template Selection */}
                {inputMethod === "template" && (
                  <div className="overflow-visible">
                    <h2 className="font-['Nunito',Helvetica] font-bold text-[1.5rem] mb-4 text-[#1d1d20]">
                      Select a Template
                    </h2>
                    <p className="text-[#666] mb-6">
                      Choose from our pre-defined job templates to quickly start
                      an interview tailored to specific roles and companies.
                    </p>

                    {/* Template Categories */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {templates.map((templateCategory, categoryIndex) => (
                        <motion.div
                          key={templateCategory.category}
                          custom={categoryIndex}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover={{ scale: 1.03 }}
                          className={`cursor-pointer p-4 rounded-lg border-2 ${
                            selectedCategory === templateCategory.category
                              ? "border-[#0667D0]  bg-blue-50"
                              : "border-gray-300 hover:border-[#0667D0] hover:bg-blue-50"
                          } transition-all duration-200`}
                          onClick={() => {
                            // check if counter == 0
                            if (count == 0) {
                              setTimeout(() => {
                                document
                                  .getElementById("template-header")
                                  ?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                  });
                              });
                              setCount(1);
                            }
                            setSelectedCategory(templateCategory.category);
                          }}
                        >
                          <h3
                            id="template-header"
                            className="font-['Nunito',Helvetica] font-bold text-[1.1rem] text-[#1d1d20]"
                          >
                            {templateCategory.category}
                          </h3>
                          <p className="text-[#666] text-sm mt-1">
                            {templateCategory.items.length} templates
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Template Items */}
                    {selectedCategory && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-300 pt-6 overflow-visible"
                      >
                        <h3 className="font-['Nunito',Helvetica] font-bold text-[1.2rem] mb-4 text-[#1d1d20]">
                          {selectedCategory} Templates
                        </h3>
                        <div className="space-y-3">
                          {templates
                            .find((t) => t.category === selectedCategory)
                            ?.items.map((template, index) => {
                              const categoryIndex = templates.findIndex(
                                (t) => t.category === selectedCategory
                              );
                              const isSelected = selectedTemplate === template;
                              return (
                                <motion.div
                                  key={template}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className={`flex items-center p-3 rounded-lg cursor-pointer ${
                                    isSelected
                                      ? "bg-blue-100 border-2 border-[#0667D0]"
                                      : "hover:bg-gray-300 border border-gray-300"
                                  } transition-all duration-200`}
                                  onClick={() => {
                                    if (count == 1) {
                                      setTimeout(() => {
                                        document
                                          .getElementById(
                                            "template-description-header"
                                          )
                                          ?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "start",
                                          });
                                      });
                                      setCount(2);
                                    }
                                    handleTemplateSelect(
                                      template,
                                      categoryIndex
                                    );
                                  }}
                                >
                                  <div className="flex-1">
                                    <h4
                                      id="template-description-header"
                                      className="font-['Nunito',Helvetica] font-bold text-[1rem] text-[#1d1d20]"
                                    >
                                      {template}
                                    </h4>
                                    <p className="text-[#666] text-sm mt-1">
                                      {templates[categoryIndex].descriptions[
                                        index
                                      ].substring(0, 80)}
                                      ...
                                    </p>
                                  </div>
                                  {isSelected && (
                                    <CheckCircleIcon className="h-6 w-6 text-[#0667D0] ml-2" />
                                  )}
                                </motion.div>
                              );
                            })}
                        </div>
                      </motion.div>
                    )}

                    {/* Preview of selected template */}
                    {selectedTemplate && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 border-t border-gray-300 pt-6"
                      >
                        <h3 className="font-['Nunito',Helvetica] font-bold text-[1.2rem] mb-4 text-[#1d1d20]">
                          Template Preview
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
                          <h4 className="font-['Nunito',Helvetica] font-bold text-[1rem] text-[#1d1d20] mb-2">
                            Job Description
                          </h4>
                          <p className="text-[#444] whitespace-pre-line">
                            {jobDescription}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    <Button
                      onClick={handleStartInterview}
                      className="w-full h-[50px] mt-8 [background:linear-gradient(90deg,#0667D0_31%,#054E9D_59%,#033464_98%)] hover:opacity-90 transition-all duration-300"
                      disabled={!selectedTemplate}
                    >
                      <span className="font-['Nunito',Helvetica] font-semibold text-white text-[1.1rem]">
                        Start Interview
                      </span>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </NavbarLayout>
  );
};

export default StartInterviewPage;
