import React, { useState, useEffect, useCallback } from 'react';
import './NQueens.css';

const NQueens = () => {
  const [boardSize, setBoardSize] = useState(8);
  const [board, setBoard] = useState([]);
  const [queens, setQueens] = useState([]);
  const [solving, setSolving] = useState(false);
  const [solved, setSolved] = useState(false);
  const [speed, setSpeed] = useState(500);

  const initializeBoard = useCallback(() => {
    const newBoard = Array(boardSize).fill().map(() => Array(boardSize).fill(false));
    setBoard(newBoard);
    setQueens([]);
    setSolved(false);
  }, [boardSize]);

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const isSafe = (row, col) => {
    // Check row and column
    for (const [queenRow, queenCol] of queens) {
      if (queenRow === row || queenCol === col) return false;
      if (Math.abs(queenRow - row) === Math.abs(queenCol - col)) return false;
    }
    return true;
  };

  const solveNQueens = async () => {
    setSolving(true);
    await solveNQueensUtil(0);
    setSolving(false);
    setSolved(true);
  };

  const solveNQueensUtil = async (row) => {
    if (row === boardSize) {
      return true;
    }

    for (let col = 0; col < boardSize; col++) {
      if (isSafe(row, col)) {
        // Place queen
        setQueens(prev => [...prev, [row, col]]);
        await sleep(speed);

        // Recursively solve for the next row
        if (await solveNQueensUtil(row + 1)) {
          return true;
        }

        // If placing queen doesn't lead to a solution, backtrack
        setQueens(prev => prev.filter((_, index) => index !== prev.length - 1));
        await sleep(speed);
      }
    }

    return false;
  };

  const handleSpeedChange = (e) => {
    setSpeed(1000 - parseInt(e.target.value));
  };

  const handleBoardSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setBoardSize(size);
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((_, colIndex) => {
          const isQueen = queens.some(([r, c]) => r === rowIndex && c === colIndex);
          const cellClass = `board-cell ${(rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'}`;
          
          return (
            <div key={colIndex} className={cellClass}>
              {isQueen && <div className="queen" />}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="n-queens-container">
      <div className="controls">
        <h1>N-Queens Visualizer</h1>
        <p>Watch how backtracking algorithm solves the N-Queens problem</p>
        
        <div className="control-group">
          <label>Board Size:</label>
          <input
            type="range"
            min="4"
            max="12"
            value={boardSize}
            onChange={handleBoardSizeChange}
            disabled={solving}
          />
          <span>{boardSize}x{boardSize}</span>
        </div>

        <div className="control-group">
          <label>Speed:</label>
          <input
            type="range"
            min="0"
            max="900"
            value={1000 - speed}
            onChange={handleSpeedChange}
            disabled={solving}
          />
          <span>{((1000 - speed) / 100).toFixed(1)}x</span>
        </div>

        <button 
          onClick={solveNQueens} 
          disabled={solving || solved}
          className="solve-button"
        >
          {solving ? 'Solving...' : solved ? 'Solved!' : 'Solve'}
        </button>

        <button
          onClick={initializeBoard}
          disabled={solving}
          className="reset-button"
        >
          Reset Board
        </button>
      </div>

      <div className="board-container">
        <div className="chess-board">
          {renderBoard()}
        </div>
      </div>

      <div className="stats">
        <div className="stat-item">
          <span className="stat-label">Queens Placed:</span>
          <span className="stat-value">{queens.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Remaining:</span>
          <span className="stat-value">{boardSize - queens.length}</span>
        </div>
      </div>
    </div>
  );
};

export default NQueens;
