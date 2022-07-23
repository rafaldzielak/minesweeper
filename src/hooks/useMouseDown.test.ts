import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useMouseDown } from "./useMouseDown";

describe("useMouseDwon hook", () => {
  it("toglle state after onMouseDown/onMouseUp calls", () => {
    const { result } = renderHook(useMouseDown);

    const [mouseDown, onMouseDown, onMouseUp] = result.current;

    expect(mouseDown).toBe(false);

    act(onMouseDown);
    expect(result.current[0]).toBe(true);
    act(onMouseUp);
    expect(result.current[0]).toBe(false);
  });
});
