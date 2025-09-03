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
        setBackgroundColor("#808080");
        break;
      case initial:
        setBackgroundColor("#d3d3d3");
        break;
      case exists:
        setBackgroundColor("#ca8a04");
        break;
      case correct:
        setBackgroundColor("#16a34a");
        break;
    }
  }, [letter]);

  if (letter.char === "backspace")
    return (
      <motion.button
        className="flex w-12 items-center justify-center rounded-sm bg-gray-200 uppercase md:w-16"
        onClick={() => handleClick(letter.char)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
      >
        <HiOutlineBackspace className="mx-auto text-xl" />
      </motion.button>
    );

  if (letter.char === "enter")
    return (
      <motion.button
        className="flex w-12 items-center justify-center rounded-sm bg-gray-200 uppercase md:w-16"
        onClick={() => handleClick(letter.char)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
      >
        <AiOutlineEnter />
      </motion.button>
    );

  return (
    <motion.button
      className="flex aspect-[2/3] w-7 items-center justify-center rounded-sm bg-gray-200 uppercase transition-colors duration-300 md:w-9 lg:w-10"
      style={{ backgroundColor }}
      onClick={() => handleClick(letter.char)}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
    >
      {letter.char}
    </motion.button>
  );
};
export default Key;
