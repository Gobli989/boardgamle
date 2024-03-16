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
import { CURRENT_VERSION, getDayData, loadLocalData, saveLocalData, setDayData } from "./utils/DataManager";
import ChangelogOverlay from "./components/changelogoverlay/ChangelogOverlay";

export default function App() {

  const [shouldPlayCorrectGameEffect, setShouldPlayCorrectGameEffect] = useState<boolean>(false);

  // GAME

  const [localGameData, setLocalGameData] = useState<LocalGameData>({
    games: [],
    localData: null,
    imageSize: 5,
    guesses: new Array(5).fill(null),
    correctGame: null,
    overlayShown: {
      info: false,
      calendar: false,
      bugReport: false,
      feedback: false,
      changelog: false,
    },
    darkMode: false
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // To toggle dark dark mode
  useEffect(() => {
    if (localGameData.darkMode) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }, [localGameData.darkMode]);

  // Load games.json and local data
  useEffect(() => {

    loadGames().then((games) => {

      // Pick a random game
      selectTodaysGame(games).then((game) => {
        const _localData = loadLocalData();
        const _guesses = getDayData(new Date(), _localData)?.guesses || [];
        const _showChangelog = _localData.lastCheckedVersion < CURRENT_VERSION;
        _localData.lastCheckedVersion = CURRENT_VERSION;

        setLocalGameData({
          ...localGameData,
          localData: _localData,
          games: games,
          correctGame: game,
          overlayShown: {
            ...localGameData.overlayShown,
            changelog: _showChangelog,
          },
          guesses: new Array(5).fill(null).map((_, i) => {
            if (_guesses.length > i) {
              return games.find(g => g.id === _guesses[i]) || null;
            }
            return null;
          }),
        });

        saveLocalData(_localData);
      });

    });

  }, []);

  useEffect(() => {

    if (!localGameData.localData) return;

    // Save guesses to localStorage
    saveLocalData(localGameData.localData);

  }, [localGameData]);

  // Rendering the pixelated image while keeping the aspect ratio
  useEffect(() => {
    renderCanvas(localGameData, canvasRef);
  }, [localGameData, canvasRef]);

  if (!localGameData.games) return (<p>Loading...</p>);

  return (
    <>

      {/* Found correct game effect */}
      <CorrectGameEffect play={shouldPlayCorrectGameEffect} setPlay={setShouldPlayCorrectGameEffect} />

      <ChangelogOverlay shown={localGameData.overlayShown.changelog} setShown={() => {
        setLocalGameData({
          ...localGameData,
          overlayShown: {
            ...localGameData.overlayShown,
            changelog: !localGameData.overlayShown.changelog
          }
        })
      }} />

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

                  const _localData = setDayData(
                    new Date(),
                    {
                      guesses: newGuesses
                    },
                    localGameData.localData!
                  );

                  setLocalGameData({
                    ...localGameData,
                    localData: _localData,
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
        <p className="footer-text footer-small">Game version: {localGameData.localData?.lastCheckedVersion}</p>
      </footer>

    </>
  );
}
