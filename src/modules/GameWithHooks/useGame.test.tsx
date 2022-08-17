import { renderHook, act } from "@testing-library/react-hooks";

import { CellState, Field } from "@/helpers/Field";

import useGame from "./useGame";
import { describe, expect, it } from "vitest";

const { bomb: b, hidden: h } = CellState;

const flatWithFilter = (field: Field, cond: number) => field.flat().filter((v) => v === cond);

describe("useGame test cases", () => {
  it("Render hook by default", () => {
    const { result } = renderHook(useGame);
    const { gameField } = result.current;

    expect(flatWithFilter(gameField, b)).toHaveLength(10);
  });

  it("onReset game handler", () => {
    const { result } = renderHook(useGame);
    const { playerField, onClick, onReset } = result.current;

    expect(playerField).toHaveLength(9);

    act(() => onClick([5, 5]));
    act(onReset);

    const { gameField } = result.current;

    expect(flatWithFilter(gameField, b)).toHaveLength(10);
  });

  it("Player win the game", () => {
    const { result } = renderHook(useGame);
    const { gameField, onClick, onContextMenu } = result.current;

    for (const y of gameField.keys()) {
      for (const x of gameField[y].keys()) {
        const gameCell = gameField[y][x];
        act(() => (gameCell !== b ? onClick([y, x]) : onContextMenu([y, x])));
      }
    }

    const { isGameOver, isWin } = result.current;

    expect(isWin).toBe(true);
    expect(isGameOver).toBe(true);
  });
});
