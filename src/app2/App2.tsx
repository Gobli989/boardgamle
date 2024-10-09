import { useEffect, useRef, useState } from "react";
import all_games from "../assets/all_games.json";
import GuessCell from "./components/GuessCell";
import { Game } from "../types/Game";
import StateManagedSelect from 'react-select';
import Select from "react-select/base";
import { renderCanvas } from "../utils/CanvasManager";
import { selectTodaysGame } from "../utils/GameManager";

const correctGame = selectTodaysGame(all_games);

export default function App2() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const selectRef = useRef<Select<Game>>(null);
    const [guesses, setGuesses] = useState<Game[]>(new Array(5).fill(null));

    useEffect(() => {
        console.log("Rendering");

        const guessAmount = guesses.findIndex(e => e === null);

        if (guessAmount === -1) {
            // No more guesses, we can show the original image to the user.
            console.log("No more guesses, we can show the original image to the user.");
            return;
        }

        renderCanvas(correctGame, 5 + guessAmount * 5, canvasRef);
    }, [canvasRef, guesses]);

    return <>
        <main className="block max-w-screen-lg mx-auto">
            <h1 className="text-4xl text-center font-bold mt-5">Boardgamle</h1>

            {/* Game image canvas */}
            {
                foundCorrectGame() ? (
                    <img src={correctGame.imageUrl} className="mx-auto my-5 w-96 h-96 outline outline-1 outline-offset-3 outline-white rounded-lg" />
                ) : (
                    <canvas className="mx-auto my-5 w-96 h-96 outline outline-1 outline-offset-3 outline-white rounded-lg image-pixelated" ref={canvasRef} />
                )
            }

            {/* Selector */}

            {
                !foundCorrectGame() ? (
                    <div className="flex flex-row gap-5 px-10">
                        <div className="flex-1">
                            <StateManagedSelect<Game>
                                className="react-select-container"
                                classNamePrefix='react-select'
                                options={all_games
                                    .filter(g => guesses.findIndex(g2 => g2?.id === g.id) === -1)
                                    .map(g => ({ ...g, label: g.name, value: g.id }))
                                    .sort((a, b) => a.name.localeCompare(b.name))}
                                ref={selectRef}
                            />
                        </div>
                        <button className="w-32 bg-lime-500 text-white rounded-lg font-semibold" onClick={() => {
                            // Gets the current selection from the <StateManagedSelect> element.
                            const curr = selectRef.current;

                            if (!curr || !curr.getValue() || curr.getValue().length === 0) {
                                // TODO: Change this to a more user friendly version
                                alert("You did not select a game");
                                return;
                            }

                            const selectedOption = curr.getValue()[0];

                            // First, see if they already guessed this game
                            if (guesses.findIndex(e => e !== null && e.id === selectedOption.id) !== -1) {
                                // TODO: Change this to a more user friendly version
                                alert("You already guessed this game.");
                                return;
                            }

                            // Adds it to the guesses part.

                            const nextNullIndex = guesses.findIndex((e) => e === null);

                            // No more guesses
                            if (nextNullIndex == -1) {
                                alert("No more guesses");
                                return;
                            }

                            // Needs to copy the array to actually make a state update.
                            const arrayCopy = [...guesses];
                            arrayCopy[nextNullIndex] = selectedOption;

                            setGuesses(arrayCopy);

                            curr.setValue(null, "deselect-option");

                        }}>Guess</button>
                    </div>
                ) : ""
            }

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

        </main>

        <footer className="w-full h-24 mt-16 bg-gray-50 border-t border-gray-300 flex flex-col justify-center items-center">
            <p className="text-black">
                Made with
                &nbsp;
                <span className="text-rainbow-anim inline-block">❤</span>
                &nbsp;
                by
                &nbsp;
                <a href="https://rubenxd.hu" target="_blank" className="underline">Ruben</a>
            </p>
        </footer>
    </>;

    function foundCorrectGame() {
        return guesses.findIndex(e => e && e.id === correctGame.id) !== -1 || guesses.findIndex(e => !e) === -1;
    }
}