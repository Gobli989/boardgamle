import { Game } from "../types/Game";
import { seededRandom } from "./Utils";

/**
 * Selects a random game from the array based on the current date
 * 
 * @param games Games array to select from
 * @returns Promise<Game> A random game from the array
 */
export function selectTodaysGame(games: Game[]): Game {
    if (games.length === 0) throw new Error("No games to select from");

    const now = new Date();
    const todays_seed = seededRandom(parseInt("" + now.getFullYear() + now.getMonth() + now.getDate()));
    const game = games[Math.floor(todays_seed * games.length)];

    return game;
}