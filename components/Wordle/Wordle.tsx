import { IWord } from "@/types";

interface Props {
  words: IWord[];
}

const Wordle = ({ words }: Props) => {
  return (
    <div>
      {words.map((word, idx) => (
        <div key={idx}>{word ? word.word : "undefined"}</div>
      ))}
    </div>
  );
};
export default Wordle;
