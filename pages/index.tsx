import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import alphabets from "@/components/Wordle/Keyboard/keys";
import Modal from "@/components/Wordle/Modal";
import Wordle from "@/components/Wordle/Wordle";
import isAlphabetKey from "@/helpers/isAlphabetKey";
import { letterErrorKeyframes } from "@/lib/animations/letterError";
import { initialState, reducer } from "@/lib/gameReducer";
import getSolution from "@/lib/queries/getSolution";
import validateWord from "@/lib/queries/validateWord";
import { settings } from "@/lib/variables";
import { GamePhase, GameResult } from "@/types";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<GameResult | null>(null);
  const currentLineRef = useRef<HTMLDivElement | null>(null);

  const initialize = async () => {
    dispatch({ type: "RESET", payload: null });
    setModal(null);
    try {
      setIsLoading(true);
      const solution = await getSolution();
      dispatch({ type: "START", payload: { solution } });
    } catch (err) {
      const errorText = "Unable to fetch solution. Please try again later.";
      setError(errorText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyUp = useCallback(
    async (e: KeyboardEvent | string) => {
      if (state.phase !== GamePhase.IN_PROGRESS) return;

      let key: string;
      if (e instanceof KeyboardEvent) {
        key = e.key.toLowerCase();
      } else key = e.toLowerCase();

      if (isAlphabetKey(key)) {
        if (state.input.length < 5) {
          dispatch({
            type: "SET_INPUT",
            payload: { input: state.input + key },
          });
        }
      } else if (key === "backspace") {
        dispatch({
          type: "SET_INPUT",
          payload: { input: state.input.slice(0, -1) },
        });
      } else if (key === "enter") {
        if (state.input.length !== 5) return;

        if (
          state.words
            .map((word) => (word ? word.word : null))
            .includes(state.input)
        ) {
          toast.error("Unable to submit duplicated word.");
          return;
        }

        const validateResult = await validateWord(state.input);
        if (!validateResult) {
          const letters = Array.from(currentLineRef.current?.children || []);
          letters.forEach((letter, idx) => {
            letter.getAnimations().forEach((a) => a.cancel());
            letter.animate(letterErrorKeyframes(idx % 2 === 0), {
              duration: 300,
              delay: idx * 30,
              easing: "ease-in",
            });
          });
          return;
        }

        dispatch({ type: "FORMAT_KEYBOARD", payload: null });
        dispatch({ type: "SUBMIT_INPUT", payload: null });

        if (state.input === state.solution) {
          dispatch({ type: "FINISH", payload: { result: GameResult.WON } });
          setTimeout(
            () => setModal(GameResult.WON),
            settings.totalRevealAnimationDurationMs,
          );
        } else if (state.turn === settings.maxTurns - 1) {
          dispatch({ type: "FINISH", payload: { result: GameResult.LOST } });
          setTimeout(
            () => setModal(GameResult.LOST),
            settings.totalRevealAnimationDurationMs,
          );
        }

        dispatch({ type: "NEXT_TURN", payload: null });
      }
    },
    [state.input, state.phase, state.solution, state.turn, state.words],
  );

  useEffect(() => {
    initialize();

    document.body.style.setProperty(
      "--reveal-animation-duration",
      `${settings.revealAnimationDurationMs}ms`,
    );

    document.body.style.setProperty(
      "--reveal-animation-letter-delay",
      `${settings.revealAnimationLetterDelayMs}ms`,
    );
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return (
    <div className="box-border flex min-h-screen flex-col gap-2 bg-background text-white">
      <Head>
        <title>Yet Another Wordle</title>
      </Head>

      <header className="flex items-center border-b border-gray-700 px-3 py-2">
        <h1 className="font-semi grow text-xl text-gray-300">
          Yet Another Wordle
        </h1>
      </header>

      {error && <Alert error text={error} />}
      {isLoading && <Spinner />}
      {!error && !isLoading && (
        <Wordle
          words={state.words}
          turn={state.turn}
          input={state.input}
          alphabet={alphabets[settings.language]}
          keys={state.keyboardKeys}
          currentLineRef={currentLineRef}
          handleKeyUp={handleKeyUp}
        />
      )}
      {/* {state.solution && (
        <h2 className="absolute bottom-0 right-0">
          solution: {state.solution}
        </h2>
      )} */}
      <AnimatePresence>
        {modal === GameResult.WON && (
          <Modal
            variant={GameResult.WON}
            solution={state.solution}
            exitAction={initialize}
          />
        )}
        {modal === GameResult.LOST && (
          <Modal
            variant={GameResult.LOST}
            solution={state.solution}
            exitAction={initialize}
          />
        )}
      </AnimatePresence>
      <ToastContainer
        position="bottom-center"
        limit={1}
        newestOnTop
        autoClose={1500}
      />
    </div>
  );
};
export default Home;
