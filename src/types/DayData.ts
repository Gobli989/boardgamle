import { DayEnd } from "./DayEnd";

export type DayData = {
  correctGame?: number;
  guesses: number[];
  dayEnd: DayEnd;
};

export const EMPTY_DAY_DATA: DayData = {
  correctGame: undefined,
  guesses: [],
  dayEnd: DayEnd.PARTIAL,
}