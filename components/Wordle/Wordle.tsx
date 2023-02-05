import { IWord } from "@/types";
import Keyboard from "./Keyboard/Keyboard";
import Line from "./Line";
import alphabets from "./Keyboard/keys";

interface Props {
  words: (IWord | undefined)[];
  solution: string;
  turn: number;
  input: string;
}

const Wordle = ({ words, solution, turn, input }: Props) => {
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
      <Keyboard
        alphabet={alphabets.english}
        words={words}
        solution={solution}
      />
    </div>
  );
};
export default Wordle;
