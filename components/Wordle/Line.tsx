import { IWord } from "@/types";
import { MutableRefObject } from "react";
import Letter from "./Letter";

interface Props {
  word: IWord;
  currentTurn?: boolean;
  input?: string;
  lineRef?: MutableRefObject<HTMLDivElement | null>;
}

const Line = ({ word, currentTurn, input, lineRef }: Props) => {
  if (currentTurn && input)
    return (
      <div ref={lineRef} className="flex gap-2">
        {input.split("").map((letter, idx) => (
          <Letter variant="filled" letter={letter} idx={idx} key={idx} />
        ))}
        {[...Array(5 - input.length)].map((_, idx) => (
          <Letter
            variant={idx === 0 ? "current" : "empty"}
            idx={idx}
            key={idx}
          />
        ))}
      </div>
    );

  if (word.word.length === 5)
    return (
      <div className="flex gap-2">
        {word.charList.map((letter, idx) => (
          <Letter
            variant="completed"
            letter={letter.char}
            color={letter.color}
            idx={idx}
            key={idx}
          />
        ))}
      </div>
    );
  return (
    <div className="flex gap-2">
      {[...Array(5)].map((_, idx) => (
        <Letter variant="empty" idx={idx} key={idx} />
      ))}
    </div>
  );
};
export default Line;
