import React from "react";
import { Story, Meta } from "@storybook/react";

import { Scoreboard, ScoreboardProps } from "./Scoreboard";

export default {
  title: "Scoreboard/Scoreboard",
  component: Scoreboard,
} as Meta;

const Template: Story<ScoreboardProps> = (args) => <Scoreboard {...args} />;

export const ScoreboardExample = Template.bind({});
ScoreboardExample.args = {
  time: 0,
  levels: ["beginner", "intermediate", "expert"],
  bombs: 10,
  defaultLevel: "intermediate",
};
