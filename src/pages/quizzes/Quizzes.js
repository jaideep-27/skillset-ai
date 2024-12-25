import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Quizzes.css';

const QUIZZES_DATA = [
  {
    id: 'web-fundamentals',
    title: 'Web Development Fundamentals',
    description: 'Test your knowledge of HTML, CSS, and JavaScript basics',
    category: 'Web Development',
    difficulty: 'Beginner',
    questions: 20,
    timeLimit: 30,
    completions: 3245,
    rating: 4.7
  },
  {
    id: 'python-basics',
    title: 'Python Programming Basics',
    description: 'Essential Python concepts every developer should know',
    category: 'Programming',
    difficulty: 'Beginner',
    questions: 25,
    timeLimit: 35,
    completions: 2876,
    rating: 4.9
  },
  {
    id: 'data-structures',
    title: 'Data Structures & Algorithms',
    description: 'Common data structures and algorithmic concepts',
    category: 'Computer Science',
    difficulty: 'Intermediate',
    questions: 30,
    timeLimit: 45,
    completions: 1567,
    rating: 4.8
  },
  {
    id: 'system-design',
    title: 'System Design Principles',
    description: 'Advanced concepts in software architecture and system design',
    category: 'Software Engineering',
    difficulty: 'Advanced',
    questions: 15,
    timeLimit: 40,
    completions: 987,
    rating: 4.6
  }
];

function Quizzes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const filteredQuizzes = QUIZZES_DATA.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !difficulty || quiz.difficulty === difficulty;
    return matchesSearch && matchesDifficulty;
  });

  const difficulties = [
    { value: '', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  const handleStartQuiz = (quizId) => {
    // TODO: Implement quiz start logic
    console.log('Starting quiz:', quizId);
  };

  return (
    <motion.div 
      className="quizzes"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="quizzes-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Skill Assessment Quizzes
        </motion.h1>

        <motion.div 
          className="quiz-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input 
            type="text" 
            placeholder="Search quizzes..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            className="filter-select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            {difficulties.map(diff => (
              <option key={diff.value} value={diff.value}>
                {diff.label}
              </option>
            ))}
          </select>
        </motion.div>

        {filteredQuizzes.length === 0 ? (
          <div className="no-quizzes">
            No quizzes match your search criteria
          </div>
        ) : (
          <motion.div 
            className="quizzes-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {filteredQuizzes.map((quiz, index) => (
              <motion.div 
                key={quiz.id}
                className="quiz-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => handleStartQuiz(quiz.id)}
              >
                <div className="quiz-header">
                  <h2>{quiz.title}</h2>
                  <span className={`quiz-badge ${quiz.difficulty.toLowerCase()}`}>
                    {quiz.difficulty}
                  </span>
                </div>
                <p>{quiz.description}</p>
                <div className="quiz-meta">
                  <span>{quiz.category}</span>
                </div>
                <div className="quiz-details">
                  <div className="detail">
                    <span className="detail-value">{quiz.questions}</span>
                    <span className="detail-label">Questions</span>
                  </div>
                  <div className="detail">
                    <span className="detail-value">{quiz.timeLimit}m</span>
                    <span className="detail-label">Time Limit</span>
                  </div>
                  <div className="detail">
                    <span className="detail-value">{quiz.rating}/5</span>
                    <span className="detail-label">Rating</span>
                  </div>
                </div>
                <div className="quiz-stats">
                  <span>{quiz.completions.toLocaleString()} completions</span>
                </div>
                <button className="start-button">
                  Start Quiz
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Quizzes;
