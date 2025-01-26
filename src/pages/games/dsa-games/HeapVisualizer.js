import React, { useState, useEffect, useRef, useCallback } from 'react';
import './HeapVisualizer.css';
import { Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const HeapVisualizer = () => {
  const [heap, setHeap] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [isMaxHeap, setIsMaxHeap] = useState(true);
  const [tutorial, setTutorial] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const canvasRef = useRef(null);

  const tutorialSteps = [
    {
      title: "Welcome to Heap Visualizer!",
      content: "Learn how Binary Heaps work through interactive visualization.",
      action: "Next"
    },
    {
      title: "Adding Elements",
      content: "Enter a number and click 'Insert' to add it to the heap. Watch how it bubbles up to maintain the heap property.",
      action: "Try It"
    },
    {
      title: "Extracting Elements",
      content: "Click 'Extract' to remove the root element. Watch how the heap reorganizes itself.",
      action: "Try It"
    },
    {
      title: "Max vs Min Heap",
      content: "Toggle between Max and Min heap to see how the ordering changes.",
      action: "Got It"
    }
  ];

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const compare = (a, b) => isMaxHeap ? a > b : a < b;

  const insert = async (value) => {
    if (animating) return;
    setAnimating(true);
    
    const newHeap = [...heap, value];
    let currentIdx = newHeap.length - 1;
    
    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);
      if (compare(newHeap[currentIdx], newHeap[parentIdx])) {
        [newHeap[currentIdx], newHeap[parentIdx]] = [newHeap[parentIdx], newHeap[currentIdx]];
        currentIdx = parentIdx;
        setHeap([...newHeap]);
        await sleep(500);
      } else {
        break;
      }
    }
    
    setHeap(newHeap);
    setMessage(`Inserted ${value}`);
    setAnimating(false);

    if (tutorialStep === 1) setTutorialStep(2);
  };

  const extractRoot = async () => {
    if (animating || heap.length === 0) return;
    setAnimating(true);

    const newHeap = [...heap];
    const extractedValue = newHeap[0];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();
    
    let currentIdx = 0;
    
    while (true) {
      let leftIdx = 2 * currentIdx + 1;
      let rightIdx = 2 * currentIdx + 2;
      let swapIdx = currentIdx;
      
      if (leftIdx < newHeap.length && compare(newHeap[leftIdx], newHeap[swapIdx])) {
        swapIdx = leftIdx;
      }
      
      if (rightIdx < newHeap.length && compare(newHeap[rightIdx], newHeap[swapIdx])) {
        swapIdx = rightIdx;
      }
      
      if (swapIdx === currentIdx) break;
      
      [newHeap[currentIdx], newHeap[swapIdx]] = [newHeap[swapIdx], newHeap[currentIdx]];
      currentIdx = swapIdx;
      setHeap([...newHeap]);
      await sleep(500);
    }
    
    setHeap(newHeap);
    setMessage(`Extracted ${extractedValue}`);
    setAnimating(false);

    if (tutorialStep === 2) setTutorialStep(3);
  };

  const drawHeap = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (heap.length === 0) return;

    const nodeRadius = 25;
    const levelHeight = 80;
    const drawNode = (idx, x, y) => {
      // Draw edges to children
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      
      if (leftIdx < heap.length) {
        const childX = x - Math.pow(2, Math.floor(Math.log2(heap.length - leftIdx))) * 40;
        const childY = y + levelHeight;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(childX, childY);
        ctx.stroke();
        drawNode(leftIdx, childX, childY);
      }
      
      if (rightIdx < heap.length) {
        const childX = x + Math.pow(2, Math.floor(Math.log2(heap.length - rightIdx))) * 40;
        const childY = y + levelHeight;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(childX, childY);
        ctx.stroke();
        drawNode(rightIdx, childX, childY);
      }

      // Draw node
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#00B4DB';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.stroke();

      // Draw value
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(heap[idx], x, y);
    };

    // Start drawing from root
    const startX = canvas.width / 2;
    const startY = 50;
    drawNode(0, startX, startY);
  }, [heap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawHeap();
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [drawHeap]);

  const handleInsert = (e) => {
    e.preventDefault();
    if (inputValue && !animating) {
      insert(parseInt(inputValue));
      setInputValue('');
    }
  };

  const toggleHeapType = () => {
    if (animating) return;
    setIsMaxHeap(!isMaxHeap);
    const newHeap = [];
    // Reinsert all elements to maintain heap property
    [...heap].forEach(value => {
      let currentIdx = newHeap.length;
      newHeap.push(value);
      while (currentIdx > 0) {
        const parentIdx = Math.floor((currentIdx - 1) / 2);
        if (isMaxHeap ? newHeap[currentIdx] < newHeap[parentIdx] : newHeap[currentIdx] > newHeap[parentIdx]) {
          [newHeap[currentIdx], newHeap[parentIdx]] = [newHeap[parentIdx], newHeap[currentIdx]];
          currentIdx = parentIdx;
        } else {
          break;
        }
      }
    });
    setHeap(newHeap);
  };

  const handleNextTutorial = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setTutorial(false);
    }
  };

  return (
    <div className="heap-visualizer">
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
        <div className="controls">
          <div className="control-group">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a number"
            />
            <button onClick={handleInsert}>Insert</button>
            <button onClick={extractRoot}>Extract {isMaxHeap ? 'Max' : 'Min'}</button>
          </div>
          <button onClick={toggleHeapType}>Switch to {isMaxHeap ? 'Min' : 'Max'} Heap</button>
        </div>
        <div className="heap-container">
          <canvas ref={canvasRef} className="heap-canvas" />
        </div>
      </div>

      {message && (
        <div className="message">
          {message}
        </div>
      )}
    </div>
  );
};

export default HeapVisualizer;
