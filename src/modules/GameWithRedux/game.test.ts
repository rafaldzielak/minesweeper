import { GameSettings } from "@/modules/GameSettings";
import { CellState, Field } from "@/helpers/Field";

const { empty: e, hidden: h, bomb: b, flag: f, weakFlag: w } = CellState;

import { reducer, actions, State, recursiveUpdate, runTimer } from "./game";
import { describe, expect, it, vi } from "vitest";

describe("Game reducer", () => {
  const level = "beginner";
  const baseInitialState: State = {
    level,
    time: 0,
    isGameOver: false,
    isGameStarted: false,
    isWin: false,
    settings: GameSettings[level],
    bombs: 1,
    flagCounter: 0,
    gameField: [
      [9, 1],
      [1, 1],
    ],
    playerField: [
      [h, h],
      [h, h],
    ],
  };

  describe("Check action openCell", () => {
    it("Check openCell to cell with a number", () => {
      expect(reducer(baseInitialState, actions.openCell([1, 1]))).toEqual({
        ...baseInitialState,
        isGameStarted: true,
        playerField: [
          [h, h],
          [h, 1],
        ],
      });
    });
    it("Check openCell to cell with a bomb", () => {
      expect(reducer(baseInitialState, actions.openCell([0, 0]))).toEqual({
        ...baseInitialState,
        isGameStarted: false,
        isWin: false,
        isGameOver: true,
        playerField: baseInitialState.gameField,
      });
    });
    it("Check openCell to cell with a flag", () => {
      const playerFieldWithFlag = [
        [h, h],
        [h, f],
      ] as Field;
      expect(
        reducer(
          {
            ...baseInitialState,
            isGameStarted: true,
            playerField: playerFieldWithFlag,
          },
          actions.openCell([1, 1])
        )
      ).toEqual({
        ...baseInitialState,
        isGameStarted: true,
        playerField: playerFieldWithFlag,
      });
    });
  });

  describe("Check action setFlag", () => {
    it("Check setFlag", () => {
      const flagState = reducer(baseInitialState, actions.setFlag([1, 1]));

      expect(flagState).toEqual({
        ...baseInitialState,
        isGameStarted: true,
        flagCounter: 1,
        playerField: [
          [h, h],
          [h, f],
        ],
      });

      const weakFlagState = reducer(flagState, actions.setFlag([1, 1]));

      expect(weakFlagState).toEqual({
        ...baseInitialState,
        isGameStarted: true,
        flagCounter: 1,
        playerField: [
          [h, h],
          [h, w],
        ],
      });

      expect(reducer(weakFlagState, actions.setFlag([1, 1]))).toEqual({
        ...baseInitialState,
        isGameStarted: true,
      });
    });
  });

  describe("Win flow", () => {
    it("Setup flag on the last stage", () => {
      const state1 = reducer(baseInitialState, actions.openCell([1, 0]));
      const state2 = reducer(state1, actions.openCell([0, 1]));
      const state3 = reducer(state2, actions.openCell([1, 1]));
      const state4 = reducer(state3, actions.setFlag([0, 0]));

      expect(state4).toEqual({
        ...baseInitialState,
        isGameStarted: false,
        isWin: true,
        isGameOver: true,
        flagCounter: 1,
        playerField: [
          [f, 1],
          [1, 1],
        ],
      });
    });
    it("Open cell on the last stage", () => {
      const state1 = reducer(baseInitialState, actions.setFlag([0, 0]));
      const state2 = reducer(state1, actions.openCell([1, 0]));
      const state3 = reducer(state2, actions.openCell([0, 1]));
      const state4 = reducer(state3, actions.openCell([1, 1]));

      expect(state4).toEqual({
        ...baseInitialState,
        isGameStarted: false,
        isWin: true,
        isGameOver: true,
        flagCounter: 1,
        playerField: [
          [f, 1],
          [1, 1],
        ],
      });
    });
  });

  describe("Check reset and changeLevel", () => {
    it("Reset game action should reset game to the default state", () => {
      const nextState = reducer(baseInitialState, actions.reset());
      expect(nextState).toEqual(
        expect.objectContaining({
          level,
          time: 0,
          bombs: 10,
          isGameOver: false,
          isGameStarted: false,
          isWin: false,
          settings: [9, 10],
          flagCounter: 0,
        })
      );
      expect(nextState.gameField).toHaveLength(9);
      expect(nextState.playerField).toHaveLength(9);
    });
    it("changeLevel should setup new game level", () => {
      const level = "intermediate";
      const nextState = reducer(baseInitialState, actions.changeLevel(level));
      expect(nextState).toEqual(
        expect.objectContaining({
          level,
          time: 0,
          bombs: 44,
          isGameOver: false,
          isGameStarted: false,
          isWin: false,
          settings: [16, 44],
          flagCounter: 0,
        })
      );
      expect(nextState.gameField).toHaveLength(16);
      expect(nextState.playerField).toHaveLength(16);
    });
  });

  describe("Check updateTime action", () => {
    it("Update time from 0", () => {
      expect(reducer(baseInitialState, actions.updateTime())).toEqual(
        expect.objectContaining({
          time: 1,
        })
      );
    });
    it("Update time from 10", () => {
      expect(reducer({ ...baseInitialState, time: 10 }, actions.updateTime())).toEqual(
        expect.objectContaining({
          time: 11,
        })
      );
    });
  });

  describe("Async actions check", () => {
    it("Check action runTimer with state { isGameStarted: true, time: 0 }", () => {
      const mockDispatch = vi.fn();
      runTimer()(mockDispatch, () => ({ game: { isGameStarted: true, time: 0 } as State }), undefined);
      expect(mockDispatch).toHaveBeenCalled();
    });
    it("Check action runTimer with state { isGameStarted: true, time: 1 }", () => {
      const mockDispatch = vi.fn();
      runTimer()(mockDispatch, () => ({ game: { isGameStarted: true, time: 1 } as State }), undefined);
      expect(mockDispatch).not.toHaveBeenCalled();
    });
    it("Check action runTimer with state { isGameStarted: false, time: 10 }", () => {
      const mockDispatch = vi.fn();
      runTimer()(mockDispatch, () => ({ game: { isGameStarted: false, time: 10 } as State }), undefined);
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it("Check action recursiveUpdate with state { isGameStarted: true }", () => {
      vi.useFakeTimers();
      const mockDispatch = vi.fn();
      recursiveUpdate()(mockDispatch, () => ({ game: { isGameStarted: true } as State }), undefined);
      vi.advanceTimersByTime(1000);
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });
    it("Check action recursiveUpdate with state { isGameStarted: false }", () => {
      vi.useFakeTimers();
      const mockDispatch = vi.fn();
      recursiveUpdate()(mockDispatch, () => ({ game: { isGameStarted: false } as State }), undefined);
      vi.advanceTimersByTime(1000);
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
