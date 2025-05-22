import type { Cell } from '../types/sudoku';

interface SudokuCellProps {
  cell: Cell;
  isSelected: boolean;
  onClick: () => void;
}

export const SudokuCell: React.FC<SudokuCellProps> = ({ cell, isSelected, onClick }) => {
  const getCellClassName = () => {
    const baseClass = 'w-12 h-12 border border-gray-300 flex items-center justify-center text-lg font-medium transition-colors';
    const selectedClass = isSelected ? 'bg-blue-100' : 'hover:bg-gray-100';
    const initialClass = cell.isInitial ? 'font-bold text-gray-900' : 'text-blue-600';
    const invalidClass = !cell.isValid ? 'text-red-500' : '';
    
    return `${baseClass} ${selectedClass} ${initialClass} ${invalidClass}`;
  };

  return (
    <div
      className={getCellClassName()}
      onClick={onClick}
    >
      {cell.value}
    </div>
  );
}; 