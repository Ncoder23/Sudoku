import type { GameControls as GameControlsType } from '../types/sudoku';

interface GameControlsProps extends GameControlsType {
  timeElapsed: number;
  isPaused: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({

  onCheckSolution,
  onSolvePuzzle,
  onReset,
  onPause,
  isPaused,
}) => {
  return (
    <div className="mt-4">
      
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onCheckSolution}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Check Solution
        </button>
        <button
          onClick={onSolvePuzzle}
          className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Solve Puzzle
        </button>
        <button
          onClick={onReset}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={onPause}
          className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
}; 