import { TKeyboardColor } from "../../types";
import getColor from "../getColor";

const { correct, exists, initial, none } = TKeyboardColor;

describe("Function getColor() test for Keyboard component", () => {
  it("Returns correct color (1)", () => {
    expect(getColor("pizza", "puzzle", { char: "z", color: initial })).toBe(
      correct
    );
  });
  it("Returns correct color (2)", () => {
    expect(getColor("world", "rumble", { char: "r", color: initial })).toBe(
      exists
    );
  });
  it("Returns correct color (3)", () => {
    expect(getColor("world", "rumble", { char: "r", color: exists })).toBe(
      exists
    );
  });
  it("Returns correct color (4)", () => {
    expect(getColor("ruler", "rumble", { char: "r", color: correct })).toBe(
      correct
    );
  });
  it("Returns correct color (5)", () => {
    expect(getColor("music", "rumble", { char: "r", color: none })).toBe(none);
  });
});
