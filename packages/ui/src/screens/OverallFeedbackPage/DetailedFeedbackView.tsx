import { motion } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { DetailedQuestionsFeedback } from "./DetailedQuestionsFeedback";
import { DetailedPerformanceSection } from "./DetailedPerformanceSection";
import { DetailedFeedbackData } from "../../types/performance";
import { McqQuestion, McqOption, CodingQuestion } from "../../types/questions";
import { InterviewQuestionWithDetails } from "../../lib/interview/interview-api";
import { useParams } from "react-router-dom";
import { useInterview } from "../../lib/interview/interview-hooks";
import { FeedbackResponse } from "../../types/ai";
import { useInterviewWithQuestions } from "../../lib/interview/interview-hooks";
import { useMcqAnswers } from "../../lib/mcq/mcq-hooks";
import { useCodeSubmissionsByInterviewAndQuestion } from "../../lib/coding/coding-hooks";

type Question = McqQuestion | CodingQuestion;

interface DetailedFeedbackViewProps {
  setShowDetailedFeedback: (show: boolean) => void;
}

export const DetailedFeedbackView = ({
  setShowDetailedFeedback,
}: DetailedFeedbackViewProps) => {

  const params = useParams(); 
	const interviewId = params.id as string;
	const { data: interview } = useInterview(interviewId);
	const feedback = interview?.feedback as FeedbackResponse;
  const { data: interviewWithQuestions } = useInterviewWithQuestions(interviewId);
  const { data: userAnswers } = useMcqAnswers(interviewId);

	if (!feedback) {
		return null;
	}


  const questions: Question[] = interviewWithQuestions?.interviewQuestions?.map(
    (q: InterviewQuestionWithDetails) => {
      if (q.questionType === "mcq") {
        const mcqDetails = q.questionDetails as McqQuestion;
        const correctOption = mcqDetails.options.find(
          (opt: McqOption) => opt.isCorrect
        );
        return {
          ...mcqDetails,
          id: q.questionId,
          type: "mcq",
          correctOptionId: correctOption ? correctOption.id : "",
        } as McqQuestion;
      } else {
        const codingDetails = q.questionDetails as CodingQuestion;
        return {
          ...codingDetails,
          id: q.questionId,
          type: "coding",
        } as CodingQuestion;
      }
    }
  ) || [];


  let mcqCorrect = 0;
  let mcqTotal = 0;
  let problemSolvingCorrect = 0;
  let problemSolvingTotal = 0;

  questions.forEach((question) => {
		const userAnswer = (userAnswers || []).find((answer) => answer.questionId === question.id)?.selectedOptionId;
		if (question.type === "mcq") {
			mcqTotal++;
			if (userAnswer === question.correctOptionId) {
				mcqCorrect++;
			}
		} else if (question.type === "coding") {
			problemSolvingTotal++;
      const { data: codeSubmissions } = useCodeSubmissionsByInterviewAndQuestion(interviewId, question.id);
      // check if the user submited a code or not
      if (codeSubmissions && codeSubmissions.data && codeSubmissions.data.length > 0) {
        problemSolvingCorrect++;
      }
		}
	});
  const problemSolvingPercentage = (problemSolvingCorrect / problemSolvingTotal) * 100;
  const mcqPercentage = (mcqCorrect / mcqTotal) * 100; 
  const performanceMetrics = {
    overallPercentage: feedback.overall_performance.score_percentage,
    mcqPercentage: mcqPercentage,
    mcqCorrect: mcqCorrect,
    mcqTotal: mcqTotal,
    problemSolvingPercentage: problemSolvingPercentage,
    problemSolvingCorrect: problemSolvingCorrect,
    problemSolvingTotal: problemSolvingTotal,
  }


  const skillAssessment = {
    strengths: feedback.strengths.map((strength) => strength.details),
    improvements: feedback.critical_gaps.map((improvement) => improvement.details),
  }

  const studyRecommendations = {
    recommendations: feedback.recommendations,
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="font-['Nunito'] font-black text-[#1d1d20] text-2xl sm:text-3xl md:text-4xl">
          Detailed Feedback
        </h1>
        <Button
          onClick={() => setShowDetailedFeedback(false)}
          className="flex items-center gap-2 bg-white/50 hover:bg-white/90 text-[#1d1d20] border border-white/30 rounded-md px-4 py-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Summary</span>
        </Button>
      </div>

      {/* Performance Analysis Section */}
      <DetailedPerformanceSection
        performanceMetrics={performanceMetrics}
        skillAssessment={skillAssessment}
        studyRecommendations={studyRecommendations}
      />

      {/* Questions Feedback */}
      <DetailedQuestionsFeedback
        questions={questions}
      />
    </motion.div>
  );
};