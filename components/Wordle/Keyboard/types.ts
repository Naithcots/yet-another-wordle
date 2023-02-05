export interface IAlphabet {
  keys: string[];
  layoutRows: number[];
}

export interface IAlphabetList {
  english: IAlphabet;
  polish: IAlphabet;
}
