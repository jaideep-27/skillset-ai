import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiPlay, FiPause, FiRefreshCw, FiBarChart2 } from 'react-icons/fi';
import './SortingVisualizer.css';

const ALGORITHMS = {
  BUBBLE: 'Bubble Sort',
  QUICK: 'Quick Sort',
  MERGE: 'Merge Sort',
  HEAP: 'Heap Sort',
  INSERTION: 'Insertion Sort'
};

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [size, setSize] = useState(50);
  const [algorithm, setAlgorithm] = useState(ALGORITHMS.BUBBLE);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const resetArray = useCallback(() => {
    const newArray = Array.from({ length: size }, () => 
      Math.floor(Math.random() * (300 - 20) + 20)
    );
    setArray(newArray);
    setComparisons(0);
    setSwaps(0);
  }, [size]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const highlightBars = async (indices, color = '#FF6B9C') => {
    const bars = document.getElementsByClassName('bar');
    indices.forEach(i => {
      if (bars[i]) bars[i].style.backgroundColor = color;
    });
    await sleep(1000 - speed * 9);
    indices.forEach(i => {
      if (bars[i]) bars[i].style.backgroundColor = '#4D61FC';
    });
  };

  const bubbleSort = async () => {
    setSorting(true);
    let arr = [...array];
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (isPaused) {
          await new Promise(resolve => {
            const checkPause = setInterval(() => {
              if (!isPaused) {
                clearInterval(checkPause);
                resolve();
              }
            }, 100);
          });
        }

        setComparisons(prev => prev + 1);
        await highlightBars([j, j + 1]);
        
        if (arr[j] > arr[j + 1]) {
          setSwaps(prev => prev + 1);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(speed);
        }
      }
    }
    
    setSorting(false);
  };

  const quickSort = async (arr = [...array], left = 0, right = array.length - 1) => {
    if (left >= right) return;

    const partition = async (l, r) => {
      const pivot = arr[r];
      let i = l - 1;

      for (let j = l; j < r; j++) {
        if (isPaused) {
          await new Promise(resolve => {
            const checkPause = setInterval(() => {
              if (!isPaused) {
                clearInterval(checkPause);
                resolve();
              }
            }, 100);
          });
        }

        setComparisons(prev => prev + 1);
        await highlightBars([j, r], '#22C55E');

        if (arr[j] <= pivot) {
          i++;
          setSwaps(prev => prev + 1);
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
          await sleep(speed);
        }
      }

      setSwaps(prev => prev + 1);
      [arr[i + 1], arr[r]] = [arr[r], arr[i + 1]];
      setArray([...arr]);
      await sleep(speed);

      return i + 1;
    };

    const pi = await partition(left, right);
    await quickSort(arr, left, pi - 1);
    await quickSort(arr, pi + 1, right);
  };

  const mergeSort = async (arr = [...array], start = 0, end = array.length - 1) => {
    if (start >= end) return;

    const middle = Math.floor((start + end) / 2);
    await mergeSort(arr, start, middle);
    await mergeSort(arr, middle + 1, end);

    const leftArray = arr.slice(start, middle + 1);
    const rightArray = arr.slice(middle + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < leftArray.length && j < rightArray.length) {
      if (isPaused) {
        await new Promise(resolve => {
          const checkPause = setInterval(() => {
            if (!isPaused) {
              clearInterval(checkPause);
              resolve();
            }
          }, 100);
        });
      }

      setComparisons(prev => prev + 1);
      await highlightBars([k, k + 1], '#22C55E');

      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      setSwaps(prev => prev + 1);
      setArray([...arr]);
      await sleep(speed);
      k++;
    }

    while (i < leftArray.length) {
      arr[k] = leftArray[i];
      setArray([...arr]);
      await sleep(speed);
      i++;
      k++;
    }

    while (j < rightArray.length) {
      arr[k] = rightArray[j];
      setArray([...arr]);
      await sleep(speed);
      j++;
      k++;
    }
  };

  const startSorting = async () => {
    setSorting(true);
    setIsPaused(false);

    switch (algorithm) {
      case ALGORITHMS.BUBBLE:
        await bubbleSort();
        break;
      case ALGORITHMS.QUICK:
        await quickSort();
        break;
      case ALGORITHMS.MERGE:
        await mergeSort();
        break;
      default:
        break;
    }

    setSorting(false);
  };

  return (
    <div className="sorting-visualizer-new">
      <div className="visualizer-header">
        <Link to="/games/categories/dsa" className="visualizer-back-button">
          <FiArrowLeft /> Back to games
        </Link>
        <h1><FiBarChart2 /> Sorting Visualizer</h1>
      </div>

      <div className="visualizer-layout">
        <div className="visualizer-sidebar">
          <div className="sidebar-content">
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={sorting}
              className="algorithm-select"
            >
              {Object.values(ALGORITHMS).map(algo => (
                <option key={algo} value={algo}>{algo}</option>
              ))}
            </select>

            <div className="slider-group">
              <label>Size: {size}</label>
              <input
                type="range"
                min="10"
                max="100"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                disabled={sorting}
              />
            </div>

            <div className="slider-group">
              <label>Speed: {speed}x</label>
              <input
                type="range"
                min="1"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
              />
            </div>

            <div className="visualizer-stats">
              <div className="stat-item">
                <label>Comparisons:</label>
                <span>{comparisons}</span>
              </div>
              <div className="stat-item">
                <label>Swaps:</label>
                <span>{swaps}</span>
              </div>
            </div>

            <div className="visualizer-actions">
              <button 
                className="action-button primary"
                onClick={sorting ? () => setIsPaused(!isPaused) : startSorting}
                disabled={sorting && !algorithm}
              >
                {sorting ? (
                  isPaused ? <><FiPlay /> Resume</> : <><FiPause /> Pause</>
                ) : (
                  <><FiPlay /> Start</>
                )}
              </button>

              <button
                className="action-button secondary"
                onClick={resetArray}
                disabled={sorting}
              >
                <FiRefreshCw /> New Array
              </button>
            </div>
          </div>
        </div>

        <div className="visualizer-main">
          <div className="bars-container">
            {array.map((value, idx) => (
              <div
                className="bar"
                key={idx}
                style={{
                  height: `${value}px`,
                  width: `${Math.max(2, Math.floor(800 / size))}px`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
