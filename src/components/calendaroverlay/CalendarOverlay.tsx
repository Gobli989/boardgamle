import { useState } from "react";
import Overlay from "../Overlay";

import "./CalendarOverlay.css";

export function CalendarOverlay(props: {
  shown: boolean;
  setShown: () => void;
}) {
  const [month, setMonth] = useState<{ year: number; month: number }>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const [selectedDay, setSelectedDay] = useState<{
    year: number;
    month: number;
    day: number;
  } | null>({ year: 2023, month: 9, day: 10 });

  return (
    <Overlay shown={props.shown}>
      <div className="overlay-container calendar-overlay">
        <span className="overlay-container-x" onClick={props.setShown}>
          &times;
        </span>
        <h1>Calendar overlay</h1>

        <div className="calendar-time-buttons">
          <button
            className="calendar-time-btn"
            onClick={() => {
              const copy = Object.assign({}, month);

              if (copy.month == 0) {
                copy.year--;
                copy.month = 11;
              } else {
                copy.month--;
              }

              setMonth(copy);
            }}
          >
            &#60;
          </button>
          <span className="calendar-time">
            {month.year !== new Date().getFullYear() ? `${month.year} ` : ""}
            {getMonthName(month.month)}
          </span>
          <button
            disabled={
              new Date().getMonth() === month.month &&
              new Date().getFullYear() === month.year
            }
            className="calendar-time-btn"
            onClick={() => {
              const copy = Object.assign({}, month);

              if (copy.month == 11) {
                copy.year++;
                copy.month = 0;
              } else {
                copy.month++;
              }

              setMonth(copy);
            }}
          >
            &#62;
          </button>
        </div>

        <div className="calendar-container">
          <span className="calendar-day-label">Sun</span>
          <span className="calendar-day-label">Mon</span>
          <span className="calendar-day-label">Tue</span>
          <span className="calendar-day-label">Wed</span>
          <span className="calendar-day-label">Thu</span>
          <span className="calendar-day-label">Fri</span>
          <span className="calendar-day-label">Sat</span>

          {createWeek(month.year, month.month)}
        </div>

        <div
          className={`calendar-result ${
            selectedDay === null ? "calendar-result-empty" : ""
          }`}
        >
          {selectedDay !== null ? (
            <>
              <span className="calendar-result-small">2023. July 22.</span>
              <span className="calendar-result-correct">
                Correct Game: <a href="#">Scout</a>
              </span>
              <span className="calendar-result-small">Your guesses:</span>
              <span>1. Chess, 2. Anachrony</span>
            </>
          ) : (
            <>
              <span>No day selected</span>
            </>
          )}
        </div>
      </div>
    </Overlay>
  );
}

function createWeek(year: number, month: number) {
  const out = [];

  const firstDay = new Date(year, month, 1);

  for (let j = firstDay.getDay(); j > 0; j--) {
    out.push(
      <>
        <div className="calendar-day calendar-day-off">
          <span>
            {new Date(
              firstDay.getFullYear(),
              firstDay.getMonth(),
              -j,
            ).getDate()}
          </span>
        </div>
      </>,
    );
  }

  for (let i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
    // Weeks
    const date = new Date(year, month, i);

    out.push(
      <>
        <div className="calendar-day">
          <span>{date.getDate()}</span>
        </div>
      </>,
    );
  }

  const lastDay = new Date(year, month + 1, 0);

  for (let j = lastDay.getDay(); j < 6; j++) {
    out.push(
      <>
        <div className="calendar-day calendar-day-off">
          <span>
            {new Date(
              firstDay.getFullYear(),
              firstDay.getMonth() + 1,
              j,
            ).getDate()}
          </span>
        </div>
      </>,
    );
  }

  return out;
}

function getMonthName(month: number) {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
  return "Invalid";
}
