import React, { FC, useState, useMemo } from "react";

import { Field, CellState, emptyFieldGenerator, fieldGenerator, Coords } from "@/helpers/Field";
import { openCell } from "@/helpers/CellsManipulator";

import { GameLevels, LevelNames, GameSettings } from "@/modules/GameSettings";

import { Top } from "@/components/Top/Top";
import { Scoreboard } from "@/components/Scoreboard";
import { Grid } from "@/components/Grid/Grid";
import { GameArea, Wrapper, GameOver } from "@/components/Game";

export const GameWithHooks: FC = () => {
  const [level, setLevel] = useState<LevelNames>("beginner");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const [size, bombs] = GameSettings[level];

  const [playerField, setPlayerField] = useState<Field>(emptyFieldGenerator(size, CellState.hidden));
  const [gameField, setGameField] = useState<Field>(fieldGenerator(size, bombs / (size * size)));

  const onClick = (coords: Coords) => {
    try {
      const newPlayerField = openCell(coords, playerField, gameField);
      setPlayerField([...newPlayerField]);
    } catch (error) {
      setPlayerField([...gameField]);
      setIsGameOver(true);
      setIsWin(false);
    }
  };

  const resetHandler = ([size, bombs]: [number, number]) => {
    const newGameField = fieldGenerator(size, bombs / (size * size));
    const newPlayerField = emptyFieldGenerator(size, CellState.hidden);

    setGameField(newGameField);
    setPlayerField(newPlayerField);
    setIsGameOver(false);
    setIsWin(false);
  };

  const onChangeLevel = ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(level as LevelNames);
    const newSettings = GameSettings[level as LevelNames];
    resetHandler(newSettings);
  };

  const onReset = () => resetHandler([size, bombs]);

  return (
    <Wrapper>
      <Top feature='Flag' firstAction='right click'>
        Minesweeper
      </Top>
      <GameArea>
        <Scoreboard
          time='0'
          bombs='10'
          levels={GameLevels as unknown as string[]}
          defaultLevel={level}
          onChangeLevel={onChangeLevel}
          onReset={onReset}
        />
        {isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
        <Grid onClick={onClick} onContextMenu={() => null}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  );
};
