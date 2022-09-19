import React, { FC, useReducer, useCallback } from "react";
import { GameLevels, LevelNames } from "@/modules/GameSettings";
import { Scoreboard } from "@/components/Scoreboard";
import { Grid } from "@/components/Grid/Grid";
import { GameArea, GameOver } from "@/components/Game";
import { reducer, actions, getInitialState } from "../game";
import { Coords } from "@/helpers/Field";

export const GameWithUseReducer: FC = () => {
  const [{ isGameOver, isWin, level, playerField, settings, time, flagCounter }, dispatch] = useReducer(
    reducer,
    getInitialState()
  );

  const [, bombs] = settings;

  const onChangeLevel = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) =>
      dispatch(actions.changeLevel(level as LevelNames)),
    []
  );

  const onContextMenu = useCallback((coords: Coords) => dispatch(actions.setFlag(coords)), []);

  const onReset = useCallback(() => dispatch(actions.reset()), []);

  const onClick = useCallback((coords: Coords) => dispatch(actions.openCell(coords)), []);

  return (
    <>
      <GameArea>
        <Scoreboard
          time={time}
          bombs={bombs - flagCounter}
          levels={GameLevels as unknown as string[]}
          defaultLevel={level}
          onChangeLevel={onChangeLevel}
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
