import React, { FC, useCallback } from "react";
import { GameLevels, LevelNames } from "@/modules/GameSettings";
import { Scoreboard } from "@/components/Scoreboard";
import { Grid } from "@/components/Grid/Grid";
import { GameArea, Wrapper, GameOver } from "@/components/Game";
import useGame from "./useGame";

export const GameWithHooks: FC = () => {
  const {
    isGameOver,
    isWin,
    level,
    onChangeLevel,
    onClick,
    onReset,
    onContextMenu,
    playerField,
    settings,
    time,
    flagCounter,
  } = useGame();

  const [, bombs] = settings;

  const onChange = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) =>
      onChangeLevel(level as LevelNames),
    []
  );

  return (
    <>
      <GameArea>
        <Scoreboard
          time={time}
          bombs={bombs - flagCounter}
          levels={GameLevels as unknown as string[]}
          defaultLevel={level}
          onChangeLevel={onChange}
          onReset={onReset}
        />
        {isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
        <Grid onClick={onClick} onContextMenu={onContextMenu}>
          {playerField}
        </Grid>
      </GameArea>
    </>
  );
};
