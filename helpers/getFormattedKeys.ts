import alphabets from "@/components/Wordle/Keyboard/keys";
import { TKeyboardColor } from "@/types";

const { initial } = TKeyboardColor;

export default function getFormattedKeys() {
  return alphabets["english"].keys.map((char) => ({
    char,
    color: initial,
  }));
}
