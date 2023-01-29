import { IWord } from "@/types";
import getFormattedWord from "../getFormattedWord";

describe("Format word against solution", () => {
  it("Format the word correctly (1)", () => {
    expect(getFormattedWord("eerie", "eagle")).toEqual<IWord>({
      word: "eerie",
      charList: [
        { char: "e", color: "correct" },
        { char: "e", color: "default" },
        { char: "r", color: "default" },
        { char: "i", color: "default" },
        { char: "e", color: "correct" },
      ],
    });
  });

  it("Format the word correctly (2)", () => {
    expect(getFormattedWord("eaaae", "eagle")).toEqual<IWord>({
      word: "eaaae",
      charList: [
        { char: "e", color: "correct" },
        { char: "a", color: "correct" },
        { char: "a", color: "default" },
        { char: "a", color: "default" },
        { char: "e", color: "correct" },
      ],
    });
  });

  it("Format the word correctly (3)", () => {
    expect(getFormattedWord("zizoi", "pizza")).toEqual<IWord>({
      word: "zizoi",
      charList: [
        { char: "z", color: "exists" },
        { char: "i", color: "correct" },
        { char: "z", color: "correct" },
        { char: "o", color: "default" },
        { char: "i", color: "default" },
      ],
    });
  });

  it("Format the word correctly (4)", () => {
    expect(getFormattedWord("tests", "tests")).toEqual<IWord>({
      word: "tests",
      charList: [
        { char: "t", color: "correct" },
        { char: "e", color: "correct" },
        { char: "s", color: "correct" },
        { char: "t", color: "correct" },
        { char: "s", color: "correct" },
      ],
    });
  });

  it("Format the word correctly (5)", () => {
    expect(getFormattedWord("abcde", "edcba")).toEqual<IWord>({
      word: "abcde",
      charList: [
        { char: "a", color: "exists" },
        { char: "b", color: "exists" },
        { char: "c", color: "correct" },
        { char: "d", color: "exists" },
        { char: "e", color: "exists" },
      ],
    });
  });

  it("Format the word correctly (6)", () => {
    expect(getFormattedWord("baaaa", "aabab")).toEqual<IWord>({
      word: "baaaa",
      charList: [
        { char: "b", color: "exists" },
        { char: "a", color: "correct" },
        { char: "a", color: "exists" },
        { char: "a", color: "correct" },
        { char: "a", color: "default" },
      ],
    });
  });

  it("Format the word correctly (7)", () => {
    expect(getFormattedWord("aebcd", "xxxxx")).toEqual<IWord>({
      word: "aebcd",
      charList: [
        { char: "a", color: "default" },
        { char: "e", color: "default" },
        { char: "b", color: "default" },
        { char: "c", color: "default" },
        { char: "d", color: "default" },
      ],
    });
  });

  it("Format the word correctly (8)", () => {
    expect(getFormattedWord("aaaaa", "bbbaa")).toEqual<IWord>({
      word: "aaaaa",
      charList: [
        { char: "a", color: "default" },
        { char: "a", color: "default" },
        { char: "a", color: "default" },
        { char: "a", color: "correct" },
        { char: "a", color: "correct" },
      ],
    });
  });
});
