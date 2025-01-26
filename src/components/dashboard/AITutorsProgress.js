import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './AITutorsProgress.css';

const AITutorsProgress = () => {
  const [tutorProgress, setTutorProgress] = useState(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem('tutorProgress');
    if (savedProgress) {
      setTutorProgress(JSON.parse(savedProgress));
    }
  }, []);

  const calculateLevelProgress = (xp) => {
    return (xp % 1000) / 10; // Convert to percentage
  };

  if (!tutorProgress) {
    return (
      <div className="ai-tutors-progress-card">
        <h2>AI Tutors Progress</h2>
        <p className="no-progress">Start learning with AI Tutors to see your progress here!</p>
      </div>
    );
  }

  return (
    <div className="ai-tutors-progress-card">
      <h2>AI Tutors Progress</h2>
      
      <div className="tutor-stats">
        <div className="level-display">
          <h3>Current Level</h3>
          <div className="level-number">{tutorProgress.level}</div>
          <div className="xp-progress">
            <div className="xp-bar">
              <div 
                className="xp-fill" 
                style={{ width: `${calculateLevelProgress(tutorProgress.xp)}%` }}
              ></div>
            </div>
            <p>{tutorProgress.xp} XP</p>
          </div>
        </div>

        <div className="achievements-display">
          <h3>Recent Achievements</h3>
          <div className="achievements-list">
            {tutorProgress.achievements && tutorProgress.achievements.length > 0 ? (
              tutorProgress.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="achievement-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="achievement-icon">🏆</span>
                  <span>{achievement}</span>
                </motion.div>
              ))
            ) : (
              <p>Complete lessons to earn achievements!</p>
            )}
          </div>
        </div>
      </div>

      {tutorProgress.currentPath && (
        <div className="current-path">
          <h3>Current Learning Path</h3>
          <div className="path-progress">
            <div className="path-info">
              <span className="path-name">{tutorProgress.currentPath}</span>
              <span className="path-percentage">
                {Math.round((tutorProgress.pathProgress / 3) * 100)}%
              </span>
            </div>
            <div className="path-bar">
              <div 
                className="path-fill"
                style={{ width: `${(tutorProgress.pathProgress / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITutorsProgress;
