import { stringToDay } from "./Utils";

import { Day } from "../types/Day";
import { DayData } from "../types/DayData";
import { DayEnd } from "../types/DayEnd";

const gameData = new Map<Day, DayData>();

/**
 * Loads the DayData from local storage
 *
 * @returns {Map<Day, DayData>} Map of Day objects to DayData objects
 */

export function loadDayData(): Map<Day, DayData> {
    const dataString = localStorage.getItem("boardgamle-data");

    // Empty data
    if (dataString == null) {
        return gameData;
    }

    const data = JSON.parse(dataString);

    for (const dateString of Object.keys(dataString)) {
        const day = stringToDay(dateString);

        gameData.set(day, data[dateString] as DayData);
    }

    return gameData;
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
 * Gets the DayData for a given day
 * 
 * @param {Day} day Day object
 */
export function getDayData(day: Day): DayData {

    if (gameData.has(day)) {
        return gameData.get(day) as DayData;
    }

    return {
        correctGame: undefined,
        guesses: [],
        dayEnd: DayEnd.PARTIAL,
    };
}

/**
 * Sets the DayData for a given day
 * 
 * @param {Day} day Day object
 * @param {DayData} data DayData object
 */
export function setDayData(day: Day, data: DayData) {
    gameData.set(day, data);
}