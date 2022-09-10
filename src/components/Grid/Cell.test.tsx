import React from "react";
import { render, screen, fireEvent, createEvent } from "@testing-library/react";
import { CellState, Coords } from "@/helpers/Field";
import { Cell, checkCellIsActive as isActiveCell, areEqual, CellProps } from "./Cell";
import { describe, expect, it, vi } from "vitest";

describe("Cell component check", () => {
  const coords: Coords = [1, 1];
  const props = {
    coords,
    onClick: vi.fn(),
    onContextMenu: vi.fn(),
  };

  for (let cell = CellState.empty; cell <= CellState.weakFlag; cell++) {
    it("Check prevent default contextMenu for every type of cell", () => {
      render(<Cell {...props}>{cell}</Cell>);

      const cellComp = screen.getByTestId(`${cell}_${coords}`);

      const contextMenuEvent = createEvent.contextMenu(cellComp);
      fireEvent(cellComp, contextMenuEvent);

      expect(contextMenuEvent.defaultPrevented).toBe(true);
    });

    it("onClick and onContextMenu handler should be called for active cells", () => {
      render(<Cell {...props}>{cell}</Cell>);

      const cellComp = screen.getByTestId(`${cell}_${coords}`);

      fireEvent.click(cellComp);
      fireEvent.contextMenu(cellComp);

      if (isActiveCell(cell)) {
        expect(props.onClick).toBeCalled();
        expect(props.onContextMenu).toBeCalled();
      } else {
        expect(props.onClick).not.toBeCalled();
        expect(props.onContextMenu).not.toBeCalled();
      }
    });
  }

  it("Check areEqual", () => {
    const prevProps = { ...props, children: 0 } as CellProps;

    expect(areEqual(prevProps, { ...prevProps })).toBe(true);

    expect(areEqual(prevProps, { ...prevProps, coords: [1, 2] })).toBe(false);
    expect(areEqual(prevProps, { ...prevProps, coords: [2, 1] })).toBe(false);
    expect(areEqual(prevProps, { ...prevProps, coords: [2, 2] })).toBe(false);
    expect(areEqual(prevProps, { ...prevProps, coords: [1, 0] })).toBe(false);
    expect(areEqual(prevProps, { ...prevProps, onClick: vi.fn() })).toBe(false);
    expect(areEqual(prevProps, { ...prevProps, onContextMenu: vi.fn() })).toBe(false);
    expect(areEqual(prevProps, { ...prevProps, children: 1 })).toBe(false);
  });
});
