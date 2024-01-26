import { LocalGameData } from "../../../types/LocalGameData";

export function Guesses(props: { localGameData: LocalGameData }) {

    return <>
        <div className="guesses">
            {props.localGameData.guesses.map((g, i) => {
                if (!g) return <div key={i} className="guess" />
                return (
                    <div
                        key={i}
                        className={`guess ${g.id === props.localGameData.correctGame?.id
                            ? "guess-success"
                            : g.firstPublisherName ==
                                props.localGameData.correctGame?.firstPublisherName
                                ? "guess-partial"
                                : "guess-failed"
                            }`}
                    >
                        <a
                            className="game-label"
                            href={`https://boardgamegeek.com/boardgame/${g.id}/`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {g.name} ({g.year})
                        </a>
                        <span className="game-publisher">{g.firstPublisherName}</span>
                    </div>
                )
            })}
        </div>
    </>;

}