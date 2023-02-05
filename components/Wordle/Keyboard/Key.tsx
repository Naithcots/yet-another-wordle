import { IKeyboardKey, TKeyboardColor } from "@/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import { HiOutlineBackspace } from "react-icons/hi";

interface Props {
  letter: IKeyboardKey;
  handleKeyUp: (e: KeyboardEvent | string) => Promise<void>;
}

const { none, initial, exists, correct } = TKeyboardColor;

const Key = ({ letter, handleKeyUp }: Props) => {
  const [backgroundColor, setBackgroundColor] = useState("gray");

  const handleClick = (char: string) => {
    handleKeyUp(char);
  };

  useEffect(() => {
    switch (letter.color) {
      case none:
        setBackgroundColor("darkgray");
        break;
      case initial:
        setBackgroundColor("lightgray");
        break;
      case exists:
        setBackgroundColor("yellow");
        break;
      case correct:
        setBackgroundColor("green");
        break;
    }
  }, [letter]);

  if (letter.char === "backspace")
    return (
      <motion.button
        className="px-2 py-3 w-16 rounded-sm uppercase bg-gray-200"
        onClick={() => handleClick(letter.char)}
        whileTap={{ scale: 0.9 }}
      >
        <HiOutlineBackspace className="mx-auto text-xl" />
      </motion.button>
    );

  if (letter.char === "enter")
    return (
      <motion.button
        className="px-2 py-3 w-16 flex justify-center items-center rounded-sm uppercase bg-gray-200"
        onClick={() => handleClick(letter.char)}
        whileTap={{ scale: 0.9 }}
      >
        <AiOutlineEnter />
      </motion.button>
    );

  return (
    <motion.button
      className="px-3 py-3 w-10 rounded-sm uppercase bg-gray-200"
      style={{ backgroundColor }}
      onClick={() => handleClick(letter.char)}
      whileTap={{ scale: 0.9 }}
    >
      {letter.char}
    </motion.button>
  );
};
export default Key;
