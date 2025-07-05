import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon, InfoIcon } from "lucide-react";
import { QuestionContentMCQ } from "./QuestionContentMCQ";
import { QuestionContentCoding } from "./QuestionContentCoding";
import { McqQuestion, CodingQuestion } from "../../types/questions";
import { useParams } from "react-router-dom";
import { useMcqAnswers } from "../../lib/mcq/mcq-hooks";
import { useCodeSubmissionsByInterviewAndQuestion } from "../../lib/coding/coding-hooks";
import { CodeSubmission } from "../../lib/coding/coding-api";

type Question = McqQuestion | CodingQuestion;

interface DetailedQuestionsFeedbackProps {
  questions: Question[];
}

export const DetailedQuestionsFeedback = ({
  questions,
}: DetailedQuestionsFeedbackProps) => {
  const params = useParams(); 
	const interviewId = params.id as string;
  const { data: userAnswers } = useMcqAnswers(interviewId);
  return (
    <>
      {questions.map((question: Question, index: number) => {
		  const userAnswer = (userAnswers || []).find((answer) => answer.questionId === question.id)?.selectedOptionId;
      const { data: codeSubmissions } = useCodeSubmissionsByInterviewAndQuestion(interviewId, question.id);
      const userCode = codeSubmissions?.data?.reduce((best: CodeSubmission | null, submission: CodeSubmission) => {
        if (!best || submission.score > best.score) return submission;
        return best;
      }, null)?.code;
      const isCorrect = question.type === "mcq" 
        ? userAnswer === question.correctOptionId
        : codeSubmissions?.data?.some(submission => question.type === "coding" && submission.score === question.testCases?.length);

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



              {/* MCQ Specific Content */}
              {question.type === "mcq" && (
                <QuestionContentMCQ
                  question={question}
                  userAnswer={userAnswer || ""}
                />
              )}

              {/* Coding Specific Content */}
              {question.type === "coding" && (
                <QuestionContentCoding
                  question={question}
                  userAnswer={userCode || ""}
                />
              )}


            </div>
          </motion.div>
        );
      })}
    </>
  );
};