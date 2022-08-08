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

    it("Check click to the cell when the level is changed", async () => {
      render(<GameWithHooks />);
      expect(screen.getAllByRole("cell")).toHaveLength(81);

      userEvent.selectOptions(screen.getByRole("combobox"), "intermediate");
      await waitFor(() => expect(screen.getAllByRole("cell")).toHaveLength(256));

      userEvent.click(screen.getByTestId("10_15,15"));
      await waitFor(() => expect(screen.getAllByTestId(/^0_/)).toHaveLength(2));

      userEvent.selectOptions(screen.getByRole("combobox"), "expert");
      await waitFor(() => expect(screen.getAllByRole("cell")).toHaveLength(484));

      userEvent.click(screen.getByTestId("10_21,21"));
      await waitFor(() => expect(screen.getAllByTestId(/^0_/)).toHaveLength(1));
      await waitFor(() => expect(screen.getAllByTestId(/^1_/)).toHaveLength(2));
      await waitFor(() => expect(screen.getAllByTestId(/^2_/)).toHaveLength(1));
    });

    it("onReset game handler", async () => {
      render(<GameWithHooks />);
      await waitFor(() => expect(screen.getAllByTestId(/^10_/)).toHaveLength(81));

      userEvent.click(screen.getByTestId("10_0,8"));
      await waitFor(() => expect(screen.getAllByTestId(/^1_/)).toHaveLength(1));

      userEvent.click(screen.getByTestId("10_0,0"));
      await waitFor(() => expect(screen.getAllByTestId(/^0_/)).toHaveLength(18));

      userEvent.click(screen.getByRole("button"));
      await waitFor(() => expect(screen.getAllByTestId(/^10_/)).toHaveLength(81));
    });
  });

  describe("Game over behavior", () => {
    it("Player loose the game", async () => {
      render(<GameWithHooks />);

      userEvent.click(screen.getByTestId("10_0,8"));
      await waitFor(() => expect(screen.getAllByTestId(/^1_/)).toHaveLength(1));

      userEvent.click(screen.getByTestId("10_0,0"));
      await waitFor(() => expect(screen.getAllByTestId(/^0_/)).toHaveLength(18));

      userEvent.click(screen.getByTestId("10_0,7"));
      await waitFor(() => expect(screen.getByText("🙁")).toBeTruthy());

      expect(screen.getAllByTestId(/^0_/)).toHaveLength(27);
      expect(screen.getAllByTestId(/^1_/)).toHaveLength(30);
      expect(screen.getAllByTestId(/^2_/)).toHaveLength(12);
      expect(screen.getAllByTestId(/^3_/)).toHaveLength(2);

      userEvent.click(screen.getByText("🙁"));
      await waitFor(() => expect(screen.getAllByTestId(/^10_/)).toHaveLength(81));
      await waitFor(() => expect(screen.queryByText("🙁")).toBeFalsy());
    });
  });
});
