import { motion } from "framer-motion";
import { BarChart3Icon, Star, AlertTriangle, Lightbulb } from "lucide-react";
import { useInterview } from "../../lib/interview/interview-hooks";
import { useParams } from "react-router-dom";
import { FeedbackResponse } from "../../types/ai";

type ResultSummaryOverallFeedbackProps = {
};

export const ResultSummaryOverallFeedback = ({
}: ResultSummaryOverallFeedbackProps) => {
	const params = useParams(); 
	const interviewId = params.id as string;
	const { data: interview } = useInterview(interviewId);
	const feedback = interview?.feedback as FeedbackResponse;

	if (!feedback) {
		return null;
	}

	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 20 },
				visible: { opacity: 1, y: 0 },
			}}
			transition={{ delay: 0.85 }}
			className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 mb-8 shadow-xl"
		>
			<div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
				<BarChart3Icon className="h-8 w-8 text-[#0667D0]" />
				<h3 className="font-['Nunito'] font-bold text-white text-2xl tracking-wide">
					Overall Feedback
				</h3>
			</div>

			<div className="space-y-8">
				{/* Overall Performance */}
				<div className="bg-blue-500/5 rounded-lg p-6 border border-blue-500/20">
					<h4 className="font-semibold text-blue-300 text-lg mb-4 flex items-center gap-3">
						<BarChart3Icon className="h-6 w-6" />
						Overall Performance
					</h4>
					<p className="text-white/90 text-base leading-relaxed">
						{feedback.overall_performance.summary}
					</p>
				</div>

				{/* Strengths */}
				<div className="bg-emerald-500/5 rounded-lg p-6 border border-emerald-500/20">
					<h4 className="font-semibold text-emerald-300 text-lg mb-4 flex items-center gap-3">
						<Star className="h-6 w-6" />
						Key Strengths
					</h4>
					<ul className="text-white/90 text-base space-y-4">
						{feedback.strengths.map((strength, index) => (
							<li key={index} className="flex items-center gap-3">
								<div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 flex-shrink-0" />
								<span className="leading-relaxed">{strength.details}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Areas for Improvement */}
				<div className="bg-amber-500/5 rounded-lg p-6 border border-amber-500/20">
					<h4 className="font-semibold text-amber-300 text-lg mb-4 flex items-center gap-3">
						<AlertTriangle className="h-6 w-6" />
						Areas for Improvement
					</h4>
					<ul className="text-white/90 text-base space-y-4">
						{feedback.critical_gaps.map((gap, index) => (
							<li key={index} className="flex items-center gap-3">
								<div className="w-1.5 h-1.5 rounded-full bg-amber-400/80 flex-shrink-0" />
								<span className="leading-relaxed">{gap.details}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Recommendations */}
				<div className="bg-sky-500/5 rounded-lg p-6 border border-sky-500/20">
					<h4 className="font-semibold text-sky-300 text-lg mb-4 flex items-center gap-3">
						<Lightbulb className="h-6 w-6" />
						Action Plan
					</h4>
					<ul className="text-white/90 text-base space-y-6">
						{feedback.recommendations.map((rec, index) => (
							<li key={index} className="space-y-3">
								<div className="flex items-center gap-3">
									<div className="w-1.5 h-1.5 rounded-full bg-sky-400/80 flex-shrink-0" />
									<span className="font-medium text-white">{rec.area}</span>
									<span className={`text-sm px-3 py-1 rounded-full font-medium ${
										rec.priority === "High" 
											? "bg-red-500/20 text-red-200 border border-red-500/20"
											: rec.priority === "Medium"
											? "bg-amber-500/20 text-amber-200 border border-amber-500/20"
											: "bg-emerald-500/20 text-emerald-200 border border-emerald-500/20"
									}`}>
										{rec.priority} Priority
									</span>
								</div>
								<ul className="ml-7 space-y-3">
									{rec.actions.map((action, actionIndex) => (
										<li key={actionIndex} className="flex items-center gap-3">
											<div className="w-1 h-1 rounded-full bg-sky-400/60 flex-shrink-0" />
											<span className="leading-relaxed text-white/80">{action}</span>
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</div>
			</div>
		</motion.div>
	);
};
