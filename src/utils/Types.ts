export type DayData = {
  correctGame: number;
  guesses: number[];
  dayEnd: DayEnd;
};

export type Game = {
  id: number;
  name: string;
  year: number;
  imageURL: string;
  firstPublisherName: string;
  firstArtistName: string;
};

export type Day = {
  y: number;
  m: number;
  d: number;
};

export enum DayEnd {
  FAILED,
  PARTIAL,
  COMPLETED,
  UNKNOWN,
}

export type ResponseGame = {
  [key: string]: Game;
};
