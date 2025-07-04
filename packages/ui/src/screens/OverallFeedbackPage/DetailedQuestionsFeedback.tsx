import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon, InfoIcon } from "lucide-react";
import { QuestionContentMCQ } from "./QuestionContentMCQ";
import { QuestionContentCoding } from "./QuestionContentCoding";
import { QuestionContentPerformance } from "./QuestionContentPerformance";
import { MCQQuestion, CodingQuestion } from "../../types/questions";
import { QuestionPerformance } from "../../types/performance";

type Question = MCQQuestion | CodingQuestion;

interface DetailedQuestionsFeedbackProps {
  questions: Question[];
  userAnswers: Record<number, string>;
  questionPerformances: Record<number, QuestionPerformance>;
}

export const DetailedQuestionsFeedback = ({
  questions,
  userAnswers,
  questionPerformances,
}: DetailedQuestionsFeedbackProps) => {
  return (
    <>
      {questions.map((question: Question, index: number) => {
        const userAnswer = userAnswers[question.id];
        const isCorrect =
          question.type === "mcq"
            ? userAnswer === question.correctOptionId
            : !!(userAnswer && userAnswer.trim().length > 0);

        // Get performance data from backend
        const performance = questionPerformances[question.id];

        return (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-[#1d1d20] rounded-lg p-6 sm:p-8 shadow-xl relative overflow-hidden"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

            <div className="relative z-10">
              {/* Question Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-400" />
                  ) : (
                    <XCircleIcon className="h-6 w-6 text-red-400" />
                  )}
                  <span className="font-bold text-white text-lg">
                    Question {index + 1}
                  </span>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    question.type === "mcq"
                      ? "bg-blue-400/20 text-blue-400"
                      : "bg-purple-400/20 text-purple-400"
                  }`}
                >
                  {question.type === "mcq"
                    ? "Multiple Choice"
                    : "Coding"}
                </span>

                <span className="text-[#e8eef2] text-sm">
                  {question.points} points
                </span>
              </div>

              {/* Question Text */}
              <div className="mb-6">
                <h3 className="font-['Nunito'] font-bold text-white text-lg mb-3">
                  {question.type === "coding"
                    ? question.title
                    : "Question"}
                </h3>
                <p className="text-[#e8eef2] text-base leading-relaxed">
                  {question.type === "coding"
                  ? question.problemStatement
                : question.text}
                </p>
              </div>

              {/* MCQ Specific Content */}
              {question.type === "mcq" && (
                <QuestionContentMCQ
                  question={question}
                  userAnswer={userAnswer}
                />
              )}

              {/* Coding Specific Content */}
              {question.type === "coding" && (
                <QuestionContentCoding
                  question={question}
                  userAnswer={userAnswer}
                />
              )}

              {/* Explanation */}
              <div className="bg-blue-400/10 p-4 rounded-lg border border-blue-400/30 mb-6">
                <div className="flex items-start gap-3">
                  <InfoIcon className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-400 text-base mb-2">
                      Explanation
                    </h4>
                    <p className="text-[#e8eef2] text-sm leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Your Performance Section - Data from Backend */}
              {performance && (
                <QuestionContentPerformance
                  question={question}
                  performance={performance}
                  isCorrect={isCorrect}
                />
              )}
            </div>
          </motion.div>
        );
      })}
    </>
  );
};