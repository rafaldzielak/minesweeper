import { render, screen } from "@testing-library/react";
import { GameWithHooks } from "./GameWithHooks";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/helpers/Field");

describe("GameWithHooks test cases", () => {
  describe("Render behaviour", () => {
    it("Render game field by default", () => {
      const { asFragment } = render(<GameWithHooks />);
      expect(screen.getAllByRole("cell")).toHaveLength(81);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
