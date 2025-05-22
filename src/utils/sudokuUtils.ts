import type { Cell, CellValue, Grid } from '../types/sudoku';

const EMPTY_GRID: Grid = Array(9).fill(null).map(() => Array(9).fill(null));

export const isValidPlacement = (grid: Grid, row: number, col: number, num: number): boolean => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row]![x]! === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (grid[x]![col]! === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[boxRow + i]![boxCol + j]! === num) return false;
    }
  }

  return true;
};

export const solveSudoku = (grid: Grid): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row]![col]! === null) {
        for (let num = 1; num <= 9; num++) {
          if (isValidPlacement(grid, row, col, num)) {
            (grid[row]![col]! as CellValue) = num;
            if (solveSudoku(grid)) return true;
            (grid[row]![col]! as CellValue) = null;
          }
        }
        return false;
      }
    }
  }
  return true;
};

export const generateSudoku = (difficulty: number = 40): Cell[][] => {
  // Create a solved grid
  const solvedGrid: Grid = JSON.parse(JSON.stringify(EMPTY_GRID));
  solveSudoku(solvedGrid);

  // Create a copy of the solved grid
  const puzzleGrid: Cell[][] = solvedGrid.map(row =>
    row.map(value => ({
      value,
      isInitial: true,
      isValid: true
    }))
  );

  // Remove numbers to create the puzzle
  const cellsToRemove = difficulty;
  let removed = 0;

  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (puzzleGrid[row]![col]!.value !== null) {
      puzzleGrid[row]![col]!.value = null;
      puzzleGrid[row]![col]!.isInitial = false;
      removed++;
    }
  }

  return puzzleGrid;
};

// Only check for invalid cells if checkAll is true
export const validateGrid = (grid: Cell[][], checkAll = false): Cell[][] => {
  const newGrid = JSON.parse(JSON.stringify(grid));

  if (!checkAll) {
    // Just return the grid, don't mark invalids
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        newGrid[row][col].isValid = true;
      }
    }
    return newGrid;
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (!newGrid[row][col].isInitial && newGrid[row][col].value !== null) {
        const value = newGrid[row][col].value;
        newGrid[row][col].value = null;
        newGrid[row][col].isValid = isValidPlacement(
          newGrid.map((r: Cell[]) => r.map((c: Cell) => c.value)),
          row,
          col,
          value!
        );
        newGrid[row][col].value = value;
      }
    }
  }

  return newGrid;
};

export const isGridComplete = (grid: Cell[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row]![col]!.value === null) {
        return false;
      }
    }
  }
  return true;
};

export const isBoardValid = (grid: Cell[][]): boolean => {
  // Check rows
  for (let row = 0; row < 9; row++) {
    const seen = new Set();
    for (let col = 0; col < 9; col++) {
      const val = grid[row]![col]!.value;
      if (val === null || seen.has(val)) return false;
      seen.add(val);
    }
  }
  // Check columns
  for (let col = 0; col < 9; col++) {
    const seen = new Set();
    for (let row = 0; row < 9; row++) {
      const val = grid[row]![col]!.value;
      if (val === null || seen.has(val)) return false;
      seen.add(val);
    }
  }
  // Check 3x3 blocks
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = new Set();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const val = grid[boxRow * 3 + i]![boxCol * 3 + j]!.value;
          if (val === null || seen.has(val)) return false;
          seen.add(val);
        }
      }
    }
  }
  return true;
}; 