import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import './PathfindingVisualizer.css';

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('wall'); // wall, start, end
  const [algorithm, setAlgorithm] = useState('dijkstra');
  const [isRunning, setIsRunning] = useState(false);
  const [tutorial, setTutorial] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [gridSize] = useState({ rows: 20, cols: 40 });

  const tutorialSteps = [
    {
      title: "Welcome to Pathfinding Visualizer!",
      content: "Learn how different pathfinding algorithms work through interactive visualization.",
      action: "Next"
    },
    {
      title: "Setting Up the Grid",
      content: "Click and drag to draw walls. Use the toolbar to place start and end points.",
      action: "Try It"
    },
    {
      title: "Choose Algorithm",
      content: "Select an algorithm from the dropdown. Each one works differently!",
      action: "Try It"
    },
    {
      title: "Watch it Work",
      content: "Hit 'Start' to watch the algorithm find the shortest path!",
      action: "Got It"
    }
  ];

  const initializeGrid = useCallback(() => {
    const newGrid = [];
    for (let row = 0; row < gridSize.rows; row++) {
      const currentRow = [];
      for (let col = 0; col < gridSize.cols; col++) {
        currentRow.push({
          row,
          col,
          isWall: false,
          isStart: false,
          isEnd: false,
          isVisited: false,
          isPath: false,
          distance: Infinity,
          previousNode: null
        });
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
    setStartNode(null);
    setEndNode(null);
  }, [gridSize]);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  const handleMouseDown = (row, col) => {
    if (isRunning) return;
    setIsDrawing(true);
    updateNode(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (!isDrawing || isRunning) return;
    updateNode(row, col);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const updateNode = (row, col) => {
    const newGrid = [...grid];
    const node = newGrid[row][col];

    if (currentTool === 'wall') {
      if (!node.isStart && !node.isEnd) {
        node.isWall = !node.isWall;
      }
    } else if (currentTool === 'start') {
      if (startNode) {
        newGrid[startNode.row][startNode.col].isStart = false;
      }
      if (!node.isWall && !node.isEnd) {
        node.isStart = true;
        setStartNode({ row, col });
      }
    } else if (currentTool === 'end') {
      if (endNode) {
        newGrid[endNode.row][endNode.col].isEnd = false;
      }
      if (!node.isWall && !node.isStart) {
        node.isEnd = true;
        setEndNode({ row, col });
      }
    }

    setGrid(newGrid);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const dijkstra = async () => {
    if (!startNode || !endNode) return;
    setIsRunning(true);

    const newGrid = grid.map(row => 
      row.map(node => ({
        ...node,
        distance: Infinity,
        isVisited: false,
        isPath: false,
        previousNode: null
      }))
    );

    newGrid[startNode.row][startNode.col].distance = 0;
    const unvisitedNodes = getAllNodes(newGrid);

    while (unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      
      if (closestNode.distance === Infinity) break;
      if (closestNode.isWall) continue;

      closestNode.isVisited = true;
      setGrid([...newGrid]);
      await sleep(10);

      if (closestNode.row === endNode.row && closestNode.col === endNode.col) {
        await animatePath(newGrid, closestNode);
        setIsRunning(false);
        return;
      }

      updateUnvisitedNeighbors(closestNode, newGrid);
    }

    setIsRunning(false);
  };

  const getAllNodes = (grid) => {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  };

  const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  };

  const updateUnvisitedNeighbors = (node, grid) => {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  };

  const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
  };

  const animatePath = async (grid, endNode) => {
    const path = [];
    let currentNode = endNode;
    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }

    for (let i = 0; i < path.length; i++) {
      const node = path[i];
      node.isPath = true;
      setGrid([...grid]);
      await sleep(50);
    }
  };

  const handleNextTutorial = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setTutorial(false);
    }
  };

  return (
    <div className="game-container">
      <Link to="/games/categories/dsa" className="back-button">
        <IoArrowBack /> Back to Games
      </Link>

      {tutorial && (
        <div className="tutorial-overlay">
          <div className="tutorial-card">
            <h3>{tutorialSteps[tutorialStep].title}</h3>
            <p>{tutorialSteps[tutorialStep].content}</p>
            <button onClick={handleNextTutorial}>
              {tutorialSteps[tutorialStep].action}
            </button>
          </div>
        </div>
      )}

      <div className="visualizer-layout">
        <div className="visualizer-content">
          <div className="control-panel">
            <div className="tools">
              <button
                className={`game-button ${currentTool === 'wall' ? 'active' : ''}`}
                onClick={() => setCurrentTool('wall')}
                disabled={isRunning}
              >
                Draw Wall
              </button>
              <button
                className={`game-button ${currentTool === 'start' ? 'active' : ''}`}
                onClick={() => setCurrentTool('start')}
                disabled={isRunning}
              >
                Place Start
              </button>
              <button
                className={`game-button ${currentTool === 'end' ? 'active' : ''}`}
                onClick={() => setCurrentTool('end')}
                disabled={isRunning}
              >
                Place End
              </button>
            </div>

            <select
              className="game-select"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={isRunning}
            >
              <option value="dijkstra">Dijkstra's Algorithm</option>
              <option value="astar">A* Search</option>
              <option value="bfs">Breadth-First Search</option>
            </select>

            <button
              className="game-button primary"
              onClick={() => dijkstra()}
              disabled={isRunning || !startNode || !endNode}
            >
              {isRunning ? 'Running...' : 'Start'}
            </button>

            <button
              className="game-button"
              onClick={initializeGrid}
              disabled={isRunning}
            >
              Reset Grid
            </button>
          </div>

          <div 
            className="game-grid"
            onMouseLeave={() => setIsDrawing(false)}
          >
            {grid.map((row, rowIdx) => (
              <div key={rowIdx} className="row">
                {row.map((node, nodeIdx) => (
                  <div
                    key={nodeIdx}
                    className={`node ${
                      node.isStart ? 'start' :
                      node.isEnd ? 'end' :
                      node.isWall ? 'wall' :
                      node.isPath ? 'path' :
                      node.isVisited ? 'visited' : ''
                    }`}
                    onMouseDown={() => handleMouseDown(rowIdx, nodeIdx)}
                    onMouseEnter={() => handleMouseEnter(rowIdx, nodeIdx)}
                    onMouseUp={handleMouseUp}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="legend">
            <div className="legend-item">
              <div className="node start"></div>
              <span>Start Node</span>
            </div>
            <div className="legend-item">
              <div className="node end"></div>
              <span>Target Node</span>
            </div>
            <div className="legend-item">
              <div className="node wall"></div>
              <span>Wall Node</span>
            </div>
            <div className="legend-item">
              <div className="node visited"></div>
              <span>Visited Node</span>
            </div>
            <div className="legend-item">
              <div className="node path"></div>
              <span>Shortest Path</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathfindingVisualizer;
