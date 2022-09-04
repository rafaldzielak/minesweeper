import { useState, useEffect } from "react";

import { Field, CellState, emptyFieldGenerator, fieldGenerator, Coords } from "@/helpers/Field";
import { openCell } from "@/helpers/openCell";

import { LevelNames, GameSettings } from "@/modules/GameSettings";
import { setFlag } from "@/helpers/setFlag";

type ReturnType = {
  level: LevelNames;
  isGameOver: boolean;
  isWin: boolean;
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
  const [level, setLevel] = useState<LevelNames>("beginner");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [flagCounter, setFlagCounter] = useState(0);

  const [size, bombs] = GameSettings[level];

  const [playerField, setPlayerField] = useState<Field>(emptyFieldGenerator(size, CellState.hidden));
  const [gameField, setGameField] = useState<Field>(fieldGenerator(size, bombs / (size * size)));

  useEffect(() => {
    if (!isGameStarted) return;
    let interval = setInterval(() => setTime((time) => time + 1), 1000);
    if (isGameOver) clearInterval(interval);
    return () => clearInterval(interval);
  }, [isGameStarted, isGameOver, setTime]);

  const setGameOver = (isSolved = false) => {
    setIsGameOver(true);
    setIsWin(isSolved);
  };

  const onClick = (coords: Coords) => {
    if (!isGameStarted) setIsGameStarted(true);
    try {
      const [newPlayerField, isSolved] = openCell(coords, playerField, gameField);
      if (isSolved) setGameOver(isSolved);

      setPlayerField([...newPlayerField]);
    } catch (error) {
      setPlayerField([...gameField]);
      setGameOver();
      setIsWin(false);
    }
  };

  const onContextMenu = (coords: Coords) => {
    if (!isGameStarted) setIsGameStarted(true);
    const [newPlayerField, isSolved, newFlagCounter] = setFlag(
      coords,
      playerField,
      gameField,
      flagCounter,
      bombs
    );
    setFlagCounter(newFlagCounter);
    if (isSolved) setGameOver(isSolved);
    setPlayerField([...newPlayerField]);
  };

  const resetHandler = ([size, bombs]: [number, number]) => {
    const newGameField = fieldGenerator(size, bombs / (size * size));
    const newPlayerField = emptyFieldGenerator(size, CellState.hidden);
    setTime(0);

    setGameField(newGameField);
    setPlayerField(newPlayerField);
    setIsGameOver(false);
    setIsWin(false);
  };

  const onChangeLevel = (level: LevelNames) => {
    setLevel(level);
    const newSettings = GameSettings[level];
    resetHandler(newSettings);
  };

  const onReset = () => resetHandler([size, bombs]);

  return {
    time,
    level,
    isGameOver,
    isWin,
    settings: [size, bombs],
    playerField,
    gameField,
    flagCounter,
    onContextMenu,
    onClick,
    onChangeLevel,
    onReset,
  };
};

export default useGame;
