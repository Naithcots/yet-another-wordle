import getColor from "@/helpers/getColor";
import { IKeyboardKey, IWord, TKeyboardColor } from "@/types";
import { useEffect, useState } from "react";
import Key from "./Key";
import { IAlphabet } from "./types";

interface Props {
  alphabet: IAlphabet;
  words: (IWord | undefined)[];
  solution: string;
}

const { initial } = TKeyboardColor;

const Keyboard = ({ alphabet, words, solution }: Props) => {
  const { keys: keyChars, layoutRows } = alphabet;
  const [keys, setKeys] = useState<IKeyboardKey[]>(
    keyChars.map((char) => ({ char, color: initial }))
  );

  const row1 = keys.slice(0, layoutRows[0]);
  const row2 = keys.slice(layoutRows[0], layoutRows[1]);
  const row3 = keys.slice(layoutRows[1], layoutRows[2]);

  const getLatestWord = (_words: IWord[]): string =>
    _words
      .filter((word) => word !== undefined)
      .map((word) => word.word)
      .slice(-1)[0];

  useEffect(() => {
    console.log("words useEffect()");
    // If board is empty do not check keyboard
    if (words[0] === undefined) return;

    const latestWord = getLatestWord(words as IWord[]);

    const newKeys = keys.map((key) => {
      const color = getColor(solution, latestWord, key);
      return { char: key.char, color };
    });
    setTimeout(() => setKeys(newKeys), 1200);
  }, [words]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center gap-2">
        {row1.map((letter, idx) => {
          return <Key letter={letter} key={idx} />;
        })}
      </div>
      <div className="flex justify-center gap-2">
        {row2.map((letter, idx) => {
          return <Key letter={letter} key={idx} />;
        })}
      </div>
      <div className="flex justify-center gap-2">
        {row3.map((letter, idx) => {
          return <Key letter={letter} key={idx} />;
        })}
      </div>
    </div>
  );
};
export default Keyboard;
