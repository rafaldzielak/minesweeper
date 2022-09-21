import { GameOver as GameOverComponent } from "@/components/Game/GameOver";
import { RootState } from "@/store";
import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../GameWithRedux/game";

export const GameOver: FC = () => {
  const { isGameOver, isWin } = useSelector(({ game: { isGameOver, isWin } }: RootState) => ({
    isGameOver,
    isWin,
  }));

  const dispatch = useDispatch();

  const onReset = useCallback(() => dispatch(actions.reset()), []);

  return <>{isGameOver && <GameOverComponent onClick={onReset} isWin={isWin} />}</>;
};
