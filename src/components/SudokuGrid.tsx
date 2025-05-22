import type { Cell } from '../types/sudoku';
import { SudokuCell } from './SudokuCell';

interface SudokuGridProps {
  grid: Cell[][];
  selectedCell: [number, number] | null;
  onCellSelect: (row: number, col: number) => void;
}

export const SudokuGrid: React.FC<SudokuGridProps> = ({
  grid,
  selectedCell,
  onCellSelect,
}) => {
  return (
    <div className="grid grid-cols-9 gap-0 border-2 border-gray-400 bg-white p-1">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <SudokuCell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            isSelected={
              selectedCell !== null &&
              selectedCell[0] === rowIndex &&
              selectedCell[1] === colIndex
            }
            onClick={() => onCellSelect(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
}; 