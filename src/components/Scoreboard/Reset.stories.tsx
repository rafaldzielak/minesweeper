import { Story, Meta } from "@storybook/react";
import React from "react";
import { Reset, ResetProps } from "./Reset";

export default {
  title: "Top/Reset",
  component: Reset,
  args: { feature: "Flag", firstAction: "ctrl", secondAction: "click" },
} as Meta;

const Template: Story<ResetProps> = (args) => <Reset {...args} />;

export const ResetExample = Template.bind({});
