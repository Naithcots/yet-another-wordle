import { IAlphabet, IKeyboardKey, IWord } from "@/types";
import { Variants } from "framer-motion";
import { MutableRefObject } from "react";
import Keyboard from "./Keyboard/Keyboard";
import Line from "./Line";

interface WordleProps {
  words: IWord[];
  turn: number;
  input: string;
  alphabet: IAlphabet;
  keys: IKeyboardKey[];
  currentLineRef: MutableRefObject<HTMLDivElement | null>;
  handleKeyUp: (e: KeyboardEvent | string) => Promise<void>;
}

const variants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { type: "tween" } },
};

const Wordle = ({
  words,
  turn,
  input,
  alphabet,
  keys,
  currentLineRef,
  handleKeyUp,
}: WordleProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="my-4 flex flex-col gap-2">
        {words.map((word, idx) =>
          idx === turn ? (
            <Line
              currentTurn
              lineRef={currentLineRef}
              word={word}
              input={input}
              key={idx}
            />
          ) : (
            <Line word={word} key={idx} />
          ),
        )}
      </div>
      <Keyboard alphabet={alphabet} keys={keys} handleKeyUp={handleKeyUp} />
    </div>
  );
};
export default Wordle;
