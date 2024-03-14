import { Game } from "../types/Game";
import { LocalData } from "../types/LocalData";
import { dayToString } from "./Utils";

let LOCALDATA: LocalData | undefined = undefined;

export {
    LOCALDATA
}

/**
 * Loads in local data from localStorage
 */
export function loadLocalData() {

    const dataString = localStorage.getItem('boardgamle');

    if (dataString) {
        const parsedData = JSON.parse(dataString);

        LOCALDATA = {
            lastCheckedVersion: parsedData.lastCheckedVersion,
            games: {}
        }

        return;
    }

    LOCALDATA = {
        lastCheckedVersion: 0,
        games: {}
    };

    saveLocalData();
}

export function setLocalData(data: LocalData) {
    LOCALDATA = data;
}

export function saveLocalData() {
    if (!LOCALDATA) return;

    localStorage.setItem('boardgamle', JSON.stringify(LOCALDATA));
}

/**
 * Searches for guesses for the given date
 * 
 * @param date Date to search for
 * @returns guesses for the given date or null if no data is found
 */
export function getDayData(date: Date) {
    const dateString = dayToString(date);

    if (!LOCALDATA) return null;

    if (LOCALDATA.games[dateString]) {
        return LOCALDATA.games[dateString];
    }

    return null;
}

/**
 * Sets guesses for the given date
 * 
 * @param date Date to set data for
 * @param data Data to set
 */
export function setDayData(date: Date, data: { guesses: Game[] }) {
    const dateString = dayToString(date);

    if (!LOCALDATA) return;

    if (!LOCALDATA.games[dateString]) {
        LOCALDATA.games[dateString] = { guesses: [] };
    }
    LOCALDATA.games[dateString].guesses = data.guesses.map(g => g.id);
    saveLocalData();
}