import getColor from "@/helpers/getColor";
import getFormattedKeys from "@/helpers/getFormattedKeys";
import getFormattedWord from "@/helpers/getFormattedWord";
import { settings } from "@/lib/variables";
import { GamePhase, GameResult, IKeyboardKey, IWord } from "@/types";

type State = {
  phase: GamePhase;
  turn: number;
  input: string;
  solution: string;
  result: GameResult | null;
  words: IWord[];
  keyboardKeys: IKeyboardKey[];
};

type ResetAction = {
  type: "RESET";
  payload: null;
};

type StartAction = {
  type: "START";
  payload: {
    solution: string;
  };
};
type SetInputAction = {
  type: "SET_INPUT";
  payload: {
    input: string;
  };
};
type NextTurnAction = {
  type: "NEXT_TURN";
  payload: null;
};
type SubmitInputAction = {
  type: "SUBMIT_INPUT";
  payload: null;
};
type FormatKeyboardAction = {
  type: "FORMAT_KEYBOARD";
  payload: null;
};
type FinishAction = {
  type: "FINISH";
  payload: {
    result: GameResult;
  };
};

type Action =
  | ResetAction
  | StartAction
  | SetInputAction
  | NextTurnAction
  | SubmitInputAction
  | FormatKeyboardAction
  | FinishAction;

export const initialState: State = {
  phase: GamePhase.START,
  turn: 0,
  input: "",
  solution: "",
  result: null,
  keyboardKeys: getFormattedKeys(),
  words: [...Array(settings.maxTurns).fill({ word: "", charList: [] })],
};

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "RESET":
      return initialState;
    case "START":
      return {
        ...state,
        phase: GamePhase.IN_PROGRESS,
        solution: action.payload.solution,
      };
    case "SET_INPUT":
      return {
        ...state,
        input: action.payload.input,
      };
    case "NEXT_TURN":
      return {
        ...state,
        turn: state.turn + 1,
        input: "",
      };
    case "SUBMIT_INPUT":
      const newWords = [...state.words];
      newWords[state.turn] = getFormattedWord(state.input, state.solution);
      return {
        ...state,
        input: "",
        words: newWords,
      };
    case "FORMAT_KEYBOARD":
      const newKeys = state.keyboardKeys.map((key) => {
        const color = getColor(state.solution, state.input, key);
        return { char: key.char, color };
      });
      return {
        ...state,
        keyboardKeys: newKeys,
      };
    case "FINISH":
      return {
        ...state,
        phase: GamePhase.RESULTS,
        result: action.payload.result,
      };
    default:
      return state;
  }
}
