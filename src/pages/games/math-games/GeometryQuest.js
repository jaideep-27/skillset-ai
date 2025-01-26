import React, { useState, useEffect, useRef, useCallback } from 'react';
import './GeometryQuest.css';

const GeometryQuest = () => {
  const canvasRef = useRef(null);
  const [shape, setShape] = useState('triangle');
  const [dimensions, setDimensions] = useState({});
  const [result, setResult] = useState(null);

  const shapes = {
    triangle: {
      fields: ['base', 'height'],
      calculate: (dims) => ({
        area: (dims.base * dims.height) / 2,
        perimeter: dims.base + 2 * Math.sqrt((dims.base/2)**2 + dims.height**2)
      })
    },
    rectangle: {
      fields: ['width', 'height'],
      calculate: (dims) => ({
        area: dims.width * dims.height,
        perimeter: 2 * (dims.width + dims.height)
      })
    },
    circle: {
      fields: ['radius'],
      calculate: (dims) => ({
        area: Math.PI * dims.radius ** 2,
        perimeter: 2 * Math.PI * dims.radius
      })
    }
  };

  const drawShape = useCallback((ctx, shape, dims) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.strokeStyle = '#4D61FC';
    ctx.lineWidth = 2;

    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;

    switch (shape) {
      case 'triangle':
        const base = dims.base || 100;
        const height = dims.height || 100;
        ctx.beginPath();
        ctx.moveTo(centerX - base/2, centerY + height/2);
        ctx.lineTo(centerX + base/2, centerY + height/2);
        ctx.lineTo(centerX, centerY - height/2);
        ctx.closePath();
        break;
      
      case 'rectangle':
        const width = dims.width || 100;
        const rectHeight = dims.height || 80;
        ctx.beginPath();
        ctx.rect(
          centerX - width/2,
          centerY - rectHeight/2,
          width,
          rectHeight
        );
        break;
      
      case 'circle':
        const radius = dims.radius || 50;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        break;
      default:
        // Draw a simple dot as fallback
        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
        ctx.fill();
        break;
    }

    ctx.stroke();
    ctx.fillStyle = 'rgba(77, 97, 252, 0.1)';
    ctx.fill();
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawShape(context, shape, dimensions);
  }, [shape, dimensions, drawShape]);

  const handleInputChange = (field, value) => {
    setDimensions(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const calculateResults = () => {
    const shapeConfig = shapes[shape];
    const hasAllFields = shapeConfig.fields.every(
      field => dimensions[field] && dimensions[field] > 0
    );

    if (!hasAllFields) {
      setResult({
        error: 'Please enter valid positive numbers for all dimensions'
      });
      return;
    }

    const results = shapeConfig.calculate(dimensions);
    setResult({
      area: results.area.toFixed(2),
      perimeter: results.perimeter.toFixed(2)
    });
  };

  return (
    <div className="geometry-quest">
      <h2>Geometry Quest</h2>
      
      <div className="shape-controls">
        <div className="shape-buttons">
          <button 
            className={`shape-btn ${shape === 'triangle' ? 'active' : ''}`}
            onClick={() => setShape('triangle')}
          >
            Triangle
          </button>
          <button 
            className={`shape-btn ${shape === 'rectangle' ? 'active' : ''}`}
            onClick={() => setShape('rectangle')}
          >
            Rectangle
          </button>
          <button 
            className={`shape-btn ${shape === 'circle' ? 'active' : ''}`}
            onClick={() => setShape('circle')}
          >
            Circle
          </button>
        </div>

        <div className="canvas-container">
          <canvas 
            ref={canvasRef} 
            width="300" 
            height="300"
            className="shape-canvas"
          />
        </div>

        <div className="dimensions-form">
          {shapes[shape].fields.map(field => (
            <div key={field} className="dimension-input">
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type="number"
                value={dimensions[field] || ''}
                onChange={(e) => handleInputChange(field, e.target.value)}
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}
          <button className="calculate-btn" onClick={calculateResults}>
            Calculate
          </button>
        </div>

        {result && (
          <div className={`results ${result.error ? 'error' : ''}`}>
            {result.error ? (
              <p className="error-message">{result.error}</p>
            ) : (
              <>
                <div className="result-item">
                  <span>Area:</span>
                  <span className="value">{result.area} units²</span>
                </div>
                <div className="result-item">
                  <span>Perimeter:</span>
                  <span className="value">{result.perimeter} units</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeometryQuest;
