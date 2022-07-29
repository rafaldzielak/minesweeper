import styled from "@emotion/styled";
import React, { FC } from "react";

export type LegendProps = {
  feature: string;
  firstAction: string;
  secondAction?: string;
};

export const Legend: FC<LegendProps> = ({ feature, firstAction, secondAction }) => {
  return (
    <Parent>
      <strong>{feature}: </strong>
      <FlagComboParent>
        <FirstAction>{firstAction}</FirstAction> + <SecondAction>{secondAction}</SecondAction>
      </FlagComboParent>
    </Parent>
  );
};

const FlagComboParent = styled.code`
  background: #e3e3e3;
`;

const FirstAction = styled.span`
  color: #ec433c;
`;

const SecondAction = styled.span`
  color: #2a48ec;
`;

const Parent = styled.legend`
  font-size: 1em;
  margin: 0 auto 2vw;
  line-height: 1.25em;
`;
