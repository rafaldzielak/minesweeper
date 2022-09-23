import React, { FC, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Coords } from "@/helpers/Field";
import { RootState } from "@/store";
import { Grid as GridComponent } from "@/components/Grid/Grid";

import { actions, runTimer } from "@/modules/GameWithRedux/game";
import type {} from "redux-thunk/extend-redux";

export const Grid: FC = () => {
  const { playerField } = useSelector(({ game: { playerField } }: RootState) => ({
    playerField,
  }));

  const dispatch = useDispatch();

  const onClick = useCallback((coords: Coords) => {
    dispatch(actions.openCell(coords));
    dispatch(runTimer());
  }, []);

  const onContextMenu = useCallback((coords: Coords) => dispatch(actions.setFlag(coords)), []);

  return (
    <GridComponent onClick={onClick} onContextMenu={onContextMenu}>
      {playerField}
    </GridComponent>
  );
};
