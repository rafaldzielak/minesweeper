import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";

import { Field, CellState, generateFieldWithDefaultState, fieldGenerator, Coords } from "@/helpers/Field";
import { LevelNames, GameSettings } from "@/modules/GameSettings";
import { openCell as openCellHandler } from "@/helpers/openCell";
import { setFlag } from "@/helpers/setFlag";
import { RootState } from "@/store";
import { AnyAction } from "redux";

export interface State {
  level: LevelNames;
  time: number;
  bombs: number;
  isGameOver: boolean;
  isGameStarted: boolean;
  isWin: boolean;
  settings: [number, number];
  playerField: Field;
  gameField: Field;
  flagCounter: number;
}

export const getInitialState = (level = "beginner" as LevelNames): State => {
  const settings = GameSettings[level];
  const [size, bombs] = settings;

  return {
    level,
    time: 0,
    bombs,
    isGameOver: false,
    isGameStarted: false,
    isWin: false,
    settings,
    flagCounter: 0,
    playerField: generateFieldWithDefaultState(size, CellState.hidden),
    gameField: fieldGenerator(size, bombs / (size * size)),
  };
};

export const { reducer, actions } = createSlice({
  name: "game",
  initialState: getInitialState(),
  reducers: {
    openCell: (state, { payload }: PayloadAction<Coords>) => {
      const { playerField, gameField } = state;
      try {
        const [newPlayerField, isSolved] = openCellHandler(payload, playerField, gameField);
        state.isGameStarted = !isSolved;
        state.isGameOver = isSolved;
        state.isWin = isSolved;
        state.playerField = newPlayerField;
      } catch (error) {
        state.isGameStarted = false;
        state.isGameOver = true;
        state.isWin = false;
        state.playerField = gameField;
      }
    },
    setFlag: (state, { payload }: PayloadAction<Coords>) => {
      const { playerField, gameField, flagCounter, bombs } = state;

      const [newPlayerField, isSolved, newFlagCounter] = setFlag(
        payload,
        playerField,
        gameField,
        flagCounter,
        bombs
      );
      state.isGameStarted = !isSolved;
      state.isGameOver = isSolved;
      state.isWin = isSolved;
      state.flagCounter = newFlagCounter;
      state.playerField = newPlayerField;
    },
    updateTime: (state) => {
      state.time = state.time + 1;
    },
    reset: ({ level }) => getInitialState(level),
    changeLevel: (state, { payload }: PayloadAction<LevelNames>) => getInitialState(payload),
  },
});
export const recursiveUpdate =
  (): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch, getState) => {
    setTimeout(() => {
      const { isGameStarted } = getState().game;
      if (isGameStarted) {
        dispatch(actions.updateTime());
        dispatch(recursiveUpdate());
      }
    }, 1000);
  };

export const runTimer = (): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch, getState) => {
  const { isGameStarted, time } = getState().game;
  if (time === 0 && isGameStarted) dispatch(recursiveUpdate());
};
