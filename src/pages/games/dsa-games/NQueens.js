import React, { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { FiEye, FiRefreshCw } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './NQueens.css';
import CodeEditor from '../../../components/CodeEditor/CodeEditor';

const NQueens = () => {
  const [boardSize, setBoardSize] = useState(8);
  const [board, setBoard] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    initializeBoard(boardSize);
  }, [boardSize]);

  const initializeBoard = (size) => {
    const newBoard = Array(size).fill().map(() => Array(size).fill(null));
    setBoard(newBoard);
    setMessage('');
  };

  const handleCellClick = (row, col) => {
    const newBoard = [...board];
    
    // If queen already exists in this cell, remove it
    if (newBoard[row][col] === 'Q') {
      newBoard[row][col] = null;
      setBoard(newBoard);
      return;
    }

    // Check if placing a queen here is valid
    if (isValidPlacement(newBoard, row, col)) {
      newBoard[row][col] = 'Q';
      setBoard(newBoard);
      
      // Check if the solution is complete
      const queensCount = newBoard.flat().filter(cell => cell === 'Q').length;
      if (queensCount === boardSize) {
        if (isSolutionValid(newBoard)) {
          setMessage('Congratulations! You found a valid solution!');
        }
      }
    } else {
      setMessage('Invalid placement! Queens can\'t threaten each other.');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const isValidPlacement = (board, row, col) => {
    // Check row
    for (let i = 0; i < board.length; i++) {
      if (board[row][i] === 'Q') return false;
    }

    // Check column
    for (let i = 0; i < board.length; i++) {
      if (board[i][col] === 'Q') return false;
    }

    // Check diagonals
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === 'Q') {
          if (Math.abs(row - i) === Math.abs(col - j)) return false;
        }
      }
    }

    return true;
  };

  const isSolutionValid = (board) => {
    // Check if there are exactly N queens
    const queensCount = board.flat().filter(cell => cell === 'Q').length;
    if (queensCount !== boardSize) return false;

    // Check if any queen threatens another
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board.length; col++) {
        if (board[row][col] === 'Q') {
          // Temporarily remove this queen to check if its position is valid
          board[row][col] = null;
          if (!isValidPlacement(board, row, col)) {
            board[row][col] = 'Q'; // Restore the queen
            return false;
          }
          board[row][col] = 'Q'; // Restore the queen
        }
      }
    }
    return true;
  };

  const handleReset = () => {
    initializeBoard(boardSize);
  };

  const findSolution = () => {
    const solution = solveNQueens(boardSize);
    if (solution) {
      const newBoard = Array(boardSize).fill().map(() => Array(boardSize).fill(null));
      solution.forEach(([row, col]) => {
        newBoard[row][col] = 'Q';
      });
      setBoard(newBoard);
      setMessage('Here\'s one possible solution!');
    }
  };

  // Helper function to solve N-Queens
  const solveNQueens = (n) => {
    const solutions = [];
    const queens = [];
    
    const isSafe = (row, col) => {
      for (const [queenRow, queenCol] of queens) {
        if (queenRow === row || queenCol === col) return false;
        if (Math.abs(queenRow - row) === Math.abs(queenCol - col)) return false;
      }
      return true;
    };

    const solve = (row) => {
      if (row === n) {
        solutions.push([...queens]);
        return true;
      }

      for (let col = 0; col < n; col++) {
        if (isSafe(row, col)) {
          queens.push([row, col]);
          if (solve(row + 1)) return true;
          queens.pop();
        }
      }
      return false;
    };

    solve(0);
    return solutions[0]; // Return first solution found
  };

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <Link to="/games" className="visualizer-back-button">
          <IoArrowBack />
          Back to games
        </Link>
        <h1>
          <span className="icon">♕</span>
          N-Queens Visualizer
        </h1>
      </div>

      <div className="visualizer-layout">
        <div className="visualizer-sidebar">
          <div className="sidebar-content">
            <div className="info-section">
              <h3>N-Queens Problem</h3>
              <p>
                Place N queens on an NxN chessboard so that no two queens threaten
                each other.
              </p>
              <div className="rules">
                <div className="rule">
                  <span className="bullet">•</span>
                  Queens can't share the same row
                </div>
                <div className="rule">
                  <span className="bullet">•</span>
                  Queens can't share the same column
                </div>
                <div className="rule">
                  <span className="bullet">•</span>
                  Queens can't share the same diagonal
                </div>
              </div>
            </div>

            <div className="control-group">
              <label>
                Board Size: {boardSize}x{boardSize}
              </label>
              <input
                type="range"
                min="4"
                max="12"
                value={boardSize}
                onChange={(e) => setBoardSize(parseInt(e.target.value))}
              />
            </div>

            <div className="stats-container">
              <div className="stat-item">
                <label>Queens Placed</label>
                <span>{board.flat().filter(cell => cell === 'Q').length}</span>
              </div>
              <div className="stat-item">
                <label>Remaining</label>
                <span>{boardSize - board.flat().filter(cell => cell === 'Q').length}</span>
              </div>
            </div>

            <div className="action-buttons">
              <button onClick={findSolution} className="action-button primary">
                <FiEye /> Show Solution
              </button>
              <button onClick={handleReset} className="action-button secondary">
                <FiRefreshCw /> Reset Board
              </button>
            </div>
          </div>
        </div>

        <div className="visualizer-main">
          <div className="board-container">
            <div className="chess-board">
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                  {row.map((cell, colIndex) => (
                    <div
                      key={colIndex}
                      className={`board-cell ${
                        (rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'
                      }`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {cell === 'Q' && <div className="queen" />}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {message && <div className="success-message">{message}</div>}
          </div>
          <div className="code-practice-section">
            <CodeEditor 
              initialLanguage="java"
              onCodeSubmit={(code) => {
                // Handle code submission
                console.log('Code submitted:', code);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NQueens;
