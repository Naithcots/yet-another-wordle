import { ILetter, IWord, TColor } from "@/types";

interface ILetterAmount {
  char: string;
  qty: number;
}

export default function getFormattedWord(
  word: string,
  solution: string
): IWord {
  // Count letters in solution
  let solutionLetters: ILetterAmount[] = [];
  solution.split("").forEach((letter) => {
    if (solutionLetters.some((sLetter) => sLetter.char === letter)) {
      solutionLetters = solutionLetters.map((sLetter) =>
        sLetter.char === letter ? { ...sLetter, qty: sLetter.qty + 1 } : sLetter
      );
    } else {
      solutionLetters.push({ char: letter, qty: 1 });
    }
  });

  //   Create default charList state
  let charList: ILetter[] = word
    .split("")
    .map((letter) => ({ char: letter, color: "default" }));

  // Compare word to solution
  solutionLetters.forEach((sLetter) => {
    let counter = 0;
    charList = charList
      // Check for green letters
      .map((letter, idx) => {
        let color: TColor = "default";
        if (letter.char === sLetter.char && letter.char === solution[idx]) {
          color = "correct";
          counter++;
          return { char: letter.char, color };
        }
        return letter;
      })
      //   Check for yellow letters
      .map((letter) => {
        if (
          letter.char === sLetter.char &&
          letter.color !== "correct" &&
          counter < sLetter.qty
        ) {
          counter++;
          return { ...letter, color: "exists" };
        }
        return letter;
      });
  });

  console.log(charList);
  return { word, charList };
}

getFormattedWord("eerie", "eagle");
