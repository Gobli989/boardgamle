import { Game } from "./Game"

export type LocalGameData = {

    games: Game[],
    correctGame: Game | null,
    imageSize: number,
    guesses: (Game | null)[],

    overlayShown: {
        info: boolean,
        calendar: boolean,
    },

    darkMode: boolean,

}