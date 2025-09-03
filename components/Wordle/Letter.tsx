import { TColor } from "@/types";
import { CSSProperties } from "react";
import styles from "./Letter.module.css";

interface LetterProps {
  letter?: string;
  color?: TColor;
  idx: number;
  variant: "current" | "filled" | "completed" | "empty";
}

const getBackgroundColor = (color: TColor | undefined) => {
  if (!color) return "transparent";
  if (color === "default") return "#808080";
  if (color === "correct") return "#16a34a";
  if (color === "exists") return "#ca8a04";
};

const Letter = ({ letter, color, variant, idx }: LetterProps) => {
  const backgroundColor = getBackgroundColor(color);
  const style = {
    "--index": idx,
    "--color-background-letter-face-back": backgroundColor,
  } as CSSProperties;

  const letterElement = (
    <span className="text-3xl font-bold uppercase">{letter ?? ""}</span>
  );

  return (
    <div
      style={style}
      className={`${styles.container} ${
        variant === "filled" ? styles.filled : ""
      } ${variant === "completed" ? styles.reveal : ""}`}
    >
      <div className={`${styles.face} ${styles.front}`}>{letterElement}</div>
      <div className={`${styles.face} ${styles.back}`}>{letterElement}</div>
    </div>
  );
};
export default Letter;
