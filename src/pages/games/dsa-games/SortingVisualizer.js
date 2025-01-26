import React, { useState, useEffect, useCallback } from 'react';
<<<<<<< HEAD
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
=======
import './SortingVisualizer.css';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [size, setSize] = useState(30);

  const resetArray = useCallback(() => {
    const newArray = [];
    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 500) + 5);
    }
    setArray(newArray);
    setCompleted(false);
>>>>>>> b070a1a0eaea0899fa172ab27c6f5a1d84d0419f
  }, [size]);

  useEffect(() => {
    resetArray();
<<<<<<< HEAD
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
=======
  }, [resetArray, size]);

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
>>>>>>> b070a1a0eaea0899fa172ab27c6f5a1d84d0419f
  };

  const bubbleSort = async () => {
    setSorting(true);
    let arr = [...array];
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
<<<<<<< HEAD
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
=======
        if (arr[j] > arr[j + 1]) {
          // Swap elements
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          
>>>>>>> b070a1a0eaea0899fa172ab27c6f5a1d84d0419f
          setArray([...arr]);
          await sleep(speed);
        }
      }
    }
    
<<<<<<< HEAD
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
=======
    setCompleted(true);
    setSorting(false);
  };

  const quickSort = async () => {
    setSorting(true);
    let arr = [...array];
    
    const partition = async (low, high) => {
      let pivot = arr[high];
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
>>>>>>> b070a1a0eaea0899fa172ab27c6f5a1d84d0419f
          setArray([...arr]);
          await sleep(speed);
        }
      }
<<<<<<< HEAD

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

=======
      
      let temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      setArray([...arr]);
      await sleep(speed);
      
      return i + 1;
    };
    
    const sort = async (low, high) => {
      if (low < high) {
        let pi = await partition(low, high);
        await sort(low, pi - 1);
        await sort(pi + 1, high);
      }
    };
    
    await sort(0, arr.length - 1);
    setCompleted(true);
    setSorting(false);
  };

  const mergeSort = async () => {
    setSorting(true);
    let arr = [...array];
    
    const merge = async (l, m, r) => {
      let n1 = m - l + 1;
      let n2 = r - m;
      let L = new Array(n1);
      let R = new Array(n2);
      
      for (let i = 0; i < n1; i++)
        L[i] = arr[l + i];
      for (let j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
      
      let i = 0, j = 0, k = l;
      
      while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        setArray([...arr]);
        await sleep(speed);
        k++;
      }
      
      while (i < n1) {
        arr[k] = L[i];
        setArray([...arr]);
        await sleep(speed);
        i++;
        k++;
      }
      
      while (j < n2) {
        arr[k] = R[j];
        setArray([...arr]);
        await sleep(speed);
        j++;
        k++;
      }
    };
    
    const sort = async (l, r) => {
      if (l < r) {
        let m = Math.floor((l + r) / 2);
        await sort(l, m);
        await sort(m + 1, r);
        await merge(l, m, r);
      }
    };
    
    await sort(0, arr.length - 1);
    setCompleted(true);
>>>>>>> b070a1a0eaea0899fa172ab27c6f5a1d84d0419f
    setSorting(false);
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="sorting-visualizer">
      <div className="controls">
        <div className="control-group">
          <label>Array Size:</label>
          <input
            type="range"
            min="5"
            max="100"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            disabled={sorting}
          />
          <span>{size}</span>
        </div>
        
        <div className="control-group">
          <label>Speed:</label>
          <input
            type="range"
            min="1"
            max="200"
            value={speed}
            onChange={(e) => setSpeed(201 - parseInt(e.target.value))}
            disabled={sorting}
          />
          <span>{201 - speed}x</span>
        </div>

        <button onClick={resetArray} disabled={sorting}>
          Generate New Array
        </button>
        <button onClick={bubbleSort} disabled={sorting}>
          Bubble Sort
        </button>
        <button onClick={quickSort} disabled={sorting}>
          Quick Sort
        </button>
        <button onClick={mergeSort} disabled={sorting}>
          Merge Sort
        </button>
      </div>

      <div className="array-container">
        {array.map((value, idx) => (
          <div
            style={{
              height: `${value}px`,
              width: `${Math.max(2, Math.floor(800 / size))}px`
            }}
            className={`array-bar ${completed ? 'completed' : ''}`}
            key={idx}
          />
        ))}
      </div>

      {sorting && (
        <div className="status">
          Sorting in progress...
        </div>
      )}

      {completed && (
        <div className="status completed">
          Sorting completed!
        </div>
      )}
>>>>>>> b070a1a0eaea0899fa172ab27c6f5a1d84d0419f
    </div>
  );
};

export default SortingVisualizer;
