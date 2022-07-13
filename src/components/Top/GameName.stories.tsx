import { Story, Meta } from "@storybook/react";
import React from "react";
import { GameName, GameNameProps } from "./GameName";

export default {
  title: "Top/GameName",
  component: GameName,
  // args: { children: "AA" }, works the same as last line
} as Meta;

const Template: Story<GameNameProps> = (args) => <GameName {...args} />;

export const GameGameName = Template.bind({});

GameGameName.args = { children: "minesweeper" };
