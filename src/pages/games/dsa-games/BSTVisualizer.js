import React, { useState, useEffect, useRef, useCallback } from 'react';
import './BSTVisualizer.css';

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
    this.highlighted = false;
  }
}

const BSTVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [insertValue, setInsertValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [message, setMessage] = useState('');
  const [tutorial, setTutorial] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(0);
  const canvasRef = useRef(null);

  const tutorialSteps = [
    {
      title: "Welcome to BST Visualizer!",
      content: "Learn how Binary Search Trees work through interactive visualization.",
      action: "Next"
    },
    {
      title: "Adding Nodes",
      content: "Enter a number and click 'Insert' to add it to the tree. The tree will automatically balance itself.",
      action: "Try It"
    },
    {
      title: "Searching",
      content: "Enter a number in the search box to see how BST search works. Watch the traversal animation!",
      action: "Try It"
    },
    {
      title: "Tree Properties",
      content: "In a BST, left child is always smaller than parent, right child is always larger.",
      action: "Got It"
    }
  ];

  const calculateNodePositions = useCallback(() => {
    if (!root) return;

    const canvas = canvasRef.current;
    const verticalSpacing = 80;
    
    const height = (node) => {
      if (node === null) return 0;
      return Math.max(height(node.left), height(node.right)) + 1;
    };
    
    const treeHeight = height(root);
    const horizontalScale = Math.max(canvas.width / Math.pow(2, treeHeight), 50);

    const calculatePositions = (node, level, leftBound, rightBound) => {
      if (!node) return;

      const availableWidth = rightBound - leftBound;
      const position = leftBound + (availableWidth / 2);
      node.x = Math.max(horizontalScale / 2, position);
      node.y = level * verticalSpacing + 50;

      if (node.left) {
        calculatePositions(
          node.left, 
          level + 1, 
          leftBound, 
          position - horizontalScale/4
        );
      }
      if (node.right) {
        calculatePositions(
          node.right, 
          level + 1, 
          position + horizontalScale/4, 
          rightBound
        );
      }
    };

    calculatePositions(root, 1, 0, canvas.width);
  }, [root, canvasRef]);

  const drawTree = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const drawNode = (node) => {
      if (!node) return;
      
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      
      if (node.left) {
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.left.x, node.left.y);
      }
      if (node.right) {
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.right.x, node.right.y);
      }
      ctx.stroke();
      
      ctx.beginPath();
      ctx.fillStyle = node.highlighted ? '#0ea5e9' : 'rgba(30, 41, 59, 0.9)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = '#fff';
      ctx.font = '16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.value, node.x, node.y);
      
      drawNode(node.left);
      drawNode(node.right);
    };
    
    drawNode(root);
  }, [root]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const insert = async (value) => {
    const insertNode = async (node, value) => {
      if (node === null) {
        return new TreeNode(value);
      }

      node.highlighted = true;
      drawTree();
      await sleep(1000);
      node.highlighted = false;

      if (value < node.value) {
        node.left = await insertNode(node.left, value);
      } else if (value > node.value) {
        node.right = await insertNode(node.right, value);
      }

      return node;
    };

    const newRoot = await insertNode(root, parseInt(value));
    setRoot(newRoot);
    calculateNodePositions();
    drawTree();
    setMessage(`Inserted ${value}`);
  };

  const search = async (value) => {
    const searchNode = async (node, value) => {
      if (node === null) {
        setMessage(`Value ${value} not found`);
        return;
      }

      node.highlighted = true;
      drawTree();
      await sleep(1000);

      if (value === node.value) {
        setMessage(`Found ${value}!`);
      } else if (value < node.value) {
        node.highlighted = false;
        await searchNode(node.left, value);
      } else {
        node.highlighted = false;
        await searchNode(node.right, value);
      }

      node.highlighted = false;
      drawTree();
    };

    await searchNode(root, parseInt(value));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    if (root) {
      calculateNodePositions();
      drawTree();
    }
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [root, calculateNodePositions, drawTree]);

  const handleInsert = () => {
    if (insertValue) {
      insert(insertValue);
      setInsertValue('');
      if (tutorialStep === 1) setTutorialStep(2);
    }
  };

  const handleSearch = () => {
    if (searchValue) {
      search(searchValue);
      setSearchValue('');
      if (tutorialStep === 2) setTutorialStep(3);
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
    <div className="bst-container">
      <div className="controls">
        <div className="control-group">
          <input
            type="number"
            value={insertValue}
            onChange={(e) => setInsertValue(e.target.value)}
            placeholder="Enter value to insert"
          />
          <button onClick={handleInsert}>Insert</button>
        </div>
        <div className="control-group">
          <input
            type="number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter value to search"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <canvas ref={canvasRef} width={800} height={600}></canvas>
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
      {message && (
        <div className="message">
          {message}
        </div>
      )}
    </div>
  );
};

export default BSTVisualizer;
