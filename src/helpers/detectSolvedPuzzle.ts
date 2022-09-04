import { CellState, Field } from "./Field";

export const detectSolvedPuzzle = (playerField: Field, gameField: Field): [boolean, number] => {
  const { hidden, bomb, flag, weakFlag } = CellState;

  let bombsCounter = 0;
  let flagCounter = 0;
  let detectedBombsCounter = 0;
  let doesFieldHaveHiddenCells = false;

  for (const y of gameField.keys()) {
    for (const x of gameField[y].keys()) {
      const gameCell = gameField[y][x];
      const playerCell = playerField[y][x];
      const isPlayerCellFlag = [flag, weakFlag].includes(playerCell);

      if (playerCell === hidden) doesFieldHaveHiddenCells = true;

      if (isPlayerCellFlag) flagCounter++;

      if (gameCell === bomb) {
        bombsCounter++;
        if (playerCell === flag) detectedBombsCounter++;
      }
    }
  }

  const isPuzzleSolved =
    bombsCounter === detectedBombsCounter && flagCounter === bombsCounter && !doesFieldHaveHiddenCells;

  return [isPuzzleSolved, flagCounter];
};
