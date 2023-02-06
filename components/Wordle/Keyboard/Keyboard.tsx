import { IKeyboardKey, IWord } from "@/types";
import Key from "./Key";
import { IAlphabet } from "./types";

interface Props {
  alphabet: IAlphabet;
  keys: IKeyboardKey[];
  handleKeyUp: (e: KeyboardEvent | string) => Promise<void>;
}

const Keyboard = ({ alphabet, keys, handleKeyUp }: Props) => {
  const { layoutRows } = alphabet;

  const row0 = keys.slice(layoutRows[2], keys.length);
  const row1 = keys.slice(0, layoutRows[0]);
  const row2 = keys.slice(layoutRows[0], layoutRows[1]);
  const row3 = keys.slice(layoutRows[1], layoutRows[2]);

  return (
    <div className="px-3 w-full md:w-fit flex flex-col gap-2 text-black">
      <div className="flex justify-center gap-2">
        {row0.map((letter, idx) => {
          return <Key letter={letter} handleKeyUp={handleKeyUp} key={idx} />;
        })}
      </div>
      <div className="flex justify-center gap-2">
        {row1.map((letter, idx) => {
          return <Key letter={letter} handleKeyUp={handleKeyUp} key={idx} />;
        })}
      </div>
      <div className="flex justify-center gap-2">
        {row2.map((letter, idx) => {
          return <Key letter={letter} handleKeyUp={handleKeyUp} key={idx} />;
        })}
      </div>
      <div className="flex justify-center gap-2">
        {row3.map((letter, idx) => {
          return <Key letter={letter} handleKeyUp={handleKeyUp} key={idx} />;
        })}
      </div>
    </div>
  );
};
export default Keyboard;
