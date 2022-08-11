import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

import { GameWithHooks } from "./GameWithHooks";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useGame from "./useGame";

const mockOnClick = vi.fn();
const mockOnChangeLevel = vi.fn();
const mockOnReset = vi.fn();

vi.mock("./useGame", () => {
  const useGame = () => ({
    level: "beginner",
    isGameOver: true,
    isWin: false,
    settings: [9, 10],
    playerField: [
      [10, 10],
      [10, 10],
    ],
    onClick: mockOnClick,
    onChangeLevel: mockOnChangeLevel,
    onReset: mockOnReset,
  });
  return {
    default: useGame,
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GameWithHooks test cases", () => {
  it("Render game field by default", async () => {
    const { asFragment } = render(<GameWithHooks />);
    await waitFor(() => expect(asFragment()).toMatchSnapshot());
  });

  it("Cell click works fine", async () => {
    render(<GameWithHooks />);
    userEvent.click(screen.getByTestId("10_0,0"));
    await waitFor(() => expect(mockOnClick).toHaveBeenCalled());
  });

  it("Reset handler works fine", async () => {
    render(<GameWithHooks />);
    userEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(mockOnReset).toHaveBeenCalled());
  });

  it("Change level works fine", async () => {
    render(<GameWithHooks />);
    userEvent.selectOptions(screen.getByRole("combobox"), "intermediate");
    await waitFor(() => expect(mockOnChangeLevel).toHaveBeenCalled());
  });

  it("Game over reset the game state", async () => {
    render(<GameWithHooks />);
    userEvent.click(screen.getByText("🙁"));
    await waitFor(() => expect(mockOnReset).toHaveBeenCalled());
  });
});
