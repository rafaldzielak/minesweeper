import styled from "@emotion/styled";
import React, { FC } from "react";

export const Legend: FC = () => {
  return (
    <Parent>
      <strong>flag: </strong>
      <FlagComboParent>
        <Key>ctrl</Key> + <Click>click</Click>
      </FlagComboParent>
    </Parent>
  );
};

const FlagComboParent = styled.code`
  background: #e3e3e3;
`;

const Key = styled.span`
  color: #ec433c;
`;

const Click = styled.span`
  color: #2a48ec;
`;

const Parent = styled.legend`
  font-size: 1em;
  margin: 0 auto 2vw;
  line-height: 1.25em;
`;
