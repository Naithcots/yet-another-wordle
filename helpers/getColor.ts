import { IKeyboardKey, TKeyboardColor } from "../types";

const { none, initial, exists, correct } = TKeyboardColor;

export default function getColor(
  solution: string,
  word: string,
  key: IKeyboardKey
) {
  if (key.color === correct || key.color === none || !word.includes(key.char))
    return key.color;
  // If solution letter position is equal to a word letter position
  if (
    solution
      .split("")
      .some((letter, idx) => letter === key.char && solution[idx] === word[idx])
  )
    return correct;
  // If solution includes key letter
  if (solution.includes(key.char)) return exists;
  return none;
}
