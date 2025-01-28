import { useState } from "react";
import { LeftChevronIcon, RightChevronIcon } from "../../../icons/Icons";
import { dateToNumber, getGameDataFromLocalStorage, numberToDate } from "../../utils/SaveManager";
import { finishedDayOnDay, guessCountToCorrectGameOnDay, guessedCorrectGameOnDay } from "../../utils/GameUtils";

const now = new Date();

export default function CalendarOverlay() {

    const [year, setYear] = useState<number>(now.getFullYear());
    const [month, setMonth] = useState<number>(now.getMonth());
    const [selectedDay, setSelectedDay] = useState<number>();

    const dayOffset = new Date(year, month, 0).getDay() - 1;

    return <div className="w-96">
        <h1 className="text-3xl font-bold mb-5">Previous days</h1>

        {/* Month chooser */}
        <div className="flex flex-row mb-5">

            <button className="w-12 flex flex-row justify-center items-center" onClick={() => switchMonthDown()}>
                <LeftChevronIcon className="fill-black dark:fill-white" />
            </button>

            <div className="flex-1 flex flex-row justify-center items-center">
                {now.getFullYear() !== year ? `${year}. ` : ""}{monthNames[month]}
            </div>

            <button className="w-12 flex flex-row justify-center items-center" onClick={() => switchMonthUp()}>
                <RightChevronIcon className="fill-black dark:fill-white" />
            </button>

        </div>

        {/* Calendar */}
        <div className="w-full">
            {
                a(7).map((_, weekIndex) => {

                    if (weekIndex === 0) {
                        // First row, show day names
                        return <div className="flex flex-row w-full" key={"lf-" + weekIndex}>
                            {
                                a(7).map((_, weekdayIndex) => (
                                    <div className="flex-1 text-center" key={"l-" + weekdayIndex}>
                                        <span>{weekdayNames[weekdayIndex]}</span>
                                    </div>
                                ))
                            }
                        </div>;
                    }

                    return <div className="flex flex-row w-full" key={"la-" + weekIndex}>
                        {
                            a(7).map((_, weekdayIndex) => {

                                const dayIndex = (weekIndex - 1) * 7 + weekdayIndex - dayOffset;

                                const date = new Date(year, month, dayIndex);
                                const dayData = getGameDataFromLocalStorage(dateToNumber(date));
                                // const completion = getCompletion(dayData);

                                let guessColor = "bg-stone-700";

                                if (dayData) {

                                    if (finishedDayOnDay(dayData)) {

                                        if (guessedCorrectGameOnDay(dayData)) {
                                            switch (guessCountToCorrectGameOnDay(dayData)) {
                                                case 0: guessColor = "bg-lime-500"; break;
                                                case 1: guessColor = "bg-lime-600"; break;
                                                case 2: guessColor = "bg-lime-700"; break;
                                                case 3: guessColor = "bg-lime-800"; break;
                                                case 4: guessColor = "bg-lime-900"; break;
                                            }
                                        } else {
                                            guessColor = "bg-yellow-800";
                                        }
                                    } else {
                                        guessColor = "bg-stone-500";
                                    }
                                }

                                // let bgColor = "";
                                // switch (completion) {
                                //     case Completion.FOUND: bgColor = "bg-lime-500 !text-black"; break;
                                //     case Completion.MORE_GUESSES: bgColor = "bg-yellow-800"; break;
                                //     case Completion.OUT_OF_GUESSES: bgColor = "bg-stone-700"; break;
                                // }

                                return <button className={`flex-1 flex flex-row items-center justify-center h-12 m-1 rounded-md border border-stone-600 text-black dark:text-white ${date.getMonth() !== month ? "opacity-50 pointer-events-none" : ""} ${sameDay(now, date) ? "border-lime-500 border-2" : ""} ${guessColor}`}
                                    onClick={() => setSelectedDay(dateToNumber(date))}
                                    key={"i-" + dayIndex}
                                >
                                    {date.getDate()}
                                </button>;
                            })
                        }
                    </div>;
                }

                )

            }
        </div>

        {/* Day details */}

        <div className="w-full flex flex-row h-64 border border-stone-600 rounded-lg mt-5 p-3">
            <SelectedDayElement selectedDay={selectedDay} />
        </div>

    </div>;

    function switchMonthUp() {
        const m = month + 1;

        if (m > 11) {
            setYear(year + 1);
            setMonth(0);
            return;
        }

        setMonth(m);
    }
    function switchMonthDown() {
        const m = month - 1;

        if (m < 0) {
            setYear(year - 1);
            setMonth(11);
            return;
        }

        setMonth(m);
    }

    function sameDay(date1: Date, date2: Date): boolean {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }

    // function getCompletion(saveDay: SaveDayType | null): Completion {
    //     if (!saveDay) return Completion.NOT_TRIED;

    //     const foundCorrectGame = saveDay.guesses.findIndex((game) => game !== null && game.id === saveDay.correctGame.id) !== -1;

    //     if (foundCorrectGame) return Completion.FOUND;

    //     // Correct game was not found, are the guesses exhausted or can new guesses made?

    //     const allGuesses = saveDay.guesses.findIndex((game) => game === null) !== -1;

    //     if (allGuesses) return Completion.OUT_OF_GUESSES;

    //     return Completion.MORE_GUESSES;
    // }
}

function a(length: number): null[] {
    return new Array(length).fill(null);
}

const weekdayNames = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
];

const monthNames = [
    "January",
    "Februrary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augustus",
    "September",
    "October",
    "November",
    "December",
]

// enum Completion {
//     FOUND,
//     OUT_OF_GUESSES,
//     MORE_GUESSES,
//     NOT_TRIED
// }

function SelectedDayElement(props: { selectedDay?: number }) {
    if (!props.selectedDay) return null;

    const dayData = getGameDataFromLocalStorage(props.selectedDay);
    const date = numberToDate(props.selectedDay)!;

    if (!dayData) {
        return <div className="w-full flex items-center justify-center text-stone-500">
            <a className="w-full h-10 bg-lime-500 text-black font-semibold rounded-lg flex items-center justify-center" href={`/?date=${props.selectedDay}`}>Play!</a>
        </div>
    }

    return <>
        <div className="flex flex-row w-full gap-5">
            <div className="flex-1 flex flex-col">
                <p className="text-sm leading-none">{date.getFullYear()}</p>
                <p className="text-lg leading-none font-semibold">{monthNames[date.getMonth() - 1]} {date.getDate()}.</p>

                <div className="flex-1 w-full my-2">
                    {
                        finishedDayOnDay(dayData) &&
                        <img className="max-h-32 max-w-32 mx-auto" src={dayData.correctGame.imageUrl} />
                    }
                </div>

                {/* <div className="flex-1" /> */}

                <a className="w-full h-10 bg-lime-500 text-black font-semibold rounded-lg flex items-center justify-center" href={`/?date=${props.selectedDay}`}>Play!</a>

            </div>
            <div className="flex-1 overflow-x-hidden">
                <p>Guesses:</p>

                {
                    dayData &&
                    dayData.guesses.map((game, i) => {

                        if (game === null) {
                            return <div className="w-full rounded-lg border h-8 border-stone-500 py-1 mt-2" key={"ddg-" + i} />;
                        }

                        if (game.id === dayData.correctGame.id) {
                            return <div className="w-full h-8 flex items-center rounded-lg bg-lime-500 text-black px-2 mt-2" key={"ddg-" + i}>
                                <span className="text-xs text-nowrap text-ellipsis overflow-hidden">{game.name}</span>
                            </div>;
                        }

                        return <div className="w-full h-8 flex items-center rounded-lg border border-stone-500 px-2 mt-2" key={"ddg-" + i}>
                            <span className="text-xs text-nowrap text-ellipsis overflow-hidden">{game.name}</span>
                        </div>;
                    })
                }
            </div>
        </div>
    </>;
}