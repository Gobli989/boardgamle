import { dateToNumber } from "../app2/utils/SaveManager";
import { Game } from "../types/Game";
import { seededRandom } from "./Utils";

/**
 * Selects a random game from the array based on the current date
 * 
 * @param games Games array to select from
 * @returns Promise<Game> A random game from the array
 */
export function selectTodaysGame(games: Game[]): Game {
    const now = new Date();
    
    return selectCorrectGameForDate(games, dateToNumber(now));
}

export function selectCorrectGameForDate(games: Game[], date: number) {
    if (games.length === 0) throw new Error("No games to select from");

    const todays_seed = seededRandom(date);
    const game = games[Math.floor(todays_seed * games.length)];

    return game;
}