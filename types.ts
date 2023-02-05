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

export enum TKeyboardColor {
  none = 0,
  initial = 1,
  exists = 2,
  correct = 3,
}

export interface ILetter {
  char: string;
  color: TColor;
}

export interface IKeyboardKey {
  char: string;
  color: TKeyboardColor;
}

export interface IWord {
  word: string;
  charList: ILetter[];
}
