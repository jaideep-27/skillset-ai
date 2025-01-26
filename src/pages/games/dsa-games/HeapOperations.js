import React, { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { FiPlus, FiMinus, FiRotateCcw } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './HeapOperations.css';
import CodeEditor from '../../../components/CodeEditor/CodeEditor';

const HeapOperations = () => {
  const [heap, setHeap] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [animatingNodes, setAnimatingNodes] = useState([]);

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

    const newHeap = [...heap];
    newHeap.push(value);
    heapifyUp(newHeap, newHeap.length - 1);
    
    setHeap(newHeap);
    setInputValue('');
    setMessage(`Inserted ${value}`);
    setAnimatingNodes([newHeap.length - 1]);

    setTimeout(() => {
      setAnimatingNodes([]);
    }, 1000);
  };

  const handleExtractMin = () => {
    if (heap.length === 0) {
      setMessage('Heap is empty');
      return;
    }

    const newHeap = [...heap];
    const min = newHeap[0];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();
    
    if (newHeap.length > 0) {
      heapifyDown(newHeap, 0);
    }
    
    setHeap(newHeap);
    setMessage(`Extracted minimum value: ${min}`);
  };

  const heapifyUp = (heap, index) => {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (heap[parentIndex] > heap[index]) {
        [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];
        index = parentIndex;
      } else {
        break;
      }
    }
  };

  const heapifyDown = (heap, index) => {
    const length = heap.length;
    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (leftChild < length && heap[leftChild] < heap[smallest]) {
        smallest = leftChild;
      }
      if (rightChild < length && heap[rightChild] < heap[smallest]) {
        smallest = rightChild;
      }

      if (smallest !== index) {
        [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
        index = smallest;
      } else {
        break;
      }
    }
  };

  const handleReset = () => {
    setHeap([]);
    setInputValue('');
    setMessage('');
    setAnimatingNodes([]);
  };

  const renderEdges = () => {
    return heap.map((_, index) => {
      // Fixed spacing values from the image
      const getNodePosition = (idx) => {
        const level = Math.floor(Math.log2(idx + 1));
        const y = level * 80;
        
        if (idx === 0) return { x: 0, y };
        
        const isRight = (idx % 2 === 1);
        const parentIdx = Math.floor((idx - 1) / 2);
        const parentPos = getNodePosition(parentIdx);
        
        // Level-based horizontal offset
        const offset = level === 1 ? 120 : 60;
        const x = parentPos.x + (isRight ? offset : -offset);
        
        return { x, y };
      };

      const pos = getNodePosition(index);
      const parentIdx = index === 0 ? -1 : Math.floor((index - 1) / 2);
      
      return (
        <g key={`edges-${index}`}>
          {index > 0 && (
            <line
              x1={getNodePosition(parentIdx).x}
              y1={getNodePosition(parentIdx).y}
              x2={pos.x}
              y2={pos.y}
              className="heap-edge"
            />
          )}
        </g>
      );
    });
  };

  const renderNodes = () => {
    return heap.map((value, index) => {
      const pos = (() => {
        const level = Math.floor(Math.log2(index + 1));
        const y = level * 80;
        
        if (index === 0) return { x: 0, y };
        
        const isRight = (index % 2 === 1);
        const parentIdx = Math.floor((index - 1) / 2);
        const parentLevel = Math.floor(Math.log2(parentIdx + 1));
        const parentX = parentIdx === 0 ? 0 : 
          (parentIdx % 2 === 1 ? 120 : -120) / Math.pow(1.5, parentLevel - 1);
        
        const offset = level === 1 ? 120 : 60;
        const x = parentX + (isRight ? offset : -offset) / Math.pow(1.5, level - 1);
        
        return { x, y };
      })();

      const isAnimating = animatingNodes.includes(index);

      return (
        <g key={`node-${index}`}>
          <circle
            cx={pos.x}
            cy={pos.y}
            r={25}
            className={`heap-node ${isAnimating ? 'animated' : ''}`}
          />
          <text
            x={pos.x}
            y={pos.y}
            className="node-text"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {value}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="visualizer-container">
      <div className="visualizer-header">
        <Link to="/games" className="visualizer-back-button">
          <IoArrowBack />
          Back to games
        </Link>
        <h1>
          <span className="icon">📊</span>
          Heap Operations
        </h1>
      </div>

      <div className="visualizer-layout">
        <div className="visualizer-sidebar">
          <div className="info-section">
            <h3>Min Heap</h3>
            <p>
              A min heap is a complete binary tree where each node's value is smaller
              than or equal to its children's values.
            </p>
            <div className="rules">
              <div className="rule">
                <span className="bullet">•</span>
                Root is the smallest element
              </div>
              <div className="rule">
                <span className="bullet">•</span>
                Parent is smaller than children
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

            <div className="action-buttons">
              <button onClick={handleInsert} className="action-button primary">
                <FiPlus /> Insert
              </button>
              <button onClick={handleExtractMin} className="action-button primary">
                <FiMinus /> Extract Min
              </button>
              <button onClick={handleReset} className="action-button secondary">
                <FiRotateCcw /> Reset Heap
              </button>
            </div>

            {message && <div className="message">{message}</div>}
          </div>
        </div>

        <div className="visualizer-main">
          <div className="heap-container">
            <svg width="100%" height="100%" viewBox="0 0 800 400">
              <g transform="translate(400, 60)">
                {renderEdges()}
                {renderNodes()}
              </g>
            </svg>
          </div>
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
  );
};

export default HeapOperations;
