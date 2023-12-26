import { DayEnd } from "./DayEnd";

export type DayData = {
  correctGame?: number;
  guesses: number[];
  dayEnd: DayEnd;
};
