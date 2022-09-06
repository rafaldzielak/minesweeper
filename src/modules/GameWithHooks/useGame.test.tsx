import { renderHook, act } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";

import { CellState, Field } from "@/helpers/Field";

import useGame from "./useGame";
import { describe, expect, it, vi } from "vitest";

const { bomb: b, hidden: h, empty: e } = CellState;
vi.mock("@/helpers/Field");

const flatWithFilter = (field: Field, cond: number) => field.flat().filter((v) => v === cond);

describe("useGame test cases", () => {
  it("Render hook by default", () => {
    const { result } = renderHook(useGame);
    const { gameField } = result.current;

    expect(flatWithFilter(gameField, b)).toHaveLength(10);
  });

  it("onReset game handler", () => {
    const { result } = renderHook(useGame);
    const { playerField, onClick, onReset, onContextMenu } = result.current;

    expect(playerField).toHaveLength(9);

    act(() => onClick([5, 5]));
    act(() => onContextMenu([2, 5]));
    act(onReset);

    const { gameField, isGameStarted } = result.current;
    expect(isGameStarted).toBe(false);
    expect(flatWithFilter(gameField, b)).toHaveLength(10);
  });

  it("Player loose the game", async () => {
    vi.useFakeTimers();
    const { result } = renderHook(useGame);

    act(() => result.current.onClick([0, 8]));

    const timeMustPass = 5;

    for (let i = 0; i < timeMustPass; i++) {
      act(() => vi.advanceTimersByTime(1000));
    }

    await waitFor(() => expect(result.current.time).toBe(5));
    expect(flatWithFilter(result.current.playerField, 1)).toHaveLength(1);

    act(() => result.current.onClick([0, 0]));
    expect(flatWithFilter(result.current.playerField, e)).toHaveLength(18);

    act(() => result.current.onClick([0, 7]));
    for (let i = 0; i < timeMustPass; i++) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }

    const { isWin, isGameOver, time, playerField: newPlayerField, onReset } = result.current;

    expect(time).toBe(5);
    expect(isGameOver).toBe(true);
    expect(isWin).toBe(false);
    expect(flatWithFilter(newPlayerField, h)).toHaveLength(0);
    expect(flatWithFilter(newPlayerField, e)).toHaveLength(27);
    expect(flatWithFilter(newPlayerField, 1)).toHaveLength(30);
    expect(flatWithFilter(newPlayerField, 2)).toHaveLength(12);
    expect(flatWithFilter(newPlayerField, 3)).toHaveLength(2);

    act(onReset);
    const { playerField: latestPlayerField } = result.current;

    expect(flatWithFilter(latestPlayerField, h)).toHaveLength(81);
  });

  it("Player win a game when open the last cell", () => {
    const { result } = renderHook(useGame);
    const { gameField } = result.current;

    for (const y of gameField.keys()) {
      for (const x of gameField[y].keys()) {
        const gameCell = gameField[y][x];
        act(() => gameCell === b && result.current.onContextMenu([y, x]));
      }
    }

    for (const y of gameField.keys()) {
      for (const x of gameField[y].keys()) {
        const gameCell = gameField[y][x];
        act(() => gameCell < b && result.current.onClick([y, x]));
      }
    }

    expect(result.current.isWin).toBe(true);
    expect(result.current.isGameOver).toBe(true);
  });
});

describe("Scoreboard behavior - timer and bomb counter", () => {
  it("Timer should start by click to a cell", () => {
    vi.useFakeTimers();

    const { result } = renderHook(useGame);
    const timeMustPass = 5;
    for (let i = 0; i < timeMustPass; i++) act(() => vi.advanceTimersByTime(1000));

    // Timer shouldn't works before game has started
    expect(result.current.time).toBe(0);
    act(() => result.current.onClick([0, 0]));
    for (let i = 0; i < timeMustPass; i++) act(() => vi.advanceTimersByTime(1000));
    expect(result.current.time).toBe(5);
  });

  it("Timer should start by mark a cell by a flag", () => {
    vi.useFakeTimers();
    const { result } = renderHook(useGame);
    const timeMustPass = 5;
    for (let i = 0; i < timeMustPass; i++) act(() => vi.advanceTimersByTime(1000));

    // Timer shouldn't works before game has started
    expect(result.current.time).toBe(0);
    act(() => result.current.onContextMenu([0, 0]));
    for (let i = 0; i < timeMustPass; i++) act(() => vi.advanceTimersByTime(1000));
    expect(result.current.time).toBe(timeMustPass);
  });

  it("Time should reset value when onReset have been called", async () => {
    vi.useFakeTimers();

    const { result } = renderHook(useGame);
    expect(result.current.time).toBe(0);
    act(() => result.current.onContextMenu([0, 0]));
    const timeMustPass = 5;
    for (let i = 0; i < timeMustPass; i++) act(() => vi.advanceTimersByTime(1000));

    expect(result.current.time).toBe(timeMustPass);
    act(result.current.onReset);
    expect(result.current.time).toBe(0);
  });
});
