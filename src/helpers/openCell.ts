import { checkItemInField, getNeigboursItems } from "./CellsManipulator";
import { detectSolvedPuzzle } from "./detectSolvedPuzzle";
import { CellState, Coords, Field } from "./Field";

export const openCell = (coords: Coords, playerField: Field, gameField: Field): [Field, boolean, number] => {
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
          [playerField] = openCell(coords, playerField, gameField);
        if (gameCell < bomb) playerField[y][x] = gameCell;
      }
    });
  }
  playerField[y][x] = gameCell;

  const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField);

  return [playerField, isSolved, flagCounter];
};
