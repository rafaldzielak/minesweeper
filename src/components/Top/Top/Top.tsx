import styled from "@emotion/styled";
import React, { FC, memo } from "react";
import { GameName, GameNameProps } from "../GameName";
import { Legend, LegendProps } from "../Legend/Legend";

export type TopComponentTypeProps = GameNameProps & LegendProps;

export const Top: FC<TopComponentTypeProps> = memo(({ children, ...LegendProps }) => (
  <Header>
    <GameName>{children}</GameName>
    <Legend {...LegendProps} />
  </Header>
));

const Header = styled.header`
  text-align: center;
  position: relative;
  display: inline-block;
`;
