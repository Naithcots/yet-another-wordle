import { IKeyboardKey, IWord } from "@/types";
import Key from "./Key";
import { IAlphabet } from "./types";

interface Props {
  alphabet: IAlphabet;
  keys: IKeyboardKey[];
}

const Keyboard = ({ alphabet, keys }: Props) => {
  const { layoutRows } = alphabet;

  const row1 = keys.slice(0, layoutRows[0]);
  const row2 = keys.slice(layoutRows[0], layoutRows[1]);
  const row3 = keys.slice(layoutRows[1], layoutRows[2]);

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
