import { describe, expect, it } from "vitest";
import { CellState, emptyFieldGenerator, fieldGenerator } from "./Field";

const { empty, bomb, hidden } = CellState;

describe("Field Generator", () => {
  describe("emptyFieldGenerator", () => {
    it("2x2", () => {
      expect(emptyFieldGenerator(2)).toStrictEqual([
        [empty, empty],
        [empty, empty],
      ]);
    });

    it("2x2 hidden", () => {
      expect(emptyFieldGenerator(3, hidden)).toStrictEqual([
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
      ]);
    });
  });

  describe("simple cases", () => {
    it("Wrong probability", () => {
      const errorText = "Probability must be between 0 and 1";
      expect(() => fieldGenerator(1, -1)).toThrow(errorText);
      expect(() => fieldGenerator(1, 2)).toThrow(errorText);
    });

    it("Smalles possible field without mine", () => {
      expect(fieldGenerator(1, 0)).toStrictEqual([[empty]]);
    });

    it("Smalles possible field with mine", () => {
      expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]]);
    });

    it("2x2 with mine", () => {
      expect(fieldGenerator(2, 1)).toStrictEqual([
        [bomb, bomb],
        [bomb, bomb],
      ]);
    });
  });
});
