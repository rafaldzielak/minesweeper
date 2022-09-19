import { Scoreboard as ScoreboardComponent } from "@/components/Scoreboard";
import { RootState } from "@/store";
import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GameLevels, LevelNames } from "../GameSettings";
import { actions } from "../GameWithRedux/game";

export const Scoreboard: FC = () => {
  const { time, bombs, flagCounter, level } = useSelector(
    ({ game: { time, bombs, flagCounter, level } }: RootState) => ({
      time,
      bombs,
      flagCounter,
      level,
    })
  );

  const dispatch = useDispatch();

  const onReset = useCallback(() => dispatch(actions.reset()), []);

  const onChangeLevel = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) =>
      dispatch(actions.changeLevel(level as LevelNames)),
    []
  );

  return (
    <ScoreboardComponent
      time={time}
      bombs={bombs - flagCounter}
      levels={GameLevels as unknown as string[]}
      defaultLevel={level}
      onChangeLevel={onChangeLevel}
      onReset={onReset}
    />
  );
};
