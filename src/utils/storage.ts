/**
 * LocalStorage utilities for managing completed days
 * Simple key-value storage without external dependencies
 */

const STORAGE_KEY = 'nowruz-completed-days';

export interface CompletedDays {
  [dayNumber: number]: boolean;
}

/**
 * Get all completed days from localStorage
 */
export function getCompletedDays(): CompletedDays {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return {};
  }
}

/**
 * Check if a specific day is completed
 */
export function isDayCompleted(dayNumber: number): boolean {
  const completed = getCompletedDays();
  return completed[dayNumber] === true;
}

/**
 * Mark a day as completed or incomplete
 */
export function setDayCompleted(dayNumber: number, completed: boolean): void {
  try {
    const days = getCompletedDays();
    
    if (completed) {
      days[dayNumber] = true;
    } else {
      delete days[dayNumber];
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(days));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}

/**
 * Toggle a day's completion status
 */
export function toggleDayCompleted(dayNumber: number): boolean {
  const isCompleted = isDayCompleted(dayNumber);
  const newStatus = !isCompleted;
  setDayCompleted(dayNumber, newStatus);
  return newStatus;
}
