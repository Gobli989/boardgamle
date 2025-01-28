import { Game } from "../../types/Game";
import { SaveDayType } from "./SaveManager";

/**
 * Searches for the correct game in guess list.
 *
 * @param guesses Guesses array
 * @param correctGame Gave to search for
 */
export function guessedCorrectGame(guesses: Game[], correctGame: Game) {
    return guesses.findIndex((e) => e && e.id === correctGame.id) !== -1;
}

/**
 * Searches for the correct game in SaveDay type
 *
 * @param saveDay Day data
 */
export function guessedCorrectGameOnDay(saveDay: SaveDayType) {
    return guessedCorrectGame(saveDay.guesses, saveDay.correctGame);
}

/**
 * Can the user guess more or the game is finished
 *
 * @param guesses Guess array
 */
export function finishedDay(guesses: Game[], correctGame: Game) {
    if (guessedCorrectGame(guesses, correctGame)) return true;
    return guesses.findIndex((e) => e === null) === -1;
}

/**
 * Can the user guess more or the game is finished
 *
 * @param saveDay Day data
 */
export function finishedDayOnDay(saveDay: SaveDayType) {
    return finishedDay(saveDay.guesses, saveDay.correctGame);
}

/**
 * How many guesses did it take to guess the correct game?
 * 
 * -1: not guessed it
 * 0: First try
 * 1-4: Other tries.
 * 
 * @param guesses Guess array
 * @param correctGame Correct game
 */
export function guessCountToCorrectGame(guesses: Game[], correctGame: Game) : number {
    return guesses.findIndex((e) => e && e.id === correctGame.id);
}

/**
 * How many guesses did it take to guess the correct game?
 * 
 * -1: not guessed it
 * 0: First try
 * 1-4: Other tries.
 * 
 * @param saveDay Day Data
 */
export function guessCountToCorrectGameOnDay(saveDay: SaveDayType) {
    return guessCountToCorrectGame(saveDay.guesses, saveDay.correctGame)
}