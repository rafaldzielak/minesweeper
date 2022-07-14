import React, { FC } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Reset } from "./Reset";
import { describe, expect, it, vi } from "vitest";

describe("Reset button check", () => {
  const ResetWithDummyHandlerOnReset: FC = () => <Reset onReset={() => {}} />;
  it("Should render elements with default state", () => {
    render(<ResetWithDummyHandlerOnReset />);
    expect(screen.getByText("🙂"));
  });

  it("onReset handler should be called", async () => {
    const onReset = vi.fn();

    render(<Reset onReset={onReset} />);
    userEvent.click(screen.getByText("🙂"));

    await waitFor(() => expect(onReset).toBeCalled());
  });

  it("Should change state when onMouseDown and onMouseUp events happened", () => {
    render(<ResetWithDummyHandlerOnReset />);

    fireEvent.mouseDown(screen.getByText("🙂"));
    expect(screen.getByText("😯"));

    fireEvent.mouseUp(screen.getByText("😯"));
    expect(screen.getByText("🙂"));
  });

  it("Should change state when onmouseDown, and onMouseLeave events happened", () => {
    render(<ResetWithDummyHandlerOnReset />);

    fireEvent.mouseDown(screen.getByText("🙂"));
    expect(screen.getByText("😯"));

    fireEvent.mouseLeave(screen.getByText("😯"));
    expect(screen.getByText("🙂"));
  });
});
