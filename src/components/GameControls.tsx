import type { GameControls as GameControlsType } from '../types/sudoku';

interface GameControlsProps extends GameControlsType {
  timeElapsed: number;
  isPaused: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onNumberInput,
  onCheckSolution,
  onSolvePuzzle,
  onReset,
  onPause,
  timeElapsed,
  isPaused,
}) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="text-2xl font-bold text-center">
        {formatTime(timeElapsed)}
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => onNumberInput(num)}
            className="p-2 text-lg font-medium bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {num}
          </button>
        ))}
      </div>

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