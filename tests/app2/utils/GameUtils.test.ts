import {
    finishedDay,
    guessedCorrectGame,
    // finishedDayOnDay,
    // guessCountToCorrectGame,
    // guessCountToCorrectGameOnDay
} from "../../../src/app2/utils/GameUtils";

import { Game } from "../../../src/types/Game";

const Brass = {
    "id": "224517",
    "rank": 1,
    "name": "Brass: Birmingham",
    "year": 2018,
    "geekRating": 8.5864,
    "url": "https://boardgamegeek.com/boardgame/224517/brass-birmingham",
    "imageUrl":
        "https://cf.geekdo-images.com/x3zxjr-Vw5iU4yDPg70Jgw__original/img/FpyxH41Y6_ROoePAilPNEhXnzO8=/0x0/filters:format(jpeg)/pic3490053.jpg",
    "complexityRating": 3.870261162594777,
    "minPlayers": 2,
    "maxPlayers": 4,
    "minPlaytime": 60,
    "maxPlaytime": 120,
};
const PandemicLegacy = {
    "id": "161936",
    "rank": 2,
    "name": "Pandemic Legacy: Season 1",
    "year": 2015,
    "geekRating": 8.52348,
    "url":
        "https://boardgamegeek.com/boardgame/161936/pandemic-legacy-season-1",
    "imageUrl":
        "https://cf.geekdo-images.com/-Qer2BBPG7qGGDu6KcVDIw__original/img/PlzAH7swN1nsFxOXbfUvE3TkE5w=/0x0/filters:format(png)/pic2452831.png",
    "complexityRating": 2.8298446995273463,
    "minPlayers": 2,
    "maxPlayers": 4,
    "minPlaytime": 60,
    "maxPlaytime": 60,
};
const ArkNova = {
    "id": "342942",
    "rank": 3,
    "name": "Ark Nova",
    "year": 2021,
    "geekRating": 8.53361,
    "url": "https://boardgamegeek.com/boardgame/342942/ark-nova",
    "imageUrl":
        "https://cf.geekdo-images.com/SoU8p28Sk1s8MSvoM4N8pQ__original/img/g4S18szTdrXCdIwVKzMKrZrYAcM=/0x0/filters:format(jpeg)/pic6293412.jpg",
    "complexityRating": 3.7679425837320575,
    "minPlayers": 1,
    "maxPlayers": 4,
    "minPlaytime": 90,
    "maxPlaytime": 150,
};
const Gloomhaven = {
    "id": "174430",
    "rank": 4,
    "name": "Gloomhaven",
    "year": 2017,
    "geekRating": 8.5767,
    "url": "https://boardgamegeek.com/boardgame/174430/gloomhaven",
    "imageUrl":
        "https://cf.geekdo-images.com/sZYp_3BTDGjh2unaZfZmuA__original/img/7d-lj5Gd1e8PFnD97LYFah2c45M=/0x0/filters:format(jpeg)/pic2437871.jpg",
    "complexityRating": 3.910762160091919,
    "minPlayers": 1,
    "maxPlayers": 4,
    "minPlaytime": 60,
    "maxPlaytime": 120,
};
const TwilightImperium = {
    "id": "233078",
    "rank": 5,
    "name": "Twilight Imperium: Fourth Edition",
    "year": 2017,
    "geekRating": 8.58911,
    "url":
        "https://boardgamegeek.com/boardgame/233078/twilight-imperium-fourth-edition",
    "imageUrl":
        "https://cf.geekdo-images.com/_Ppn5lssO5OaildSE-FgFA__original/img/kVpZ0Maa_LeQGWxOqsYKP3N4KUY=/0x0/filters:format(jpeg)/pic3727516.jpg",
    "complexityRating": 4.330065359477124,
    "minPlayers": 3,
    "maxPlayers": 6,
    "minPlaytime": 240,
    "maxPlaytime": 480,
};
const Dune = {
    "id": "316554",
    "rank": 6,
    "name": "Dune: Imperium",
    "year": 2020,
    "geekRating": 8.43009,
    "url": "https://boardgamegeek.com/boardgame/316554/dune-imperium",
    "imageUrl":
        "https://cf.geekdo-images.com/PhjygpWSo-0labGrPBMyyg__original/img/mZzaBAEEJpMlHWWmC0R6Su0OibQ=/0x0/filters:format(jpeg)/pic5666597.jpg",
    "complexityRating": 3.051993067590988,
    "minPlayers": 1,
    "maxPlayers": 4,
    "minPlaytime": 60,
    "maxPlaytime": 120,
};

describe("guessedCorrectGame", () => {
    const correctGame = Brass;

    // empty guesses array
    test("should return false if no guesses are given", () => {
        const guesses: Game[] = new Array(5).fill(null);

        expect(guessedCorrectGame(
            guesses,
            correctGame,
        )).toBeFalsy();
    });

    // non complete guesses array
    test("should return false if given non complete guesses", () => {
        const guesses: Game[] = new Array(5).fill(null);
        guesses[0] = PandemicLegacy;
        guesses[1] = ArkNova;

        expect(guessedCorrectGame(
            guesses,
            correctGame,
        )).toBeFalsy();
    });

    // full guesses array but not found
    test("should return false if full guesses are given but not found", () => {
        const guesses: Game[] = [
            PandemicLegacy,
            ArkNova,
            Gloomhaven,
            TwilightImperium,
            Dune,
        ];

        expect(guessedCorrectGame(
            guesses,
            correctGame,
        )).toBeFalsy();
    });

    // full guesses array, correct game is the last
    test("should return true if full guesses are given, and the last one is correct", () => {
        const guesses: Game[] = [
            PandemicLegacy,
            ArkNova,
            Gloomhaven,
            TwilightImperium,
            Brass,
        ];

        expect(guessedCorrectGame(
            guesses,
            correctGame,
        )).toBeTruthy();
    });

    // partial guesses array, correct game is there
    test("should return true if partial guesses are given, and the last one is correct", () => {
        const guesses: Game[] = new Array(5).fill(null);
        guesses[0] = PandemicLegacy;
        guesses[1] = Brass;

        expect(guessedCorrectGame(
            guesses,
            correctGame,
        )).toBeTruthy();
    });
});

describe("finishedDay", () => {
    const correctGame = Brass;

    // empty array
    test("should return false if no guesses are given", () => {
        const guesses = new Array(5).fill(null);

        expect(finishedDay(
            guesses,
            correctGame,
        )).toBeFalsy();
    });

    // partial array but no correct game
    test("should return false if partial guesses are given", () => {
        const guesses = new Array(5).fill(null);
        guesses[0] = PandemicLegacy;
        guesses[0] = ArkNova;

        expect(finishedDay(
            guesses,
            correctGame,
        )).toBeFalsy();
    });

    // full array but correct game is found
    test("should return true if full guesses are given but correct game is found", () => {
        const guesses :Game[] = [
            PandemicLegacy,
            ArkNova,
            Gloomhaven,
            Dune,
            Brass
        ];

        expect(finishedDay(
            guesses,
            correctGame,
        )).toBeTruthy();
    });

    // partial array but correct game is found
    test("should return true if partial guesses are given but correct game is found", () => {
        const guesses = new Array(5).fill(null);
        guesses[0] = PandemicLegacy;
        guesses[0] = Brass;

        expect(finishedDay(
            guesses,
            correctGame,
        )).toBeTruthy();
    });
});
