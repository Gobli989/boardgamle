import { Game } from "../types/Game";
import { ResponseGame } from "../types/ResponseGame";
import { seededRandom } from "./Utils";

/**
 * Loads all games from the server
 * 
 * @returns Promise<Game[]> All games
 */
export function loadGames(): Promise<Game[]> {
    return new Promise((resolve, reject) => {
        fetch('/games.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then((data: ResponseGame) => {
                const gamesArray: Game[] = [];

                for (const key in data) {
                    const d = data[key];
                    d.id = parseInt(key);
                    gamesArray.push(d);
                }

                resolve(gamesArray);

            })
            .catch(err => {
                reject(err);
            });
    });

}

/**
 * Selects a random game from the array based on the current date
 * 
 * @param games Games array to select from
 * @returns Promise<Game> A random game from the array
 */
export function selectTodaysGame(games: Game[]): Promise<Game> {
    return new Promise((resolve, reject) => {

        if (games.length === 0) reject('No games found');

        const now = new Date();
        const todays_seed = seededRandom(parseInt("" + now.getFullYear() + now.getMonth() + now.getDate()));
        const game = games[Math.floor(todays_seed * games.length)];

        resolve(game);
    });
}