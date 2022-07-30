import { Cell, CellState, Coords, Field } from "./Field";

export const incrementNeighbours = (coords: Coords, field: Field): Field => {
  const items = getNeigboursItems(coords);
  for (const item of Object.values(items)) {
    if (checkItemInField(item, field)) {
      const [y, x] = item;
      const cell = field[y][x];
      if (cell < 8) field[y][x] = (cell + 1) as Cell;
    }
  }
  return field;
};

export const getNeigboursItems = ([y, x]: Coords): Record<string, [number, number]> => ({
  top: [y - 1, x],
  topRight: [y - 1, x + 1],
  right: [y, x + 1],
  rightBottom: [y + 1, x + 1],
  bottom: [y + 1, x],
  bottomLeft: [y + 1, x - 1],
  left: [y, x - 1],
  leftTop: [y - 1, x - 1],
});

export const checkItemInField = ([y, x]: Coords, { length }: Field): boolean =>
  y >= 0 && x >= 0 && length - y > 0 && length - x > 0;

export const openCell = (coords: Coords, playerField: Field, gameField: Field): Field => {
  const { empty, bomb, hidden } = CellState;
  const [y, x] = coords;
  const gameCell = gameField[y][x];
  if (gameCell === bomb) throw new Error("Game Over");
  if (gameCell === empty) {
    playerField[y][x] = gameCell;
    const items = getNeigboursItems(coords);
    Object.values(items).forEach((coords) => {
      if (checkItemInField(coords, gameField)) {
        const [y, x] = coords;
        const gameCell = gameField[y][x];
        const playerCell = playerField[y][x];
        if (gameCell === empty && playerCell === hidden)
          playerField = openCell(coords, playerField, gameField);
        if (gameCell < bomb) playerField[y][x] = gameCell;
      }
    });
  }
  playerField[y][x] = gameCell;
  return playerField;
};
