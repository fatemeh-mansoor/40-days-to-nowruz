import { useState } from 'react';
import { isDayAccessible } from '../utils/dateUtils';

interface DayCardProps {
  day: number;
  title: string;
  description: string;
  isCompleted: boolean;
  onToggleComplete: (dayNumber: number) => void;
  markCompleteText: string;
  markIncompleteText: string;
  dayCompletedText: string;
}

/**
 * Individual day card component
 * Shows task information and completion status
 */
export function DayCard({
  day,
  title,
  description,
  isCompleted,
  onToggleComplete,
  markCompleteText,
  markIncompleteText,
  dayCompletedText,
}: DayCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isAccessible = isDayAccessible(day);

  return (
    <div
      className={`
        rounded-lg border-2 p-4 transition-all
        ${isAccessible ? 'cursor-pointer hover:shadow-md' : 'opacity-50 cursor-not-allowed'}
        ${isCompleted ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'}
      `}
      onClick={() => isAccessible && setIsExpanded(!isExpanded)}
      role="button"
      tabIndex={isAccessible ? 0 : -1}
      aria-expanded={isExpanded}
      aria-disabled={!isAccessible}
      onKeyDown={(e) => {
        if (isAccessible && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`
                inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}
              `}
              aria-label={`Day ${day}`}
            >
              {day}
            </span>
            <h3 className="font-semibold text-gray-900">{title}</h3>
          </div>
          
          {isExpanded && (
            <div className="mt-3 space-y-3">
              <p className="text-gray-600 text-sm">{description}</p>
              
              {isAccessible && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleComplete(day);
                  }}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium transition-colors
                    ${isCompleted
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-green-500 text-white hover:bg-green-600'
                    }
                  `}
                  aria-label={isCompleted ? markIncompleteText : markCompleteText}
                >
                  {isCompleted ? markIncompleteText : markCompleteText}
                </button>
              )}
            </div>
          )}
        </div>
        
        {isCompleted && (
          <span
            className="flex-shrink-0 text-2xl"
            role="img"
            aria-label={dayCompletedText}
            title={dayCompletedText}
          >
            ✓
          </span>
        )}
      </div>
    </div>
  );
}
