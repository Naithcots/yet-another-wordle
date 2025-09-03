export enum GamePhase {
  START = "START",
  IN_PROGRESS = "IN_PROGRESS",
  RESULTS = "RESULTS",
}

export enum GameResult {
  LOST = "LOST",
  WON = "WON",
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

export interface IAlphabet {
  keys: string[];
  layoutRows: number[];
}

export enum Tlanguage {
  english = "english",
  polish = "polish",
}

export interface IAlphabetList {
  Tlanguage: IAlphabet;
}
