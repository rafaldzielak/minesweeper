import { Story, Meta } from "@storybook/react";
import React from "react";
import { Legend } from "./Legend";

export default {
  title: "Legend",
  component: Legend,
} as Meta;

const Template: Story = (args) => <Legend {...args} />;

export const GameLegend = Template.bind({});
