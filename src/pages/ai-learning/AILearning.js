import React from 'react';
import './AILearning.css';

function AILearning() {
  return (
    <div className="ai-learning">
      <div className="ai-learning-container">
        <h1>Learn with AI</h1>
        <div className="ai-features">
          <div className="ai-feature-card">
            <h2>AI Tutor</h2>
            <p>Get personalized guidance and instant feedback from our AI tutor.</p>
            <button className="feature-button">Start Learning</button>
          </div>
          
          <div className="ai-feature-card">
            <h2>Practice Exercises</h2>
            <p>AI-generated exercises tailored to your skill level.</p>
            <button className="feature-button">Try Exercises</button>
          </div>
          
          <div className="ai-feature-card">
            <h2>Skill Assessment</h2>
            <p>Evaluate your progress with AI-powered assessments.</p>
            <button className="feature-button">Take Assessment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AILearning;
