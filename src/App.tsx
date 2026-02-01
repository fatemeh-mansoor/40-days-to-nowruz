import { useState } from 'react';
import { useI18n } from './hooks/useI18n';
import { isDayCompleted, toggleDayCompleted, clearAllCompleted } from './utils/storage';
import { getCurrentDayNumber, getDaysUntilNowruz } from './utils/dateUtils';
import { Header } from './components/Header';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { DayCardCentered } from './components/DayCardCentered';

/**
 * Main application component
 * Manages the 40-day Nowruz countdown with single card view
 */
export function App() {
  const { language, setLanguage, translations, taskList, isLoading } = useI18n();

  // Track completion state to trigger re-renders
  const [_, setCompletionVersion] = useState(0);

  // Track which day to display
  const [displayDay, setDisplayDay] = useState<number>(() => {
    const currentDay = getCurrentDayNumber();
    const daysUntil = getDaysUntilNowruz();

    if (daysUntil > 40) {
      return 1;
    } else if (currentDay !== null && currentDay >= 1 && currentDay <= 40) {
      return currentDay;
    } else if (daysUntil < 1) {
      return 40;
    }
    return 1;
  });

  const handleToggleComplete = (dayNumber: number) => {
    toggleDayCompleted(dayNumber);
    setCompletionVersion(v => v + 1);
  };

  const handleResetAll = () => {
    if (window.confirm(translations?.resetAll + '?')) {
      clearAllCompleted();
      setCompletionVersion(v => v + 1);
    }
  };

  const handlePrevious = () => {
    if (displayDay > 1) {
      setDisplayDay(displayDay - 1);
    }
  };

  const handleNext = () => {
    if (displayDay < 40) {
      setDisplayDay(displayDay + 1);
    }
  };

  if (isLoading || !translations || !taskList) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-yellow-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-green-500" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const currentDayNumber = getCurrentDayNumber();
  const isCurrentDay = currentDayNumber === displayDay;

  // Get the task for the display day
  const dayTask = taskList.days.find(d => d.day === displayDay);

  if (!dayTask) {
    return <div>Error: Task not found for day {displayDay}</div>;
  }

  const title = dayTask.title;
  const description = dayTask.description;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-6xl flex-1 flex flex-col">
        {/* Language Switcher */}
        <div className="flex justify-end mb-6">
          <LanguageSwitcher
            currentLanguage={language}
            onLanguageChange={setLanguage}
            label={translations.selectLanguage}
          />
        </div>

        {/* Header */}
        <Header
          taskListName={taskList.name}
          taskListDescription={taskList.description}
          daysRemainingText={translations.daysRemaining}
          springEquinoxText={translations.springEquinox}
          locale={translations.locale}
          timeZone={translations.timeZone}
        />

        {/* Main Card - Single Day View */}
        <main className="flex-1 flex items-center py-8">
          <DayCardCentered
            day={displayDay}
            title={title}
            description={description}
            isCompleted={isDayCompleted(displayDay)}
            onToggleComplete={handleToggleComplete}
            onPrevious={handlePrevious}
            onNext={handleNext}
            markCompleteText={translations.markComplete}
            markIncompleteText={translations.markIncomplete}
            dayCompletedText={translations.dayCompleted}
            previousDayText={translations.previousDay}
            nextDayText={translations.nextDay}
            currentDayText={translations.currentDay}
            lockedText={translations.locked}
            unlocksOnText={translations.unlocksOn}
            locale={translations.locale}
            canGoPrevious={displayDay > 1}
            canGoNext={displayDay < 40}
            isCurrentDay={isCurrentDay}
          />
        </main>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <span>Day {displayDay} of 40</span>
            <span>•</span>
            <span>
              {taskList.days.filter((_, i) => isDayCompleted(i + 1)).length} completed
            </span>
          </div>
        </div>


        {/* only show reset if there is at least one completed day */}
        {
          taskList.days.some((_, i) => isDayCompleted(i + 1)) && (
            <div className="mt-8 text-center">
              <button
                onClick={handleResetAll}
                className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-sm"
              >
                {translations.resetAll}
              </button>
            </div>)
        }


        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            Traditional Spring Cleaning Tasks
          </p>
          <p className="mt-2">
            Open source project • MIT License •{' '}
            <a
              href="https://github.com/fatemeh-mansoor/40-days-to-nowruz"
              className="text-green-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contribute on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
