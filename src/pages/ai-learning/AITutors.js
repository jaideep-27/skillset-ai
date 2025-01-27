import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AITutors.css';
import AITutorChat from '../../components/AITutorChat';
import ErrorMessage from '../../components/common/ErrorMessage';

const BACKEND_URL = 'https://skillset-ai-backend.onrender.com';

const tutorStyles = {
  visual: {
    type: 'visual',
    name: 'Visual Tutor',
    description: 'Learn through diagrams, infographics, and visual explanations',
    imagePath: '/tutors/visual-tutor.png',
    strengths: [
      'Interactive diagrams and flowcharts',
      'Visual problem-solving techniques',
      'Mind mapping and concept visualization'
    ],
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    accentColor: '#F59E0B'
  },
  auditory: {
    type: 'auditory',
    name: 'Auditory Tutor',
    description: 'Learn through interactive dialogues and verbal guidance',
    imagePath: '/tutors/auditory-tutor.png',
    strengths: [
      'Interactive discussions',
      'Verbal problem explanations',
      'Audio-based learning materials'
    ],
    gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    accentColor: '#10B981'
  },
  kinesthetic: {
    type: 'kinesthetic',
    name: 'Kinesthetic Tutor',
    description: 'Learn through hands-on activities and practical exercises',
    imagePath: '/tutors/kinesthetic-tutor.png',
    strengths: [
      'Hands-on exercises',
      'Interactive simulations',
      'Practice-based learning'
    ],
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    accentColor: '#8B5CF6'
  }
};

const assessmentQuestions = {
  visual: [
    {
      id: 'v1',
      question: 'When learning a new programming concept, which method helps you understand best?',
      options: [
        { id: 'v1a', text: 'Diagrams and flowcharts showing the concept flow', weight: 3 },
        { id: 'v1b', text: 'Code examples with highlighted syntax', weight: 2 },
        { id: 'v1c', text: 'Visual metaphors and analogies', weight: 2 }
      ]
    },
    {
      id: 'v2',
      question: 'How do you prefer to plan your coding projects?',
      options: [
        { id: 'v2a', text: 'Creating detailed wireframes and mockups', weight: 3 },
        { id: 'v2b', text: 'Drawing system architecture diagrams', weight: 2 },
        { id: 'v2c', text: 'Making visual mind maps of features', weight: 2 }
      ]
    },
    {
      id: 'v3',
      question: 'When debugging code, what helps you most?',
      options: [
        { id: 'v3a', text: 'Visualizing the data flow through diagrams', weight: 3 },
        { id: 'v3b', text: 'Using debugger visualization tools', weight: 2 },
        { id: 'v3c', text: 'Color-coded error highlighting', weight: 2 }
      ]
    },
    {
      id: 'v4',
      question: 'How do you best understand complex algorithms?',
      options: [
        { id: 'v4a', text: 'Through animated visualizations', weight: 3 },
        { id: 'v4b', text: 'Step-by-step visual breakdowns', weight: 2 },
        { id: 'v4c', text: 'Visual comparison with similar algorithms', weight: 2 }
      ]
    },
    {
      id: 'v5',
      question: 'When learning about data structures, what works best for you?',
      options: [
        { id: 'v5a', text: 'Visual representations of the structure', weight: 3 },
        { id: 'v5b', text: 'Diagrams showing data manipulation', weight: 2 },
        { id: 'v5c', text: 'Interactive visual examples', weight: 2 }
      ]
    }
  ],
  auditory: [
    {
      id: 'a1',
      question: 'How do you prefer to learn new programming languages?',
      options: [
        { id: 'a1a', text: 'Through video tutorials with explanations', weight: 3 },
        { id: 'a1b', text: 'Discussion-based learning sessions', weight: 2 },
        { id: 'a1c', text: 'Audio programming courses', weight: 2 }
      ]
    },
    {
      id: 'a2',
      question: 'When solving coding problems, what approach works best?',
      options: [
        { id: 'a2a', text: 'Talking through the problem out loud', weight: 3 },
        { id: 'a2b', text: 'Discussing solutions with peers', weight: 2 },
        { id: 'a2c', text: 'Listening to explanations of solutions', weight: 2 }
      ]
    },
    {
      id: 'a3',
      question: 'How do you best understand code reviews?',
      options: [
        { id: 'a3a', text: 'Verbal walkthrough of changes', weight: 3 },
        { id: 'a3b', text: 'Discussion-based review sessions', weight: 2 },
        { id: 'a3c', text: 'Explaining your code to others', weight: 2 }
      ]
    },
    {
      id: 'a4',
      question: 'What helps you remember programming concepts?',
      options: [
        { id: 'a4a', text: 'Verbal analogies and examples', weight: 3 },
        { id: 'a4b', text: 'Discussion groups and study sessions', weight: 2 },
        { id: 'a4c', text: 'Recording and listening to explanations', weight: 2 }
      ]
    },
    {
      id: 'a5',
      question: 'How do you prefer to debug your code?',
      options: [
        { id: 'a5a', text: 'Discussing the problem with others', weight: 3 },
        { id: 'a5b', text: 'Rubber duck debugging (explaining aloud)', weight: 2 },
        { id: 'a5c', text: 'Audio debugging logs and alerts', weight: 2 }
      ]
    }
  ],
  kinesthetic: [
    {
      id: 'k1',
      question: 'How do you prefer to practice coding concepts?',
      options: [
        { id: 'k1a', text: 'Building real projects from scratch', weight: 3 },
        { id: 'k1b', text: 'Interactive coding exercises', weight: 2 },
        { id: 'k1c', text: 'Hands-on debugging sessions', weight: 2 }
      ]
    },
    {
      id: 'k2',
      question: 'What helps you learn new frameworks best?',
      options: [
        { id: 'k2a', text: 'Building sample applications', weight: 3 },
        { id: 'k2b', text: 'Following along with tutorials', weight: 2 },
        { id: 'k2c', text: 'Modifying existing projects', weight: 2 }
      ]
    },
    {
      id: 'k3',
      question: 'How do you prefer to explore new APIs?',
      options: [
        { id: 'k3a', text: 'Writing test code and experimenting', weight: 3 },
        { id: 'k3b', text: 'Building small proof-of-concepts', weight: 2 },
        { id: 'k3c', text: 'Interactive API playgrounds', weight: 2 }
      ]
    },
    {
      id: 'k4',
      question: 'What\'s your preferred way to learn about software architecture?',
      options: [
        { id: 'k4a', text: 'Building systems from ground up', weight: 3 },
        { id: 'k4b', text: 'Refactoring existing applications', weight: 2 },
        { id: 'k4c', text: 'Implementing design patterns practically', weight: 2 }
      ]
    },
    {
      id: 'k5',
      question: 'How do you best learn about database concepts?',
      options: [
        { id: 'k5a', text: 'Setting up and managing real databases', weight: 3 },
        { id: 'k5b', text: 'Practicing queries on sample data', weight: 2 },
        { id: 'k5c', text: 'Building database-driven applications', weight: 2 }
      ]
    }
  ]
};

const LoadingState = () => (
  <div className="loading-container">
    <div className="loading-text">
      Preparing Your Personalized AI Tutor
    </div>
    <div className="loading-subtext">
      Analyzing your learning preferences...
    </div>
    <div className="loading-spinner" />
  </div>
);

function AITutors() {
  const [currentStep, setCurrentStep] = useState('selection');
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [learningPath, setLearningPath] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(null);

  useEffect(() => {
    if (isLoading && loadingRef.current) {
      // Small delay to ensure component is rendered
      setTimeout(() => {
        loadingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [isLoading]);

  const handleTutorSelect = (tutorType) => {
    setSelectedTutor(tutorType);
    setCurrentStep('assessment');
  };

  const handleAnswerSelect = (questionId, answerId) => {
    setAssessmentAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const processAssessmentResults = async (answers, tutorType) => {
    try {
      // Calculate learning style scores
      const scores = Object.entries(answers).reduce((acc, [questionId, answerId]) => {
        const question = assessmentQuestions[tutorType].find(q => q.id === questionId.split('_')[0]);
        const option = question.options.find(opt => opt.id === answerId);
        return {
          ...acc,
          [questionId]: {
            question: question.question,
            answer: option.text,
            weight: option.weight
          }
        };
      }, {});

      console.log('Sending assessment data:', { tutorType, scores });

      // Send to backend for processing
      const response = await fetch(`${BACKEND_URL}/api/assessment/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutorType,
          answers: scores,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to process assessment');
      }

      const result = await response.json();
      console.log('Assessment results:', result);
      
      if (!result.learningPathDescription) {
        throw new Error('Invalid response format from server');
      }

      return {
        description: result.learningPathDescription,
        tutorType,
        strengths: result.strengths,
        recommendations: result.recommendations,
        adaptiveLearningPath: result.adaptiveLearningPath
      };
    } catch (error) {
      console.error('Assessment processing error:', error);
      throw error;
    }
  };

  const handleAssessmentSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const results = await processAssessmentResults(assessmentAnswers, selectedTutor);
      setLearningPath(results);
      setCurrentStep('results');
    } catch (error) {
      console.error('Assessment error:', error);
      setError('Failed to process assessment results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderTutorCard = (tutor) => {
    const colorClasses = {
      visual: 'visual-tutor',
      auditory: 'auditory-tutor',
      kinesthetic: 'kinesthetic-tutor'
    };

    return (
      <div className={`tutor-card ${colorClasses[tutor.type]}`}>
        <div className="tutor-image-container">
          <img src={tutor.imagePath} alt={tutor.name} className="tutor-image" />
        </div>
        <h3>{tutor.name}</h3>
        <p>{tutor.description}</p>
        <div className="key-features">
          <h4>Key Features:</h4>
          <ul>
            {tutor.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>
        <button 
          className="start-learning-btn"
          onClick={() => handleTutorSelect(tutor.type)}
        >
          START LEARNING NOW
        </button>
      </div>
    );
  };

  const renderAssessment = () => {
    if (!selectedTutor || !assessmentQuestions[selectedTutor.toLowerCase()]) {
      return null;
    }

    return (
      <div className="assessment-container">
        <h2>Learning Style Assessment</h2>
        <div className="questions-container">
          {assessmentQuestions[selectedTutor.toLowerCase()].map((q) => (
            <div key={q.id} className="question-card">
              <p className="question-text">{q.question}</p>
              <div className="options-container">
                {q.options.map((option) => (
                  <button
                    key={option.id}
                    className={`option-btn ${assessmentAnswers[q.id] === option.id ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(q.id, option.id)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          {error ? (
            <ErrorMessage message={error} onRetry={handleAssessmentSubmit} />
          ) : (
            <>
              <button
                className="submit-btn"
                onClick={handleAssessmentSubmit}
                disabled={Object.keys(assessmentAnswers).length < assessmentQuestions[selectedTutor.toLowerCase()].length}
              >
                Create Learning Path
              </button>
              {isLoading && <div ref={loadingRef}><LoadingState /></div>}
            </>
          )}
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <div className="results-container">
      <div className="results-content">
        <div className="learning-path-section">
          <h2>Your Personalized Learning Path</h2>
          {learningPath && (
            <div className="learning-path-flowchart">
              <div className="path-description">
                {learningPath.description}
              </div>
              {learningPath.recommendations && (
                <div className="path-steps">
                  {learningPath.recommendations.map((step, index) => (
                    <div key={index} className="path-step">
                      <div className="step-number">{index + 1}</div>
                      <div className="step-content">{step}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="chat-section">
          <AITutorChat tutorType={selectedTutor} tutorStyle={tutorStyles[selectedTutor]} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="ai-tutors-page">
      <div className="navbar-spacer" />
      <div className="page-header">
        <h1>Choose Your AI Learning Style</h1>
        <p>Select a tutor that matches your preferred way of learning. Each tutor is specialized in a different teaching approach to help you learn more effectively.</p>
      </div>
      <AnimatePresence mode="wait">
        {error && <ErrorMessage message={error} />}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {currentStep === 'selection' && (
            <div className="tutors-grid">
              {Object.values(tutorStyles).map(tutor => renderTutorCard(tutor))}
            </div>
          )}
          {currentStep === 'assessment' && renderAssessment()}
          {currentStep === 'results' && renderResults()}
        </motion.div>
      </AnimatePresence>
      {showChat && currentStep !== 'results' && (
        <div className="chat-container">
          <AITutorChat tutorType={selectedTutor} tutorStyle={tutorStyles[selectedTutor]} />
        </div>
      )}
    </div>
  );
}

export default AITutors;
