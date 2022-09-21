import React, { FC } from "react";

import { Top } from "@/components/Top/Top";
import { GameLayout } from "@/components/Game";

import { GameWithReactRedux } from "@/modules/GameWithReactRedux/GameWithReactRedux";

export const MinesweeperWithReactRedux: FC = () => {
  return (
    <GameLayout
      top={
        <Top feature='Flag' firstAction='right click'>
          Minesweeper with React+Redux and react-redux
        </Top>
      }>
      <GameWithReactRedux />
    </GameLayout>
  );
};
