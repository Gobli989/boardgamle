import { Game } from "../types/Game";
import { getDistanceInDays } from "./DateUtils";
import { NonRepeatingRandom } from "./RandomUtils";

/**
 * Selects a random game from the array based on the current date
 * 
 * @param games Games array to select from
 * @returns Promise<Game> A random game from the array
 */
export function selectTodaysGame(games: Game[]): Game {
    const now = new Date();
    
    return selectCorrectGameForDate(games, now);
}

export function selectCorrectGameForDate(games: Game[], date: Date) {
    if (games.length === 0) throw new Error("No games to select from");

    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const rng = new NonRepeatingRandom(games.length, date.getFullYear(), 366);
    

    let num = rng.next();

    for(let i = 0; i < getDistanceInDays(firstDayOfYear, date); i++) {
        num = rng.next();
    }

    const game = games[num];

    return game;
}