import alphabets from "@/components/Wordle/Keyboard/keys";
import { Tlanguage } from "@/types";
import { TKeyboardColor } from "@/types";

const { initial } = TKeyboardColor;

export default function getFormattedKeys(language: Tlanguage) {
  return alphabets[language].keys.map((char) => ({
    char,
    color: initial,
  }));
}
