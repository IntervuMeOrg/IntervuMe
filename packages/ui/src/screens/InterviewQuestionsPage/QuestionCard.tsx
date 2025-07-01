import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { QuestionContentMCQ } from "./QuestionContentMCQ";
import { QuestionContentProblemSolving } from "./QuestionContentProblemSolving";
import { MCQQuestion, ProblemSolvingQuestion } from "../../types/questions";

type QuestionCardProps = {
  currentQuestionIndex: number;
  questions: (MCQQuestion | ProblemSolvingQuestion)[];
  userAnswers: Record<string, string>;
  setUserAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export const QuestionCard = ({
  currentQuestionIndex,
  questions,
  userAnswers,
  setUserAnswers,
}: QuestionCardProps) => {
  const currentQuestion = questions[currentQuestionIndex];
  const isProblemSolving = currentQuestion.type === "problem_solving";
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top when question changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    if (!isProblemSolving) {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [currentQuestionIndex, isProblemSolving]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring" as "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      key={currentQuestionIndex}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
    >
      <Card className="bg-[#e8eef2] shadow-lg border border-gray-200 overflow-hidden">
        <CardContent className={`p-4 sm:p-6 ${isProblemSolving ? "lg:p-8" : ""}`}>
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
            <div className="flex-1">
              {!isProblemSolving && (
                <>
                  <h2 className="font-['Nunito'] font-bold text-xl sm:text-2xl text-gray-800">
                    Question {currentQuestionIndex + 1}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Multiple Choice Question
                  </p>
                </>
              )}
            </div>

            {!isProblemSolving && (
              <div className="font-['Nunito'] bg-[#0667D0] text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                {currentQuestion.points} points
              </div>
            )}
          </div>

{/* Question Content */}
<div className={`
  ${isProblemSolving 
    ? "min-h-[calc(100vh-200px)] sm:min-h-[calc(100vh-220px)] md:min-h-[calc(100vh-240px)] lg:min-h-[calc(100vh-260px)] xl:min-h-[calc(100vh-280px)]" 
    : "min-h-[300px] sm:min-h-[350px]"
  }`}
>
            {currentQuestion.type === "mcq" ? (
              <QuestionContentMCQ
                questions={questions.filter((q) => q.type === "mcq") as MCQQuestion[]}
                userAnswers={userAnswers}
                setUserAnswers={setUserAnswers}
                currentQuestionIndex={currentQuestionIndex}
              />
            ) : (
              <QuestionContentProblemSolving
                questions={questions as ProblemSolvingQuestion[]}
                userAnswers={userAnswers}
                setUserAnswers={setUserAnswers}
                currentQuestionIndex={currentQuestionIndex}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};