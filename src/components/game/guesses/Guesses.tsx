import { LocalGameData } from "../../../types/LocalGameData";
import { trunc } from "../../../utils/Utils";

export function Guesses(props: { localGameData: LocalGameData }) {

    const data = props.localGameData;

    if(!data.correctGame) {
        return <p>Loading...</p>
    }

    return <>

        {/* Guesses */}
        <div className="flex flex-row px-3">
            <span className="flex-1 text-white">Guesses</span>
            <span className="w-20 text-center text-white">Year</span>
            <span className="w-20 text-center text-white">Rank</span>
            <span className="w-20 text-center text-white">Weight</span>
        </div>
        <div className="flex flex-col gap-3 mb-5">
            {
                data.guesses.map((g, i) => {
                    if (!g) return <div className="block h-12 w-full rounded-lg border border-1 border-gray-700" key={i} />

                    return <div className="block h-12 w-full bg-yellow-800 rounded-lg flex flex-row items-center px-3" key={i}>

                        <div className="flex-1">
                            <span className="text-white">{g.name}</span>
                        </div>

                        <div className={`h-full w-20 flex items-center justify-center border border-1 ${data.correctGame!.year !== g.year ? (isClose('year', data.correctGame!.year, g.year) ? 'bg-yellow-500' : 'bg-rose-800') : 'bg-lime-500'}`}>
                            <span className="text-white">
                                {g.year} {getArrowIcon(data.correctGame!.year, g.year)}
                            </span>
                        </div>

                        <div className={`h-full w-20 bg-yellow-500 flex items-center justify-center border border-1 ${data.correctGame!.rank !== g.rank ? (isClose('rank', data.correctGame!.rank, g.rank) ? 'bg-yellow-500' : 'bg-rose-800') : 'bg-lime-500'}`}>
                            <span className="text-white">
                                {g.rank} {getArrowIcon(g.rank, data.correctGame!.rank)}
                            </span>
                        </div>

                        <div className={`h-full w-20 bg-yellow-500 flex items-center justify-center border border-1 ${trunc(data.correctGame!.complexityRating, 2) !== trunc(g.complexityRating, 2) ? (isClose('weight', data.correctGame!.complexityRating, g.complexityRating) ? 'bg-yellow-500' : 'bg-rose-800') : 'bg-lime-500'}`}>
                            <span className="text-white">
                                {g.complexityRating.toFixed(2)} {getArrowIcon(trunc(data.correctGame!.complexityRating, 2), trunc(g.complexityRating, 2))}
                            </span>
                        </div>

                    </div>
                })
            }
        </div>
    </>;

    function getArrowIcon(num1: number, num2: number): string {
        if (num1 > num2) return "⬆";
        if (num1 < num2) return "⬇";
        return "";
    }

    function isClose(type: 'year' | 'rank' | 'weight', num1: number, num2: number): boolean {
        switch (type) {
            case "rank": return Math.abs(num1 - num2) <= 20;
            case "year": return Math.abs(num1 - num2) <= 5;
            case "weight": return Math.abs(num1 - num2) <= 1;
        }
    }

}