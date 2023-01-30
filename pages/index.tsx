import Modal from "@/components/Wordle/Modal";
import Wordle from "@/components/Wordle/Wordle";
import getFormattedWord from "@/helpers/getFormattedWord";
import getWord from "@/helpers/getWord";
import isAlphabetKey from "@/helpers/isAlphabetKey";
import { AppState, IWord, Result } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
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
  const [words, setWords] = useState<IWord[] | undefined[]>([
    ...Array(maxTurns),
  ]);
  const [input, setInput] = useState("");
  const [modal, setModal] = useState<null | Result>(null);

  const addWord = (word: string, turn: number) => {
    const newWords = words;
    newWords[turn] = getFormattedWord(word, solution!);
    setWords(newWords);
  };

  const nextTurn = () => {
    setInput("");
    setTurn(turn + 1);
  };

  const finishRound = (result: Result) => {
    setAppState(finish);

    setTimeout(() => setModal(result), 1250);
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
    <div>
      <Head>
        <title>Wordle</title>
      </Head>
      <header className="p-2">
        <h1 className="text-2xl font-bold text-center">Wordle-Clone</h1>
      </header>

      {solutionLoading && <h2>Loading...</h2>}
      {solution && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Wordle words={words} turn={turn} input={input} />
        </motion.div>
      )}
      {solution && (
        <h2 className="absolute bottom-0 right-0">solution: {solution}</h2>
      )}
      <AnimatePresence>
        {modal === win && (
          <Modal variant={win} solution={solution!} exitAction={restartRound} />
        )}
        {modal === lose && (
          <Modal
            variant={lose}
            solution={solution!}
            exitAction={restartRound}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
export default Home;
