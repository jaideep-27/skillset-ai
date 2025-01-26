import React, { useState, useEffect, useRef, useCallback } from 'react';
import './LogicGateSimulator.css';

const LogicGateSimulator = () => {
  const canvasRef = useRef(null);
  const [selectedGate, setSelectedGate] = useState('AND');
  const [inputs, setInputs] = useState([false, false]);
  const [output, setOutput] = useState(false);
  const [showTruthTable, setShowTruthTable] = useState(false);

  const gates = {
    AND: {
      symbol: '&',
      operation: (a, b) => a && b,
      truthTable: [
        { inputs: [0, 0], output: 0 },
        { inputs: [0, 1], output: 0 },
        { inputs: [1, 0], output: 0 },
        { inputs: [1, 1], output: 1 }
      ]
    },
    OR: {
      symbol: '≥1',
      operation: (a, b) => a || b,
      truthTable: [
        { inputs: [0, 0], output: 0 },
        { inputs: [0, 1], output: 1 },
        { inputs: [1, 0], output: 1 },
        { inputs: [1, 1], output: 1 }
      ]
    },
    NOT: {
      symbol: '1',
      operation: (a) => !a,
      truthTable: [
        { inputs: [0], output: 1 },
        { inputs: [1], output: 0 }
      ]
    },
    NAND: {
      symbol: '&',
      operation: (a, b) => !(a && b),
      truthTable: [
        { inputs: [0, 0], output: 1 },
        { inputs: [0, 1], output: 1 },
        { inputs: [1, 0], output: 1 },
        { inputs: [1, 1], output: 0 }
      ]
    },
    NOR: {
      symbol: '≥1',
      operation: (a, b) => !(a || b),
      truthTable: [
        { inputs: [0, 0], output: 1 },
        { inputs: [0, 1], output: 0 },
        { inputs: [1, 0], output: 0 },
        { inputs: [1, 1], output: 0 }
      ]
    },
    XOR: {
      symbol: '=1',
      operation: (a, b) => a !== b,
      truthTable: [
        { inputs: [0, 0], output: 0 },
        { inputs: [0, 1], output: 1 },
        { inputs: [1, 0], output: 1 },
        { inputs: [1, 1], output: 0 }
      ]
    }
  };

  const drawGate = useCallback((ctx, gateType) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.strokeStyle = '#4D61FC';
    ctx.lineWidth = 2;
    ctx.font = '14px Poppins';

    // Draw input wires
    const inputY1 = canvasRef.current.height * 0.3;
    const inputY2 = canvasRef.current.height * 0.7;
    ctx.beginPath();
    ctx.moveTo(50, inputY1);
    ctx.lineTo(150, inputY1);
    ctx.moveTo(50, inputY2);
    ctx.lineTo(150, inputY2);
    ctx.stroke();

    // Draw input values
    ctx.fillStyle = inputs[0] ? '#4D61FC' : '#666';
    ctx.fillText(inputs[0] ? '1' : '0', 30, inputY1 + 5);
    ctx.fillStyle = inputs[1] ? '#4D61FC' : '#666';
    ctx.fillText(inputs[1] ? '1' : '0', 30, inputY2 + 5);

    // Draw gate
    ctx.beginPath();
    if (selectedGate === 'NOT') {
      // Draw NOT gate triangle
      ctx.moveTo(150, canvasRef.current.height * 0.3);
      ctx.lineTo(200, canvasRef.current.height * 0.5);
      ctx.lineTo(150, canvasRef.current.height * 0.7);
      ctx.closePath();
      ctx.stroke();
      // Draw bubble
      ctx.beginPath();
      ctx.arc(205, canvasRef.current.height * 0.5, 5, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      // Draw other gates
      ctx.moveTo(150, canvasRef.current.height * 0.2);
      ctx.lineTo(150, canvasRef.current.height * 0.8);
      ctx.bezierCurveTo(
        200, canvasRef.current.height * 0.8,
        200, canvasRef.current.height * 0.2,
        150, canvasRef.current.height * 0.2
      );
      ctx.stroke();
      
      // Draw gate symbol
      ctx.fillStyle = '#4D61FC';
      ctx.font = '16px Arial';
      ctx.fillText(gates[selectedGate].symbol, 165, canvasRef.current.height * 0.5 + 5);
    }

    // Draw output wire
    ctx.beginPath();
    ctx.moveTo(selectedGate === 'NOT' ? 210 : 200, canvasRef.current.height * 0.5);
    ctx.lineTo(270, canvasRef.current.height * 0.5);
    ctx.stroke();

    // Draw output value
    ctx.fillStyle = output ? '#4D61FC' : '#666';
    ctx.font = '14px Poppins';
    ctx.fillText(output ? '1' : '0', 280, canvasRef.current.height * 0.5 + 5);
  }, [canvasRef, inputs, output, selectedGate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawGate(context, selectedGate);
  }, [selectedGate, drawGate]);

  const handleInputClick = (index) => {
    const newInputs = [...inputs];
    newInputs[index] = !newInputs[index];
    setInputs(newInputs);
    
    if (selectedGate === 'NOT') {
      setOutput(gates[selectedGate].operation(newInputs[0]));
    } else {
      setOutput(gates[selectedGate].operation(newInputs[0], newInputs[1]));
    }
  };

  return (
    <div className="logic-gate-simulator">
      <h2>Logic Gate Simulator</h2>
      
      <div className="gate-controls">
        <div className="gate-selector">
          {Object.keys(gates).map((gate) => (
            <button
              key={gate}
              className={`gate-btn ${selectedGate === gate ? 'active' : ''}`}
              onClick={() => {
                setSelectedGate(gate);
                setInputs(gate === 'NOT' ? [false] : [false, false]);
                setOutput(false);
              }}
            >
              {gate}
            </button>
          ))}
        </div>

        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            width="300"
            height="200"
            className="gate-canvas"
          />
          <div className="input-controls">
            <button
              className={`input-btn ${inputs[0] ? 'active' : ''}`}
              onClick={() => handleInputClick(0)}
            >
              Input A
            </button>
            {selectedGate !== 'NOT' && (
              <button
                className={`input-btn ${inputs[1] ? 'active' : ''}`}
                onClick={() => handleInputClick(1)}
              >
                Input B
              </button>
            )}
          </div>
        </div>

        <button
          className="truth-table-btn"
          onClick={() => setShowTruthTable(!showTruthTable)}
        >
          {showTruthTable ? 'Hide' : 'Show'} Truth Table
        </button>

        {showTruthTable && (
          <div className="truth-table">
            <h3>{selectedGate} Gate Truth Table</h3>
            <table>
              <thead>
                <tr>
                  <th>A</th>
                  {selectedGate !== 'NOT' && <th>B</th>}
                  <th>Output</th>
                </tr>
              </thead>
              <tbody>
                {gates[selectedGate].truthTable.map((row, index) => (
                  <tr key={index}>
                    <td>{row.inputs[0]}</td>
                    {selectedGate !== 'NOT' && <td>{row.inputs[1]}</td>}
                    <td>{row.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogicGateSimulator;
