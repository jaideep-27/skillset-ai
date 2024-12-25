import React, { useState, useEffect, useCallback } from 'react';
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
  }, [size]);

  useEffect(() => {
    resetArray();
  }, [resetArray, size]);

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const bubbleSort = async () => {
    setSorting(true);
    let arr = [...array];
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap elements
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          
          setArray([...arr]);
          await sleep(speed);
        }
      }
    }
    
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
          setArray([...arr]);
          await sleep(speed);
        }
      }
      
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
    setSorting(false);
  };

  return (
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
    </div>
  );
};

export default SortingVisualizer;
