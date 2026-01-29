import { useState, useEffect } from 'react';

/**
 * Supported languages
 */
export type Language = 'en' | 'fa' | 'es' | 'ca';

/**
 * Translation data structure (UI text only)
 */
export interface TranslationData {
  lang: Language;
  dir: 'ltr' | 'rtl';
  title: string;
  subtitle: string;
  description: string;
  daysRemaining: string;
  dayCompleted: string;
  markComplete: string;
  markIncomplete: string;
  selectLanguage: string;
  previousDay: string;
  nextDay: string;
  notYetUnlocked: string;
  springEquinox: string;
  currentDay: string;
}

/**
 * Task list structure
 */
export interface TaskList {
  id: string;
  mainLanguage: string;
  days: Array<{
    day: number;
    title: string;
    description: string;
  }>;
}

const STORAGE_KEY_LANG = 'nowruz-language';
const STORAGE_KEY_TASKLIST = 'nowruz-tasklist';
const DEFAULT_LANGUAGE: Language = 'en';
const DEFAULT_TASKLIST = 'traditional-spring-cleaning';

/**
 * Custom hook for internationalization and task lists
 * Loads translation data and task lists from JSON files
 */
export function useI18n() {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_LANG);
      return (stored as Language) || DEFAULT_LANGUAGE;
    } catch {
      return DEFAULT_LANGUAGE;
    }
  });

  const [taskListId, setTaskListIdState] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TASKLIST);
      return stored || DEFAULT_TASKLIST;
    } catch {
      return DEFAULT_TASKLIST;
    }
  });

  const [translations, setTranslations] = useState<TranslationData | null>(null);
  const [taskList, setTaskList] = useState<TaskList | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load translation data when language changes
  useEffect(() => {
    let cancelled = false;
    
    fetch(`/translations/locales/${language}.json`)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setTranslations(data);
          
          // Update document direction
          document.documentElement.setAttribute('dir', data.dir);
          document.documentElement.setAttribute('lang', data.lang);
        }
      })
      .catch(error => {
        console.error('Error loading translations:', error);
      });
    
    return () => {
      cancelled = true;
    };
  }, [language]);

  // Load task list when taskListId or language changes
  useEffect(() => {
    let cancelled = false;
    
    const loadTaskList = async () => {
      if (!taskListId) {
        setTaskList(null);
        return;
      }
      
      try {
        // Load the main task list file
        const mainResponse = await fetch(`/translations/task-lists/${taskListId}/${taskListId}.json`);
        if (!mainResponse.ok) {
          throw new Error('Failed to load task list');
        }
        const mainData = await mainResponse.json();
        
        // Try to load the translation file for the current language
        let translationData = null;
        if (language !== mainData.mainLanguage) {
          try {
            const translationResponse = await fetch(`/translations/task-lists/${taskListId}/translations/${language}.json`);
            if (translationResponse.ok) {
              translationData = await translationResponse.json();
            }
          } catch (error) {
            // Translation file not found, will use main language
            console.log(`Translation file for ${language} not found, using ${mainData.mainLanguage}`);
          }
        }
        
        // Merge main data with translations
        const mergedDays = mainData.days.map((day: any) => {
          const dayKey = `day${day.day}`;
          const translation = translationData?.[dayKey];
          
          return {
            day: day.day,
            title: translation?.title || day.title,
            description: translation?.description || day.description
          };
        });
        
        if (!cancelled) {
          setTaskList({
            id: mainData.id,
            mainLanguage: mainData.mainLanguage,
            days: mergedDays
          });
        }
      } catch (error) {
        console.error('Error loading task list:', error);
        if (!cancelled) {
          setTaskList(null);
        }
      }
    };
    
    loadTaskList();
    
    return () => {
      cancelled = true;
    };
  }, [taskListId, language]);

  // Set loading state based on whether both are loaded
  useEffect(() => {
    setIsLoading(!translations || !taskList);
  }, [translations, taskList]);

  // Change language and persist to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, newLanguage);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  // Change task list and persist to localStorage
  const setTaskListId = (newTaskListId: string) => {
    setTaskListIdState(newTaskListId);
    try {
      localStorage.setItem(STORAGE_KEY_TASKLIST, newTaskListId);
    } catch (error) {
      console.error('Error saving task list preference:', error);
    }
  };

  return {
    language,
    setLanguage,
    translations,
    taskList,
    taskListId,
    setTaskListId,
    isLoading,
  };
}
