interface Props {
  words: string[];
}

const Wordle = ({ words }: Props) => {
  return (
    <div>
      {words.map((word, idx) => (
        <div key={idx}>{word || "undefined"}</div>
      ))}
    </div>
  );
};
export default Wordle;
