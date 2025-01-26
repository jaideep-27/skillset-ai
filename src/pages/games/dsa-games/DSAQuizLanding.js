import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './DSAQuizLanding.css';

const DSAQuizLanding = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/games/dsa/quiz/start');
  };

  return (
    <div className="quiz-landing">
      <div className="quiz-landing-header">
        <Link to="/games" className="back-button">
          <IoArrowBack /> Back to Games
        </Link>
        <h1>Data Structures & Algorithms</h1>
        <span className="difficulty-badge">Intermediate</span>
      </div>

      <div className="quiz-landing-content">
        <div className="quiz-info-card">
          <div className="quiz-description">
            <h2>Common data structures and algorithmic concepts</h2>
            <p>Test your knowledge of fundamental DSA concepts including arrays, linked lists, trees, graphs, and various algorithms.</p>
          </div>

          <div className="quiz-subject">
            <span className="subject-tag">Computer Science</span>
          </div>

          <div className="quiz-stats">
            <div className="stat-item">
              <h3>30</h3>
              <p>Questions</p>
            </div>
            <div className="stat-item">
              <h3>45m</h3>
              <p>Time Limit</p>
            </div>
            <div className="stat-item">
              <h3>4.8/5</h3>
              <p>Rating</p>
            </div>
          </div>

          <div className="quiz-completion">
            <div className="completion-count">
              <span className="count">1,567</span> completions
            </div>
          </div>

          <div className="quiz-topics">
            <h3>Topics Covered</h3>
            <div className="topic-tags">
              <span className="topic-tag">Arrays & Strings</span>
              <span className="topic-tag">Linked Lists</span>
              <span className="topic-tag">Trees & Graphs</span>
              <span className="topic-tag">Sorting & Searching</span>
              <span className="topic-tag">Dynamic Programming</span>
              <span className="topic-tag">Algorithm Analysis</span>
            </div>
          </div>

          <button className="start-quiz-button" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>

        <div className="quiz-features">
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <h3>Adaptive Difficulty</h3>
            <p>Questions adjust to your skill level</p>
          </div>
          <div className="feature">
            <div className="feature-icon">⏱️</div>
            <h3>Timed Sections</h3>
            <p>Practice working under time constraints</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📊</div>
            <h3>Detailed Analytics</h3>
            <p>Track your progress and identify areas for improvement</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎓</div>
            <h3>Learn from Mistakes</h3>
            <p>Get detailed explanations for each answer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSAQuizLanding;
