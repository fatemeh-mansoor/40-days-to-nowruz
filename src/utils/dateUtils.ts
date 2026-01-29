/**
 * Get the exact date and time of the Spring Equinox for a given year
 * These are approximate times for the vernal equinox in UTC
 * Source: Astronomical calculations (these should be updated yearly for precision)
 */
function getSpringEquinox(year: number): Date {
  // Spring equinox times in UTC (approximate)
  const equinoxTimes: { [key: number]: string } = {
    2024: '2024-03-20T03:06:00Z',
    2025: '2025-03-20T09:01:00Z',
    2026: '2026-03-20T14:46:00Z',
    2027: '2027-03-20T20:25:00Z',
    2028: '2028-03-20T02:17:00Z',
    2029: '2029-03-20T08:02:00Z',
    2030: '2030-03-20T13:52:00Z',
  };

  // If we have the exact time, use it; otherwise approximate
  if (equinoxTimes[year]) {
    return new Date(equinoxTimes[year]);
  }
  
  // Fallback to March 20 at noon UTC
  return new Date(Date.UTC(year, 2, 20, 12, 0, 0));
}

/**
 * Get the spring equinox date for display
 */
export function getNowruzDate(): Date {
  const today = new Date();
  const currentYear = today.getFullYear();
  let nowruz = getSpringEquinox(currentYear);
  
  // If Nowruz has passed this year, get next year's
  if (today > nowruz) {
    nowruz = getSpringEquinox(currentYear + 1);
  }
  
  return nowruz;
}

/**
 * Calculate days remaining until Nowruz (Persian New Year)
 * Nowruz occurs at the exact moment of the vernal equinox
 */
export function getDaysUntilNowruz(): number {
  const today = new Date();
  const nowruz = getNowruzDate();
  
  const diffTime = nowruz.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Get the current day number in the 40-day countdown (1-40)
 * Returns null if we're not in the 40-day window
 */
export function getCurrentDayNumber(): number | null {
  const daysRemaining = getDaysUntilNowruz();
  
  if (daysRemaining > 40 || daysRemaining < 1) {
    return null;
  }
  
  // Day 1 is when there are 40 days remaining
  return 41 - daysRemaining;
}

/**
 * Check if a specific day is accessible (current or past)
 */
export function isDayAccessible(dayNumber: number): boolean {
  const currentDay = getCurrentDayNumber();
  
  if (currentDay === null) {
    return false;
  }
  
  return dayNumber <= currentDay;
}
