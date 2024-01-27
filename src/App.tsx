import { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { CalendarOverlay } from "./components/calendaroverlay/CalendarOverlay";
import InfoOverlay from "./components/infooverlay/InfoOverlay";
import { Game } from "./types/Game";
import CorrectGameEffect from "./components/correctgameeffect/CorrectGameEffect";
import { Toolbar } from "./components/toolbar/Toolbar";
import { loadGames, selectTodaysGame } from "./utils/GameManager";
import { LocalGameData } from "./types/LocalGameData";
import { Guesses } from "./components/game/guesses/Guesses";
import { renderCanvas } from "./utils/CanvasManager";
import BugReportOverlay from "./components/bug_report_overlay/BugReportOverlay";
import FeedbackOverlay from "./components/feedback_overlay/FeedbackOverlay";

export default function App() {

  const [commitId, setCommitId] = useState<string | null>(null);

  const [shouldPlayCorrectGameEffect, setShouldPlayCorrectGameEffect] = useState<boolean>(false);

  // GAME

  const [localGameData, setLocalGameData] = useState<LocalGameData>({
    games: [],
    imageSize: 5,
    guesses: new Array(5).fill(null),
    correctGame: null,
    overlayShown: {
      info: false,
      calendar: false,
      bugReport: false,
      feedback: false
    },
    darkMode: false
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // TODO: const [todaysDayData, setTodaysDayData] = useState<DayData>(EMPTY_DAY_DATA);

  // To toggle dark dark mode
  useEffect(() => {
    if (localGameData.darkMode) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }, [localGameData.darkMode]);

  // TODO: Save todaysDayData as it changes
  // useEffect(() => {

  //   const now = new Date();
  //   setDayData({
  //     y: now.getFullYear(),
  //     m: now.getMonth(),
  //     d: now.getDate(),
  //   }, todaysDayData);

  // }, [todaysDayData]);

  // Load games.json
  useEffect(() => {
    loadGames().then((games) => {

      // Pick a random game
      selectTodaysGame(games).then((game) => {
        setLocalGameData({
          ...localGameData,
          games: games,
          correctGame: game
        });
      });
    });

    // TODO: Load day data
    // loadDayData();

    // load Commit ID
    fetch('/commit.txt')
      .then((res) => res.text())
      .then((text) => {
        setCommitId(text.trim());
      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  // Rendering the pixelated image while keeping the aspect ratio
  useEffect(() => renderCanvas(localGameData, canvasRef), [localGameData, canvasRef]);

  if (!localGameData.games) return (<p>Loading...</p>);

  return (
    <>

      {/* Found correct game effect */}
      <CorrectGameEffect play={shouldPlayCorrectGameEffect} setPlay={setShouldPlayCorrectGameEffect} />

      {/* INFO overlay */}
      <InfoOverlay
        shown={localGameData.overlayShown.info}
        setShown={() => {
          setLocalGameData({
            ...localGameData,
            overlayShown: {
              ...localGameData.overlayShown,
              info: !localGameData.overlayShown.info
            }
          })
        }}
      />

      {/* CALENDAR overlay */}
      <CalendarOverlay
        shown={localGameData.overlayShown.calendar}
        setShown={() => {
          setLocalGameData({
            ...localGameData,
            overlayShown: {
              ...localGameData.overlayShown,
              calendar: !localGameData.overlayShown.calendar
            }
          })
        }}
      />

      {/* Bug report overlay */}
      <BugReportOverlay
        shown={localGameData.overlayShown.bugReport}
        setShown={() => {
          setLocalGameData({
            ...localGameData,
            overlayShown: {
              ...localGameData.overlayShown,
              bugReport: !localGameData.overlayShown.bugReport
            }
          })
        }}
      />

      {/* Feedback overlay */}
      <FeedbackOverlay
        shown={localGameData.overlayShown.feedback}
        setShown={() => {
          setLocalGameData({
            ...localGameData,
            overlayShown: {
              ...localGameData.overlayShown,
              feedback: !localGameData.overlayShown.feedback
            }
          })
        }}
      />

      <Toolbar
        setLocalGameData={setLocalGameData}
        localGameData={localGameData}
      />

      <main className="container">

        <div className="inner-container">
          <h1 className='title'>Boardgamle</h1>

          {
            (localGameData.guesses.includes(localGameData.correctGame!) || !localGameData.guesses.includes(null)) ?
              <img src={localGameData.correctGame?.imageURL} className='image-canvas image-correct' /> :
              <canvas className="image-canvas" ref={canvasRef} />
          }

          {(localGameData.guesses.includes(localGameData.correctGame) || !localGameData.guesses.includes(null)) ? (
            <>
              <p className="game-over-name">{localGameData.correctGame?.name} ({localGameData.correctGame?.year})</p>
            </>
          ) : (
            <>
              <Select
                className="react-select-container"
                classNamePrefix='react-select'
                options={localGameData.games.filter(g => {
                  return localGameData.guesses.findIndex(g2 => g2?.id === g.id) === -1;
                }).map(g => {
                  return { value: g.id, label: `${g.name} (${g.year})` };
                })}
                onChange={(sel) => {
                  if (!sel) return;
                  const game = localGameData.games.find(g => g.id === sel.value);
                  if (!game) return;
                  setSelectedGame(game);
                }}
              />

              <p className="error-message">{errorMessage}</p>

              <button
                className="btn"
                onClick={() => {
                  // Guess button click
                  setErrorMessage("");

                  if (!selectedGame) {
                    setErrorMessage("Please select a game");
                    return;
                  }

                  if (localGameData.guesses.findIndex((g) => g?.id === selectedGame.id) !== -1) {
                    setErrorMessage("You already guessed this game");
                    return;
                  }

                  const newGuesses = [...localGameData.guesses];
                  const emptyIndex = newGuesses.findIndex((g) => !g);
                  if (emptyIndex === -1) return;

                  newGuesses[emptyIndex] = selectedGame;

                  setLocalGameData({
                    ...localGameData,
                    guesses: newGuesses,
                    imageSize: localGameData.imageSize + 5
                  });

                  // Correct game was guessed
                  if (localGameData.guesses.includes(localGameData.correctGame)) {
                    setShouldPlayCorrectGameEffect(true);
                  }

                }}>Guess</button>
            </>
          )}

          <h2 className="subtitle">Guesses</h2>

          <Guesses localGameData={localGameData} />

        </div>

      </main>

      <footer>
        <p className="footer-text">Made with love by <a className="footer-rainbow" href="https://rubenxd.hu" target="_blank">Ruben</a>!</p>
        <p className="footer-text footer-small">{commitId}</p>
      </footer>

    </>
  );
}
