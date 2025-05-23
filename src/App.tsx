import { useState, useEffect, useCallback } from 'react';
import { SudokuGrid } from './components/SudokuGrid';
import { GameControls } from './components/GameControls';
import { generateSudoku, validateGrid, isGridComplete, isBoardValid } from './utils/sudokuUtils';
import type { GameState, Cell } from './types/sudoku';
import { useTheme } from './theme';

function App() {
  const { theme, toggle } = useTheme();
  const [gameState, setGameState] = useState<GameState>({
    grid: generateSudoku(),
    selectedCell: null,
    isComplete: false,
    timeElapsed: 0,
    isPaused: false,
  });
  const [feedback, setFeedback] = useState<string | null>(null);

  // Keyboard input handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.isPaused || gameState.isComplete) return;
      if (!gameState.selectedCell) return;
      const [row, col] = gameState.selectedCell;
      // Number input (1-9)
      if (/^[1-9]$/.test(e.key)) {
        handleNumberInput(Number(e.key));
      }
      // Backspace or Delete to clear
      if (e.key === 'Backspace' || e.key === 'Delete') {
        handleNumberInput(null);
      }
      // Arrow keys for navigation
      if (e.key === 'ArrowUp') {
        setGameState(prev => ({
          ...prev,
          selectedCell: [Math.max(0, row - 1), col],
        }));
      }
      if (e.key === 'ArrowDown') {
        setGameState(prev => ({
          ...prev,
          selectedCell: [Math.min(8, row + 1), col],
        }));
      }
      if (e.key === 'ArrowLeft') {
        setGameState(prev => ({
          ...prev,
          selectedCell: [row, Math.max(0, col - 1)],
        }));
      }
      if (e.key === 'ArrowRight') {
        setGameState(prev => ({
          ...prev,
          selectedCell: [row, Math.min(8, col + 1)],
        }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.selectedCell, gameState.isPaused, gameState.isComplete]);

  useEffect(() => {
    let timer: number;
    if (!gameState.isPaused && !gameState.isComplete) {
      timer = window.setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState.isPaused, gameState.isComplete]);

  const handleCellSelect = useCallback((row: number, col: number) => {
    setGameState(prev => ({
      ...prev,
      selectedCell: [row, col],
    }));
  }, []);

  const handleNumberInput = useCallback((number: number | null) => {
    setFeedback(null);
    if (gameState.selectedCell === null) return;

    const [row, col] = gameState.selectedCell;
    const currentRow = gameState.grid[row];
    if (!currentRow) return;
    
    const currentCell = currentRow[col];
    if (!currentCell || currentCell.isInitial) return;

    const newGrid = gameState.grid.map(r => [...r]) as Cell[][];
    newGrid[row]![col]! = {
      value: number,
      isInitial: false,
      isValid: true,
    };

    // Do not validate for invalids during play
    const validatedGrid = validateGrid(newGrid, false);

    setGameState(prev => ({
      ...prev,
      grid: validatedGrid,
     
    }));
  }, [gameState.selectedCell, gameState.grid]);

  const handleCheckSolution = useCallback(() => {
    setFeedback(null);
    if (!isGridComplete(gameState.grid)) {
      setFeedback('Please fill all cells before checking!');
      return;
    }
    const validatedGrid = validateGrid(gameState.grid, true);
    const allValid = isBoardValid(validatedGrid);
    setGameState(prev => ({
      ...prev,
      grid: validatedGrid,
      isComplete: allValid,
    }));
    setFeedback(allValid
      ? 'Congratulations! You\'ve completed the puzzle!'
      : 'There are mistakes in your solution!');
  }, [gameState.grid]);

  const handleSolvePuzzle = useCallback(() => {
    setFeedback(null);
    setGameState(prev => ({
      ...prev,
      grid: generateSudoku(0),
      isComplete: true,
    }));
  }, []);

  const handleReset = useCallback(() => {
    setGameState({
      grid: generateSudoku(),
      selectedCell: null,
      isComplete: false,
      timeElapsed: 0,
      isPaused: false,
    });
    setFeedback(null);
  }, []);

  const handlePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 relative">
      <button
        onClick={toggle}
        className="absolute right-4 top-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Sudoku</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <SudokuGrid
            grid={gameState.grid}
            selectedCell={gameState.selectedCell}
            onCellSelect={handleCellSelect}
          />
          
          <GameControls
            onCellSelect={handleCellSelect}
            onNumberInput={handleNumberInput}
            onCheckSolution={handleCheckSolution}
            onSolvePuzzle={handleSolvePuzzle}
            onReset={handleReset}
            onPause={handlePause}
            timeElapsed={gameState.timeElapsed}
            isPaused={gameState.isPaused}
          />

          {gameState.isComplete && (
            <div className="mt-4 text-center text-green-600 font-bold">
              Congratulations! You've completed the puzzle!
            </div>
          )}

          {feedback && (
            <div className={`mt-4 text-center font-bold ${gameState.isComplete ? 'text-green-600' : 'text-red-600'}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
