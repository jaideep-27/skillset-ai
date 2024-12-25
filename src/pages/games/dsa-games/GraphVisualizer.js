import React, { useState, useEffect, useRef, useCallback } from 'react';
import './GraphVisualizer.css';

const GraphVisualizer = () => {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dfs');
  const [isRunning, setIsRunning] = useState(false);
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    edges.forEach(edge => {
      const start = nodes[edge[0]];
      const end = nodes[edge[1]];
      
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach((node, index) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      
      if (visitedNodes.has(index)) {
        ctx.fillStyle = '#4CAF50';
      } else if (selectedNode === index) {
        ctx.fillStyle = '#2196F3';
      } else {
        ctx.fillStyle = '#00B4DB';
      }
      
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw node number
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(index.toString(), node.x, node.y);
    });
  }, [nodes, edges, visitedNodes, selectedNode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawGraph();
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [drawGraph]);

  const addNode = (event) => {
    if (isRunning) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setNodes([...nodes, { x, y }]);
  };

  const addEdge = (start, end) => {
    if (start !== end && !edges.some(edge => 
      (edge[0] === start && edge[1] === end) || 
      (edge[0] === end && edge[1] === start)
    )) {
      setEdges([...edges, [start, end]]);
    }
  };

  const handleNodeClick = (event) => {
    if (isRunning) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedNode = nodes.findIndex(node => 
      Math.sqrt((node.x - x) ** 2 + (node.y - y) ** 2) < 20
    );

    if (clickedNode !== -1) {
      if (selectedNode === null) {
        setSelectedNode(clickedNode);
      } else {
        addEdge(selectedNode, clickedNode);
        setSelectedNode(null);
      }
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const dfs = async (startNode, visited = new Set()) => {
    if (visited.has(startNode)) return;
    
    visited.add(startNode);
    setVisitedNodes(new Set(visited));
    await sleep(1000);

    const neighbors = edges
      .filter(edge => edge[0] === startNode || edge[1] === startNode)
      .map(edge => edge[0] === startNode ? edge[1] : edge[0]);

    for (const neighbor of neighbors) {
      await dfs(neighbor, visited);
    }
  };

  const bfs = async (startNode) => {
    const visited = new Set();
    const queue = [startNode];
    
    while (queue.length > 0) {
      const node = queue.shift();
      if (visited.has(node)) continue;
      
      visited.add(node);
      setVisitedNodes(new Set(visited));
      await sleep(1000);

      const neighbors = edges
        .filter(edge => edge[0] === node || edge[1] === node)
        .map(edge => edge[0] === node ? edge[1] : edge[0]);

      queue.push(...neighbors.filter(n => !visited.has(n)));
    }
  };

  const runAlgorithm = async () => {
    if (nodes.length === 0) return;
    
    setIsRunning(true);
    setVisitedNodes(new Set());
    
    if (selectedAlgorithm === 'dfs') {
      await dfs(0);
    } else {
      await bfs(0);
    }
    
    setIsRunning(false);
  };

  const resetGraph = () => {
    if (isRunning) return;
    setNodes([]);
    setEdges([]);
    setVisitedNodes(new Set());
    setSelectedNode(null);
  };

  return (
    <div className="graph-visualizer">
      <div className="controls">
        <select 
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
          disabled={isRunning}
        >
          <option value="dfs">Depth-First Search</option>
          <option value="bfs">Breadth-First Search</option>
        </select>
        
        <button onClick={runAlgorithm} disabled={isRunning || nodes.length === 0}>
          {isRunning ? 'Running...' : 'Run Algorithm'}
        </button>
        
        <button onClick={resetGraph} disabled={isRunning}>
          Reset Graph
        </button>
      </div>

      <div className="instructions">
        <p>Click on the canvas to add nodes</p>
        <p>Click two nodes in sequence to add an edge between them</p>
      </div>

      <canvas
        ref={canvasRef}
        className="graph-canvas"
        onClick={(e) => {
          handleNodeClick(e);
          if (!selectedNode) addNode(e);
        }}
      />
    </div>
  );
};

export default GraphVisualizer;
