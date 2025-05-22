import type { Cell } from '../types/sudoku';

interface SudokuCellProps {
  cell: Cell;
  isSelected: boolean;
  onClick: () => void;
}

export const SudokuCell: React.FC<SudokuCellProps> = ({ cell, isSelected, onClick }) => {
  const base = 'w-12 h-12 flex items-center justify-center text-lg font-medium transition-colors duration-200 cursor-pointer select-none';
  const initial = cell.isInitial
    ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-bold'
    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100';
  const selected = isSelected
    ? 'ring-2 ring-pink-400 z-10'
    : 'hover:bg-yellow-100 dark:hover:bg-yellow-900';
  return (
    <div className={`${base} ${initial} ${selected}`} onClick={onClick}>
      {cell.value}
    </div>
  );
}; 