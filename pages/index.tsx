import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import Modal from "@/components/Wordle/Modal";
import Wordle from "@/components/Wordle/Wordle";
import getFormattedWord from "@/helpers/getFormattedWord";
import getWord from "@/helpers/getWord";
import isAlphabetKey from "@/helpers/isAlphabetKey";
import wordExists from "@/helpers/wordExists";
import {
  AppState,
  IWord,
  Result,
  IKeyboardKey,
  TKeyboardColor,
  Tlanguage,
} from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import getColor from "@/helpers/getColor";
import alphabets from "@/components/Wordle/Keyboard/keys";
import "react-toastify/dist/ReactToastify.css";
import getFormattedKeys from "@/helpers/getFormattedKeys";

const { start, inProgress, finish } = AppState;
const { win, lose } = Result;
const { initial } = TKeyboardColor;
const { english, polish } = Tlanguage;
const maxTurns = 6;
const solutionDelay = 1200;

const Home = () => {
  const [appState, setAppState] = useState<AppState>(start);
  const [turn, setTurn] = useState(0);
  const [language, setLanguage] = useState<Tlanguage>(english);
  const initialWords = [...Array(maxTurns)];
  const [words, setWords] = useState<(IWord | undefined)[]>(initialWords);
  const [input, setInput] = useState("");
  const [keys, setKeys] = useState<IKeyboardKey[]>(getFormattedKeys(language));
  const [modal, setModal] = useState<null | Result>(null);

  const {
    refetch: wordRefetch,
    isError: solutionError,
    isLoading: solutionLoading,
    data: solution,
  } = useQuery<string>(["word"], async () => await getWord(language), {
    enabled: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const addWord = (word: string, turn: number) => {
    const newWords = words;
    newWords[turn] = getFormattedWord(word, solution!);
    setWords([...newWords]);
  };

  const formatKeyboard = () => {
    const newKeys = keys.map((key) => {
      const color = getColor(solution!, input, key);
      return { char: key.char, color };
    });
    setTimeout(() => setKeys(newKeys), solutionDelay);
  };

  const nextTurn = () => {
    setInput("");
    setTurn(turn + 1);
  };

  const finishRound = (result: Result) => {
    setAppState(finish);

    setTimeout(() => setModal(result), solutionDelay);
  };

  const restartRound = () => {
    setAppState(start);
    setInput("");
    setWords(initialWords);
    setKeys(getFormattedKeys(language));
    setTurn(0);
    setModal(null);
    wordRefetch();
  };

  const switchLanguage = () => {
    const newLanguage = language === english ? polish : english;
    setLanguage(newLanguage);
  };

  const handleKeyUp = async (e: KeyboardEvent | string) => {
    let key: string;
    if (e instanceof KeyboardEvent) {
      key = e.key.toLowerCase();
    } else key = e.toLowerCase();

    const alpha = isAlphabetKey(key);

    if (alpha) {
      if (input.length < 5) {
        setInput((prev) => prev + key);
      }
    } else if (key === "backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (key === "enter") {
      if (input.length !== 5) return;

      if (words.map((word) => (word ? word.word : null)).includes(input)) {
        toast.error("Duplicated word", { toastId: 1 });
        return;
      }

      const exists = await wordExists(input, language);
      if (exists === "error") {
        toast.error("Dictionary error. Please try again later", { toastId: 2 });
        return;
      }
      if (!exists) {
        toast.error("No word in dictionary", { toastId: 3 });
        return;
      }

      addWord(input, turn);
      formatKeyboard();
      nextTurn();

      if (input === solution) {
        finishRound(win);
      } else if (turn === maxTurns - 1) {
        finishRound(lose);
      }
    }
  };

  useEffect(() => {
    restartRound();
  }, []);

  useEffect(() => {
    restartRound();
  }, [language]);

  useEffect(() => {
    solution && setAppState(inProgress);
  }, [solution]);

  useEffect(() => {
    appState === inProgress &&
      solution &&
      document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [appState, input]);

  return (
    <div className="min-h-screen flex flex-col gap-2 dark:bg-stone-900 dark:text-white">
      <Head>
        <title>Yet Another Wordle</title>
      </Head>

      <header className="px-3 py-2 flex items-center border-b border-gray-700">
        <h1 className="grow text-xl font-semi text-gray-300">
          Yet Another Wordle
        </h1>
        <img
          src={language === english ? "english.svg" : "polish.svg"}
          className="max-w-[28px] border-2 border-gray-300 cursor-pointer"
          onClick={switchLanguage}
        />
      </header>

      {solutionError && (
        <Alert error text="Database error - please try again later." />
      )}
      {solutionLoading && <Spinner />}
      {solution && (
        <Wordle
          words={words}
          turn={turn}
          input={input}
          alphabet={alphabets[language]}
          keys={keys}
          handleKeyUp={handleKeyUp}
        />
      )}
      {/* {solution && (
        <h2 className="absolute bottom-0 right-0">solution: {solution}</h2>
      )} */}
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
      <ToastContainer position="bottom-center" />
    </div>
  );
};
export default Home;
