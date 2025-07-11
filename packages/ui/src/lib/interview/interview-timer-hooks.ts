import { useState, useEffect, useCallback, useRef } from "react";

export interface InterviewTimerState {
	timeRemaining: number; // in seconds
	timeElapsed: number; // in seconds
	totalDuration: number; // in seconds
	isActive: boolean;
	isPaused: boolean;
	isOvertime: boolean;
	hasStarted: boolean;
	hasEnded: boolean;
}

export interface InterviewTimerOptions {
	duration: number; // in seconds
	autoStart?: boolean;
	showWarnings?: boolean;
	warningThresholds?: number[]; // Warning thresholds in seconds
	onWarning?: (timeRemaining: number) => void;
	onTimeUp?: () => void;
	onTick?: (state: InterviewTimerState) => void;
	allowOvertime?: boolean;
	overtimeWarning?: number; // Warning threshold for overtime in seconds
}

// Hook for managing interview timer
export const useInterviewTimer = (options: InterviewTimerOptions) => {
	const {
		duration,
		autoStart = false,
		showWarnings = true,
		warningThresholds = [600, 300, 60], // 10 min, 5 min, 1 min
		onWarning,
		onTimeUp,
		onTick,
		allowOvertime = true,
		overtimeWarning = 300, // 5 minutes
	} = options;

	const [timerState, setTimerState] = useState<InterviewTimerState>({
		timeRemaining: duration,
		timeElapsed: 0,
		totalDuration: duration,
		isActive: autoStart,
		isPaused: false,
		isOvertime: false,
		hasStarted: autoStart,
		hasEnded: false,
	});

	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const warningTriggeredRef = useRef<Set<number>>(new Set());

	// Start the timer
	const startTimer = useCallback(() => {
		setTimerState(prev => ({
			...prev,
			isActive: true,
			isPaused: false,
			hasStarted: true,
		}));
	}, []);

	// Pause the timer
	const pauseTimer = useCallback(() => {
		setTimerState(prev => ({
			...prev,
			isActive: false,
			isPaused: true,
		}));
	}, []);

	// Resume the timer
	const resumeTimer = useCallback(() => {
		setTimerState(prev => ({
			...prev,
			isActive: true,
			isPaused: false,
		}));
	}, []);

	// Stop the timer
	const stopTimer = useCallback(() => {
		setTimerState(prev => ({
			...prev,
			isActive: false,
			isPaused: false,
			hasEnded: true,
		}));
	}, []);

	// Reset the timer
	const resetTimer = useCallback(() => {
		setTimerState({
			timeRemaining: duration,
			timeElapsed: 0,
			totalDuration: duration,
			isActive: false,
			isPaused: false,
			isOvertime: false,
			hasStarted: false,
			hasEnded: false,
		});
		warningTriggeredRef.current.clear();
	}, [duration]);

	// Add time to the timer
	const addTime = useCallback((seconds: number) => {
		setTimerState(prev => ({
			...prev,
			timeRemaining: Math.max(0, prev.timeRemaining + seconds),
			totalDuration: prev.totalDuration + seconds,
		}));
	}, []);

	// Timer tick effect
	useEffect(() => {
		if (timerState.isActive && !timerState.hasEnded) {
			intervalRef.current = setInterval(() => {
				setTimerState(prev => {
					const newTimeElapsed = prev.timeElapsed + 1;
					const newTimeRemaining = Math.max(0, prev.totalDuration - newTimeElapsed);
					const newIsOvertime = newTimeRemaining === 0 && allowOvertime;
					
					const newState: InterviewTimerState = {
						...prev,
						timeElapsed: newTimeElapsed,
						timeRemaining: newTimeRemaining,
						isOvertime: newIsOvertime,
						hasEnded: newTimeRemaining === 0 && !allowOvertime,
					};

					// Trigger warnings
					if (showWarnings && newTimeRemaining > 0) {
						warningThresholds.forEach(threshold => {
							if (newTimeRemaining === threshold && !warningTriggeredRef.current.has(threshold)) {
								warningTriggeredRef.current.add(threshold);
								onWarning?.(newTimeRemaining);
							}
						});
					}

					// Trigger time up
					if (newTimeRemaining === 0 && !prev.isOvertime) {
						onTimeUp?.();
					}

					// Trigger overtime warning
					if (newIsOvertime && newTimeElapsed - prev.totalDuration === overtimeWarning) {
						onWarning?.(0);
					}

					// Call tick callback
					onTick?.(newState);

					return newState;
				});
			}, 1000);
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [timerState.isActive, timerState.hasEnded, showWarnings, warningThresholds, onWarning, onTimeUp, onTick, allowOvertime, overtimeWarning]);

	// Format time helper
	const formatTime = useCallback((seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		if (hours > 0) {
			return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
		}
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}, []);

	// Get formatted times
	const formattedTimeRemaining = formatTime(timerState.timeRemaining);
	const formattedTimeElapsed = formatTime(timerState.timeElapsed);
	const formattedTotalDuration = formatTime(timerState.totalDuration);

	// Get progress percentage
	const progressPercentage = Math.min(100, (timerState.timeElapsed / timerState.totalDuration) * 100);

	return {
		timerState,
		startTimer,
		pauseTimer,
		resumeTimer,
		stopTimer,
		resetTimer,
		addTime,
		formatTime,
		formattedTimeRemaining,
		formattedTimeElapsed,
		formattedTotalDuration,
		progressPercentage,
	};
};

// Hook for managing question-specific timers
export const useQuestionTimer = (questionTimeLimit: number) => {
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [timeSpent, setTimeSpent] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Start timing for a question
	const startQuestionTimer = useCallback(() => {
		setStartTime(new Date());
		setIsActive(true);
	}, []);

	// Stop timing for a question
	const stopQuestionTimer = useCallback(() => {
		setIsActive(false);
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	// Reset question timer
	const resetQuestionTimer = useCallback(() => {
		setStartTime(null);
		setTimeSpent(0);
		setIsActive(false);
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	// Update time spent effect
	useEffect(() => {
		if (isActive && startTime) {
			intervalRef.current = setInterval(() => {
				setTimeSpent(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
			}, 1000);
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [isActive, startTime]);

	// Format time spent
	const formattedTimeSpent = useCallback((seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}, []);

	// Check if time exceeded
	const isTimeExceeded = questionTimeLimit > 0 && timeSpent > questionTimeLimit;

	return {
		timeSpent,
		isActive,
		isTimeExceeded,
		startQuestionTimer,
		stopQuestionTimer,
		resetQuestionTimer,
		formattedTimeSpent: formattedTimeSpent(timeSpent),
	};
};

// Hook for managing interview session timing analytics
export const useInterviewAnalytics = (interviewId: string) => {
	const [analytics, setAnalytics] = useState<{
		totalTimeSpent: number;
		questionTimes: Record<string, number>;
		mcqAverageTime: number;
		codeAverageTime: number;
		longestQuestionTime: number;
		shortestQuestionTime: number;
		sessionStartTime: Date | null;
		sessionEndTime: Date | null;
	}>({
		totalTimeSpent: 0,
		questionTimes: {},
		mcqAverageTime: 0,
		codeAverageTime: 0,
		longestQuestionTime: 0,
		shortestQuestionTime: 0,
		sessionStartTime: null,
		sessionEndTime: null,
	});

	// Start session tracking
	const startSession = useCallback(() => {
		setAnalytics(prev => ({
			...prev,
			sessionStartTime: new Date(),
		}));
	}, []);

	// End session tracking
	const endSession = useCallback(() => {
		setAnalytics(prev => ({
			...prev,
			sessionEndTime: new Date(),
		}));
	}, []);

	// Record time spent on a question
	const recordQuestionTime = useCallback((questionId: string, timeSpent: number, questionType: 'mcq' | 'code') => {
		setAnalytics(prev => {
			const newQuestionTimes = { ...prev.questionTimes, [questionId]: timeSpent };
			const times = Object.values(newQuestionTimes);
			
			// Calculate averages (you'd need to track question types separately)
			const totalTime = times.reduce((sum, time) => sum + time, 0);
			const longestTime = Math.max(...times, 0);
			const shortestTime = times.length > 0 ? Math.min(...times) : 0;

			return {
				...prev,
				questionTimes: newQuestionTimes,
				totalTimeSpent: totalTime,
				longestQuestionTime: longestTime,
				shortestQuestionTime: shortestTime,
			};
		});
	}, []);

	// Get session duration
	const getSessionDuration = useCallback(() => {
		if (analytics.sessionStartTime && analytics.sessionEndTime) {
			return Math.floor((analytics.sessionEndTime.getTime() - analytics.sessionStartTime.getTime()) / 1000);
		}
		if (analytics.sessionStartTime) {
			return Math.floor((new Date().getTime() - analytics.sessionStartTime.getTime()) / 1000);
		}
		return 0;
	}, [analytics.sessionStartTime, analytics.sessionEndTime]);

	// Export analytics data
	const exportAnalytics = useCallback(() => {
		return {
			...analytics,
			sessionDuration: getSessionDuration(),
			averageQuestionTime: analytics.totalTimeSpent / Object.keys(analytics.questionTimes).length || 0,
		};
	}, [analytics, getSessionDuration]);

	// Save analytics to localStorage
	const saveAnalytics = useCallback(() => {
		try {
			localStorage.setItem(`interview_analytics_${interviewId}`, JSON.stringify(exportAnalytics()));
		} catch (error) {
			console.error("Failed to save analytics:", error);
		}
	}, [interviewId, exportAnalytics]);

	// Load analytics from localStorage
	const loadAnalytics = useCallback(() => {
		try {
			const saved = localStorage.getItem(`interview_analytics_${interviewId}`);
			if (saved) {
				const parsedAnalytics = JSON.parse(saved);
				setAnalytics(prev => ({
					...prev,
					...parsedAnalytics,
					sessionStartTime: parsedAnalytics.sessionStartTime ? new Date(parsedAnalytics.sessionStartTime) : null,
					sessionEndTime: parsedAnalytics.sessionEndTime ? new Date(parsedAnalytics.sessionEndTime) : null,
				}));
			}
		} catch (error) {
			console.error("Failed to load analytics:", error);
		}
	}, [interviewId]);

	return {
		analytics,
		startSession,
		endSession,
		recordQuestionTime,
		getSessionDuration,
		exportAnalytics,
		saveAnalytics,
		loadAnalytics,
	};
}; 