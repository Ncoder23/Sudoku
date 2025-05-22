export type CellValue = number | null;
export type Grid = CellValue[][];

export interface Cell {
  value: CellValue;
  isInitial: boolean;
  isValid: boolean;
}

export interface GameState {
  grid: Cell[][];
  selectedCell: [number, number] | null;
  isComplete: boolean;
  timeElapsed: number;
  isPaused: boolean;
}

export interface GameControls {
  onCellSelect: (row: number, col: number) => void;
  onNumberInput: (number: number) => void;
  onCheckSolution: () => void;
  onSolvePuzzle: () => void;
  onReset: () => void;
  onPause: () => void;
} 