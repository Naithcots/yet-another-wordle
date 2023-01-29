import { IWord } from "@/types";
import Letter from "./Letter";

interface Props {
  word: IWord | undefined;
  currentTurn?: boolean;
  input?: string;
}

const Line = ({ word, currentTurn, input }: Props) => {
  if (currentTurn)
    return (
      <div className="flex gap-2">
        {input!.split("").map((letter, idx) => (
          <Letter variant="filled" letter={letter} key={idx} />
        ))}
        {[...Array(5 - input!.length)].map((_, idx) => (
          <Letter variant={idx === 0 ? "current" : "empty"} key={idx} />
        ))}
      </div>
    );

  if (word)
    return (
      <div className="flex gap-2">
        {word.charList.map((letter, idx) => (
          <Letter
            variant="completed"
            letter={letter.char}
            color={letter.color}
            delay={idx}
            key={idx}
          />
        ))}
      </div>
    );
  return (
    <div className="flex gap-2">
      {[...Array(5)].map((_, idx) => (
        <Letter variant="empty" key={idx} />
      ))}
    </div>
  );
};
export default Line;
