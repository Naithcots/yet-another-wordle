import { IAlphabet, IKeyboardKey, IWord } from "@/types";
import Keyboard from "./Keyboard/Keyboard";
import Line from "./Line";

interface Props {
  words: (IWord | undefined)[];
  turn: number;
  input: string;
  alphabet: IAlphabet;
  keys: IKeyboardKey[];
}

const Wordle = ({ words, turn, input, alphabet, keys }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="my-4 flex flex-col gap-2">
        {words.map((word, idx) =>
          idx === turn ? (
            <Line currentTurn word={word} input={input} key={idx} />
          ) : (
            <Line word={word} key={idx} />
          )
        )}
      </div>
      <Keyboard alphabet={alphabet} keys={keys} />
    </div>
  );
};
export default Wordle;
