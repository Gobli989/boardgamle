import { Game } from "./Game"
import { LocalData } from "./LocalData"

export type LocalGameData = {

    games: Game[],
    localData: LocalData | null,
    correctGame: Game | null,
    imageSize: number,
    guesses: (Game | null)[],

    overlayShown: {
        info: boolean,
        calendar: boolean,
        bugReport: boolean,
        feedback: boolean,
        changelog: boolean,
    },

    darkMode: boolean,

}