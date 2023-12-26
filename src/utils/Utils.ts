import { Day } from "../types/Day";

/**
 * Custom seedable random number generator
 * 
 * @param seed seed for the random number generator
 * @returns {number} random number between 0 and 1
 */
export function seededRandom(seed: number): number {
  const m = 1236967814;
  const a = 7618742178;
  const c = 9873214987;

  return (
    ((a * (seed ? seed : Math.floor(Math.random() * (m - 1))) + c) % m) /
    (m - 1)
  );
}

/**
 * Queries the browser to see if the user has enabled dark mode
 * 
 * @returns {boolean} True if the user has enabled dark mode
 */
export function isDarkModeEnabled(): boolean {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

/**
 * Converts a string in the format "YYYY-MM-DD" to a Day object
 * 
 * @param str String in the format "YYYY-MM-DD"
 * @returns {Day} Day object
 */
export function stringToDay(str: string): Day {
  const split = str.split("-");
  return {
    y: parseInt(split[0]),
    m: parseInt(split[1]),
    d: parseInt(split[2]),
  };
}

/**
 * Converts a Day object to a string in the format "YYYY-MM-DD"
 * 
 * @param day Day object
 * @returns {string} String in the format "YYYY-MM-DD"
 */
export function dayToString(day: Day): string {
  return `${day.y}-${day.m}-${day.d}`;
}

/**
 * Formats a month number to a name
 * 
 * @param month Month number (0-11)
 * @returns {string} Month name
 */
export function getMonthName(month: number): string {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
  return "Invalid";
}
