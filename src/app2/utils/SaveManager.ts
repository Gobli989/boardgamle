import { Game } from "../../types/Game";

/**
 * Gets and parses the local game data.
 *
 * @returns {SaveDataType} saved data
 */
export function getLocalStorageData() {
    const jsonString = localStorage.getItem("boardgamle");

    let json: SaveDataType = { days: [] };

    if (jsonString !== null) {
        json = JSON.parse(jsonString);
    }

    if (!json.days) {
        json.days = [];
    }

    return json;
}

/**
 * Saves a day's game completion.
 *
 * @param date Date of the day
 * @param correctGame Correct game for the day
 * @param guesses Guesses given
 * @param completed_at When it was actually completed, uses Date.now() by default.
 */
export function saveGameToLocalStorage(
    date: number,
    correctGame: Game,
    guesses: Game[],
    completed_at: number = Date.now(),
) {
    const json = getLocalStorageData();
    const prevAttemptIndex = json.days.findIndex((v) => v.date === date);

    if (prevAttemptIndex === -1) {
        json.days.push({
            date,
            correctGame,
            guesses,
            completed_at,
        });
    } else {
        json.days[prevAttemptIndex] = {
            date,
            correctGame,
            guesses,
            completed_at,
        };
    }

    localStorage.setItem("boardgamle", JSON.stringify(json));
}

/**
 * Gets the data for a given day.
 *
 * @param date Date number in format: YYYYMMDD
 * @returns Null is day has no data, otherwise data
 */
export function getGameDataFromLocalStorage(date: number) {
    const json = getLocalStorageData();
    const dateIndex = json.days.findIndex((v) => v.date === date);

    if (dateIndex === -1) {
        return null;
    }

    return json.days[dateIndex];
}

export type SaveDataType = {
    days: SaveDayType[];
};

export type SaveDayType = {
    date: number;
    correctGame: Game;
    guesses: Game[];
    completed_at: number;
};
