import { describe, expect, it } from "vitest";
import { add, multiply } from "./mathFunctions";

describe("Math funciotns tests", () => {
  it("Check add functions", () => {
    expect(add(1, 2)).toBe(3);
  });

  it("Check multiply function", () => {
    expect(multiply(2, 3)).toBe(6);
  });
});
