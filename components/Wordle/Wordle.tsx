import { IAlphabet, IKeyboardKey, IWord } from "@/types";
import Keyboard from "./Keyboard/Keyboard";
import Line from "./Line";
import { motion, Variants } from "framer-motion";

interface Props {
  words: (IWord | undefined)[];
  turn: number;
  input: string;
  alphabet: IAlphabet;
  keys: IKeyboardKey[];
  handleKeyUp: (e: KeyboardEvent | string) => Promise<void>;
}

const variants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { type: "tween" } },
};

const Wordle = ({ words, turn, input, alphabet, keys, handleKeyUp }: Props) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <div className="my-4 flex flex-col gap-2">
        {words.map((word, idx) =>
          idx === turn ? (
            <Line currentTurn word={word} input={input} key={idx} />
          ) : (
            <Line word={word} key={idx} />
          )
        )}
      </div>
      <Keyboard alphabet={alphabet} keys={keys} handleKeyUp={handleKeyUp} />
    </motion.div>
  );
};
export default Wordle;
