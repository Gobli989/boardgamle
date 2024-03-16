import Overlay from "../Overlay";

import "./InfoOverlay.css";

export default function InfoOverlay(props: {
  shown: boolean;
  setShown: () => void;
}) {
  return (
    <Overlay shown={props.shown}>
      <div className="overlay-container">
        <span className="overlay-container-x" onClick={props.setShown}>
          &times;
        </span>
        <h1>Info</h1>

        <p>
          Introducing Boardgamle, the ultimate online gaming experience for
          board game enthusiasts! Each day, players are greeted with a pixelated
          rendition of a popular board game&apos;s cover art, sourced from the
          prestigious Top 500 games of the renowned BoardGameGeek Database.
        </p>

        <p>
          The
          challenge is clear: utilize your board game expertise and intuition to
          guess the mysterious title within five attempts.
        </p>

        <h3>Color meanings:</h3>

        <div className="info-colors-container">

          <div className="info-color">
            <div className="info-color-box info-green" />
            <span>Correct!</span>
          </div>

          <div className="info-color">
            <div className="info-color-box info-yellow" />
            <span>The publisher matches</span>
          </div>

          <div className="info-color">
            <div className="info-color-box info-red" />
            <span>Not a match</span>
          </div>

        </div>

        <p className="info-small">
          Board game list sourced from <a href="https://boardgamegeek.com/">BoardGameGeek</a>.
          Fonts used are under the <a href="https://openfontlicense.org">Open Font License</a>.
          Icons are from the <a href="https://getbootstrap.com/">Bootstrap Icons</a> package.
          Images shown are from the boardgame's publishers and their respective artists.
        </p>

      </div>
    </Overlay>
  );
}
