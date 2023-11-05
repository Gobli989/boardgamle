import { Day, DayData } from "./Types";

export function seededRandom(seed: number): number {
  const m = 1236967814;
  const a = 7618742178;
  const c = 9873214987;

  return (
    ((a * (seed ? seed : Math.floor(Math.random() * (m - 1))) + c) % m) /
    (m - 1)
  );
}

export function isDarkModeEnabled() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export function loadDayData(): Map<Day, DayData> {
  const dataString = localStorage.getItem("boardgamle-data");
  if (dataString == null) return new Map<Day, DayData>();

  const data = JSON.parse(dataString);

  const map = new Map<Day, DayData>();

  for (const dateString of Object.keys(dataString)) {
    const day = stringToDay(dateString);

    map.set(day, data[dateString] as DayData);
  }

  return map;
}

export function saveDayData(data: Map<Day, DayData>) {
  const obj = Object.create({});
  data.forEach((val, key) => {
    obj[`${key.y}-${key.m}-${key.d}`] = val;
  });
  localStorage.setItem("boardgamle-data", JSON.stringify(obj));
}

export function stringToDay(str: string): Day {
  const split = str.split("-");
  return {
    y: parseInt(split[0]),
    m: parseInt(split[1]),
    d: parseInt(split[2]),
  };
}
