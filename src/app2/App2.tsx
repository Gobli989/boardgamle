import { useEffect, useRef, useState } from "react";
import all_games from "../assets/all_games.json";
import GuessCell from "./components/GuessCell";
import { Game } from "../types/Game";
import StateManagedSelect from 'react-select';
import Select from "react-select/base";
import { renderCanvas } from "../utils/CanvasManager";
import { selectTodaysGame } from "../utils/GameManager";
import Navbar from "./Navbar";
import { PlayersIcon, TimeIcon } from "../icons/Icons";

const correctGame = selectTodaysGame(all_games);

export default function App2() {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const selectRef = useRef<Select<Game>>(null);
    const [guesses, setGuesses] = useState<Game[]>(new Array(5).fill(null));

    useEffect(() => {
        const guessAmount = guesses.findIndex(e => e === null);

        if (guessAmount === -1) {
            // No more guesses, we can show the original image to the user.
            console.log("No more guesses, we can show the original image to the user.");
            return;
        }

        renderCanvas(correctGame, 5 + guessAmount * 5, canvasRef);
    }, [canvasRef, guesses]);

    return <div className="min-w-full min-h-full dark:bg-stone-900">
        <Navbar />

        <main className="block max-w-screen-lg mx-auto">

            <h1 className="text-4xl text-center font-bold pt-5 dark:text-white">Boardgamle</h1>

            {/* Game image canvas */}
            {
                foundCorrectGame() ? (
                    <img src={correctGame.imageUrl} className="mx-auto my-5 h-96 outline outline-1 outline-offset-3 outline-white rounded-xl" />
                ) : (
                    <div className="mx-auto px-10 my-5 max-h-96 max-w-96">
                        <canvas className="w-full outline outline-1 outline-offset-3 outline-white dark:outline-stone-600 rounded-xl image-pixelated" ref={canvasRef} />
                    </div>
                )
            }

            {/* Selector */}

            {
                foundCorrectGame() ? (
                    <div className="md:max-w-screen-sm mx-12 md:mx-auto flex flex-col md:flex-row gap-5">
                        <h1 className="text-3xl font-bold dark:text-white">
                            <span className="font-normal me-3 border-r-2 border-black dark:border-white">#{correctGame.rank} </span>
                            <a href={correctGame.url} target="_blank" className="underline underline-offset-4">{correctGame.name}</a>
                            <span className="text-sm font-normal"> ({correctGame.year})</span>
                        </h1>

                        <div className="flex-1">
                            <p className="text-sm dark:text-white leading-none">Players:</p>
                            <PlayersIcon className="fill-black dark:fill-white inline-block" />
                            <p className="inline dark:text-white text-xl ms-2">
                                {correctGame.minPlayers} - {correctGame.maxPlayers}
                            </p>
                        </div>

                        <div className="flex-1">
                            <p className="text-sm dark:text-white leading-none">Playtime:</p>
                            <TimeIcon className="fill-black dark:fill-white inline-block" />
                            <p className="inline dark:text-white text-xl ms-2">
                                {correctGame.minPlaytime} - {correctGame.maxPlaytime} min
                            </p>
                        </div>

                    </div>
                ) :(
                    <div className="flex flex-col md:flex-row gap-5 px-10">
                        <div className="flex-1">
                            <StateManagedSelect<Game>
                                className="react-select-container"
                                classNamePrefix='react-select'
                                classNames={{
                                    menu: () => "dark:bg-stone-800",
                                    noOptionsMessage: () => "dark:bg-stone-800 dark:text-white" ,
                                    input: () => "dark:text-white",
                                    control: () => "dark:bg-stone-800 !rounded-xl dark:border-stone-600 ouline-none",
                                    singleValue: () => "dark:text-white",
                                    option: (state) => "dark:bg-stone-800 dark:text-white" + (state.isFocused ? " dark:!bg-stone-700" : "") + (state.isSelected ? " !bg-lime-500 !text-black" : ""),
                                }}
                                options={all_games
                                    .filter(g => guesses.findIndex(g2 => g2?.id === g.id) === -1)
                                    .map(g => ({ ...g, label: g.name, value: g.id, className: "abc" }))
                                    .sort((a, b) => a.name.localeCompare(b.name))}
                                ref={selectRef}
                            />
                        </div>
                        <button className="w-full h-10 md:h-auto md:w-32 bg-lime-500 text-white dark:text-black rounded-lg font-semibold" onClick={guessButtonClick}>Guess</button>
                    </div>
                )
            }

            {/* Guesses */}
            <div className="mt-5 px-10">
                <div className="hidden md:flex flex-row px-5 dark:text-stone-400">
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

        <footer className="w-full h-24 mt-24 bg-gray-50 dark:bg-stone-800 border-t border-gray-300 dark:border-stone-600 flex flex-col justify-center items-center">
            <p className="text-black dark:text-white">
                Made with
                &nbsp;
                <span className="text-rainbow-anim inline-block">❤</span>
                &nbsp;
                by
                &nbsp;
                <a href="https://rubenxd.hu" target="_blank" className="underline">Ruben</a>
            </p>
        </footer>
    </div>;

    function foundCorrectGame() {
        return guesses.findIndex(e => e && e.id === correctGame.id) !== -1 || guesses.findIndex(e => !e) === -1;
    }

    /**
     * When the user click on the Guess button, this function runs.
     * 
     * Gathers the information about the selected game, then
     * puts it into the guesses array, updating the image and other stuff.
     */
    function guessButtonClick() {
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
    }

}