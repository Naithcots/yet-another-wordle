import { GameResult } from "@/types";
import { motion, Variants } from "framer-motion";

interface Props {
  variant: GameResult;
  solution: string;
  exitAction: () => void;
}

const modalContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const modalBgVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
};

const Modal = ({ variant, solution, exitAction }: Props) => {
  return (
    <motion.div
      variants={modalContainerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute inset-0 z-10 grid justify-items-center"
    >
      <motion.div
        variants={modalBgVariants}
        className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-sm"
      />
      <motion.div
        variants={modalVariants}
        className="relative z-20 my-10 h-fit w-2/3 rounded-md bg-white p-6 shadow-md dark:bg-stone-900"
      >
        <div className="flex flex-col gap-3">
          <h3 className="text-3xl">
            {variant === GameResult.WON
              ? "Congratulations! You guessed the word!"
              : "Better luck next time!"}
          </h3>
          <h4 className="text-xl">
            The solution is:
            <span className="ml-2 font-semibold">{solution}</span>
          </h4>
          <button
            className="w-fit rounded-md bg-black px-6 py-2 text-white transition-shadow hover:shadow-lg dark:bg-gray-600"
            onClick={exitAction}
          >
            New Game
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default Modal;
