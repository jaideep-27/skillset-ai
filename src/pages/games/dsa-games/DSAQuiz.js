import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import './DSAQuiz.css';

const questions = [
  {
    id: 1,
    question: "Explain how a Binary Search Tree is different from a Binary Tree. Give an example use case for BST.",
    correctAnswer: "A Binary Search Tree (BST) is a binary tree with the property that for each node, all elements in the left subtree are less than the node's value, and all elements in the right subtree are greater. Example use case: Implementing a dictionary where quick lookups are needed.",
    points: 20
  },
  {
    id: 2,
    question: "What is the difference between QuickSort and MergeSort? When would you prefer one over the other?",
    correctAnswer: "QuickSort uses a pivot element and partitions the array around it, while MergeSort divides the array into halves and merges them back. QuickSort is generally faster in practice and uses less memory (in-place), but MergeSort is stable and guarantees O(n log n) worst-case time complexity.",
    points: 20
  },
  {
    id: 3,
    question: "Describe how a hash table works and explain what collision resolution methods you know.",
    correctAnswer: "A hash table maps keys to values using a hash function. When two keys hash to the same index (collision), it can be resolved using: 1) Chaining - storing collided elements in a linked list, or 2) Open Addressing - finding next empty slot through linear/quadratic probing or double hashing.",
    points: 20
  },
  {
    id: 4,
    question: "What is the time complexity of BFS and DFS? Explain a scenario where you would choose BFS over DFS.",
    correctAnswer: "Both BFS and DFS have O(V + E) time complexity where V is vertices and E is edges. BFS is preferred when finding the shortest path in an unweighted graph, or when exploring nodes level by level, like finding closest friends in a social network.",
    points: 20
  },
  {
    id: 5,
    question: "Explain how a min-heap data structure works and its common applications.",
    correctAnswer: "A min-heap is a complete binary tree where each parent node is less than or equal to its children. It supports O(log n) insertion and deletion, and O(1) access to minimum element. Common applications include priority queues, scheduling algorithms, and Dijkstra's shortest path algorithm.",
    points: 20
  }
];

const DSAQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [feedback, setFeedback] = useState({});

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setAnswers({});
    setFeedback({});
  };

  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestion]: e.target.value
    });
  };

  const calculateSimilarity = (str1, str2) => {
    // Simple similarity check - could be enhanced with more sophisticated algorithms
    const words1 = str1.toLowerCase().split(' ');
    const words2 = str2.toLowerCase().split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    return (commonWords.length * 2) / (words1.length + words2.length);
  };

  const handleSubmitAnswer = () => {
    const currentAnswer = answers[currentQuestion] || '';
    const similarity = calculateSimilarity(currentAnswer, questions[currentQuestion].correctAnswer);
    let pointsEarned = 0;
    let feedbackMessage = '';

    if (similarity >= 0.7) {
      pointsEarned = questions[currentQuestion].points;
      feedbackMessage = "Excellent answer! You've demonstrated strong understanding.";
    } else if (similarity >= 0.4) {
      pointsEarned = Math.floor(questions[currentQuestion].points * 0.5);
      feedbackMessage = "Good attempt! You got some key points, but there's room for improvement.";
    } else {
      feedbackMessage = "Your answer needs improvement. Here's what we were looking for:";
    }

    setScore(score + pointsEarned);
    setFeedback({
      ...feedback,
      [currentQuestion]: {
        points: pointsEarned,
        message: feedbackMessage,
        correctAnswer: questions[currentQuestion].correctAnswer
      }
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setAnswers({});
    setFeedback({});
  };

  return (
    <div className="dsa-quiz">
      <div className="quiz-header">
        <Link to="/games" className="back-button">
          <IoArrowBack /> Back to Games
        </Link>
        <h1>DSA Quiz Challenge</h1>
      </div>

      {!quizStarted ? (
        <div className="start-screen">
          <h2>Welcome to DSA Quiz!</h2>
          <p>Test your knowledge of Data Structures and Algorithms</p>
          <ul className="quiz-rules">
            <li>5 in-depth questions about DSA concepts</li>
            <li>Write detailed answers to demonstrate your understanding</li>
            <li>Each question is worth 20 points</li>
            <li>Your answers will be evaluated based on key concepts covered</li>
          </ul>
          <button className="start-button" onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>
      ) : showScore ? (
        <div className="score-screen">
          <h2>Quiz Completed!</h2>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-number">{score}</span>
              <span className="score-total">/ 100</span>
            </div>
          </div>
          <div className="feedback-section">
            {questions.map((q, index) => (
              <div key={index} className="question-feedback">
                <h3>Question {index + 1}</h3>
                <p className="user-answer"><strong>Your Answer:</strong> {answers[index]}</p>
                <p className="points-earned">Points earned: {feedback[index]?.points || 0}/20</p>
                <p className="feedback-message">{feedback[index]?.message}</p>
                <p className="correct-answer"><strong>Model Answer:</strong> {feedback[index]?.correctAnswer}</p>
              </div>
            ))}
          </div>
          <p className="score-message">
            {score >= 80 ? "Outstanding! You have excellent DSA knowledge! 🏆" :
             score >= 60 ? "Good job! You have a solid understanding of DSA concepts! 👍" :
             "Keep learning and practicing DSA concepts! 💪"}
          </p>
          <button className="restart-button" onClick={handleRestartQuiz}>
            Try Again
          </button>
        </div>
      ) : (
        <div className="question-screen">
          <div className="progress-bar">
            <div 
              className="progress"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="question-count">
            Question {currentQuestion + 1}/{questions.length}
          </div>
          <div className="question-card">
            <h2>{questions[currentQuestion].question}</h2>
            <div className="answer-section">
              <textarea
                className="answer-input"
                value={answers[currentQuestion] || ''}
                onChange={handleAnswerChange}
                placeholder="Write your answer here..."
                rows={8}
              />
            </div>
            <button
              className="submit-button"
              onClick={handleSubmitAnswer}
              disabled={!answers[currentQuestion]}
            >
              {currentQuestion === questions.length - 1 ? 'Submit Quiz' : 'Submit Answer'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DSAQuiz;
