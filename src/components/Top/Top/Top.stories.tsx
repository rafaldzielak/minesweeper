import { Story, Meta } from "@storybook/react";
import React from "react";
import { GameNameProps } from "../GameName";
import { Legend, LegendProps } from "../Legend/Legend";
import { Top, TopComponentTypeProps } from "./Top";

export default {
  title: "Top/Top",
  component: Legend,
  args: { feature: "Flag", firstAction: "ctrl", secondAction: "click", children: "minesweeper" },
} as Meta;

const Template: Story<TopComponentTypeProps> = (args) => <Top {...args} />;

export const GameLegend = Template.bind({});
