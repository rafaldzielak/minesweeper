import { useState, useEffect, useCallback } from "react";

import { Field, CellState, emptyFieldGenerator, fieldGenerator, Coords } from "@/helpers/Field";
import { openCell } from "@/helpers/openCell";

import { LevelNames } from "@/modules/GameSettings";
import { setFlag } from "@/helpers/setFlag";
import { useStatus } from "./useStatus";
import { useSettings } from "./useSettings";

type ReturnType = {
  level: LevelNames;
  isGameOver: boolean;
  isWin: boolean;
  isGameStarted: boolean;
  settings: [number, number];
  playerField: Field;
  gameField: Field;
  time: number;
  flagCounter: number;
  onClick: (coords: Coords) => void;
  onContextMenu: (coords: Coords) => void;
  onChangeLevel: (level: LevelNames) => void;
  onReset: () => void;
};

const useGame = (): ReturnType => {
  const {
    settings: [size, bombs],
    level,
    setLevel,
  } = useSettings();

  const { isGameStarted, isWin, isGameOver, setNewGame, setInProgress, setGameWin, setGameLoose } =
    useStatus();

  const [time, setTime] = useState(0);
  const [flagCounter, setFlagCounter] = useState(0);

  const [playerField, setPlayerField] = useState<Field>(emptyFieldGenerator(size, CellState.hidden));
  const [gameField, setGameField] = useState<Field>(fieldGenerator(size, bombs / (size * size)));

  useEffect(() => {
    if (!isGameStarted) return;
    let interval = setInterval(() => setTime((time) => time + 1), 1000);
    if (isGameOver) clearInterval(interval);
    return () => clearInterval(interval);
  }, [isGameStarted, isGameOver, setTime]);

  const onClick = useCallback(
    (coords: Coords) => {
      if (!isGameStarted) setInProgress();
      try {
        const [newPlayerField, isSolved] = openCell(coords, playerField, gameField);
        if (isSolved) setGameWin();
        setPlayerField([...newPlayerField]);
      } catch (error) {
        setPlayerField([...gameField]);
        setGameLoose();
      }
    },
    [isGameStarted, isGameOver, isWin, level, flagCounter]
  );

  const onContextMenu = useCallback(
    (coords: Coords) => {
      if (!isGameStarted) setInProgress();
      const [newPlayerField, isSolved, newFlagCounter] = setFlag(
        coords,
        playerField,
        gameField,
        flagCounter,
        bombs
      );
      setFlagCounter(newFlagCounter);
      if (isSolved) setGameWin();
      setPlayerField([...newPlayerField]);
    },
    [isGameStarted, isGameOver, isWin, level, flagCounter]
  );

  const resetHandler = ([size, bombs]: [number, number]) => {
    const newGameField = fieldGenerator(size, bombs / (size * size));
    const newPlayerField = emptyFieldGenerator(size, CellState.hidden);
    setTime(0);

    setGameField(newGameField);
    setPlayerField(newPlayerField);
    setNewGame();
  };

  const onChangeLevel = useCallback((level: LevelNames) => {
    const newSettings = setLevel(level);
    resetHandler(newSettings);
  }, []);

  const onReset = useCallback(() => resetHandler([size, bombs]), [size, bombs]);

  return {
    time,
    level,
    isGameOver,
    isWin,
    settings: [size, bombs],
    playerField,
    gameField,
    flagCounter,
    isGameStarted,
    onContextMenu,
    onClick,
    onChangeLevel,
    onReset,
  };
};

export default useGame;
