# Sudoku Game (React + TypeScript + Vite)

**Live Demo:** [https://playsudok.netlify.app/](https://playsudok.netlify.app/)

A modern, themeable Sudoku game built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **9x9 Sudoku grid** with classic thick borders for 3x3 blocks
- **Random puzzle generation** with adjustable difficulty
- **Keyboard and mouse input** for cell selection and number entry
- **Solve Puzzle**: Instantly fills the board with a valid solution
- **Reset**: Start a new puzzle
- **Dark/Light theme toggle** (remembers your preference)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
```bash
npm install
```

### Running the App
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Usage
- **Click** a cell to select it, or use **arrow keys** to move.
- Enter numbers (1-9) via keyboard or on-screen buttons.
- Use **Backspace/Delete** to clear a cell.
- Click **Check Solution** to validate your completed board.
- Click **Solve Puzzle** to auto-complete the board.
- Click **Reset** to start a new puzzle.
- Use the **theme toggle** (☀️/🌙) in the top right to switch between light and dark mode.

## Project Structure
- `src/`
  - `App.tsx` — Main app logic and state
  - `components/` — UI components (grid, cell, controls)
  - `utils/sudokuUtils.ts` — Sudoku generation, validation, and solving logic
  - `theme.tsx` — Theme context and provider
- `tailwind.config.js` — Tailwind CSS configuration
- `postcss.config.js` — PostCSS configuration
