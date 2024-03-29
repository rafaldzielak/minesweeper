import { describe, expect, it } from "vitest";
import { incrementNeighbours, getNeigboursItems, checkItemInField } from "./CellsManipulator";
import { CellState, Field } from "./Field";

const { empty: e, bomb: b, hidden: h } = CellState;

describe("Check Increment Neighbours", () => {
  describe("Simple cases", () => {
    it("Field with only one item (bomb)", () => {
      expect(incrementNeighbours([0, 0], [[b]])).toStrictEqual([[b]]);
    });
    it("Field 2x2 with one mine", () => {
      expect(
        incrementNeighbours(
          [0, 0],
          [
            [b, e],
            [e, e],
          ]
        )
      ).toStrictEqual([
        [b, 1],
        [1, 1],
      ]);
    });
    it("Field 2x2 with two mines", () => {
      expect(
        incrementNeighbours(
          [0, 0],
          [
            [b, e],
            [e, b],
          ]
        )
      ).toStrictEqual([
        [b, 1],
        [1, b],
      ]);
    });
    expect(
      incrementNeighbours(
        [1, 1],
        [
          [0, 1, b],
          [0, b, 1],
          [0, 0, 0],
        ]
      )
    ).toStrictEqual([
      [1, 2, b],
      [1, b, 2],
      [1, 1, 1],
    ]);
  });
  it("Field 3x3 as syntetic case with neighbors cells is reached max possible bombs", () => {
    expect(
      incrementNeighbours(
        [1, 1],
        [
          [0, 1, b],
          [8, b, 1],
          [8, 8, 8],
        ]
      )
    ).toStrictEqual([
      [1, 2, b],
      [8, b, 2],
      [8, 8, 8],
    ]);
  });

  describe("Check neigbours selectors", () => {
    it("With [0, 0] coords", () => {
      expect(getNeigboursItems([0, 0])).toStrictEqual({
        top: [-1, 0],
        topRight: [-1, 1],
        right: [0, 1],
        rightBottom: [1, 1],
        bottom: [1, 0],
        bottomLeft: [1, -1],
        left: [0, -1],
        leftTop: [-1, -1],
      });
    });
    it("With [3, 3] coords", () => {
      expect(getNeigboursItems([3, 3])).toStrictEqual({
        top: [2, 3],
        topRight: [2, 4],
        right: [3, 4],
        rightBottom: [4, 4],
        bottom: [4, 3],
        bottomLeft: [4, 2],
        left: [3, 2],
        leftTop: [2, 2],
      });
    });
  });
});

describe("checkItemInField tests", () => {
  describe("Simple cases", () => {
    const field: Field = [[e]];

    it("Out of y range", () => {
      expect(checkItemInField([1, 0], field)).toBe(false);
    });

    it("Out of x range", () => {
      expect(checkItemInField([0, -1], field)).toBe(false);
    });

    it("In x and y range", () => {
      expect(checkItemInField([0, 0], field)).toBe(true);
    });
  });
  describe("Big field", () => {
    const field: Field = [
      [e, e, e, e, e],
      [e, e, e, e, e],
      [e, e, e, e, e],
      [e, e, e, e, e],
      [e, e, e, e, e],
    ];

    it("Out of x range", () => {
      expect(checkItemInField([5, 0], field)).toBe(false);
    });

    it("Out of x range with negative index", () => {
      expect(checkItemInField([-1, 0], field)).toBe(false);
    });

    it("Out of y range", () => {
      expect(checkItemInField([0, 5], field)).toBe(false);
    });

    it("In x and y range", () => {
      expect(checkItemInField([3, 4], field)).toBe(true);
    });
  });
});
