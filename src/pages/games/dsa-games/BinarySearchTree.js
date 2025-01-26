import React, { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { FiPlus, FiRotateCcw, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import CodeEditor from '../../../components/CodeEditor/CodeEditor';
import './BinarySearchTree.css';

const BinarySearchTree = () => {
  const [tree, setTree] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [highlightedPath, setHighlightedPath] = useState([]);

  class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.x = 0;
      this.y = 0;
      this.level = 0;
    }
  }

  class BST {
    constructor() {
      this.root = null;
    }

    insert(value) {
      const newNode = new TreeNode(value);
      if (!this.root) {
        this.root = newNode;
        return [newNode];
      }

      let current = this.root;
      const path = [current];

      while (true) {
        if (value < current.value) {
          if (!current.left) {
            current.left = newNode;
            path.push(current.left);
            break;
          }
          current = current.left;
        } else {
          if (!current.right) {
            current.right = newNode;
            path.push(current.right);
            break;
          }
          current = current.right;
        }
        path.push(current);
      }

      return path;
    }

    search(value) {
      let current = this.root;
      const path = [];

      while (current) {
        path.push(current);
        if (value === current.value) {
          return path;
        }
        if (value < current.value) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
      return null;
    }

    calculatePositions(node = this.root, level = 0, x = 0, width = 600) {
      if (!node) return;

      const padding = Math.max(width / Math.pow(2, level + 2), 50);
      node.level = level;
      node.y = level * 80;

      if (!node.left && !node.right) {
        node.x = x;
        return;
      }

      if (node.left) {
        this.calculatePositions(node.left, level + 1, x - padding, width);
      }
      node.x = x;
      if (node.right) {
        this.calculatePositions(node.right, level + 1, x + padding, width);
      }
    }
  }

  useEffect(() => {
    const bst = new BST();
    setTree(bst);
  }, []);

  const handleInsert = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value');
      return;
    }

    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setMessage('Please enter a valid number');
      return;
    }

    const path = tree.insert(value);
    tree.calculatePositions();
    const newTree = new BST();
    newTree.root = tree.root;
    setTree(newTree);
    setInputValue('');
    setHighlightedPath(path);
    setMessage(`Inserted ${value}`);

    setTimeout(() => {
      setHighlightedPath([]);
    }, 1500);
  };

  const handleSearch = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value to search');
      return;
    }

    const value = parseInt(inputValue);
    if (isNaN(value)) {
      setMessage('Please enter a valid number');
      return;
    }

    const path = tree.search(value);
    if (path) {
      setHighlightedPath(path);
      setMessage(`Found ${value}!`);
      // Clear highlight after animation
      setTimeout(() => {
        setHighlightedPath([]);
        setMessage('');
      }, 1500);
    } else {
      setMessage(`${value} not found in the tree`);
      setHighlightedPath([]);
      // Clear message after delay
      setTimeout(() => {
        setMessage('');
      }, 1500);
    }
    setInputValue('');
  };

  const handleReset = () => {
    setTree(new BST());
    setInputValue('');
    setMessage('Tree reset');
    setHighlightedPath([]);
  };

  const renderNode = (node) => {
    if (!node) return null;

    const isHighlighted = highlightedPath && highlightedPath.includes(node);
    const nodeClass = `tree-node ${isHighlighted ? 'highlighted' : ''}`;

    return (
      <g key={node.value}>
        {node.left && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.left.x}
            y2={node.left.y}
            className={`tree-edge ${isHighlighted && highlightedPath.includes(node.left) ? 'highlighted' : ''}`}
          />
        )}
        {node.right && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.right.x}
            y2={node.right.y}
            className={`tree-edge ${isHighlighted && highlightedPath.includes(node.right) ? 'highlighted' : ''}`}
          />
        )}
        <circle
          cx={node.x}
          cy={node.y}
          r={25}
          className={nodeClass}
        />
        <text
          x={node.x}
          y={node.y}
          className="node-text"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {node.value}
        </text>
        {renderNode(node.left)}
        {renderNode(node.right)}
      </g>
    );
  };

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <Link to="/games" className="visualizer-back-button">
          <IoArrowBack />
          Back to games
        </Link>
        <h1>
          <span className="icon">🌳</span>
          Binary Search Tree
        </h1>
      </div>

      <div className="visualizer-layout">
        <div className="visualizer-sidebar">
          <div className="sidebar-content">
            <div className="info-section">
              <h3>BST Operations</h3>
              <p>
                A Binary Search Tree is a binary tree where each node's left subtree
                contains only nodes with values less than the node's value, and the
                right subtree contains only nodes with values greater than the node's
                value.
              </p>
              <div className="rules">
                <div className="rule">
                  <span className="bullet">•</span>
                  Left child is always smaller than parent
                </div>
                <div className="rule">
                  <span className="bullet">•</span>
                  Right child is always larger than parent
                </div>
                <div className="rule">
                  <span className="bullet">•</span>
                  No duplicate values allowed
                </div>
              </div>
            </div>

            <div className="control-group">
              <div className="input-group">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a number..."
                  className="number-input"
                />
              </div>
            </div>

            <div className="action-buttons">
              <button onClick={handleInsert} className="action-button primary">
                <FiPlus /> Insert
              </button>
              <button onClick={handleSearch} className="action-button primary">
                <FiSearch /> Search
              </button>
              <button onClick={handleReset} className="action-button secondary">
                <FiRotateCcw /> Reset Tree
              </button>
            </div>

            {message && <div className="message">{message}</div>}
          </div>
        </div>

        <div className="visualizer-main">
          <div className="tree-container">
            <svg width="100%" height="100%" viewBox="-300 -20 600 400">
              <g transform="translate(0,40)">
                {tree && tree.root && renderNode(tree.root)}
              </g>
            </svg>
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

export default BinarySearchTree;