export default function InfoOverlay() {
    return <>
        <h1 className="text-3xl font-bold mb-5">Info</h1>

        <p className="mb-5">
            Introducing Boardgamle, the ultimate online gaming experience
            for board game enthusiasts! Each day, players are greeted
            with a pixelated rendition of a popular board game's cover
            art, sourced from the prestigious Top 500 games of the
            renowned BoardGameGeek Database.
        </p>

        <p className="mb-5">
            The challenge is clear: utilize your board game expertise
            and intuition to guess the mysterious title within five attempts.
        </p>

        <p className="text-xs italic">
            Board game list sourced from <a href="https://boardgamegeek.com" className="text-lime-700">BoardGameGeek</a>.
            Fonts used are under the <a href="https://openfontlicense.org/" className="text-lime-700">Open Font License</a>.
            Icons are from the <a href="https://icons.getbootstrap.com/" className="text-lime-700">Bootstrap Icons</a> package.
            Images shown are from the boardgame's publishers and their respective artists.
        </p>
    </>;
}