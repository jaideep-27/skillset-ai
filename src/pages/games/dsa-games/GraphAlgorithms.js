import React, { useState, useRef, useEffect, useCallback } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { FiPlay, FiRotateCcw } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './GraphAlgorithms.css';
import CodeEditor from '../../../components/CodeEditor/CodeEditor';

const GraphAlgorithms = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [algorithm, setAlgorithm] = useState('bfs');
  const [message, setMessage] = useState('');
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [path, setPath] = useState([]);
  const [mode, setMode] = useState('add'); // 'add', 'connect', 'start', 'end'
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const context = canvas.getContext('2d');
    setCtx(context);
  }, []);

  // Draw function
  const drawGraph = useCallback(() => {
    if (!canvasRef.current || !ctx) return;
    
    const context = ctx;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw edges
    edges.forEach(edge => {
      const start = nodes[edge[0]];
      const end = nodes[edge[1]];
      if (!start || !end) return;

      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      
      if (path.some(p => (p[0] === edge[0] && p[1] === edge[1]) || (p[0] === edge[1] && p[1] === edge[0]))) {
        context.strokeStyle = '#4D61FC';
        context.lineWidth = 3;
      } else {
        context.strokeStyle = '#2a3a4a';
        context.lineWidth = 2;
      }
      context.stroke();
    });

    // Draw nodes
    nodes.forEach((node, index) => {
      context.beginPath();
      context.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      
      // Node fill color based on state
      if (index === startNode) {
        context.fillStyle = '#22C55E';
      } else if (index === endNode) {
        context.fillStyle = '#EF4444';
      } else if (visitedNodes.includes(index)) {
        context.fillStyle = '#4d61fc';
      } else if (index === selectedNode) {
        context.fillStyle = '#6366f1';
      } else {
        context.fillStyle = '#1a2333';
      }
      
      context.fill();
      context.strokeStyle = '#2a3a4a';
      context.lineWidth = 2;
      context.stroke();

      // Draw node number
      context.fillStyle = '#fff';
      context.font = '14px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(index.toString(), node.x, node.y);
    });
  }, [nodes, edges, selectedNode, startNode, endNode, visitedNodes, path, ctx]);

  useEffect(() => {
    if (ctx) drawGraph();
  }, [nodes, edges, drawGraph, ctx]);

  const getClickedNode = (x, y) => {
    return nodes.findIndex(node => 
      Math.sqrt(Math.pow(node.x - x, 2) + Math.pow(node.y - y, 2)) < 20
    );
  };

  const handleCanvasClick = (e) => {
    if (isAnimating) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedNode = getClickedNode(x, y);

    if (clickedNode !== -1) {
      switch (mode) {
        case 'add':
          setSelectedNode(selectedNode === clickedNode ? null : clickedNode);
          break;
        case 'connect':
          if (selectedNode === null) {
            setSelectedNode(clickedNode);
            setMessage('Select second node to connect');
          } else {
            if (selectedNode !== clickedNode && 
                !edges.some(edge => 
                  (edge[0] === selectedNode && edge[1] === clickedNode) || 
                  (edge[0] === clickedNode && edge[1] === selectedNode)
                )) {
              setEdges([...edges, [selectedNode, clickedNode]]);
              setMessage('Edge created');
            }
            setSelectedNode(null);
          }
          break;
        case 'start':
          setStartNode(clickedNode);
          setMode('add');
          setMessage('Start node set');
          break;
        case 'end':
          setEndNode(clickedNode);
          setMode('add');
          setMessage('End node set');
          break;
        default:
          // No action needed for unknown modes
          break;
      }
    } else if (mode === 'add') {
      const newNodeIndex = nodes.length;
      setNodes([...nodes, { x, y }]);
      setMessage(`Node ${newNodeIndex} added`);
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const bfs = async () => {
    if (startNode === null || endNode === null) {
      setMessage('Please set both start and end nodes');
      return;
    }

    setIsAnimating(true);
    setVisitedNodes([]);
    setPath([]);

    const queue = [[startNode]];
    const visited = new Set([startNode]);
    
    while (queue.length > 0) {
      const currentPath = queue.shift();
      const current = currentPath[currentPath.length - 1];
      
      setVisitedNodes(Array.from(visited));
      await sleep(500);

      if (current === endNode) {
        const pathEdges = [];
        for (let i = 0; i < currentPath.length - 1; i++) {
          pathEdges.push([currentPath[i], currentPath[i + 1]]);
        }
        setPath(pathEdges);
        setMessage('Path found!');
        setIsAnimating(false);
        return;
      }

      const neighbors = edges
        .filter(edge => edge[0] === current || edge[1] === current)
        .map(edge => edge[0] === current ? edge[1] : edge[0]);

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...currentPath, neighbor]);
        }
      }
    }

    setMessage('No path found');
    setIsAnimating(false);
  };

  const dfs = async () => {
    if (startNode === null || endNode === null) {
      setMessage('Please set both start and end nodes');
      return;
    }

    setIsAnimating(true);
    setVisitedNodes([]);
    setPath([]);

    const visited = new Set();
    const pathStack = [];
    
    const dfsRecursive = async (current) => {
      if (visited.has(current)) return false;
      
      visited.add(current);
      pathStack.push(current);
      setVisitedNodes(Array.from(visited));
      await sleep(500);

      if (current === endNode) {
        const pathEdges = [];
        for (let i = 0; i < pathStack.length - 1; i++) {
          pathEdges.push([pathStack[i], pathStack[i + 1]]);
        }
        setPath(pathEdges);
        return true;
      }

      const neighbors = edges
        .filter(edge => edge[0] === current || edge[1] === current)
        .map(edge => edge[0] === current ? edge[1] : edge[0]);

      for (const neighbor of neighbors) {
        if (await dfsRecursive(neighbor)) {
          return true;
        }
      }

      pathStack.pop();
      return false;
    };

    const found = await dfsRecursive(startNode);
    setMessage(found ? 'Path found!' : 'No path found');
    setIsAnimating(false);
  };

  const handleReset = () => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setStartNode(null);
    setEndNode(null);
    setVisitedNodes([]);
    setPath([]);
    setMessage('');
    setMode('add');
    setIsAnimating(false);
  };

  const runAlgorithm = () => {
    if (algorithm === 'bfs') {
      bfs();
    } else {
      dfs();
    }
  };

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <Link to="/games" className="visualizer-back-button">
          <IoArrowBack />
          Back to games
        </Link>
        <h1>
          <span className="icon">🔍</span>
          Graph Traversal
        </h1>
      </div>

      <div className="visualizer-layout">
        <div className="visualizer-sidebar">
          <div className="sidebar-content">
            <div className="info-section">
              <h3>Graph Traversal</h3>
              <p>
                Visualize different graph traversal algorithms and pathfinding
                techniques in action.
              </p>
              <div className="rules">
                <div className="rule">
                  <span className="bullet">•</span>
                  Use the buttons below to select your action
                </div>
                <div className="rule">
                  <span className="bullet">•</span>
                  Add nodes by clicking in empty space
                </div>
                <div className="rule">
                  <span className="bullet">•</span>
                  Connect nodes by selecting them in sequence
                </div>
              </div>
            </div>

            <div className="mode-buttons">
              <button 
                onClick={() => {
                  setMode('add');
                  setSelectedNode(null);
                  setMessage('Click in empty space to add nodes');
                }} 
                className={`mode-button ${mode === 'add' ? 'active' : ''}`}
                disabled={isAnimating}
              >
                Add Nodes
              </button>
              <button 
                onClick={() => {
                  setMode('connect');
                  setSelectedNode(null);
                  setMessage('Select first node to connect');
                }} 
                className={`mode-button ${mode === 'connect' ? 'active' : ''}`}
                disabled={isAnimating}
              >
                Connect Nodes
              </button>
              <button 
                onClick={() => {
                  setMode('start');
                  setSelectedNode(null);
                  setMessage('Select a node as start');
                }} 
                className={`mode-button ${mode === 'start' ? 'active' : ''}`}
                disabled={isAnimating}
              >
                Set Start Node
              </button>
              <button 
                onClick={() => {
                  setMode('end');
                  setSelectedNode(null);
                  setMessage('Select a node as end');
                }} 
                className={`mode-button ${mode === 'end' ? 'active' : ''}`}
                disabled={isAnimating}
              >
                Set End Node
              </button>
            </div>

            <div className="control-group">
              <select 
                value={algorithm} 
                onChange={(e) => setAlgorithm(e.target.value)}
                className="algorithm-select"
              >
                <option value="bfs">Breadth First Search</option>
                <option value="dfs">Depth First Search</option>
              </select>
            </div>

            <div className="action-buttons">
              <button 
                onClick={runAlgorithm} 
                className="action-button primary"
                disabled={isAnimating}
              >
                <FiPlay /> Run Algorithm
              </button>
              <button 
                onClick={handleReset} 
                className="action-button secondary"
                disabled={isAnimating}
              >
                <FiRotateCcw /> Reset Graph
              </button>
            </div>

            {message && <div className="message">{message}</div>}
          </div>
        </div>

        <div className="visualizer-main">
          <div className="graph-container">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="graph-canvas"
            />
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

export default GraphAlgorithms;
