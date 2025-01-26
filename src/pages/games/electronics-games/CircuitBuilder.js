import React, { useState, useEffect, useRef } from 'react';
import './CircuitBuilder.css';

const CircuitBuilder = () => {
  const canvasRef = useRef(null);
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [voltage, setVoltage] = useState(5);
  const [resistance, setResistance] = useState(1000);
  const [current, setCurrent] = useState(0);
  const [mode, setMode] = useState('series'); // series or parallel

  const componentTypes = {
    battery: {
      name: 'Battery',
      symbol: '⚡',
      value: voltage,
      unit: 'V'
    },
    resistor: {
      name: 'Resistor',
      symbol: '⋁⋁⋁',
      value: resistance,
      unit: 'Ω'
    },
    led: {
      name: 'LED',
      symbol: '◄|',
      value: 2,
      unit: 'V'
    },
    capacitor: {
      name: 'Capacitor',
      symbol: '||',
      value: 100,
      unit: 'µF'
    }
  };

  useEffect(() => {
    drawCircuit();
    calculateCurrent();
  }, [components, voltage, resistance, mode]);

  const calculateCurrent = () => {
    if (components.length === 0) {
      setCurrent(0);
      return;
    }

    if (mode === 'series') {
      // In series, total resistance is sum of all resistances
      const totalResistance = components.reduce((sum, comp) => {
        if (comp.type === 'resistor') {
          return sum + comp.value;
        }
        return sum;
      }, 0);

      // Ohm's Law: I = V/R
      const calculatedCurrent = voltage / totalResistance;
      setCurrent(calculatedCurrent);
    } else {
      // In parallel, total resistance is 1/sum(1/R)
      const resistors = components.filter(comp => comp.type === 'resistor');
      if (resistors.length === 0) {
        setCurrent(0);
        return;
      }

      const totalResistance = 1 / resistors.reduce((sum, comp) => {
        return sum + (1 / comp.value);
      }, 0);

      const calculatedCurrent = voltage / totalResistance;
      setCurrent(calculatedCurrent);
    }
  };

  const drawCircuit = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#4D61FC';
    ctx.lineWidth = 2;
    ctx.font = '14px Poppins';

    if (components.length === 0) {
      ctx.fillStyle = '#666';
      ctx.textAlign = 'center';
      ctx.fillText('Add components to build your circuit', width/2, height/2);
      return;
    }

    const startX = 50;
    const endX = width - 50;
    const componentWidth = (endX - startX) / (components.length + 1);

    if (mode === 'series') {
      // Draw series circuit
      let currentX = startX;
      
      // Draw positive rail
      ctx.beginPath();
      ctx.moveTo(startX, height * 0.3);
      ctx.lineTo(endX, height * 0.3);
      ctx.stroke();

      // Draw components
      components.forEach((comp, index) => {
        const centerY = height * 0.5;
        
        // Draw vertical lines
        ctx.beginPath();
        ctx.moveTo(currentX + componentWidth, height * 0.3);
        ctx.lineTo(currentX + componentWidth, centerY - 20);
        ctx.moveTo(currentX + componentWidth, centerY + 20);
        ctx.lineTo(currentX + componentWidth, height * 0.7);
        ctx.stroke();

        // Draw component symbol
        ctx.fillStyle = '#4D61FC';
        ctx.textAlign = 'center';
        ctx.font = '20px Arial';
        ctx.fillText(componentTypes[comp.type].symbol, currentX + componentWidth, centerY);
        
        // Draw component value
        ctx.font = '12px Poppins';
        ctx.fillText(
          `${comp.value}${componentTypes[comp.type].unit}`,
          currentX + componentWidth,
          centerY + 40
        );

        currentX += componentWidth;
      });

      // Draw negative rail
      ctx.beginPath();
      ctx.moveTo(startX, height * 0.7);
      ctx.lineTo(endX, height * 0.7);
      ctx.stroke();

    } else {
      // Draw parallel circuit
      const componentHeight = (height * 0.4) / (components.length || 1);
      
      // Draw vertical rails
      ctx.beginPath();
      ctx.moveTo(startX, height * 0.2);
      ctx.lineTo(startX, height * 0.8);
      ctx.moveTo(endX, height * 0.2);
      ctx.lineTo(endX, height * 0.8);
      ctx.stroke();

      // Draw components
      components.forEach((comp, index) => {
        const centerY = height * 0.3 + index * componentHeight;
        
        // Draw horizontal lines
        ctx.beginPath();
        ctx.moveTo(startX, centerY);
        ctx.lineTo(startX + 30, centerY);
        ctx.moveTo(endX - 30, centerY);
        ctx.lineTo(endX, centerY);
        ctx.stroke();

        // Draw component symbol
        ctx.fillStyle = '#4D61FC';
        ctx.textAlign = 'center';
        ctx.font = '20px Arial';
        ctx.fillText(
          componentTypes[comp.type].symbol,
          width/2,
          centerY
        );
        
        // Draw component value
        ctx.font = '12px Poppins';
        ctx.fillText(
          `${comp.value}${componentTypes[comp.type].unit}`,
          width/2,
          centerY + 20
        );
      });
    }

    // Draw current value
    ctx.fillStyle = '#00D4FF';
    ctx.font = '14px Poppins';
    ctx.textAlign = 'left';
    ctx.fillText(
      `Current: ${current.toFixed(2)}mA`,
      10,
      30
    );
  };

  const addComponent = (type) => {
    setComponents([...components, {
      type,
      value: componentTypes[type].value
    }]);
  };

  const clearCircuit = () => {
    setComponents([]);
    setCurrent(0);
  };

  return (
    <div className="circuit-builder">
      <h2>Circuit Builder</h2>
      
      <div className="circuit-controls">
        <div className="mode-selector">
          <button 
            className={`mode-btn ${mode === 'series' ? 'active' : ''}`}
            onClick={() => setMode('series')}
          >
            Series Circuit
          </button>
          <button 
            className={`mode-btn ${mode === 'parallel' ? 'active' : ''}`}
            onClick={() => setMode('parallel')}
          >
            Parallel Circuit
          </button>
        </div>

        <div className="component-selector">
          {Object.entries(componentTypes).map(([type, info]) => (
            <button
              key={type}
              className="component-btn"
              onClick={() => addComponent(type)}
            >
              <span className="component-symbol">{info.symbol}</span>
              <span className="component-name">{info.name}</span>
            </button>
          ))}
        </div>

        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            width="600"
            height="400"
            className="circuit-canvas"
          />
        </div>

        <div className="circuit-settings">
          <div className="setting-group">
            <label>Battery Voltage (V)</label>
            <input
              type="range"
              min="1"
              max="12"
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
            />
            <span className="value">{voltage}V</span>
          </div>

          <div className="setting-group">
            <label>Resistance (Ω)</label>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={resistance}
              onChange={(e) => setResistance(Number(e.target.value))}
            />
            <span className="value">{resistance}Ω</span>
          </div>
        </div>

        <button className="clear-btn" onClick={clearCircuit}>
          Clear Circuit
        </button>
      </div>
    </div>
  );
};

export default CircuitBuilder;
