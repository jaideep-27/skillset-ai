import React, { useState } from 'react';
import './NumberTheoryExplorer.css';

const NumberTheoryExplorer = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);
  const [gameMode, setGameMode] = useState('factors'); // factors, primes, gcd

  const calculateFactors = (num) => {
    const factors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  };

  const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const findGCD = (a, b) => {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(number);
    
    if (isNaN(num)) {
      setResult({ error: 'Please enter a valid number' });
      return;
    }

    switch (gameMode) {
      case 'factors':
        const factors = calculateFactors(num);
        setResult({ 
          title: 'Factors',
          data: factors,
          explanation: `These are all the numbers that divide ${num} without a remainder.`
        });
        break;
      case 'primes':
        const isPrimeNumber = isPrime(num);
        setResult({
          title: 'Prime Check',
          data: isPrimeNumber,
          explanation: isPrimeNumber 
            ? `${num} is a prime number! It's only divisible by 1 and itself.`
            : `${num} is not a prime number.`
        });
        break;
      case 'gcd':
        const [num1, num2] = number.split(',').map(n => parseInt(n.trim()));
        if (isNaN(num1) || isNaN(num2)) {
          setResult({ error: 'Please enter two valid numbers separated by a comma' });
          return;
        }
        const gcd = findGCD(num1, num2);
        setResult({
          title: 'Greatest Common Divisor',
          data: gcd,
          explanation: `The GCD of ${num1} and ${num2} is ${gcd}`
        });
        break;
      default:
        setResult({ error: 'Invalid game mode' });
    }
  };

  return (
    <div className="number-theory-explorer">
      <h2>Number Theory Explorer</h2>
      
      <div className="game-modes">
        <button 
          className={`mode-btn ${gameMode === 'factors' ? 'active' : ''}`}
          onClick={() => setGameMode('factors')}
        >
          Find Factors
        </button>
        <button 
          className={`mode-btn ${gameMode === 'primes' ? 'active' : ''}`}
          onClick={() => setGameMode('primes')}
        >
          Prime Check
        </button>
        <button 
          className={`mode-btn ${gameMode === 'gcd' ? 'active' : ''}`}
          onClick={() => setGameMode('gcd')}
        >
          Find GCD
        </button>
      </div>

      <form onSubmit={handleSubmit} className="number-form">
        <div className="input-group">
          <label>
            {gameMode === 'gcd' 
              ? 'Enter two numbers (separated by comma):'
              : 'Enter a number:'}
          </label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder={gameMode === 'gcd' ? 'e.g., 48, 36' : 'e.g., 42'}
            className="number-input"
          />
        </div>
        <button type="submit" className="submit-btn">Calculate</button>
      </form>

      {result && (
        <div className={`result ${result.error ? 'error' : ''}`}>
          {result.error ? (
            <p className="error-message">{result.error}</p>
          ) : (
            <>
              <h3>{result.title}</h3>
              <div className="result-data">
                {Array.isArray(result.data) ? (
                  <div className="factors-grid">
                    {result.data.map((factor, index) => (
                      <span key={index} className="factor">{factor}</span>
                    ))}
                  </div>
                ) : (
                  <p className="result-value">
                    {typeof result.data === 'boolean' 
                      ? (result.data ? 'Yes' : 'No')
                      : result.data}
                  </p>
                )}
              </div>
              <p className="explanation">{result.explanation}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NumberTheoryExplorer;
