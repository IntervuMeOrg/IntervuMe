import { AppDataSource } from "../database/data-source";
import {
  DayPracticeStats,
  Interview,
  InterviewStatus,
  InterviewHistoryResponse,
  UserPracticeAnalytics,
} from "./interview-types";
import { InterviewEntity } from "./interview.entity";
import { interviewService } from "./interview.service";

const interviewRepository = () => {
  return AppDataSource.getRepository(InterviewEntity);
};

export const interviewStatsService = {
  async getHistory(userId: string): Promise<InterviewHistoryResponse> {
    const interviews = await interviewRepository().find({ where: { userId } });
    if (!interviews || interviews.length === 0) {
      return {
        totalInterviews: -1,
        totalPracticeTime: -1,
      };
    }

    const completedInterviews = interviews.filter(
      (interview) => interview.status === InterviewStatus.COMPLETED
    );

    if (completedInterviews.length === 0) {
      return {
        totalInterviews: 0,
        totalPracticeTime: 0,
      };
    }

    const totalInterviews = completedInterviews.length;

    // Calculate average score using feedback score_percentage
    const scores = completedInterviews.map(
      (interview) =>
        interview.feedback?.overall_performance?.score_percentage || 0
    );
    const averageScore =
      scores.reduce((sum, score) => sum + score, 0) / scores.length;

    const totalPracticeTime = completedInterviews.reduce((total, interview) => {
      if (interview.startTime && interview.endTime) {
        const start = new Date(interview.startTime);
        const end = new Date(interview.endTime);
        const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
        return total + durationMinutes;
      }
      return total + (interview.timeLimit || 0); // Fallback to timeLimit if endTime not available
    }, 0);

    const strengthsMap = new Map<string, number>();
    completedInterviews.forEach((interview) => {
      interview.feedback?.strengths?.forEach((strength: any) => {
        const area = strength.area;
        strengthsMap.set(area, (strengthsMap.get(area) || 0) + 1);
      });
    });

    const bestSkill =
      strengthsMap.size > 0
        ? Array.from(strengthsMap.entries()).reduce((a, b) =>
            a[1] > b[1] ? a : b
          )[0]
        : "No strengths identified";

    const gapsMap = new Map<string, number>();
    completedInterviews.forEach((interview) => {
      interview.feedback?.critical_gaps?.forEach((gap: any) => {
        const area = gap.area;
        gapsMap.set(area, (gapsMap.get(area) || 0) + 1);
      });
    });

    const skillNeedsFocus =
      gapsMap.size > 0
        ? Array.from(gapsMap.entries()).reduce((a, b) =>
            a[1] > b[1] ? a : b
          )[0]
        : "No critical gaps identified";

    const result = {
      totalInterviews,
      averageScore: Math.round(averageScore * 100) / 100,
      totalPracticeTime: Math.round(totalPracticeTime), // in minutes
      bestSkill,
      skillNeedsFocus,
      latestScore: scores[scores.length - 1] || 0,
      improvementTrend:
        scores.length > 1
          ? Math.round((scores[scores.length - 1] - scores[0]) * 100) / 100
          : 0,
    };
    return result;
  },

  async groupInterviewsByDate(
    interviews: Interview[]
  ): Promise<Record<string, Interview[]>> {
    return interviews.reduce((groups, interview) => {
      const date = new Date(interview.startTime).toISOString().split("T")[0];

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(interview);
      return groups;
    }, {} as Record<string, Interview[]>);
  },

  async getUserPracticeAnalytics(
    userId: string,
    startDate?: string,
    endDate?: string
  ): Promise<UserPracticeAnalytics> {
    const interviews = await interviewService.getByUserId(userId);

    let completedInterviews = interviews.filter(
      (interview) =>
        interview.status === "COMPLETED" &&
        interview.totalScore !== undefined &&
        interview.maxScore !== undefined &&
        interview.maxScore > 0
    );

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      completedInterviews = completedInterviews.filter((interview) => {
        const interviewDate = new Date(interview.startTime);
        end.setDate(end.getDate() + 1);
        return interviewDate >= start && interviewDate <= end;
      });
    }

    const dailyGroups = await interviewStatsService.groupInterviewsByDate(
      completedInterviews
    );

    const dailyStats: DayPracticeStats[] = Object.entries(dailyGroups).map(
      ([date, dayInterviews]) => {
        const totalScore = dayInterviews.reduce(
          (sum, interview) => sum + (Number(interview.totalScore) || 0),
          0
        );
        const maxPossibleScore = dayInterviews.reduce(
          (sum, interview) => sum + (Number(interview.maxScore) || 0),
          0
        );
        const averagePercentage =
          maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;

        return {
          date,
          totalInterviews: dayInterviews.length,
          completedInterviews: dayInterviews.length,
          averagePercentage: Math.round(averagePercentage * 100) / 100,
          totalScore,
          maxPossibleScore,
        };
      }
    );

    dailyStats.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const totalScore = completedInterviews.reduce(
      (sum, interview) => sum + (Number(interview.totalScore) || 0),
      0
    );
    const totalMaxScore = completedInterviews.reduce(
      (sum, interview) => sum + (Number(interview.maxScore) || 0),
      0
    );
    const overallAveragePercentage =
      totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0;

    return {
      userId,
      totalDays: dailyStats.length,
      totalInterviews: completedInterviews.length,
      overallAveragePercentage:
        Math.round(overallAveragePercentage * 100) / 100,
      dailyStats,
    };
  },
};
