import { IWord } from "@/types";
import Line from "./Line";

interface Props {
  words: IWord[] | undefined[];
  turn: number;
  input: string;
}

const Wordle = ({ words, turn, input }: Props) => {
  return (
    <div className="my-4 flex flex-col items-center gap-2">
      {words.map((word, idx) =>
        idx === turn ? (
          <Line currentTurn word={word} input={input} key={idx} />
        ) : (
          <Line word={word} key={idx} />
        )
      )}
    </div>
  );
};
export default Wordle;
