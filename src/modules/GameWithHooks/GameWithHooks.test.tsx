import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

import { CellState } from "@/helpers/Field";

import { GameWithHooks } from "./GameWithHooks";
import { describe, expect, it, vi } from "vitest";

const { empty: e, hidden: h, bomb: b, flag: f } = CellState;

vi.mock("@/helpers/Field");

describe("GameWithHooks test cases", () => {
  describe("Render behaviour", () => {
    it("Render game field by default", () => {
      const { asFragment } = render(<GameWithHooks />);
      expect(screen.getAllByRole("cell")).toHaveLength(81);
      expect(asFragment()).toMatchSnapshot();
    });

    it("onChange game level handler", async () => {
      render(<GameWithHooks />);
      expect(screen.getAllByRole("cell")).toHaveLength(81);
      userEvent.selectOptions(screen.getByRole("combobox"), "intermediate");
      await waitFor(() => expect(screen.getAllByRole("cell")).toHaveLength(256));
      userEvent.selectOptions(screen.getByRole("combobox"), "expert");
      await waitFor(() => expect(screen.getAllByRole("cell")).toHaveLength(484));
    });
  });

  describe("Open cell test cases", () => {
    it("Open empty cell on the beginner level", async () => {
      render(<GameWithHooks />);
      await userEvent.click(screen.getByTestId("10_0,0"));
      await waitFor(() => expect(screen.getAllByTestId(/^0_/)).toHaveLength(18));
    });
  });
});
