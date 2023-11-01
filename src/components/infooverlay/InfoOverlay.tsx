import Overlay from "../Overlay";

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
        <h1>Info overlay</h1>
        <p>
          Introducing Boardgamle, the ultimate online gaming experience for
          board game enthusiasts! Each day, players are greeted with a pixelated
          rendition of a popular board game&apos;s cover art, sourced from the
          prestigious Top 500 games of the renowned BoardGameGeek Database. The
          challenge is clear: utilize your board game expertise and intuition to
          guess the mysterious title within five attempts.
        </p>
        <p>
          However, if your guesses fall short and the enigmatic cover remains
          unresolved, fear not! Boardgamle generously unveils the identity of
          the day&apos;s featured game, ensuring that players can expand their
          board game knowledge with each engaging round. For an added hint, if
          the game&apos;s publisher happens to match that of the current
          day&apos;s game, the clue is subtly highlighted in a vibrant shade of
          yellow, making the quest for the correct answer all the more
          thrilling. Join Boardgamle today and put your board game recognition
          skills to the ultimate test!
        </p>
      </div>
    </Overlay>
  );
}
