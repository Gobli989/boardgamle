import { Game } from "../../types/Game";

export default function GuessCell(props: { game?: Game, correctGame: Game }) {

    // If the game is left empty, create an empty slot
    if (!props.game) {
        return <div className="h-24 md:h-10 w-full outline outline-1 outline-neutral-300 dark:outline-neutral-600 rounded-xl mt-3" />;
    }

    return <div className="h-24 md:h-10 w-full outline outline-1 outline-neutral-500 rounded-xl mt-3 flex flex-col md:flex-row items-center md:ps-5">
        {/* Name */}
        <a href={props.game.url} className="flex-1 underline underline-offset-4 my-2 md:my-0 text-center md:text-start dark:text-white" target="_blank">{props.game.name}</a>

        <div className="flex flex-row justify-stretch h-full w-full md:w-auto rounded-b-xl md:rounded-none overflow-hidden">
            {/* Rank */}
            <Cell
                compare={props.correctGame.rank - props.game.rank}
                value={props.game.rank}
                statName="Rank"
            />

            {/* Publish year */}
            <Cell
                compare={props.correctGame.year - props.game.year}
                value={props.game.year}
                statName="Year"
            />

            {/* Complexity */}
            <Cell
                compare={props.correctGame.complexityRating - props.game.complexityRating}
                value={props.game.complexityRating.toFixed(2)}
                statName="Complexity"
            />
        </div>

        {/* Edge, copy the complexity rating's color. */}
        <div className={`hidden md:block w-5 h-full rounded-r-xl ${props.correctGame.complexityRating - props.game.complexityRating == 0 ? "bg-lime-500" : "bg-yellow-300"}`} />
    </div>
}

function Cell(props: { compare: number, value: string | number, statName?: string }) {

    if (props.compare == 0) {
        return <div className="flex flex-col w-full md:w-32 h-16 md:h-full bg-lime-500 items-center justify-center">
            <p className="leading-3 font-bold">{props.value}</p>
        </div>;
    }

    return <div className={`flex flex-col w-full md:w-32 h-full bg-yellow-300 items-center justify-center bg-75% bg-no-repeat bg-center ${props.compare > 0 ? "bg-arrow-up" : "bg-arrow-down"}`}>
        <p className="text-sm leading-none inline md:hidden">{props.statName}:</p>
        <p className="leading-3 font-bold">{props.value}</p>
        <p className="text-2xs">({props.compare > 0 ? "more" : "less"})</p>
    </div>


}