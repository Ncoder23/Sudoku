import { useState, useEffect, useCallback } from 'react';
import { SudokuGrid } from './components/SudokuGrid';
import { GameControls } from './components/GameControls';
import { generateSudoku, validateGrid, isGridComplete } from './utils/sudokuUtils';
import type { GameState, Cell } from './types/sudoku';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    grid: generateSudoku(),
    selectedCell: null,
    isComplete: false,
    timeElapsed: 0,
    isPaused: false,
  });

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

  const handleNumberInput = useCallback((number: number) => {
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

    const validatedGrid = validateGrid(newGrid);
    const isComplete = isGridComplete(validatedGrid);

    setGameState(prev => ({
      ...prev,
      grid: validatedGrid,
      isComplete,
    }));
  }, [gameState.selectedCell, gameState.grid]);

  const handleCheckSolution = useCallback(() => {
    const validatedGrid = validateGrid(gameState.grid);
    const isComplete = isGridComplete(validatedGrid);
    setGameState(prev => ({
      ...prev,
      grid: validatedGrid,
      isComplete,
    }));
  }, [gameState.grid]);

  const handleSolvePuzzle = useCallback(() => {
    // This would be implemented using the solveSudoku function
    // For now, we'll just generate a new solved puzzle
    setGameState(prev => ({
      ...prev,
      grid: generateSudoku(0), // 0 means no cells removed
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
  }, []);

  const handlePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Sudoku</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
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
        </div>
      </div>
    </div>
  );
}

export default App;
