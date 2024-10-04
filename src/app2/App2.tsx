import { useState } from "react";
import all_games from "../assets/all_games.json";
import GuessCell from "./components/GuessCell";
import { Game } from "../types/Game";
import Select from "react-select/base";
import { InputActionMeta } from "react-select";

const correctGame = all_games[0];

export default function App2() {

    const [guesses, setGuesses] = useState<Game[]>(new Array(5).fill(null));

    return <>
        <div className="block max-w-screen-lg mx-auto">
            <h1 className="text-4xl text-center font-bold mt-5">Boardgamle</h1>

            {/* Game image canvas */}
            <div className="mx-auto my-5 w-96 h-96 bg-lime-500 outline outline-1 outline-offset-3 outline-white rounded-lg"></div>

            {/* Selector */}

            <Select
                className="react-select-container"
                classNamePrefix='react-select'
                options={all_games
                    .filter(g => guesses.findIndex(g2 => g2?.id === g.id) === -1)
                    .map(g => ({ value: g.id, label: g.name }))
                    .sort((a, b) => a.label.localeCompare(b.label))}
                onChange={(sel) => {
                    if (!sel) return;

                    const game = all_games.find(g => g.id === sel.value);

                    if (!game) return;

                    //   setSelectedGame(game);
                }}
                inputValue={""}
                onInputChange={(newValue, actionMeta) => {
                    throw new Error("Function not implemented.");
                }}
                onMenuOpen={() => {}}
                onMenuClose={function (): void {
                    throw new Error("Function not implemented.");
                }}
                value={null} />

            {/* Guesses */}
            <div className="mt-5 px-10">
                <div className="flex flex-row px-5">
                    <p className="flex-1">Name</p>
                    <p className="block w-32 text-center">Rank</p>
                    <p className="block w-32 text-center">Year</p>
                    <p className="block w-32 text-center">Complexity</p>
                </div>

                {
                    guesses.map((guess, i) => <GuessCell
                        key={'guess-' + i}
                        game={guess}
                        correctGame={correctGame}
                    />
                    )
                }

            </div>

        </div>
    </>;
}