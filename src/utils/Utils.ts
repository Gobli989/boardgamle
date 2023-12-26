import { Day } from "../types/Day";
import { DayData } from "../types/DayData";

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
 * Loads the DayData from local storage
 * 
 * @returns {Map<Day, DayData>} Map of Day objects to DayData objects
 */
export function loadDayData(): Map<Day, DayData> {
  const dataString = localStorage.getItem("boardgamle-data");

  // Empty data
  if (dataString == null) {
    return new Map<Day, DayData>();
  }

  const data = JSON.parse(dataString);
  const map = new Map<Day, DayData>();

  for (const dateString of Object.keys(dataString)) {
    const day = stringToDay(dateString);

    map.set(day, data[dateString] as DayData);
  }

  return map;
}

/**
 * Saves the DayData to local storage
 * 
 * @param data Map of Day objects to DayData objects
 */
export function saveDayData(data: Map<Day, DayData>) {
  const obj = Object.create({});

  data.forEach((val, key) => {
    obj[`${key.y}-${key.m}-${key.d}`] = val;
  });

  localStorage.setItem("boardgamle-data", JSON.stringify(obj));
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
