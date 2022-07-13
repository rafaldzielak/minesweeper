import { Story, Meta } from "@storybook/react";
import React from "react";
import { Legend, LegendProps } from "./Legend";

export default {
  title: "Top/Legend",
  component: Legend,
  args: { feature: "Flag", firstAction: "ctrl", secondAction: "click" },
} as Meta;

const Template: Story<LegendProps> = (args) => <Legend {...args} />;

export const GameLegend = Template.bind({});
