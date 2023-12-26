import { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { CalendarOverlay } from "./components/calendaroverlay/CalendarOverlay";
import InfoOverlay from "./components/infooverlay/InfoOverlay";
import { Day, DayData, DayEnd, ResponseGame, Game } from "./utils/Types";
import {
  isDarkModeEnabled,
  loadDayData,
  saveDayData,
  seededRandom,
} from "./utils/Utils";
import CorrectGameEffect from "./components/correctgameeffect/CorrectGameEffect";
import { OutsideComp } from "./components/OutsideComp";

export default function App() {

  const [shouldPlayCorrectGameEffect, setShouldPlayCorrectGameEffect] = useState<boolean>(false);

  // GAME

  const [games, setGames] = useState<Game[] | null>(null);
  const [guesses, setGuesses] = useState<(Game | null)[]>(new Array(5).fill(null));
  const [imageSize, setImageSize] = useState<number>(5);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [overlaysShown, setOverlaysShown] = useState<{
    info: boolean;
    calendar: boolean;
  }>({ info: false, calendar: false });
  const canvasRef = useRef(null);
  const correctGame = useRef<Game | null>(null);
  const foundCorrectGame = useRef<boolean>(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(isDarkModeEnabled());

  const [dayData, /* setDayData*/] = useState<Map<Day, DayData>>(loadDayData());

  // To toggle dark dark mode
  useEffect(() => {
    if (darkModeEnabled) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }, [darkModeEnabled]);

  // Save dayData as it changes
  useEffect(() => {
    saveDayData(dayData);
  }, [dayData]);

  // Load games.json
  useEffect(() => {
    fetch('/games.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data: ResponseGame) => {
        const gamesArray: Game[] = [];

        for (const key in data) {
          const d = data[key];
          d.id = parseInt(key);
          gamesArray.push(d);
        }

        setGames(gamesArray);

        // Selects today's game

        const now = new Date();
        const todays_seed = seededRandom(parseInt("" + now.getFullYear() + now.getMonth() + now.getDate()));

        correctGame.current = gamesArray[Math.floor(todays_seed * gamesArray.length)];

        console.log(correctGame.current);

      })
  }, []);

  // Rendering the pixelated image
  useEffect(() => {
    if (!correctGame.current || !canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const WIDTH = imageSize;
    const HEIGHT = imageSize;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const image = new Image();
    image.src = correctGame.current.imageURL;

    image.onload = () => {
      const imgWidth = image.width;
      const imgHeight = image.height;

      const ratio = Math.max(WIDTH / imgWidth, HEIGHT / imgHeight);

      const centerShiftX = (WIDTH - imgWidth * ratio) / 2;
      const centerShiftY = (HEIGHT - imgHeight * ratio) / 2;

      ctx.drawImage(
        image,
        0,
        0,
        imgWidth,
        imgHeight,
        centerShiftX,
        centerShiftY,
        imgWidth * ratio,
        imgHeight * ratio,
      );
    };

  }, [canvasRef, imageSize, correctGame.current]);

  if (!games) return (<p>Loading...</p>);

  return (
    <>

      {/* Found correct game effect */}
      <CorrectGameEffect play={shouldPlayCorrectGameEffect} setPlay={setShouldPlayCorrectGameEffect} />

      {/* INFO overlay */}
      <InfoOverlay
        shown={overlaysShown.info}
        setShown={() => {
          setOverlaysShown({ ...overlaysShown, info: !overlaysShown.info });
        }}
      />

      {/* CALENDAR overlay */}
      <CalendarOverlay
        shown={overlaysShown.calendar}
        setShown={() => {
          setOverlaysShown({
            ...overlaysShown,
            calendar: !overlaysShown.calendar,
          });
        }}
      />

      <OutsideComp
        setOverlaysShown={setOverlaysShown}
        overlaysShown={overlaysShown}
        setDarkModeEnabled={setDarkModeEnabled}
        darkModeEnabled={darkModeEnabled}
      />

      <div className="container">

        <div className="inner-container">
          <h1 className='title'>Boardgamle</h1>

          {
            (foundCorrectGame.current || !guesses.includes(null)) ?
              <img src={correctGame.current?.imageURL} className='image-canvas image-correct' /> :
              <canvas className="image-canvas" ref={canvasRef} />
          }

          {foundCorrectGame.current || !guesses.includes(null) ? (
            <>
              <p className="game-over-name">{correctGame.current?.name} ({correctGame.current?.year})</p>
            </>
          ) : (
            <>
              <Select
                className="react-select-container"
                classNamePrefix='react-select'
                options={games.filter(g => {
                  return guesses.findIndex(g2 => g2?.id === g.id) === -1;
                }).map(g => {
                  return { value: g.id, label: `${g.name} (${g.year})` };
                })}
                onChange={(sel) => {
                  if (!sel) return;
                  const game = games.find(g => g.id === sel.value);
                  if (!game) return;
                  setSelectedGame(game);
                }}
              />

              <button
                className="btn"
                onClick={() => {
                  // Guess button click
                  if (!selectedGame) return alert("Please select a game");
                  if (guesses.findIndex((g) => g?.id === selectedGame.id) !== -1) {
                    return alert("You already guessed this game");
                  }

                  const newGuesses = [...guesses];
                  const emptyIndex = newGuesses.findIndex((g) => !g);
                  if (emptyIndex === -1) return;

                  newGuesses[emptyIndex] = selectedGame;

                  setGuesses(newGuesses);
                  setImageSize(imageSize + 5);

                  const dd = new Map(dayData);
                  const now = new Date();
                  const data = dd.get({
                    y: now.getFullYear(),
                    m: now.getMonth(),
                    d: now.getDate(),
                  }) || {
                    correctGame: correctGame.current?.id || -1,
                    dayEnd: DayEnd.UNKNOWN,
                    guesses: [],
                  };

                  data.guesses = guesses.filter((g) => g !== null).map((g) => g ? g.id : -1);

                  if (selectedGame.id === correctGame.current?.id) {
                    foundCorrectGame.current = true;
                    alert("Correct!");

                    data.dayEnd = DayEnd.COMPLETED;
                  }

                  dd.set(
                    {
                      y: now.getFullYear(),
                      m: now.getMonth(),
                      d: now.getDate(),
                    },
                    data,
                  );

                  setGuesses(newGuesses);
                  setImageSize(imageSize + 5);

                  // Correct game was guessed
                  if (selectedGame.id === correctGame.current?.id) {
                    foundCorrectGame.current = true;
                    alert('Correct!');

                    setShouldPlayCorrectGameEffect(true);
                  }

                }}>Guess</button>
            </>
          )}

          <h2 className="subtitle">Guesses</h2>

          <div className="guesses">
            {guesses.map((g, i) => {
              if (!g) return <div key={i} className="guess" />
              return (
                <div
                  key={i}
                  className={`guess ${g.id === correctGame.current?.id
                    ? "guess-success"
                    : g.firstPublisherName ==
                      correctGame.current?.firstPublisherName
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

        </div>

      </div>
    </>
  );
}
