import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import CodeEditor from '../../../components/CodeEditor/CodeEditor';
import './BinarySearchTree.css';

const BinarySearchTree = () => {
  return (
    <div className="game-page">
      <Link to="/games/categories/dsa" className="back-button">
        <FiArrowLeft size={20} />
        Back to DSA Games
      </Link>

      <div className="game-content">
        <div className="visualization-section">
          <div className="game-header">
            <h1>Binary Search Tree</h1>
            <p>Learn BST operations with interactive visualization</p>
          </div>
          
          <div className="visualization-area">
            {/* Your BST visualization component will go here */}
            <div className="placeholder-content">
              BST Visualization Area
            </div>
          </div>

          <div className="controls-area">
            {/* Game controls will go here */}
            <div className="placeholder-content">
              Game Controls
            </div>
          </div>
        </div>

        <div className="code-section">
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

export default BinarySearchTree;
