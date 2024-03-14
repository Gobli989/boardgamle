export type LocalData = {

    lastCheckedVersion: number,

    games: {
        [key: string]: {
            guesses: number[],
        }
    }

}
