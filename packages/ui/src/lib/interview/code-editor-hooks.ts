import { useState, useEffect, useCallback } from "react";

export interface CodeEditorState {
	code: string;
	language: string;
	lastSaved: Date | null;
	isDirty: boolean;
}

export interface CodeEditorPersistenceOptions {
	interviewId: string;
	questionId: string;
	autoSaveInterval?: number; // in milliseconds
	debounceDelay?: number; // in milliseconds
}

// Hook for managing code editor state with localStorage persistence
export const useCodeEditorPersistence = (options: CodeEditorPersistenceOptions) => {
	const { interviewId, questionId, autoSaveInterval = 5000, debounceDelay = 1000 } = options;
	
	const [editorState, setEditorState] = useState<CodeEditorState>({
		code: "",
		language: "cpp",
		lastSaved: null,
		isDirty: false,
	});

	const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

	// Generate storage key
	const getStorageKey = useCallback((suffix: string) => {
		return `interview_${interviewId}_question_${questionId}_${suffix}`;
	}, [interviewId, questionId]);

	// Load initial state from localStorage
	useEffect(() => {
		try {
			const savedCode = localStorage.getItem(getStorageKey("code"));
			const savedLanguage = localStorage.getItem(getStorageKey("language"));
			const savedTimestamp = localStorage.getItem(getStorageKey("timestamp"));

			if (savedCode) {
				setEditorState({
					code: savedCode,
					language: savedLanguage || "cpp",
					lastSaved: savedTimestamp ? new Date(savedTimestamp) : null,
					isDirty: false,
				});
			}
		} catch (error) {
			console.warn("Failed to load code editor state from localStorage:", error);
		}
	}, [getStorageKey]);

	// Save to localStorage
	const saveToLocalStorage = useCallback((code: string, language: string) => {
		try {
			const timestamp = new Date().toISOString();
			localStorage.setItem(getStorageKey("code"), code);
			localStorage.setItem(getStorageKey("language"), language);
			localStorage.setItem(getStorageKey("timestamp"), timestamp);
			
			setEditorState(prev => ({
				...prev,
				code,
				language,
				lastSaved: new Date(timestamp),
				isDirty: false,
			}));
			
			setSaveStatus("saved");
			
			// Reset save status after 2 seconds
			setTimeout(() => setSaveStatus("idle"), 2000);
		} catch (error) {
			console.error("Failed to save code to localStorage:", error);
			setSaveStatus("error");
			setTimeout(() => setSaveStatus("idle"), 2000);
		}
	}, [getStorageKey]);

	// Update code with debounced save
	const updateCode = useCallback((newCode: string) => {
		setEditorState(prev => ({
			...prev,
			code: newCode,
			isDirty: true,
		}));
		setSaveStatus("saving");
		
		// Debounced save - clear previous timeout
		const timeoutId = setTimeout(() => {
			saveToLocalStorage(newCode, editorState.language);
		}, debounceDelay);

		return () => clearTimeout(timeoutId);
	}, [saveToLocalStorage, debounceDelay, editorState.language]);

	// Update language
	const updateLanguage = useCallback((newLanguage: string) => {
		setEditorState(prev => ({
			...prev,
			language: newLanguage,
			isDirty: true,
		}));
		
		// Save immediately when language changes
		saveToLocalStorage(editorState.code, newLanguage);
	}, [saveToLocalStorage, editorState.code]);

	// Force save
	const forceSave = useCallback(() => {
		saveToLocalStorage(editorState.code, editorState.language);
	}, [saveToLocalStorage, editorState.code, editorState.language]);

	// Clear saved data
	const clearSavedData = useCallback(() => {
		try {
			localStorage.removeItem(getStorageKey("code"));
			localStorage.removeItem(getStorageKey("language"));
			localStorage.removeItem(getStorageKey("timestamp"));
			
			setEditorState({
				code: "",
				language: "cpp",
				lastSaved: null,
				isDirty: false,
			});
			
			setSaveStatus("idle");
		} catch (error) {
			console.error("Failed to clear saved code data:", error);
		}
	}, [getStorageKey]);

	// Auto-save interval
	useEffect(() => {
		if (editorState.isDirty && autoSaveInterval > 0) {
			const interval = setInterval(() => {
				if (editorState.isDirty) {
					forceSave();
				}
			}, autoSaveInterval);

			return () => clearInterval(interval);
		}
	}, [editorState.isDirty, autoSaveInterval, forceSave]);

	return {
		editorState,
		saveStatus,
		updateCode,
		updateLanguage,
		forceSave,
		clearSavedData,
	};
};

// Hook for managing multiple code editors in an interview session
export const useInterviewCodeEditors = (interviewId: string) => {
	const [activeEditors, setActiveEditors] = useState<Set<string>>(new Set());

	// Register a new editor
	const registerEditor = useCallback((questionId: string) => {
		setActiveEditors(prev => new Set([...prev, questionId]));
	}, []);

	// Unregister an editor
	const unregisterEditor = useCallback((questionId: string) => {
		setActiveEditors(prev => {
			const newSet = new Set(prev);
			newSet.delete(questionId);
			return newSet;
		});
	}, []);

	// Get all saved code for the interview
	const getAllSavedCode = useCallback(() => {
		const savedCode: Record<string, { code: string; language: string; timestamp: string }> = {};
		
		try {
			const keys = Object.keys(localStorage).filter(key => 
				key.startsWith(`interview_${interviewId}_`) && key.endsWith("_code")
			);
			
			keys.forEach(key => {
				const questionId = key.match(/question_(\d+)_code/)?.[1];
				if (questionId) {
					const code = localStorage.getItem(key);
					const language = localStorage.getItem(key.replace("_code", "_language"));
					const timestamp = localStorage.getItem(key.replace("_code", "_timestamp"));
					
					if (code) {
						savedCode[questionId] = {
							code,
							language: language || "cpp",
							timestamp: timestamp || new Date().toISOString(),
						};
					}
				}
			});
		} catch (error) {
			console.error("Failed to get all saved code:", error);
		}
		
		return savedCode;
	}, [interviewId]);

	// Clear all saved code for the interview
	const clearAllSavedCode = useCallback(() => {
		try {
			const keys = Object.keys(localStorage).filter(key => 
				key.startsWith(`interview_${interviewId}_`)
			);
			
			keys.forEach(key => localStorage.removeItem(key));
		} catch (error) {
			console.error("Failed to clear all saved code:", error);
		}
	}, [interviewId]);

	// Get code statistics
	const getCodeStatistics = useCallback(() => {
		const savedCode = getAllSavedCode();
		const stats = {
			totalQuestions: Object.keys(savedCode).length,
			totalLines: 0,
			totalCharacters: 0,
			languageDistribution: {} as Record<string, number>,
			lastModified: null as Date | null,
		};

		Object.values(savedCode).forEach(({ code, language, timestamp }) => {
			stats.totalLines += code.split('\n').length;
			stats.totalCharacters += code.length;
			stats.languageDistribution[language] = (stats.languageDistribution[language] || 0) + 1;
			
			const modifiedDate = new Date(timestamp);
			if (!stats.lastModified || modifiedDate > stats.lastModified) {
				stats.lastModified = modifiedDate;
			}
		});

		return stats;
	}, [getAllSavedCode]);

	return {
		activeEditors,
		registerEditor,
		unregisterEditor,
		getAllSavedCode,
		clearAllSavedCode,
		getCodeStatistics,
	};
};

// Hook for code editor keyboard shortcuts
export const useCodeEditorShortcuts = (callbacks: {
	onSave?: () => void;
	onRun?: () => void;
	onSubmit?: () => void;
	onFormat?: () => void;
}) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			// Ctrl+S or Cmd+S - Save
			if ((event.ctrlKey || event.metaKey) && event.key === "s") {
				event.preventDefault();
				callbacks.onSave?.();
			}
			
			// Ctrl+R or Cmd+R - Run
			if ((event.ctrlKey || event.metaKey) && event.key === "r") {
				event.preventDefault();
				callbacks.onRun?.();
			}
			
			// Ctrl+Enter or Cmd+Enter - Submit
			if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
				event.preventDefault();
				callbacks.onSubmit?.();
			}
			
			// Ctrl+Shift+F or Cmd+Shift+F - Format
			if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "F") {
				event.preventDefault();
				callbacks.onFormat?.();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [callbacks]);
};

// Hook for managing code editor themes
export const useCodeEditorTheme = () => {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		const savedTheme = localStorage.getItem("code_editor_theme") as "light" | "dark" | null;
		if (savedTheme) {
			setTheme(savedTheme);
		}
	}, []);

	const toggleTheme = useCallback(() => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("code_editor_theme", newTheme);
	}, [theme]);

	return { theme, toggleTheme };
}; 