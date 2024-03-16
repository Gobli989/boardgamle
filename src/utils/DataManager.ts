import { Game } from "../types/Game";
import { LocalData } from "../types/LocalData";
import { dayToString } from "./Utils";

const CURRENT_VERSION = 1;

export {
    CURRENT_VERSION
};

/**
 * Loads in local data from localStorage
 */
export function loadLocalData(): LocalData {
    console.log('loading local data');

    const dataString = localStorage.getItem('boardgamle');
    const DEFAULT_LOCALDATA = {
        lastCheckedVersion: 0,
        games: {},
    };

    if (dataString) {
        const parsedData = JSON.parse(dataString);

        if (!parsedData) {
            saveLocalData(DEFAULT_LOCALDATA);
            return DEFAULT_LOCALDATA;
        }

        return parsedData as LocalData;
    }

    saveLocalData(DEFAULT_LOCALDATA);
    return DEFAULT_LOCALDATA;
}

export function saveLocalData(data: LocalData) {
    console.log('saving local data');

    localStorage.setItem('boardgamle', JSON.stringify(data));
}

/**
 * Searches for guesses for the given date
 * 
 * @param date Date to search for
 * @returns guesses for the given date or null if no data is found
 */
export function getDayData(date: Date, data: LocalData) {
    const dateString = dayToString(date);

    if (data.games[dateString]) {
        return data.games[dateString];
    }

    return null;
}

/**
 * Edits the local data to set the guesses for the given date
 * and then returns the edited local data
 * 
 * @param date Date to set data for
 * @param data Data to set
 * @param localData Local data instance to set data on
 * @returns The edited local data
 */
export function setDayData(date: Date, data: { guesses: (Game | null)[] }, localData: LocalData): LocalData {

    localData.games[dayToString(date)] = {
        guesses: data.guesses.filter(g => g !== null).map(g => g?.id || -1)
    };

    return localData;
}