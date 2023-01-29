import Wordle from "@/components/Wordle/Wordle";
import getFormattedWord from "@/helpers/getFormattedWord";
import getWord from "@/helpers/getWord";
import isAlphabetKey from "@/helpers/isAlphabetKey";
import { AppState, ILetter, IWord, Result, TColor } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useEffect, useState } from "react";

const { start, inProgress, finish } = AppState;
const { win, lose } = Result;
const maxTurns = 6;

const Home = () => {
  const {
    refetch: wordRefetch,
    error: solutionError,
    isLoading: solutionLoading,
    data: solution,
  } = useQuery<string>(["word"], getWord, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const [appState, setAppState] = useState<AppState>(start);
  const [turn, setTurn] = useState(0);
  const [words, setWords] = useState<IWord[]>([...Array(maxTurns)]);
  const [input, setInput] = useState("");
  const [modal, setModal] = useState<null | Result>(null);

  const addWord = (word: string, turn: number) => {
    const newWords = words;
    newWords[turn] = getFormattedWord(word, solution!);
    setWords(newWords);
  };

  console.log(words);

  const nextTurn = () => {
    setInput("");
    setTurn(turn + 1);
  };

  const finishRound = (result: Result) => {
    setAppState(finish);
    setModal(result);
  };

  const restartRound = () => {
    setAppState(start);
    setInput("");
    setWords([...Array(maxTurns)]);
    setTurn(0);
    setModal(null);
    wordRefetch();
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    const alpha = isAlphabetKey(key);

    if (alpha) {
      if (input.length < 5) {
        setInput((prev) => prev + key);
      }
    } else if (key === "backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (key === "enter") {
      console.log("enter");
      if (
        input.length !== 5 ||
        words.map((word) => (word ? word.word : null)).includes(input)
      )
        return;

      addWord(input, turn);
      nextTurn();

      if (input === solution) {
        console.log("solution found!");
        finishRound(win);
      } else if (turn === maxTurns - 1) {
        console.log("game over");
        finishRound(lose);
      }
    }
  };

  useEffect(() => {
    solution && setAppState(inProgress);
  }, [solution]);

  useEffect(() => {
    appState === inProgress && document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [appState, input]);

  return (
    <>
      <Head>
        <title>Wordle</title>
      </Head>
      {solutionLoading && <h2>Loading...</h2>}
      {solution && (
        <div>
          <h2>solution: {solution}</h2>
          <h2>input: {input}</h2>
          <Wordle words={words} />
        </div>
      )}
      {modal === win && (
        <div>
          WIN<button onClick={restartRound}>Restart</button>
        </div>
      )}
      {modal === lose && (
        <div>
          LOSE<button onClick={restartRound}>Restart</button>
        </div>
      )}
    </>
  );
};
export default Home;
