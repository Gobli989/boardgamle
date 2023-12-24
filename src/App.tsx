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

      <div className="outside">
        {/* Info overlay button */}
        <button className="outside-btn" onClick={() => {
          setOverlaysShown({ ...overlaysShown, info: !overlaysShown.info });
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='outside-btn-icon'>
            {/* <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}
            <path style={{ fill: 'var(--text)' }} d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg>
          <span className="outside-btn-label">Info</span>
        </button>

        {/* Calendar overlay button */}
        <button className="outside-btn" onClick={() => {
          setOverlaysShown({ ...overlaysShown, calendar: !overlaysShown.info });
        }} style={{ display: 'none' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='outside-btn-icon'>
            {/* <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
            <path style={{ fill: 'var(--text)' }} d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" />
          </svg>
          <span className="outside-btn-label">Calendar</span>
        </button>

        {/* Darkmode toggle button */}
        <button
          className="outside-btn"
          onClick={() => {
            setDarkModeEnabled(!darkModeEnabled);
          }}
        >
          {darkModeEnabled ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="outside-btn-icon"
            >
              {/*<!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}
              <path
                style={{ fill: "var(--text)" }}
                d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="outside-btn-icon"
            >
              {/*<!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}
              <path
                style={{ fill: "var(--text)" }}
                d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
              />
            </svg>
          )}
          <span className="outside-btn-label">Toggle Dark Mode</span>
        </button>
      </div>

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
