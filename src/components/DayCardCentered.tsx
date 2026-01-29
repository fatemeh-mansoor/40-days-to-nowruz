import { isDayAccessible } from '../utils/dateUtils';

interface DayCardCenteredProps {
  day: number;
  title: string;
  description: string;
  isCompleted: boolean;
  onToggleComplete: (dayNumber: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  markCompleteText: string;
  markIncompleteText: string;
  dayCompletedText: string;
  previousDayText: string;
  nextDayText: string;
  currentDayText: string;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isCurrentDay: boolean;
}

/**
 * Centered single day card component
 * Shows one task at a time with navigation
 */
export function DayCardCentered({
  day,
  title,
  description,
  isCompleted,
  onToggleComplete,
  onPrevious,
  onNext,
  markCompleteText,
  markIncompleteText,
  dayCompletedText,
  previousDayText,
  nextDayText,
  currentDayText,
  canGoPrevious,
  canGoNext,
  isCurrentDay,
}: DayCardCenteredProps) {
  const isAccessible = isDayAccessible(day);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all
            ${canGoPrevious 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
          aria-label={previousDayText}
        >
          ← {previousDayText}
        </button>

        {isCurrentDay && (
          <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
            {currentDayText}
          </span>
        )}

        {onNext ? (
          <button
            onClick={onNext}
            disabled={!canGoNext}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all
              ${canGoNext 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
            aria-label={nextDayText}
          >
            {nextDayText} →
          </button>
        ) : (
          <div className="w-28"></div>
        )}
      </div>

      {/* Main Card */}
      <div
        className={`
          relative rounded-2xl border-4 p-8 md:p-12 transition-all shadow-2xl
          ${isAccessible 
            ? isCompleted 
              ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50' 
              : 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50'
            : 'border-gray-300 bg-gray-50 opacity-60'
          }
        `}
      >
        {/* Day Number Badge */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div
            className={`
              w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg
              ${isCompleted 
                ? 'bg-green-500 text-white' 
                : 'bg-yellow-400 text-gray-900'
              }
            `}
            aria-label={`Day ${day}`}
          >
            {day}
          </div>
        </div>

        {/* Content */}
        <div className="text-center pt-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h2>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            {description}
          </p>

          {/* Completion Status */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => onToggleComplete(day)}
              disabled={!isAccessible}
              className={`
                px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg
                ${!isAccessible
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : isCompleted
                    ? 'bg-gray-600 text-white hover:bg-gray-700'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }
              `}
              aria-label={isCompleted ? markIncompleteText : markCompleteText}
            >
              {!isAccessible ? (
                <span className="flex items-center gap-2">
                  <span>🔒</span> Locked
                </span>
              ) : isCompleted ? (
                <span className="flex items-center gap-2">
                  <span>✓</span> {markIncompleteText}
                </span>
              ) : (
                markCompleteText
              )}
            </button>

            {isCompleted && (
              <div className="text-green-600 font-semibold flex items-center gap-2 text-xl">
                <span className="text-3xl">🌸</span>
                {dayCompletedText}
              </div>
            )}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 text-6xl opacity-10">
          🪻
        </div>
        <div className="absolute bottom-4 left-4 text-6xl opacity-10">
          🪻
        </div>
      </div>
    </div>
  );
}
