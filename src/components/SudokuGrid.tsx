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
}) => (
  <div className="grid grid-cols-9 border-2 border-black dark:border-white bg-white dark:bg-gray-900 rounded">
    {grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        // Determine border thickness and color for light/dark mode
        const borderRight = (colIndex + 1) % 3 === 0 && colIndex !== 8
          ? 'border-r border-black dark:border-white'
          : 'border-r border-gray-400 dark:border-gray-500';
        const borderBottom = (rowIndex + 1) % 3 === 0 && rowIndex !== 8
          ? 'border-b border-black dark:border-white'
          : 'border-b border-gray-400 dark:border-gray-500';
        const borderLeft = colIndex === 0 ? 'border-l border-black dark:border-white' : '';
        const borderTop = rowIndex === 0 ? 'border-t border-black dark:border-white' : '';
        const cellClass = `${borderRight} ${borderBottom} ${borderLeft} ${borderTop}`;
        return (
          <div className={cellClass} key={`${rowIndex}-${colIndex}`}>
            <SudokuCell
              cell={cell}
              isSelected={selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex}
              onClick={() => onCellSelect(rowIndex, colIndex)}
            />
          </div>
        );
      })
    )}
  </div>
); 