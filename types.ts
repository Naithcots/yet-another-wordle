export enum AppState {
  start = 0,
  inProgress = 1,
  finish = 2,
}

export enum Result {
  lose = 0,
  win = 1,
}

export type TColor = "default" | "exists" | "correct";

export interface ILetter {
  char: string;
  color: TColor;
}

export interface IWord {
  word: string;
  charList: ILetter[];
}
