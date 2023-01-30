import { Result } from "@/types";
import { motion, Variants } from "framer-motion";

interface Props {
  variant: Result;
  solution: string;
  exitAction: () => void;
}

const { win, lose } = Result;

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

const solutionVariants: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: [1, 1.15, 1],
    transition: { duration: 3, repeat: Infinity },
  },
};

const Modal = ({ variant, solution, exitAction }: Props) => {
  return (
    <motion.div
      variants={modalContainerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute inset-0 grid justify-items-center z-10"
    >
      <motion.div
        variants={modalBgVariants}
        className="absolute inset-0 bg-opacity-90 backdrop-blur-sm bg-black"
      />
      <motion.div
        variants={modalVariants}
        className="relative my-10 p-6 w-2/3 h-fit rounded-md z-20 bg-white"
      >
        <div className="flex flex-col gap-3">
          <h3 className="text-3xl">
            {variant === win ? "You won this round!" : "You lost this round.."}
          </h3>
          <h4 className="text-xl">
            The solution was:{" "}
            <motion.p
              variants={solutionVariants}
              className="ml-2 inline-block font-semibold"
            >
              {solution}
            </motion.p>
          </h4>
          <button
            className="px-6 py-2 w-fit rounded-md text-white bg-black hover:shadow-lg transition-shadow"
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
