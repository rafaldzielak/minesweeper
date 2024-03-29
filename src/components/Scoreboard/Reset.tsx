import { useMouseDown } from "@/hooks/useMouseDown";
import styled from "@emotion/styled";
import React, { FC, memo, useState } from "react";

export type ResetProps = {
  onReset: () => void;
};

export const Reset: FC<ResetProps> = memo(({ onReset }) => {
  const [mouseDown, onMouseDown, onMouseUp] = useMouseDown();

  return (
    <Button onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} onClick={onReset}>
      {mouseDown ? "😯" : "🙂"}
    </Button>
  );
});

const Button = styled.button`
  font-size: 1.5vw;
  cursor: pointer;
  font-weight: 700;
  border-width: 0.15vw;
  border-style: solid;
  background-color: #d1d1d1;
  border-color: white #9e9e9e #9e9e9e white;
`;
