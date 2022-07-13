import styled from "@emotion/styled";
import React from "react";

export type GameNameProps = {
  children: string;
};

export const GameName = styled.h1<GameNameProps>`
  font-size: 2em;
`;
