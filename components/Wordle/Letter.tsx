import { TColor } from "@/types";
import { motion, Variants } from "framer-motion";

interface Props {
  letter?: string;
  color?: TColor;
  delay?: number;
  variant: "current" | "filled" | "completed" | "empty";
}

const variants: Variants = {
  default: { boxShadow: "none" },
  current: {
    boxShadow: "0px 0px 1px 2px gray",
  },
  filled: {
    scale: [1, 1.15, 1],
    // borderColor: "rgb(55 65 81)",
    borderColor: "rgb(128, 128, 128)",
    transition: {
      type: "spring",
      duration: 0.2,
    },
  },
  completed: ({ bgColor, delay }) => ({
    borderWidth: ["2px", "2px", "0px", "0px"],
    rotateY: [0, 90, 90, 0],
    backgroundColor: ["#ffffff00", "#ffffff00", bgColor, bgColor],
    transition: {
      times: [0, 0.5, 0.5, 1],
      duration: 0.75,
      delay: delay * 0.1,
    },
  }),
};

const getBackgroundColor = (color: TColor | undefined) => {
  if (!color) return "transparent";
  if (color === "default") return "#808080";
  if (color === "correct") return "#16a34a";
  if (color === "exists") return "#ca8a04";
};

const Letter = ({ letter, color, variant, delay }: Props) => {
  const bgColor = getBackgroundColor(color);
  return (
    <motion.div
      variants={variants}
      animate={variant}
      custom={{ bgColor, delay }}
      className="w-16 grid place-items-center aspect-square border-2 border-gray-400 text-white"
    >
      <span className="text-4xl font-bold uppercase">{letter || ""}</span>
    </motion.div>
  );
};
export default Letter;
